import DestinationAccordion from "@/components/DestinationAccordion";
import { useEffect, useState } from "react";
import axios from "axios";
import { Destination } from "@/scripts/Destination";
import { useLocation } from "react-router-dom";
import stringSimilarity from "string-similarity";
import { Flex, Container } from "@chakra-ui/react";
import Map from "@/components/Map";
import ListOperations from "@/components/ListOperations";

function ResultPage() {
  const [filteredDestinations, setFilteredDestinations] = useState<Destination[]>([]);
  const [selectedList, setSelectedList] = useState<string | null>(null);
  const location = useLocation();
  const search = location.state?.search.toLowerCase() || "";

  useEffect(() => {
    const fetchAndFilterDestinations = async () => {
      try {
        const { data } = await axios.get(
          "/api/public/destinations"
        );
        const results = search
          ? data.filter(({ Destination, Region, Country }: Destination) =>
              [Destination, Region, Country].some(
                (field) =>
                  stringSimilarity.compareTwoStrings(
                    search,
                    field?.toLowerCase() || ""
                  ) >= 0.7
              )
            )
          : data;
        setFilteredDestinations(results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAndFilterDestinations();
  }, [search]);

  return (
    <Flex gap="4" margin={"0 10vh"} height="80vh">
      {/* Accordion Section */}
      <Flex width={"40%"} height="100%" overflow="hidden">
        <Container>
          <DestinationAccordion
            destinations={filteredDestinations}
            selectedList={selectedList}
          />
        </Container>
      </Flex>

      <Flex gap="4" width={"60%"} direction="column">
        <Container height="100%">
          <Map
            Destinations={filteredDestinations}
            height="calc(100% - 13vh)"
            width="100%"
          />
          {localStorage.getItem("accessToken") && (
            <ListOperations
              selectedList={selectedList}
              setSelectedList={setSelectedList}
            />
          )}
        </Container>
      </Flex>
    </Flex>
  );
}

export default ResultPage;
