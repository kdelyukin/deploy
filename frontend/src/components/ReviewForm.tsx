import { Box, Button, Flex, Textarea } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Rating } from "@/components/ui/rating";
import ReviewList from "./ReviewList";
import {
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";

interface ReviewFormProps {
  userId: string;
  listName: string;
  userName: string;
}

function ReviewForm({ userId, listName, userName }: ReviewFormProps) {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const navigate = useNavigate();

  const handleSave = async () => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      alert("Authentication required. Please log in to share a review.");
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(
        `/api/private/${userId}/lists/${listName}/review`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            rating,
            comment,
          }),
        }
      );

      if (response.ok) {
        alert("Review shared successfully.");
        setComment("");
        setRating(0);
      } else {
        const errorData = await response.json();
        alert(
          `Failed to share review: ${
            errorData.message || "Something went wrong."
          }`
        );
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Unable to connect to the server. Please try again later.");
    }
  };

  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Flex direction={"column"} gap={"3"}>
      <Rating
        size="lg"
        allowHalf
        defaultValue={3.71}
        value={rating}
        onValueChange={(e) => setRating(e.value)}
      />
      <Textarea
        placeholder="Write your review..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <PopoverRoot open={isOpen} onOpenChange={() => setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="solid"
            colorPalette={"blue"}
            onClick={() => setIsOpen(true)}
          >
            Share Review
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverBody>
            <Flex direction={"row"} gap={3}>
              <PopoverTitle fontWeight="medium">
                Please Confirm Action:
              </PopoverTitle>
              <Button size={"xs"} onClick={handleClose}>
                Close
              </Button>
              <Button size={"xs"} onClick={handleSave}>
                Share
              </Button>
            </Flex>
          </PopoverBody>
        </PopoverContent>
      </PopoverRoot>
      <Box
        backgroundColor={"gray.200"}
        borderWidth={1}
        padding={"1"}
        borderRadius={"lg"}
      >
        <ReviewList userId={userId} listName={listName} userName={userName} />
      </Box>
    </Flex>
  );
}

export default ReviewForm;
