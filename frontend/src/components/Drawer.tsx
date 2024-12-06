import {DrawerActionTrigger, DrawerBackdrop, DrawerBody, DrawerCloseTrigger, DrawerContent, DrawerFooter, DrawerHeader, DrawerRoot, DrawerTitle, DrawerTrigger,} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Flex, Input, Tabs, Textarea } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import { Destination } from "@/scripts/Destination";
import DestinationAccordion from "@/components/DestinationAccordion";
import { SegmentedControl } from "@/components/ui/segmented-control"
import axios from "axios";


interface DrawerProps {
    listName: string;
    newListName: string;
    setNewListName: React.Dispatch<React.SetStateAction<string>>;
    newDescription: string;
    setNewDescription: React.Dispatch<React.SetStateAction<string>>;
    newPrivacy: string;
    setNewPrivacy: React.Dispatch<React.SetStateAction<string>>;
    fetchLists: () => void;
  }
  function Drawer({ fetchLists, listName, newListName, setNewListName, newDescription, setNewDescription, newPrivacy, setNewPrivacy }: DrawerProps) {
    const [destinations, setDestinations] = useState<Destination[]>([]);
    const [loading, setLoading] = useState(false);
  
    const fetchDestinationsForList = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        alert("You are not authenticated. Please log in.");
        return;
      }
  
      setLoading(true); // Indicate loading state
      try {
        const response = await axios.get("/api/private/userlists", {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        if (response.status === 200) {
          const userList = response.data.lists.find(
            (list: any) => list.listName === listName
          );
          if (userList) {
            setNewListName(userList.listName);
            setNewDescription(userList.listDescription);
            setNewPrivacy(userList.private ? "Private" : "Public");
            setDestinations(userList.destinations || []);
          }
        }
      } catch (error) {
        console.error("Error fetching user list:", error);
        alert("Failed to fetch user list.");
      } finally {
        setLoading(false); // End loading state
      }
    };
  
    const handleSave = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        alert("You are not authenticated. Please log in.");
        return;
      }
  
      try {
        const response = await axios.put(
          "/api/private/updateList",
          {
            currentListName: listName,
            newListName,
            listDescription: newDescription,
            private: newPrivacy === "Private", // Set to true if "Private", false if "Public"
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
  
        if (response.status === 200) {
          fetchLists(); // Refresh lists in parent
          fetchDestinationsForList(); // Refresh list details after save
          alert("List updated successfully.");
        }
      } catch (error: any) {
        console.error("Error updating list:", error.response?.data?.message || error.message);
        alert("Failed to update the list.");
      }
    };
  
    // Load data on component mount
    useEffect(() => {
      if (listName) {
        fetchDestinationsForList();
      }
    }, [listName]); // Trigger only when `listName` changes
  
    return (
      <DrawerRoot size={"md"}>
        <DrawerBackdrop />
        <DrawerTrigger asChild>
          <Button variant="solid" size="sm">
            View List
          </Button>
        </DrawerTrigger>
        <DrawerContent colorPalette={"blue"} offset="6" rounded="md">
          <DrawerHeader>
            <DrawerTitle>{listName}</DrawerTitle>
          </DrawerHeader>
          <DrawerBody>
            <Tabs.Root variant="enclosed" maxW="md" fitted defaultValue={"tab-1"}>
              <Tabs.List>
                <Tabs.Trigger value="tab-1">List Info</Tabs.Trigger>
                <Tabs.Trigger value="tab-2">Destinations</Tabs.Trigger>
              </Tabs.List>
              <Tabs.Content value="tab-1">
                <Flex direction="column" gap={"3"}>
                  <Input
                    size={"sm"}
                    placeholder="Enter list name"
                    value={newListName}
                    onChange={(e) => setNewListName(e.target.value)}
                    disabled={loading} // Disable while loading
                  />
                  <Textarea
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    disabled={loading}
                  />
                  <SegmentedControl
                    value={newPrivacy}
                    onValueChange={(e) => setNewPrivacy(e.value)}
                    items={["Public", "Private"]}
                    disabled={loading}
                  />
                </Flex>
              </Tabs.Content>
              <Tabs.Content value="tab-2">
                <DestinationAccordion
                  destinations={destinations}
                  selectedList={listName}
                />
              </Tabs.Content>
            </Tabs.Root>
          </DrawerBody>
          <DrawerFooter>
            <DrawerActionTrigger asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerActionTrigger>
            <Button onClick={handleSave} disabled={loading}>
              Save
            </Button>
          </DrawerFooter>
          <DrawerCloseTrigger />
        </DrawerContent>
      </DrawerRoot>
    );
  }

export default Drawer;