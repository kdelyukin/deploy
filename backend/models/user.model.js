import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  // Account-specific fields
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  isAdmin: {  
    type: Boolean,
    default: false
  },

  lists: [
    {
      listName: {
        type: String,
        required: true,
      },
      listDescription: {
        type: String,
        required: false,
      },
      private:{
        type: Boolean,
        default: true,
      },
      date:{
        type: Date,
        required: true,
      },
      reviews: [
        {
          userID:{
            type: String,
            required: true,
          },
          rating: {
            type: Number,
            required: true,
          },
          comment: {
            type: String,
            required: false,
          },
          date: {
            type: Date,
            required: true,
          },
          hidden:{
            type: Boolean,
            default: false,
          },
        },
      ],
      destinations: [
        {
          Destination: {
            type: String,
            required: true,
          },
          Region: {
            type: String,
            required: true,
          },
          Country: {
            type: String,
            required: true,
          },
          Category: {
            type: String,
            required: true,
          },
          Latitude: {
            type: Number,
            required: true,
          },
          Longitude: {
            type: Number,
            required: true,
          },
          "Approximate Annual Tourists": {
            type: String,
            required: false,
          },
          Currency: {
            type: String,
            required: true,
          },
          "Majority Religion": {
            type: String,
            required: false,
          },
          "Famous Foods": {
            type: String,
            required: false,
          },
          Language: {
            type: String,
            required: true,
          },
          "Best Time to Visit": {
            type: String,
            required: false,
          },
          "Cost of Living": {
            type: String,
            required: false,
          },
          Safety: {
            type: String,
            required: false,
          },
          "Cultural Significance": {
            type: String,
            required: false,
          },
          Description: {
            type: String,
            required: false,
          },
        },
      ],
    },
  ],

  // Security and account tracking
  failedAttempts: {
    type: Number,
    default: 0, // Tracks failed login attempts
  },
  resetToken: {
    type: String, // Token for password reset functionality
    default: null,
  },
  resetTokenExpiry: {
    type: Date, // Expiry time for the reset token
    default: null,
  },

  // Timestamps
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

// Pre-save middleware to hash passwords
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

// Method to compare passwords during login
userSchema.methods.isPasswordValid = async function (plainPassword) {
  return await bcrypt.compare(plainPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
