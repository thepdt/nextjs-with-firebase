import React, { useState } from "react";
import { Box, Button, Flex, FormControl, FormLabel, Heading, Input } from "@chakra-ui/react";
import { UserSignUpInterface } from "model/User";

const SignUp = ({ handleSignUp }) => {
  const initUserData = { email: null, name: null, password: null, confirmPassword: null };
  const [userData, setUserData] = useState<UserSignUpInterface>(initUserData);
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    handleSignUp(userData);
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
              <FormLabel>Full name</FormLabel>
              <Input placeholder="Your name" name="name" onChange={onChange} />
            </FormControl>
            <FormControl mt={6} isRequired>
              <FormLabel>Email</FormLabel>
              <Input type="email" placeholder="example@gmail.com" name="email" onChange={onChange} />
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
