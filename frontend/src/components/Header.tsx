import {
  Box,
  Flex,
  Button,
  Image,
  Text,
  HStack,
  Stack,
  Container,
} from "@chakra-ui/react";
import { Tabs } from "@chakra-ui/react";
import { MdOutlineHome, MdOutlineExplore } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { Avatar } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";
import { Link } from "@chakra-ui/react";
import { VscLaw } from "react-icons/vsc";

interface DecodedToken {
  name: string;
  email: string;
  avatar?: string;
}

function Header() {
  const pathToTabMap: Record<string, string> = {
    "/home": "home",
    "/search": "search",
    "/publiclists": "explore",
    "/userpolicy": "policy",
  };

  const validPaths = Object.keys(pathToTabMap);
  const pageValue = localStorage.getItem("page");
  const defaultPage = validPaths.includes(pageValue || "")
    ? pathToTabMap[pageValue!]
    : null;

  const navigate = useNavigate();
  const [user, setUser] = useState<DecodedToken | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      try {
        const decodedToken = jwtDecode<DecodedToken>(token);
        setUser(decodedToken);
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("accessToken");
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setUser(null);
    window.location.href = "/search";
  };

  return (
    <Box
      width="100%"
      paddingLeft="4"
      paddingRight="4"
      paddingTop="2.5"
      paddingBottom="2.5"
      color="white"
      marginBottom="7"
    >
      <Flex justify="flex-start" gap="4">
        <Image
          src="logo.jpg"
          alt="logo"
          height="10"
          onClick={() => navigate("/search")}
          cursor="pointer"
        />
        <Container>
          <Tabs.Root
            defaultValue={defaultPage}
            variant="plain"
            onValueChange={(details) => {
              const value = details.value;
              const path = Object.keys(pathToTabMap).find(
                (key) => pathToTabMap[key] === value
              );
              if (path) {
                localStorage.setItem("page", path);
                navigate(path);
              }
            }}
          >
            <Tabs.List bg="bg.muted" rounded="l3" p="1">
              <Tabs.Trigger value="home">
                <MdOutlineHome />
                <Link unstyled href="/home">
                  Home
                </Link>
              </Tabs.Trigger>
              <Tabs.Trigger value="search">
                <FaSearch />
                <Link unstyled href="/search">
                  Search
                </Link>
              </Tabs.Trigger>
              <Tabs.Trigger value="explore">
                <MdOutlineExplore />
                <Link unstyled href="/publiclists">
                  Explore
                </Link>
              </Tabs.Trigger>
              <Tabs.Trigger value="policy">
                <VscLaw />
                <Link unstyled href="/userpolicy">
                  Policy
                </Link>
              </Tabs.Trigger>
              <Tabs.Indicator rounded="l2" />
            </Tabs.List>
          </Tabs.Root>
        </Container>
        <Flex gap="4" align="center">
          {user ? (
            <HStack
              gap="4"
              background={"white"}
              padding={"3"}
              borderRadius={"xl"}
            >
              <Avatar
                name={user.name}
                size="lg"
                src={user.avatar}
                colorPalette={"blue"}
              />
              <Stack gap="0">
                <Text color={"blue.500"} fontWeight="medium">
                  {user.name}{" "}
                </Text>
                <Text color={"blue.400"} textStyle="sm">
                  {user.email}
                </Text>
              </Stack>
              <Button
                variant="outline"
                onClick={handleLogout}
                colorPalette={"blue"}
              >
                Logout
              </Button>
            </HStack>
          ) : (
            <>
              <Button
                width={"10vh"}
                colorPalette="blue"
                onClick={() => navigate("/login")}
              >
                Sign In
              </Button>
              <Button
                width={"10vh"}
                color="blue.500"
                bgColor="white"
                onClick={() => navigate("/register")}
              >
                Sign Up
              </Button>
            </>
          )}
        </Flex>
      </Flex>
    </Box>
  );
}

export default Header;
