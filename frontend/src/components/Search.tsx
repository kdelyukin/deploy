import { useState } from "react";
import { Input, Button, Group } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";


function Search() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  return (
    <Group attached colorPalette={"blue"} marginTop={"7"}>
      <Input 
      bg={"white"} 
      width= {"xl"} 
      placeholder="Search Destination..."
       value={search} onChange={(e) => setSearch(e.target.value)}/>
      <Button 
      onClick={() => navigate("/results", { state: { search } })}>
        Search
      </Button>
    </Group>
  );
}

export default Search;
