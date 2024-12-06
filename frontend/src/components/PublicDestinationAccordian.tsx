import { AccordionItem, AccordionItemContent, AccordionItemTrigger, AccordionRoot } from "@/components/ui/accordion";
import { Destination } from "../scripts/Destination";
import { AbsoluteCenter, Box, Stack, Text } from "@chakra-ui/react";

interface Props {
  destinations: Destination[];
}

function PublicDestinationAccordian({ destinations}: Props) {

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
      <AccordionRoot variant="enclosed" collapsible background="white" colorPalette={"blue"}>
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

export default PublicDestinationAccordian;