import { AbsoluteCenter, Button, Center, Container, Text} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";


function SecurityPolicyPage(){
    const navigate = useNavigate();
    return(
        <AbsoluteCenter>    
            <Container backgroundColor={"White"} padding={"5"} borderRadius={"xl"}>
                <Center paddingTop={5}>
                    <Text fontSize={"3xl"} fontWeight={"bold"}>Security Policy</Text>
                </Center>
                <Container>
                    <Text padding={10}>We are deeply committed to maintaining the security of our platform and protecting our users' data. We employ industry-standard security measures, including advanced encryption, secure protocols, and regular vulnerability assessments, to safeguard the integrity of our systems. Access to sensitive data is restricted to authorized personnel, and we continuously monitor our infrastructure to detect and prevent unauthorized activities. Users are encouraged to play an active role in maintaining security by creating strong passwords, avoiding the reuse of credentials across platforms, and promptly reporting any suspicious activity. While we strive to offer a secure environment, no system can be entirely foolproof. In the event of a security breach, we will notify affected users and work diligently to resolve the issue. For questions or to report security concerns, please contact our dedicated security team at kdelyuki@uwo.ca.</Text>
                </Container>
                <Center>
                    <Button width={"xs"} onClick={()=>navigate("/userpolicy")}>Back</Button>
                </Center>
            </Container>     
        </AbsoluteCenter>
    );
}

export default SecurityPolicyPage;