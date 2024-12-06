import { useState } from "react";
import SignUp from "@/components/SignUp";
import VerifyRegistration from "@/components/VerifyRegistration";

function RegisterPage() {
  const [step, setStep] = useState<"signup" | "verify">("signup");
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    pin: "",
  });

  const handleSignUpSuccess = (data: { name: string; email: string; password: string; pin: string }) => {
    setUserData(data);
    setStep("verify");
  };

  return (
    <>
      {step === "signup" ? (
        <SignUp onSignUpSuccess={handleSignUpSuccess} />
      ) : (
        <VerifyRegistration pin={userData.pin} userData={userData} />
      )}
    </>
  );
}

export default RegisterPage;
