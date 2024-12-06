import { Card, Flex } from "@chakra-ui/react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Drawer from "./Drawer";
import { useState } from "react";
import {
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";

interface ListCardProps {
  listName: string;
  listDescription: string;
  fetchLists: () => void;
}

function ListCard({ listName, listDescription, fetchLists }: ListCardProps) {
  const [newListName, setNewListName] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newPrivacy, setNewPrivacy] = useState("Private");

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      await axios.delete(
        `/api/private/deletelist/${listName}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchLists(); // Refresh the lists after successful deletion
    } catch (error: any) {
      console.error(
        "Error deleting list:",
        error.response?.data?.message || error.message
      );
    }
  };

  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Card.Root width="320px" size={"sm"} minH={"40%"} colorPalette={"blue"}>
      <Card.Body gap="2">
        <Avatar
          src="https://picsum.photos/200/300"
          name={listName}
          size="lg"
          shape="rounded"
        />
        <Card.Title mt="2">{listName}</Card.Title>
        <Card.Description>{listDescription}</Card.Description>
      </Card.Body>
      <Card.Footer justifyContent="flex-end">
        <PopoverRoot open={isOpen} onOpenChange={() => setIsOpen}>
          <PopoverTrigger asChild>
            <Button variant="subtle" colorPalette={"red"} onClick={() => setIsOpen(true)}>
              Delete
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
                <Button size={"xs"} onClick={handleDelete}>Delete</Button>
              </Flex>
            </PopoverBody>
          </PopoverContent>
        </PopoverRoot>
        <Drawer
          listName={listName}
          newListName={newListName}
          setNewListName={setNewListName}
          newDescription={newDescription}
          setNewDescription={setNewDescription}
          newPrivacy={newPrivacy}
          setNewPrivacy={setNewPrivacy}
          fetchLists={fetchLists}
        />
      </Card.Footer>
    </Card.Root>
  );
}

export default ListCard;
