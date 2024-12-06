import { useState, useEffect } from "react";
import PublicListCard from "@/components/PublicListCard";
import { Container, Grid, Text } from "@chakra-ui/react";
import axios from "axios";
import { Destination } from "@/scripts/Destination";


interface ListItem {
  userId: string,
  userName: string;
  listName: string;
  listDescription: string;
  destinations: Destination[];
  date: string;
}

function PublicListsPage() {
  const [lists, setLists] = useState<ListItem[]>([]); // State with type
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLists = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("accessToken");
        const response = await axios.get("/api/private/publiclists", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setLists(response.data);
      } catch (err) {
        setError("Failed to fetch lists. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLists();
  }, []);

  return (
    <Container minW={"90%"} height="80vh">
      <div
        style={{
          backgroundColor: "white",
          height: "80vh",
          overflowY: "auto",
          padding: "1.5%",
          borderRadius: "8px",
        }}
      >
        <Text fontSize="2xl" fontWeight="bold" textAlign="center" mb="5">
          Explore Public Lists:
        </Text>

        {loading && <Text textAlign="center">Loading...</Text>}
        {error && <Text color="red.500" textAlign="center">{error}</Text>}

        {!loading && !error && (
          <Grid
            templateColumns="repeat(auto-fill, minmax(320px, 1fr))"
            rowGap={"3"}
            columnGap={"3"}
          >
            {lists.map((item, index) => (
              <PublicListCard
                key={index}
                userId={item.userId}
                userName={item.userName}
                listName={item.listName}
                listDescription={item.listDescription}
                listDestinations={item.destinations}
                date={item.date ? new Date(item.date).toLocaleString() : "Unknown date"}
              />
            ))}
          </Grid>
        )}
      </div>
    </Container>
  );
}

export default PublicListsPage;
