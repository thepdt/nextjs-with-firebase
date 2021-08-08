import Head from "next/head";
import { Box, Flex } from "@chakra-ui/react";
import SignIn from "components/auth/SignIn";
import SignUp from "components/auth/SignUp";
import nookies from "nookies";
import { verifyIdToken } from "utils/firebaseAdmin";

const Auth = () => {
  return (
    <Box>
      <Head>
        <title>Coding Test Auth</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Flex maxW="6xl" w="75vw" height="100vh" justifyContent="center" alignItems="center" mx="auto">
          <Flex w="100%" direction={["column", "column", "row", "row"]}>
            <SignIn />
            <SignUp />
          </Flex>
        </Flex>
      </main>
    </Box>
  );
};

export async function getServerSideProps(context) {
  try {
    const cookies = nookies.get(context);
    const token = await verifyIdToken(cookies.token);
    const { uid, email } = token;
    if (uid && email) {
      context.res.writeHead(302, { Location: "/" });
      context.res.end();
    }
  } catch (err) {
  } finally {
    return { props: {} };
  }
}

export default Auth;
