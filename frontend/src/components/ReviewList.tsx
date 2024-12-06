import { useEffect, useState } from "react";
import { HStack, Stack, Text, Spinner, Box } from "@chakra-ui/react";
import { Avatar } from "@/components/ui/avatar";
import { Rating } from "@/components/ui/rating";
import axios from "axios";

type Review = {
  _id: string;
  userID: string;
  rating: number;
  comment?: string;
  date: string;
  hidden?: boolean;
  userName: string;
};

function ReviewList({ userId, userName, listName }: { userId: string; userName: string; listName: string }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `/api/public/${userId}/lists/${listName}/reviews`
        );
        setReviews(response.data.reviews as Review[]);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchReviews();
  }, [userId, listName]);

  if (loading) {
    return (
      <Box textAlign="center" py={4}>
        <Spinner size="lg" />
        <Text>Loading reviews...</Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" py={4}>
        <Text color="red.500">Error: {error}</Text>
      </Box>
    );
  }

  return (
    <Stack gap="4">
      {reviews.map((review) => (
        <Stack
          key={review._id}
          p={4}
          border="1px solid"
          borderColor="gray.200"
          borderRadius="md"
          backgroundColor={"white"}
        >
          <Rating
            colorPalette="orange"
            readOnly
            size="xs"
            defaultValue={review.rating}
          />

          <Text>{review.comment || "No comment provided."}</Text>

          <HStack gap="4">
            <Avatar name={review.userID} src={`https://randomuser.me/api/portraits/lego/${review._id.slice(-1)}.jpg`} />
            <Stack textStyle="sm" gap="0">
              <Text fontWeight="medium">User: {userName}</Text>
              <Text color="fg.muted">Review Date: {new Date(review.date).toLocaleDateString()}</Text>
            </Stack>
          </HStack>
        </Stack>
      ))}
    </Stack>
  );
}

export default ReviewList;
