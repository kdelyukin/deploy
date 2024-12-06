import {DrawerActionTrigger, DrawerBackdrop, DrawerBody, DrawerCloseTrigger, DrawerContent, DrawerFooter, DrawerHeader, DrawerRoot, DrawerTitle, DrawerTrigger,} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Destination } from "@/scripts/Destination";
import PublicDestinationAccordian from "@/components/PublicDestinationAccordian";
import { Text,Tabs } from "@chakra-ui/react";
import ReviewForm from "./ReviewForm";

interface PublicDrawerProps {
  userId: string;
  userName: string;
  listName: string;
  listDescription: string;
  listDestinations: Destination[];
  }
  function PublicDrawer({userId, userName, listName, listDescription, listDestinations }: PublicDrawerProps) {

    return (
      <DrawerRoot size={"md"}>
        <DrawerBackdrop />
        <DrawerTrigger asChild>
          <Button variant="solid" size="sm">
            View
          </Button>
        </DrawerTrigger>
        <DrawerContent colorPalette={"blue"} offset="6" rounded="md">
          <DrawerHeader>
            <DrawerTitle>{listName}</DrawerTitle>
            <Text fontSize="md">Created by: {userName}</Text>
          </DrawerHeader>
          <DrawerBody>
          <Tabs.Root variant="enclosed" maxW="md" fitted defaultValue={"tab-1"}>
              <Tabs.List>
                <Tabs.Trigger value="tab-1">Destinations</Tabs.Trigger>
                <Tabs.Trigger value="tab-2">Reviews</Tabs.Trigger>
              </Tabs.List>
              <Tabs.Content value="tab-1">
                <Text fontSize={"ms"} marginBottom={"3"}>Description: {listDescription}</Text>
                <PublicDestinationAccordian destinations={listDestinations}/>
              </Tabs.Content>
              <Tabs.Content value="tab-2">
                <ReviewForm userId={userId} listName={listName} userName={userName} />
              </Tabs.Content>
            </Tabs.Root>
          </DrawerBody>
          <DrawerFooter>
            <DrawerActionTrigger asChild>
              <Button variant="outline">Close</Button>
            </DrawerActionTrigger>
          </DrawerFooter>
          <DrawerCloseTrigger />
        </DrawerContent>
      </DrawerRoot>
    );
  }

export default PublicDrawer;