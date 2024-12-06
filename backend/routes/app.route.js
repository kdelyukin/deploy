import express from 'express';
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {mongoose} from 'mongoose';


const router = express.Router();
export default router;

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }
  
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; 
        next();
    } catch (error) {
        return res.status(403).json({ message: "Invalid or expired token." });
    }
}

function authenticateTokenOptional(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
      req.user = null;
      return next();
  }

  try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; 
  } catch (error) {
      req.user = null; 
  }
  next();
}

router.get("/public/destinations", async (req, res) => {
    try{
        const destinations = await mongoose.connection.db.collection('destinations').find().toArray();
        res.json(destinations);
    } catch(error){
        console.error(`Error: ${error.message}`);
        res.status(500).json({message: "Server Error"});
    }
})

router.post("/public/signUp", async (req, res) => {
    const user = req.body;
    if( await User.findOne({email: user.email})){
        return res.status(400).json({message: "User with this Email already exists"});
    }
    const newUser = new User(user);
    try{
        await newUser.save();
        res.status(201).json({message: "User created successfully"});
    }
    catch(error){
    console.error(`Error: ${error.message}`);
    res.status(500).json({message: "Saving server error"});
    }
})

router.post("/public/login", async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ message: "Please enter all fields" });
    }
  
    try {
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ message: "User with this email not found" });
      }
  
      if (user.disabled) {
        return res.status(403).json({ message: "Account is disabled. Please contact admin (kdelyuki@uwo.ca)." });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        user.failedAttempts += 1;
  
        if (user.failedAttempts >= 5) {
          user.disabled = true;
          console.log(`Account disabled for user: ${user.email}`);
        }
  
        await user.save();
        return res.status(401).json({
          message: "Invalid credentials",
          attemptsRemaining: Math.max(5 - user.failedAttempts, 0),
        });
      }
  
      user.failedAttempts = 0;
      await user.save();
  
      const token = jwt.sign(
        { userId: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
  
      res.status(200).json({
        message: "Login successful",
        token,
      });
    } catch (error) {
      console.error(`Error: ${error.message}`);
      res.status(500).json({ message: "Server Error" });
    }
  });

  //Update user Password
  router.put("/user/change-password", authenticateToken, async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
        return res.status(400).json({ message: "Please provide both old and new passwords." });
    }

    if (newPassword.length < 8) {
        return res.status(400).json({ message: "New password must be at least 8 characters long." });
    }

    try {
        const user = await User.findById(req.user.userId);

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        const isOldPasswordValid = await bcrypt.compare(oldPassword, user.password);
        if (!isOldPasswordValid) {
            return res.status(401).json({ message: "Old password is incorrect." });
        }
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedNewPassword;

        await user.save();

        res.status(200).json({ message: "Password updated successfully." });
    } catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).json({ message: "Server Error" });
    }
});


// Add list to user if lists < 20
router.put("/private/addlist", authenticateToken, async (req, res) => {
  const { listName, listDescription } = req.body;

  if (!listName) {
    return res.status(400).json({ message: "Please enter a list name." });
  }

  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    if (user.lists.length >= 20) {
      return res.status(400).json({ message: "You can only have up to 20 lists." });
    }

    if (user.lists.some(list => list.listName === listName)) {
      return res.status(400).json({ message: "List with this name already exists." });
    }
    user.lists.push({
      listName,
      listDescription,
      private: true,
      date: new Date(),
    });

    await user.save();

    res.status(200).json({
      message: "List added successfully.",
      lists: user.lists,
    });
  } catch (error) {
    console.error("Error adding list:", error);
    res.status(500).json({ message: "Server error." });
  }
});

  
// Updates the list information
  router.put("/private/updateList", authenticateToken, async (req, res) => {
    const { currentListName, newListName, listDescription, private: isPrivate } = req.body;
  
    if (!currentListName) {
      return res.status(400).json({ message: "Please provide the current list name." });
    }
  
    try {
      const user = await User.findById(req.user.userId);
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }
  
      const list = user.lists.find((list) => list.listName === currentListName);
      if (!list) {
        return res.status(404).json({ message: "List not found." });
      }
  
      // Update fields only if provided in the request
      if (newListName && newListName !== currentListName) {
        if (user.lists.some((l) => l.listName === newListName)) {
          return res.status(400).json({ message: "A list with the new name already exists." });
        }
        list.listName = newListName;
        list.date = new Date()
      }
  
      if (listDescription !== undefined) {
        list.listDescription = listDescription;
        list.date = new Date()
      }
  
      if (isPrivate !== undefined) {
        list.private = isPrivate;
        list.date = new Date()
      }
      await user.save();
  
      res.status(200).json({
        message: "List updated successfully.",
        updatedList: list,
      });
    } catch (error) {
      console.error("Error updating list:", error);
      res.status(500).json({ message: "Server error." });
    }
  });
  
// Get all lists for the user
router.get("/private/userlists", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    const sortedLists = user.lists.sort((a, b) => new Date(b.date) - new Date(a.date));
    res.status(200).json({
      lists: sortedLists,
    });
  } catch (error) {
    console.error("Error retrieving lists:", error);
    res.status(500).json({ message: "Server error." });
  }
});


  //Delete a list
  router.delete("/private/deletelist/:listName", authenticateToken, async (req, res) => {
    const { listName } = req.params;
  
    if (!listName) {
      return res.status(400).json({ message: "List name is required." });
    }
  
    try {
      const user = await User.findById(req.user.userId);
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }
  
      const listIndex = user.lists.findIndex(list => list.listName === listName);
      if (listIndex === -1) {
        return res.status(404).json({ message: "List not found." });
      }
  
      user.lists.splice(listIndex, 1);
      await user.save();
  
      res.status(200).json({
        message: "List deleted successfully.",
        lists: user.lists,
      });
    } catch (error) {
      console.error("Error deleting list:", error);
      res.status(500).json({ message: "Server error." });
    }
  });

// Add destination to the list
  router.put("/private/adddestination", authenticateToken, async (req, res) => {
    const { listName, destination } = req.body;

    if (!listName || !destination) {
        return res.status(400).json({ message: "Please enter a list name and a destination." });
    }

    try {
        const user = await User.findById(req.user.userId);
        if (!user) {
          return res.status(404).json({ message: "User not found." });
        }

        const list = user.lists.find(list => list.listName === listName);
        if (!list) {
            return res.status(404).json({ message: "List not found." });
        }

        if (list.destinations.some(dest => dest.Destination === destination.Destination)) {
            return res.status(400).json({ message: "Destination already exists in the list." });
        }

        list.destinations.push(destination);
        list.date = new Date();
        await user.save();

        res.status(200).json({
            message: "Destination added successfully.",
            lists: user.lists,
        });
    } catch (error) {
        console.error("Error adding destination:", error);
        res.status(500).json({ message: "Server error." });
    }
});

// Delete destination from the list
router.delete("/private/deletedestination", authenticateToken, async (req, res) => {
  const { listName, destination } = req.body;

  if (!listName || !destination) {
      return res.status(400).json({ message: "Please enter a list name and a destination." });
  }

  try {
      const user = await User.findById(req.user.userId);
      if (!user) {
          return res.status(404).json({ message: "User not found." });
      }

      const list = user.lists.find(list => list.listName === listName);
      if (!list) {
          return res.status(404).json({ message: "List not found." });
      }

      const destinationIndex = list.destinations.findIndex(dest => dest.Destination === destination.Destination);
      if (destinationIndex === -1) {
          return res.status(404).json({ message: "Destination not found in the list." });
      }

      list.destinations.splice(destinationIndex, 1);
      list.date = new Date();
      await user.save();

      res.status(200).json({
          message: "Destination deleted successfully.",
          lists: user.lists,
      });
  } catch (error) {
      console.error("Error deleting destination:", error);
      res.status(500).json({ message: "Server error." });
  }
});

// Get all public lists
router.get("/private/publiclists", authenticateTokenOptional, async (req, res) => {
  try {
      const isLoggedIn = !!req.user;
      const users = await User.aggregate([
        { $unwind: "$lists" },
        { $match: { "lists.private": false } },
        { 
          $project: {
            name: 1,
            "lists.listName": 1,
            "lists.listDescription": 1,
            "lists.destinations": 1,
            "lists.date": 1,
          }
        }
      ]);

      let publicLists = users.map(user => ({
        userId: user._id.toString(),
        userName: user.name,
        listName: user.lists.listName,
        listDescription: user.lists.listDescription,
        destinations: user.lists.destinations,
        date: new Date(user.lists.date).toISOString(),
      }));

      publicLists.sort((a, b) => b.date - a.date);

      if (!isLoggedIn) {
          publicLists = publicLists.slice(0, 10);
      }

      res.json(publicLists);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred while retrieving public lists." });
  }
});


//Create or Update review for a list
router.post("/private/:userId/lists/:listName/review", authenticateToken, async (req, res) => {
  const { userId, listName } = req.params;
  const { rating, comment } = req.body;

  if (!rating || typeof rating !== "number") {
      return res.status(400).json({ message: "Rating is required and must be a number." });
  }

  try {
      // Find the target user
      const targetUser = await User.findById(userId);
      if (!targetUser) {
          return res.status(404).json({ message: "User not found." });
      }

      // Find the specific list
      const targetList = targetUser.lists.find(list => list.listName === listName);
      if (!targetList) {
          return res.status(404).json({ message: "List not found." });
      }

      // Check if the user already has a review on the list
      const reviewerId = req.user.userId;
      const existingReview = targetList.reviews.find(review => review.userID === reviewerId);

      if (existingReview) {
          // Update the existing review
          existingReview.rating = rating;
          existingReview.comment = comment || existingReview.comment;
          existingReview.date = new Date();
      } else {
          // Create a new review
          targetList.reviews.push({
              userID: reviewerId,
              rating,
              comment,
              date: new Date(),
          });
      }

      await targetUser.save();

      res.status(200).json({
          message: "Review saved successfully.",
          reviews: targetList.reviews,
      });
  } catch (error) {
      console.error("Error creating/updating review:", error);
      res.status(500).json({ message: "Server error." });
  }
});

//Retrieve reviews for a list
router.get("/public/:userId/lists/:listName/reviews", async (req, res) => {
  const { userId, listName } = req.params;

  try {
      // Find the target user
      const targetUser = await User.findById(userId);
      if (!targetUser) {
          return res.status(404).json({ message: "User not found." });
      }

      // Find the specific list
      const targetList = targetUser.lists.find(list => list.listName === listName);
      if (!targetList) {
          return res.status(404).json({ message: "List not found." });
      }

      // Filter non-hidden reviews
      const nonHiddenReviews = targetList.reviews.filter(review => !review.hidden);

      res.status(200).json({
          message: "Non-hidden reviews retrieved successfully.",
          reviews: nonHiddenReviews,
      });
  } catch (error) {
      console.error("Error retrieving reviews:", error);
      res.status(500).json({ message: "Server error.", error: error.message });
  }
});