import React, { useState } from "react";
import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, useToast } from "@chakra-ui/react";
import firebaseClient from "utils/firebaseClient";
import firebase from "firebase/app";
import "firebase/auth";

const SignUp = () => {
  firebaseClient();
  const toast = useToast();
  const initUserData = { email: null, password: null, confirmPassword: null };
  const [userData, setUserData] = useState(initUserData);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("userData: ", userData);

    const { email, password, confirmPassword } = userData;
    if (password !== confirmPassword) {
      toast({
        title: "An error occurred.",
        description: "Passwords don't match",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(function (firebaseUser) {
        window.location.href = "/";
      })
      .catch(function (error) {
        const message = error.message;
        toast({
          title: "An error occurred.",
          description: message,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  };

  return (
    <Flex width="full" align="center" justifyContent="center">
      <Box p={5} w="full">
        <Box textAlign="center" mb="8">
          <Heading>Sign up</Heading>
        </Box>
        <Box my={4} textAlign="left">
          <form onSubmit={handleSubmit}>
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input type="email" placeholder="test@test.com" name="email" onChange={onChange} />
            </FormControl>
            <FormControl mt={6} isRequired>
              <FormLabel>Password</FormLabel>
              <Input type="password" placeholder="********" name="password" onChange={onChange} />
            </FormControl>
            <FormControl mt={6} isRequired>
              <FormLabel>Confirm Password</FormLabel>
              <Input type="password" placeholder="********" name="confirmPassword" onChange={onChange} />
            </FormControl>
            <Button width="full" mt={4} type="submit">
              Sign Up
            </Button>
          </form>
        </Box>
      </Box>
    </Flex>
  );
};

export default SignUp;
