import { useState } from "react";
import axios from "axios";
import { Button, Card, Group, Input, Stack, Text, AbsoluteCenter } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { PasswordInput } from "@/components/ui/password-input";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();
  const [fields, setFields] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [formError, setFormError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    try {
      const response = await axios.post("/api/public/login", fields);
      const { token } = response.data;
      localStorage.setItem("accessToken", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      window.location.href = "/search";

    } catch (error: any) {
      if (error.response) {
        const { status, data } = error.response;
  
        if (status === 404) {
          setErrors((prev) => ({ ...prev, email: "User with this email not found" }));
        } else if (status === 401) {
          setErrors((prev) => ({
            ...prev,
            password: `${data.message}. Attempts remaining: ${data.attemptsRemaining || 0}`,
          }));
        } else if (status === 403) {
          setFormError(data.message);
        } else {
          setFormError(data.message || "An unexpected error occurred");
        }
      } else {
        setFormError("Failed to connect to the server. Please try again later.");
      }
    }
  };
  

  return (
    <AbsoluteCenter>
    <form onSubmit={handleSubmit}>
      <Card.Root colorPalette={"blue"} variant={"elevated"}>
        <Card.Header>
          <Card.Title>Log In</Card.Title>
          <Group attached> 
          <Card.Description>
            Fill in the form bellow to login or
          </Card.Description>
          <Button marginLeft={"-3"} variant="plain" onClick={() =>navigate("/register")}>Register</Button>
          </Group>
        </Card.Header>
        <Card.Body>
          <Stack gap="4" w="full">
            <Field
              label="Email"
              invalid={!!errors.email}
              errorText={errors.email}
            >
              <Input
                name="email"
                placeholder="me@example.com"
                value={fields.email}
                onChange={handleChange}
              />
            </Field>
            <Field
              label="Password"
              invalid={!!errors.password}
              errorText={errors.password}
            >
              <PasswordInput
                name="password"
                value={fields.password}
                onChange={handleChange}
              />
            </Field>
          </Stack>
          {formError && <Text color={"red"} fontSize={"xs"}>{formError}</Text>}
        </Card.Body>
        <Card.Footer justifyContent="flex-end">
          <Button type="button" variant="outline" onClick={() => navigate("/search")}>
            Cancel
          </Button>
          <Button type="submit" variant="solid">
            Sign in
          </Button>
        </Card.Footer>
      </Card.Root>
    </form>
    </AbsoluteCenter>
  );
}

export default LoginPage;
