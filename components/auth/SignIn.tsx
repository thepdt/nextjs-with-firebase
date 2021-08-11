import React, { useState } from "react";
import { Box, Button, Flex, FormControl, FormLabel, Heading, Input } from "@chakra-ui/react";
import { UserSignInInterface } from "model/User";

const SignIn = ({ handleSignIn }) => {
  const initUserData = { email: null, password: null };
  const [userData, setUserData] = useState<UserSignInInterface>(initUserData);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    handleSignIn(userData);
  };

  return (
    <Flex width="full" justifyContent="center">
      <Box p={5} w="full">
        <Box textAlign="center" mb="8">
          <Heading>Sign in</Heading>
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
            <Button width="full" mt={4} type="submit">
              Sign In
            </Button>
          </form>
        </Box>
      </Box>
    </Flex>
  );
};

export default SignIn;
