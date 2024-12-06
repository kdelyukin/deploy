import { Card, Text, AbsoluteCenter } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { PinInput } from "@/components/ui/pin-input"; // Custom PinInput component
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface VerifyRegistrationProps {
  pin: string; // Expected pin to match
  userData: { name: string; email: string; password: string }; // User data from parent
}

function VerifyRegistration({ pin, userData }: VerifyRegistrationProps) {
  const [value, setValue] = useState<string[]>(Array(5).fill("")); // Initialize with empty strings
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleValueChange = (e: any) => {
    setValue(e.value); // Update value state
  };

  const verifyPin = async () => {
    const enteredPin = value.join("");
    if (enteredPin !== pin) {
      setErrorMessage("Invalid PIN");
      return;
    }

    setIsSubmitting(true);
    try {
      await axios.post("/api/public/signUp", {
        name: userData.name,
        email: userData.email,
        password: userData.password,
      });
      navigate("/login"); // Redirect to login on successful verification
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || "An error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (value.every((v) => v !== "")) {
      verifyPin();
    }
    else {
      setErrorMessage("");
    }
  }, [value]);

  return (
    <AbsoluteCenter>
      <Card.Root height="30vh" variant="elevated" alignItems="center" colorPalette={"blue"} padding={"10"}>
        <Text
          fontWeight="medium"
          color={"blue.600"}
          padding="0 2.5vh"
          textStyle="3xl"
          marginBottom="3vh"
        >
          Enter Passcode
        </Text>
        <PinInput
          otp
          invalid={errorMessage !== ""} 
          count={5} // Number of PIN inputs
          size="2xl"
          value={value} // Pass the array state
          onValueChange={handleValueChange} // Update on value change
        />
        {errorMessage && <Text style={{ color: "red", marginTop: "10"  }}>{errorMessage}</Text>}
        {isSubmitting && <Text style={{ color: "green", marginTop: "10"  }}>Submitting...</Text>}
      </Card.Root>
    </AbsoluteCenter>
  );
}

export default VerifyRegistration;
