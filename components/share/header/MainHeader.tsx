import NextLink from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { Flex, Button, IconButton, Container, Box, Text } from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { useAuth } from "utils/auth";
import firebase from "firebase/app";

const MainHeader = () => {
  const router = useRouter();
  const { user } = useAuth() as any;
  const [display, changeDisplay] = useState("none");
  const pages = [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
  ];

  const handleSignOut = async () => {
    await firebase
      .auth()
      .signOut()
      .then(() => {
        router.push("/sign-in");
      });
  };
  return (
    <Box borderBottomColor="gray" borderBottom="1px">
      <Container maxW="container.xl">
        <Flex>
          <Flex w="100vw" align="center">
            {/* Desktop */}
            <Flex display={["none", "none", "flex", "flex"]}>
              {pages.map((page, index) => (
                <NextLink key={index} href={page.path} passHref>
                  <Button
                    as="a"
                    variant="ghost"
                    aria-label={page.name}
                    my={5}
                    w="100%"
                    mr="4"
                    color={router.asPath === page.path ? "blue" : "black"}>
                    {page.name}
                  </Button>
                </NextLink>
              ))}
            </Flex>

            {/* Mobile */}
            <IconButton
              aria-label="Open Menu"
              size="lg"
              mr={2}
              icon={<HamburgerIcon />}
              onClick={() => changeDisplay("flex")}
              display={["flex", "flex", "none", "none"]}
            />
          </Flex>

          {/* Mobile Content */}
          <Flex
            w="100vw"
            display={display}
            bgColor="gray.50"
            zIndex={20}
            h="100vh"
            pos="fixed"
            top="0"
            left="0"
            overflowY="auto"
            flexDir="column">
            <Flex justify="flex-end">
              <IconButton
                mt={2}
                mr={2}
                aria-label="Open Menu"
                size="lg"
                icon={<CloseIcon />}
                onClick={() => changeDisplay("none")}
              />
            </Flex>

            <Flex flexDir="column" align="center">
              <NextLink href="/" passHref>
                <Button as="a" variant="ghost" aria-label="Home" my={5} w="100%">
                  Home
                </Button>
              </NextLink>

              <NextLink href="/blog" passHref>
                <Button as="a" variant="ghost" aria-label="About" my={5} w="100%">
                  Blog
                </Button>
              </NextLink>
            </Flex>
          </Flex>
          {router.asPath !== "/sign-in" && (
            <Flex>
              {user ? (
                <Flex alignItems="center">
                  <Text size="sm" mr="1">
                    Welcome
                  </Text>
                  <Text color="blue.300" mr="3" fontWeight="bold">
                    {user.displayName}
                  </Text>
                  <Button variant="solid" aria-label="Auth" my={5} w="100%" color="gray" onClick={handleSignOut}>
                    Sign out
                  </Button>
                </Flex>
              ) : (
                <Button
                  variant="solid"
                  aria-label="Auth"
                  my={5}
                  w="100%"
                  color="gray"
                  onClick={() => router.push("/sign-in")}>
                  Sign in
                </Button>
              )}
            </Flex>
          )}
        </Flex>
      </Container>
    </Box>
  );
};

export default MainHeader;
