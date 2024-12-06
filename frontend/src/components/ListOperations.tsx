import {Input, Text, Flex, Textarea} from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { createListCollection } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import {DialogBackdrop, DialogBody, DialogCloseTrigger, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogRoot, DialogTrigger,} from "@/components/ui/dialog";
import {SelectContent, SelectItem, SelectLabel, SelectRoot, SelectTrigger, SelectValueText,} from "@/components/ui/select";


interface ListItem {
  listName: string;
}

interface ListOperationProps {
    selectedList: string | null;
    setSelectedList: (list: string | null) => void;
  }
  

function ListOperation({ selectedList, setSelectedList }: ListOperationProps) {
  const [list, setList] = useState<ListItem[]>([]);
  const [listName, setListName] = useState("");
  const [listDescription, setListDescription] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const contentRef = useRef(null);

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get(
          "/api/private/userlists",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setList(response.data.lists);
      } catch (error: any) {
        console.error(
          "Error fetching lists:",
          error.response?.data?.message || error.message
        );
      }
    };

    fetchLists();
  }, []);

  const listCollection = createListCollection({
    items: Array.isArray(list)
      ? list.map((listItem) => ({
          label: listItem.listName,
          value: listItem.listName,
        }))
      : [],
  });

  const handleAddList = async () => {
    if (!listName) {
      setMessage("Please enter a list name.");
      setMessageType("error");
      return;
    }
    try {
      const token = localStorage.getItem("accessToken");
      const payload = {
        listName,
        listDescription: listDescription || null,
      };
      await axios.put(
        "/api/private/addlist",
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setList((prevList) => [...prevList, { listName, listDescription }]);
      setMessage("List created successfully!");
      setMessageType("success");
      setListName("");
      setListDescription("");
    } catch (error: any) {
      setMessage(error.response?.data?.message || "Failed to add the list.");
      setMessageType("error");
    }
  };
  

  const handleSelectionChange = (details: { value: string[] }) => {
    if (details.value.length > 0) {
      setSelectedList(details.value[0]);
    }
  };
  
  return (
    <Flex direction="column" gap={"2"} marginTop={"2"} colorPalette={"blue"}>
      <DialogRoot motionPreset="slide-in-bottom">
        <DialogTrigger asChild>
          <Button variant="solid" size="sm">
            Create List
          </Button>
        </DialogTrigger>
        <DialogContent colorPalette={"blue"}>
          <DialogHeader>
            <DialogTitle marginBottom={"-8"}>Create a new list:</DialogTitle>
            <DialogCloseTrigger />
          </DialogHeader>
          <DialogBody>
            <Text marginBottom={"3"}>
              Fill in the dialog below to create a new list.
            </Text>
            <Flex direction="column" gap={"3"}>
              <Input
                size={"sm"}
                placeholder="Enter list name"
                value={listName}
                onChange={(e) => setListName(e.target.value)}
              />
              <Textarea 
                placeholder="Description..." 
                value={listDescription}
                onChange={(e) => setListDescription(e.target.value)} 
               />
              <Button
                variant="solid"
                size="sm"
                onClick={handleAddList}
              >
                Add
              </Button>
            </Flex>
            {message && (
              <Text
                marginTop={"2"}
                color={messageType === "success" ? "green" : "red"}
              >
                {message}
              </Text>
            )}
          </DialogBody>
        </DialogContent>
      </DialogRoot>
      <DialogRoot>
        <DialogBackdrop />
        <DialogTrigger asChild>
          <Button variant="solid">Select List</Button>
        </DialogTrigger>
        <DialogContent ref={contentRef} colorPalette={"blue"}>
          <DialogCloseTrigger />
          <DialogHeader>
            <DialogTitle>Select List</DialogTitle>
          </DialogHeader>
          <DialogBody>
          <SelectRoot collection={listCollection} size="sm" onValueChange={(details) => handleSelectionChange(details)} defaultValue={selectedList ? [selectedList] : undefined}>
              <SelectLabel>Select a list to save destinations to:</SelectLabel>
              <SelectTrigger>
                <SelectValueText placeholder="Select list" />
              </SelectTrigger>
              <SelectContent portalRef={contentRef}>
                {listCollection.items.map((item) => (
                  <SelectItem item={item} key={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </SelectRoot>
          </DialogBody>
          <DialogFooter />
        </DialogContent>
      </DialogRoot>
    </Flex>
  );
}

export default ListOperation;
