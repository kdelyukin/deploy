"use client"
import {Container, Grid, Text } from "@chakra-ui/react";
import ListCard from "@/components/ListCard";
import { useState,useEffect } from "react";
import axios from "axios";

function HomePage() {
  const [list, setList] = useState<[]>([]);
  const fetchLists = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get(
        "/api/private/userlists",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setList(response.data.lists); // Ensure the API returns an array of lists
    } catch (error: any) {
      console.error(
        "Error fetching lists:",
        error.response?.data?.message || error.message
      );
    }
  };

  useEffect(() => {
    fetchLists();
  }, []);

  return (  
    <Container minW={"90%"} height="80vh">
      <div style={{ backgroundColor: "white", height: "80vh", overflowY: "auto", padding: "1.5%", borderRadius: "8px"}} >
        <Text fontSize="2xl" fontWeight="bold" textAlign="center" mb="5">Your saved list will appear below: </Text>
        <Grid 
          templateColumns="repeat(auto-fill, minmax(320px, 1fr))" 
          rowGap={"3"} 
          columnGap={"3"} // Ensure consistent horizontal spacing
        >
          {list.map((item: any, index: number) => (
            <ListCard
              key={index}
              listName={item.listName}
              listDescription={item.listDescription}
              fetchLists={fetchLists}
            />
          ))}
        </Grid>
      </div>
    </Container>
  );
}

export default HomePage;
