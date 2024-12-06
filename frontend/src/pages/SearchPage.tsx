import Search from "../components/Search";
import { AbsoluteCenter, Text, Flex } from "@chakra-ui/react";

function SearchPage() {
  return (
    <>
      <AbsoluteCenter>
        <Flex direction="column" align="center" justify="center" textAlign="center">
          <Text color="white" fontWeight="bold" fontSize="6xl">
            Explore the World
          </Text>
          <Text color="white" fontWeight="medium" fontSize="3xl" marginTop={"-3"}>
            Top European Travel Destinations
          </Text>
          <Search />
        </Flex>
      </AbsoluteCenter>
    </>
  );
}

export default SearchPage;
