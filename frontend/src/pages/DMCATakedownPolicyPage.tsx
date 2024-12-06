import { AbsoluteCenter, Button, Center, Container, Text} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";


function DMCATakedownPolicyPage(){
    const navigate = useNavigate();
    return(
        <AbsoluteCenter>    
            <Container backgroundColor={"White"} padding={"5"} borderRadius={"xl"}>
                <Center paddingTop={5}>
                    <Text fontSize={"3xl"} fontWeight={"bold"}>DMCA & Takedown Policy</Text>
                </Center>
                <Container>
                    <Text padding={10}>We respect intellectual property rights and are committed to complying with the Digital Millennium Copyright Act (DMCA). If you believe that your copyrighted work has been used on our website in a manner that constitutes copyright infringement, please notify us by submitting a formal DMCA Takedown Notice. The notice must include your contact information, a detailed description of the copyrighted work, a link or reference to the alleged infringing material, and a statement of good faith belief that the use of the material is unauthorized. Additionally, please include a statement affirming the accuracy of your claim and your authority to act on behalf of the copyright owner. Once we receive a valid notice, we will promptly investigate the claim and, if necessary, remove or disable access to the infringing material. For counter-notices or further inquiries, please contact us at .</Text>
                </Container>
                <Center>
                    <Button width={"xs"} onClick={()=>navigate("/userpolicy")}>Back</Button>
                </Center>
            </Container>     
        </AbsoluteCenter>
    );
}

export default DMCATakedownPolicyPage;