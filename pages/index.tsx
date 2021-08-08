import Head from "next/head";
import { useRef } from "react";
import nookies from "nookies";
import firebase from "firebase/app";
import { Box, Button, Flex, Heading, Input, Text } from "@chakra-ui/react";
import DynamicText from "components/DynamicText";
import { DynamicTextRefInterface } from "@/model/Dynamic";
import { verifyIdToken } from "utils/firebaseAdmin";
import styles from "@/styles/Home.module.css";

const Home = ({ user }) => {
  const dynamicTextRef = useRef<DynamicTextRefInterface>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dynamicTextRef.current.changeValue(e.target.value);
  };

  const handleSignOut = async () => {
    await firebase
      .auth()
      .signOut()
      .then(() => {
        window.location.href = "/sign-in";
      });
  };

  return (
    <Box className={styles.container}>
      <Head>
        <title>Coding Test</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Flex pos="absolute" top="3" right="3" justify="center" alignItems="center">
          <Heading as="h1" size="md">
            Hello{" "}
            <Text as="i" color="blue.300">
              {user.email}
            </Text>
          </Heading>
          <Button ml={6} color="gray.500" variant="outline" onClick={handleSignOut}>
            Sign Out
          </Button>
        </Flex>
        <DynamicText ref={dynamicTextRef} />
        <Input onChange={onChange} borderColor="black" />
      </main>
    </Box>
  );
};

export async function getServerSideProps(context) {
  try {
    const cookies = nookies.get(context);
    const token = await verifyIdToken(cookies.token);
    return {
      props: { user: token },
    };
  } catch (err) {
    context.res.writeHead(302, { Location: "/sign-in" });
    context.res.end();
    return { props: {} };
  }
}

export default Home;