import { AbsoluteCenter, Button, Center, Container, Text} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";


function CopyrightPolicyPage(){
    const navigate = useNavigate();
    return(
        <AbsoluteCenter>    
            <Container backgroundColor={"White"} padding={"5"} borderRadius={"xl"}>
                <Center paddingTop={5}>
                    <Text fontSize={"3xl"} fontWeight={"bold"}>Copyright Policy</Text>
                </Center>
                <Container>
                    <Text padding={10}>All content on [Your Website Name], including but not limited to text, images, videos, graphics, and code, is the exclusive intellectual property of Kirill Delyukin or its contributors and is protected under international copyright laws. Unauthorized reproduction, distribution, display, or modification of our content is strictly prohibited. We grant users limited rights to access and use our content for personal, non-commercial purposes only. If you wish to use, reproduce, or reference any part of our content for commercial purposes, you must obtain prior written consent from us. Failure to comply with these terms may result in legal action. We respect the intellectual property rights of others and expect our users to do the same. If you believe your copyrighted material has been used on our platform without proper authorization, please reach out to us at kdelyuki@uwo.ca</Text>
                </Container>
                <Center>
                    <Button width={"xs"} onClick={()=>navigate("/userpolicy")}>Back</Button>
                </Center>
            </Container>     
        </AbsoluteCenter>
    );
}

export default CopyrightPolicyPage;