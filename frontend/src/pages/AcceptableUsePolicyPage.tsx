import { AbsoluteCenter, Button, Center, Container, Text} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";


function AcceptableUsePolicyPage(){
    const navigate = useNavigate();
    return(
        <AbsoluteCenter>    
            <Container backgroundColor={"White"} padding={"5"} borderRadius={"xl"}>
                <Center paddingTop={5}>
                    <Text fontSize={"3xl"} fontWeight={"bold"}>Acceptable Use Policy</Text>
                </Center>
                <Container>
                    <Text padding={10}>Our platform is designed to foster a respectful, safe, and collaborative environment for all users. To ensure this, we have established the following guidelines for acceptable use. Users must refrain from engaging in unlawful, harmful, or disruptive activities, including but not limited to uploading malicious software, distributing spam, engaging in harassment or hate speech, and violating the privacy or intellectual property rights of others. The use of our platform to disseminate illegal content, promote violence, or conduct fraudulent activities is strictly prohibited. We reserve the right to suspend or terminate access to our services for users who violate these terms. By using our website, you agree to comply with this policy and report any inappropriate behavior or content you encounter. For questions or to report violations, please contact us at kdelyuki@uwo.ca.</Text>
                </Container>
                <Center>
                    <Button width={"xs"} onClick={()=>navigate("/userpolicy")}>Back</Button>
                </Center>
            </Container>     
        </AbsoluteCenter>
    );
}

export default AcceptableUsePolicyPage;