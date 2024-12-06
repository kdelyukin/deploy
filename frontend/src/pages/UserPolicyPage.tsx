import { AbsoluteCenter, Box, Button, Card, Grid, Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function UserPolicyPage() {
  const navigate = useNavigate();
  return (
    <AbsoluteCenter>
    <Grid templateColumns="repeat(2, 1fr)" rowGap={4} columnGap={5} marginTop={"10vh"} height={"80vh"}>
      <Card.Root flexDirection="row" overflow="hidden" width="xl">
        <Image
          objectFit="cover"
          maxW="200px"
          src="https://picsum.photos/200/300"
          alt="Policy Picture"
        />
        <Box>
          <Card.Body>
            <Card.Title mb="2">Security Policy</Card.Title>
            <Card.Description>
                Outlines the measures taken to protect user data and ensure the integrity of systems against unauthorized access and cyber threats.
            </Card.Description>
          </Card.Body>
          <Card.Footer>
            <Button onClick={()=>navigate("/securitypolicy")}>View</Button>
          </Card.Footer>
        </Box>
      </Card.Root>
      <Card.Root flexDirection="row" overflow="hidden" width="xl">
        <Image
          objectFit="cover"
          maxW="200px"
          src="https://picsum.photos/200/300"
          alt="Policy Picture"
        />
        <Box>
          <Card.Body>
            <Card.Title mb="2">Privacy Policy</Card.Title>
            <Card.Description>
                Details how user information is collected, stored, used, and protected, ensuring compliance with data privacy regulations.
            </Card.Description>
          </Card.Body>
          <Card.Footer>
            <Button onClick={()=> navigate("/privacypolicy")}>View</Button>
          </Card.Footer>
        </Box>
      </Card.Root>
      <Card.Root flexDirection="row" overflow="hidden" width="xl">
        <Image
          objectFit="cover"
          maxW="200px"
          src="https://picsum.photos/200/300"
          alt="Policy Picture"
        />
        <Box>
          <Card.Body>
            <Card.Title mb="2">Copyright Policy</Card.Title>
            <Card.Description>
                Explains how copyrighted content is handled and the steps for users to take if they believe their content has been infringed upon.
            </Card.Description>
          </Card.Body>
          <Card.Footer>
            <Button onClick={()=>navigate("/copyrightpolicy")}>View</Button>
          </Card.Footer>
        </Box>
      </Card.Root>
      <Card.Root flexDirection="row" overflow="hidden" width="xl">
        <Image
          objectFit="cover"
          maxW="200px"
          src="https://picsum.photos/200/300"
          alt="Policy Picture"
        />
        <Box>
          <Card.Body>
            <Card.Title mb="2">DMCA & Takedown Policy</Card.Title>
            <Card.Description>
                Describes the procedure for filing a Digital Millennium Copyright Act (DMCA) takedown notice for infringing content.
            </Card.Description>
          </Card.Body>
          <Card.Footer>
            <Button onClick={()=>navigate("/dmcatakedownpolicy")}>View</Button>
          </Card.Footer>
        </Box>
      </Card.Root>
      <Card.Root flexDirection="row" overflow="hidden" width="xl">
        <Image
          objectFit="cover"
          maxW="200px"
          src="https://picsum.photos/200/300"
          alt="Policy Picture"
        />
        <Box>
          <Card.Body>
            <Card.Title mb="2">Acceptable use Policy</Card.Title>
            <Card.Description>
                Sets guidelines for appropriate behavior and actions when using the service, prohibiting illegal, harmful, or disruptive activities.
            </Card.Description>
          </Card.Body>
          <Card.Footer>
            <Button onClick={()=>navigate("/acceptableusepolicy")}>View</Button>
          </Card.Footer>
        </Box>
      </Card.Root>
    </Grid>
    </AbsoluteCenter>
  );
}

export default UserPolicyPage;
