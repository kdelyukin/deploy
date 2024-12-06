import { AbsoluteCenter, Button, Center, Container, Text} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";


function PrivacyPolicyPage(){
    const navigate = useNavigate();
    return(
        <AbsoluteCenter>    
            <Container backgroundColor={"White"} padding={"5"} borderRadius={"xl"}>
                <Center paddingTop={5}>
                    <Text fontSize={"3xl"} fontWeight={"bold"}>Privacy Policy</Text>
                </Center>
                <Container>
                    <Text padding={10}>Your privacy is of paramount importance to us. We are committed to transparently handling your personal information and ensuring it is used responsibly. We collect data to improve your experience, such as for personalization, service enhancements, and providing customer support. This may include information you provide directly, such as your name and email address, as well as data collected automatically, such as your IP address and usage patterns. We do not sell, rent, or share your personal information with third parties except for trusted service providers who assist us in operating the platform or as required by law. You have the right to access, correct, or delete your personal data at any time, and we provide clear instructions for managing your data preferences. By using our website, you consent to the collection and use of your information as described in this policy. For detailed information, visit our full Privacy Policy page or contact us at kdelyuki@uwo.ca.</Text>
                </Container>
                <Center>
                    <Button width={"xs"} onClick={()=>navigate("/userpolicy")}>Back</Button>
                </Center>
            </Container>     
        </AbsoluteCenter>
    );
}

export default PrivacyPolicyPage;