import Head from "next/head";
import { useRef } from "react";
import nookies from "nookies";
import { Box, Input } from "@chakra-ui/react";
import DynamicText from "components/DynamicText";
import { DynamicTextRefInterface } from "@/model/Dynamic";
import { verifyIdToken } from "utils/firebaseAdmin";
import styles from "@/styles/Home.module.css";

const Home = ({ user }) => {
  const dynamicTextRef = useRef<DynamicTextRefInterface>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dynamicTextRef.current.changeValue(e.target.value);
  };

  return (
    <Box className={styles.container}>
      <Head>
        <title>Coding Test</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <DynamicText ref={dynamicTextRef} />
        <Input mt="4" onChange={onChange} borderColor="black" />
      </main>
    </Box>
  );
};

export async function getServerSideProps(context) {
  try {
    const cookies = nookies.get(context);
    const token = await verifyIdToken(cookies.token);
    if (token.email_verified)
      return {
        props: { user: token },
      };
    throw "Email is not verified!";
  } catch (err) {
    return {
      redirect: {
        destination: "/sign-in",
        permanent: false,
      },
    };
  }
}

export default Home;
