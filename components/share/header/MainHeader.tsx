import NextLink from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { Flex, Button, IconButton, Container, Box, Text, Menu, MenuButton, Avatar, MenuList } from "@chakra-ui/react";
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
            <Flex alignItems="center">
              <Box>
                {user && user.emailVerified ? (
                  <Menu>
                    <MenuButton as={Button} rounded={"full"} variant={"link"} cursor={"pointer"} minW={0}>
                      <Avatar
                        size={"sm"}
                        src={
                          "https://lh3.googleusercontent.com/proxy/lElB_pwFbA2xUdSqiDm6mGFjdhh914ZERuTI7sxNXwRgM2cqerkzNZG0ufPw3S90pu8aA5SMUO2i7Q4Ngdx_ty5ppcq_c0WuxCDp03rk"
                        }
                      />
                    </MenuButton>
                    <MenuList maxW="100px">
                      <Box p="2.5" mb="5">
                        <Text size="sm" mr="1">
                          Welcome
                          <Text
                            as="span"
                            color="blue.300"
                            mr="3"
                            ml="1"
                            fontWeight="bold"
                            minW="fit-content"
                            wordBreak="break-all">
                            {user.displayName}
                          </Text>
                        </Text>
                      </Box>
                      <Box borderTopColor="gray.100" borderTop="1px" px="2.5">
                        <Button variant="solid" aria-label="Auth" mt={2} w="100%" color="gray" onClick={handleSignOut}>
                          Sign out
                        </Button>
                      </Box>
                    </MenuList>
                  </Menu>
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
              </Box>
            </Flex>
          )}
        </Flex>
      </Container>
    </Box>
  );
};

export default MainHeader;
