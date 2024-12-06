import { Button, Center, Container, Flex, Group, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();
  return (
    <Container
      position="absolute"
      top="50%"   // Centers vertically
      left="0"   // Aligns to the right side of the page
      marginLeft={"10vh"}
      transform="translateY(-50%)"  // Adjust for true vertical centering
      background="white"
      width="50vw"
      alignItems="center" // Center text horizontally inside the container
      display="flex"  // Enable flexbox
      justifyContent="center" // Center content horizontally inside the container
      borderRadius={"2xl"}
      padding={"12"}
      
    >
      <Container>
        <Text textStyle="4xl" fontWeight={"bold"} color="blue.500" textAlign={"left"}>
          JourneyHub
        </Text>
      </Container>
      <Flex gap={"4"} direction="column" textAlign="center" paddingRight={"10"}>
        <Text textStyle="4xl" fontWeight={"bold"} color="black">
          Explore Your Next Adventure
        </Text>
        <Text textAlign={"center"}>
          Discover breathtaking travel destinations across Europe and beyond! Use our interactive site to search for your dream getaway, browse curated locations. Start your journey today—it's just a click away.
        </Text>
        <Center>
          <Group marginTop={"4"}>
            <Button colorPalette="blue" size="lg" onClick={()=> navigate("/search")}>
              Get Started
            </Button>
            <Button colorPalette="blue" size="lg" variant={"outline"} onClick={() => {navigate("/register")}}>
              Register
            </Button>
          </Group>
        </Center>
      </Flex>
    </Container>
  );
}


export default LandingPage;