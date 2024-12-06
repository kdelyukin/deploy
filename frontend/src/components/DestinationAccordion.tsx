import { AccordionItem, AccordionItemContent, AccordionItemTrigger, AccordionRoot } from "@/components/ui/accordion";
import { Destination } from "../scripts/Destination";
import { AbsoluteCenter, Box, Button, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

interface Props {
  destinations: Destination[];
  selectedList: string | null;
}

function DestinationAccordion({ destinations, selectedList }: Props) {
  const [addedDestinations, setAddedDestinations] = useState<string[]>([]);
  const [userLists, setUserLists] = useState<any[]>([]);

  // Fetch user's lists
  useEffect(() => {
    const fetchUserLists = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        return;
      }

      try {
        const response = await axios.get("/api/private/userlists", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 200) {
          setUserLists(response.data.lists);

          // Check if a selectedList is provided
          if (selectedList) {
            const list = response.data.lists.find(
              (list: any) => list.listName === selectedList
            );

            if (list && list.destinations) {
              // Extract already added destinations
              const added = list.destinations.map((dest: any) => dest.Destination);
              setAddedDestinations(added);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching user lists:", error);
        alert("Failed to fetch user lists.");
      }
    };

    fetchUserLists();
  }, [selectedList]);

  const handleSelectDestination = async (destination: Destination) => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      alert("You are not authenticated. Please log in again.");
      return;
    }
    if (!selectedList) {
      alert("Please select a list before adding destinations.");
      return;
    }

    try {
      const response = await axios.put(
        "/api/private/adddestination",
        {
          listName: selectedList,
          destination: destination,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        alert("Destination added successfully!");
        setAddedDestinations((prev) => [...prev, destination.Destination]);
      }
    } catch (error: any) {
      console.error("Error adding destination:", error);
      alert(
        error.response?.data?.message || "An error occurred while adding the destination."
      );
    }
  };

  const handleRemoveDestination = async (destination: Destination) => {
    if (!selectedList) {
      alert("Please select a list before removing destinations.");
      return;
    }

    const token = localStorage.getItem("accessToken");
    if (!token) {
      alert("You are not authenticated. Please log in again.");
      return;
    }

    try {
      const response = await axios.delete("/api/private/deletedestination", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          listName: selectedList,
          destination: destination,
        },
      });

      if (response.status === 200) {
        alert("Destination removed successfully!");
        setAddedDestinations((prev) =>
          prev.filter((dest) => dest !== destination.Destination)
        );
      }
    } catch (error: any) {
      console.error("Error removing destination:", error);
      alert(
        error.response?.data?.message || "An error occurred while removing the destination."
      );
    }
  };

  const handleWebSearch = (destination: Destination) => {
    if (destination) {
      const searchQuery = `${destination.Destination} ${destination.Country}`;
      const ddgUrl = `https://duckduckgo.com/?q=${encodeURIComponent(searchQuery)}`;
      window.open(ddgUrl, "_blank");
    }
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        maxHeight: "80vh",
        overflowY: "auto",
        padding: "8px",
        border: "1px solid #ccc",
        borderRadius: "8px",
      }}
    >
      <AccordionRoot variant="enclosed" collapsible background="white">
        {destinations.map((destination) => (
          <AccordionItem value={destination.Destination} key={destination.Destination}>
            <Box position="relative">
              <AccordionItemTrigger indicatorPlacement="start">
                <Stack gap="1">
                  <Text fontSize="2xl">{destination.Destination}</Text>
                  <Text fontSize="md" color="fg.muted">
                    {destination.Country}
                  </Text>
                </Stack>
              </AccordionItemTrigger>
              <AbsoluteCenter axis="vertical" insetEnd="0">
                {addedDestinations.includes(destination.Destination) ? (
                  <Button
                    variant="subtle"
                    colorPalette="red"
                    marginRight={"5"}
                    onClick={() => handleRemoveDestination(destination)}
                  >
                    Remove
                  </Button>
                ) : (
                  <Button
                    variant="subtle"
                    colorPalette="blue"
                    marginRight={"5"}
                    onClick={() => handleSelectDestination(destination)}
                  >
                    Add
                  </Button>
                )}
                <Button 
                  onClick={() => handleWebSearch(destination)}
                  marginRight={"5"}
                >
                  DDG
                </Button>
              </AbsoluteCenter>
            </Box>
            <AccordionItemContent>
            <div>
                <span style={{ fontWeight: "bold" }}>Name: </span>
                {destination.Destination} <br />
                <span style={{ fontWeight: "bold" }}>Region: </span>
                {destination.Region} <br />
                <span style={{ fontWeight: "bold" }}>Country: </span>
                {destination.Country} <br />
                <span style={{ fontWeight: "bold" }}>Category: </span>
                {destination.Category} <br />
                <span style={{ fontWeight: "bold" }}>Latitude: </span>
                {destination.Latitude} <br />
                <span style={{ fontWeight: "bold" }}>Longitude: </span>
                {destination.Longitude} <br />
                <span style={{ fontWeight: "bold" }}>Approximate Annual Tourists: </span>
                {destination["Approximate Annual Tourists"]} <br />
                <span style={{ fontWeight: "bold" }}>Majority Religion: </span>
                {destination["Majority Religion"]} <br />
                <span style={{ fontWeight: "bold" }}>Famous Foods: </span>
                {destination["Famous Foods"]} <br />
                <span style={{ fontWeight: "bold" }}>Language: </span>
                {destination.Language} <br />
                <span style={{ fontWeight: "bold" }}>Best Time to Visit: </span>
                {destination["Best Time to Visit"]} <br />
                <span style={{ fontWeight: "bold" }}>Cost of Living: </span>
                {destination["Cost of Living"]} <br />
                <span style={{ fontWeight: "bold" }}>Safety: </span>
                {destination.Safety} <br />
                <span style={{ fontWeight: "bold" }}>Cultural Significance: </span>
                {destination["Cultural Significance"]} <br />
                <span style={{ fontWeight: "bold" }}>Description: </span>
                {destination.Description} <br />
              </div>
            </AccordionItemContent>
          </AccordionItem>
        ))}
      </AccordionRoot>
    </div>
  );
}

export default DestinationAccordion;