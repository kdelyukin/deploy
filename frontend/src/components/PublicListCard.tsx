import { Card, Container, Group, Text } from "@chakra-ui/react";
import { Avatar } from "@/components/ui/avatar";
import PublicDrawer from "./PublicDrawer";
import { Destination } from "@/scripts/Destination";

interface ListCardProps {
  userId: string;
  userName: string;
  listName: string;
  listDescription: string;
  listDestinations: Destination[];
  date: string;
}

function PublicListCard({
  userId,
  userName,
  listName,
  listDescription,
  listDestinations,
  date
}: ListCardProps) {
  return (
    <Card.Root width="320px" size="sm" minH="40%" bg="white" boxShadow="md" colorPalette={"blue"}>
      <Card.Body gap="2">
        <Group>
        <Avatar
          src="https://picsum.photos/200/300"
          name={listName}
          size="lg"
          shape="rounded"
        />
        <Container marginLeft={-5}>
          <Text fontSize="md" color="blue.500">User: {userName}</Text>
          <Text fontSize="xs" color="blue.500">Updated: {date}</Text>
        </Container>
        </Group>
        <Card.Title mt="2">{listName}</Card.Title>
        <Card.Description>{listDescription}</Card.Description>
      </Card.Body>
      <Card.Footer justifyContent="flex-end">
        <PublicDrawer
          userId={userId}
          userName={userName}
          listName={listName}
          listDescription={listDescription}
          listDestinations={listDestinations}
          />
      </Card.Footer>
    </Card.Root>
  );
}

export default PublicListCard;
