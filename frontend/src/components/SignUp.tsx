import {Button, Card, Input, Stack, AbsoluteCenter} from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PasswordInput, PasswordStrengthMeter } from "./ui/password-input";

interface SignUpProps {
  onSignUpSuccess: (data: {
    name: string;
    email: string;
    password: string;
    pin: string;
  }) => void;
}

function SignUp({ onSignUpSuccess }: SignUpProps) {
  const navigate = useNavigate();
  const [fields, setFields] = useState({ name: "", email: "", password: "" });
  const [fieldsValid, setFieldsValid] = useState({
    name: false,
    email: false,
    password: false,
  });
  const [fieldsTouched, setFieldsTouched] = useState({
    name: false,
    email: false,
    password: false,
  });
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [emailValid, setEmailValid] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email: string): boolean => {
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    setEmailValid(isValid);
    return isValid;
  };

  const validatePassword = (password: string): number => {
    let strength = 0;
    if (password.length >= 10) strength++; // +1 for length
    if (/[A-Z]/.test(password)) strength++; // +1 for uppercase
    if (/\d/.test(password)) strength++; // +1 for number
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++; // +1 for special character
    return strength;
  };

  const handleBlur = (fieldName: keyof typeof fields, value: string) => {
    setFieldsTouched((prev) => ({ ...prev, [fieldName]: true }));

    setFields((prev) => ({ ...prev, [fieldName]: value }));

    if (fieldName === "name") {
      setFieldsValid((prev) => ({
        ...prev,
        name: value.trim() !== "",
      }));
    } else if (fieldName === "email") {
      const emailIsValid = validateEmail(value);
      setFieldsValid((prev) => ({
        ...prev,
        email: emailIsValid,
      }));
    } else if (fieldName === "password") {
      const strength = validatePassword(value);
      setPasswordStrength(strength);
      setFieldsValid((prev) => ({
        ...prev,
        password: strength === 4, // Valid only if all 4 criteria are met
      }));
    }
  };

  const handlePasswordChange = (password: string) => {
    setFields((prev) => ({
      ...prev,
      password: password,
    }));
    const strength = validatePassword(password);
    setPasswordStrength(strength);
    setFieldsValid((prev) => ({
      ...prev,
      password: strength === 4, // Password is valid only if strength is 4
    }));
  };

  const handleSignUp = () => {
    // Trigger validation for all fields and mark them as touched
    setFieldsTouched({
      name: true,
      email: true,
      password: true,
    });

    setFieldsValid({
      name: fields.name.trim() !== "",
      email: validateEmail(fields.email),
      password: validatePassword(fields.password) === 4, // Ensure all 4 criteria are met
    });

    if (
      !fields.name.trim() ||
      !validateEmail(fields.email) ||
      validatePassword(fields.password) < 4
    ) {
      return;
    }

    const generatedPin = Math.floor(10000 + Math.random() * 90000).toString();
    console.log("Generated PIN:", generatedPin);

    setIsSubmitting(true);
    onSignUpSuccess({
      name: fields.name,
      email: fields.email,
      password: fields.password,
      pin: generatedPin,
    });
  };

  return (
    <AbsoluteCenter>
      <Card.Root maxW="sm" variant="elevated" colorPalette={"blue"}>
        <Card.Header>
          <Card.Title>Sign up</Card.Title>
          <Card.Description>
            Fill in the form below to create an account
          </Card.Description>
        </Card.Header>
        <Card.Body>
          <Stack gap="4" w="full">
            <Field
              label="Name"
              required={!fieldsValid.name}
              invalid={fieldsTouched.name && !fieldsValid.name}
              errorText={!fieldsValid.name ? "This field is required" : ""}
            >
              <Input
                placeholder="Name"
                value={fields.name}
                onBlur={(e) => handleBlur("name", e.target.value)}
                onChange={(e) =>
                  setFields((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
              />
            </Field>

            <Field
              label="Email"
              required={!fieldsValid.email}
              invalid={fieldsTouched.email && (!emailValid || !fieldsValid.email)}
              errorText={
                !emailValid
                  ? "Please enter a valid email"
                  : "This field is required"
              }
            >
              <Input
                placeholder="me@example.com"
                value={fields.email}
                onBlur={(e) => handleBlur("email", e.target.value)}
                onChange={(e) =>
                  setFields((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
              />
            </Field>

            <Field
              label="Password"
              required={!fieldsValid.password}
              invalid={fieldsTouched.password && !fieldsValid.password}
              errorText={
                fieldsTouched.password && passwordStrength < 4
                  ? "Use uppercase, number, and special character"
                  : "This field is required"
              }
            >
              <PasswordInput
                type="password"
                value={fields.password}
                onBlur={(e) => handleBlur("password", e.target.value)}
                onChange={(e) => handlePasswordChange(e.target.value)} // Update strength dynamically
              />
            </Field>
            <PasswordStrengthMeter value={passwordStrength} />
          </Stack>
        </Card.Body>
        <Card.Footer justifyContent="flex-end">
          <Button variant="outline" onClick={() => navigate("/search")}>
            Cancel
          </Button>
          <Button variant="solid" onClick={handleSignUp} disabled={isSubmitting}>
            Sign Up
          </Button>
        </Card.Footer>
      </Card.Root>
    </AbsoluteCenter>
  );
}

export default SignUp;