import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import SignIn from "components/auth/SignIn";
import SignUp from "components/auth/SignUp";
import nookies from "nookies";
import firebaseClient from "utils/firebaseClient";
import firebase from "firebase/app";
import "firebase/auth";
import { verifyIdToken } from "utils/firebaseAdmin";
import { UserSignInInterface, UserSignUpInterface } from "model/User";
import NProgress from "nprogress";

const Auth = () => {
  firebaseClient();
  const toast = useToast();
  const router = useRouter();
  const [userFirebase, setUserFirebase] = useState<firebase.auth.UserCredential>();
  const [isRequestVerifyEmail, setIsRequestVerifyEmail] = useState(false);
  const [requestVerifyEmailFromSignIn, setRequestVerifyEmailFromSignIn] = useState(false);
  const [signInData, setSignInData] = useState<UserSignInInterface>();
  const [signUpData, setSignUpData] = useState<UserSignUpInterface>();
  const { isOpen: isOpenVerifyEmail, onOpen: onOpenVerifyEmail, onClose: onCloseVerifyEmail } = useDisclosure();

  const handleSignIn = async (userData: UserSignInInterface) => {
    setSignInData(userData);
    const { email, password } = userData;
    try {
      NProgress.start();
      const firebaseUser = await firebase.auth().signInWithEmailAndPassword(email, password);
      if (!firebaseUser.user.emailVerified) {
        setUserFirebase(firebaseUser);
        setRequestVerifyEmailFromSignIn(true);
        onOpenVerifyEmail();
        return;
      }
      router.push("/");
    } catch (error) {
      const message = error.message;
      toast({
        title: "An error occurred.",
        description: message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } finally {
      NProgress.done();
    }
  };

  const handleSignUp = async (userData: UserSignUpInterface) => {
    setSignUpData(userData);
    const { email, name, password, confirmPassword } = userData;
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
    try {
      NProgress.start();
      const firebaseUser = await firebase.auth().createUserWithEmailAndPassword(email, password);
      await firebaseUser.user.updateProfile({ displayName: name });
      setUserFirebase(firebaseUser);
      setRequestVerifyEmailFromSignIn(false);
      onOpenVerifyEmail();
    } catch (error) {
      const message = error.message;
      toast({
        title: "An error occurred.",
        description: message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } finally {
      NProgress.done();
    }
  };

  const handleCancelVerifiEmail = async () => {
    try {
      NProgress.start();
      if (!requestVerifyEmailFromSignIn) await userFirebase.user.delete();
    } catch (error) {
    } finally {
      setIsRequestVerifyEmail(false);
      onCloseVerifyEmail();
      NProgress.done();
    }
  };

  const sendVerifyEmail = async () => {
    try {
      NProgress.start();
      await userFirebase.user.sendEmailVerification();
      setIsRequestVerifyEmail(true);
    } catch (error) {
      if (error.code == "auth/too-many-requests") setIsRequestVerifyEmail(true);
    } finally {
      NProgress.done();
    }
  };

  const handleReload = async () => {
    if (requestVerifyEmailFromSignIn) await handleSignIn(signInData);
    else await handleSignIn(signUpData);
  };

  return (
    <Box>
      <Head>
        <title>Coding Test Auth</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Flex maxW="6xl" w="75vw" height="100vh" justifyContent="center" alignItems="center" mx="auto">
          <Flex w="100%" direction={["column", "column", "row", "row"]}>
            <SignIn handleSignIn={handleSignIn} />
            <SignUp handleSignUp={handleSignUp} />
          </Flex>
        </Flex>
        {!!userFirebase && (
          <Modal
            isCentered
            size="lg"
            onClose={onCloseVerifyEmail}
            isOpen={isOpenVerifyEmail}
            scrollBehavior="inside"
            closeOnEsc={false}
            closeOnOverlayClick={false}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Welcome {userFirebase.user.displayName}</ModalHeader>
              <ModalBody>
                {isRequestVerifyEmail ? (
                  <Text>
                    An email has been sent to your account. Please verify it then sign in again to accept the app!
                  </Text>
                ) : (
                  <Text>Please verify your email to accept the app!</Text>
                )}
              </ModalBody>
              <ModalFooter>
                <Button mr="3" onClick={handleCancelVerifiEmail}>
                  Cancel
                </Button>
                {isRequestVerifyEmail ? (
                  <Button mr="3" onClick={handleReload}>
                    Sign In
                  </Button>
                ) : (
                  <Button onClick={sendVerifyEmail}>Verify Email</Button>
                )}
              </ModalFooter>
            </ModalContent>
          </Modal>
        )}
      </main>
    </Box>
  );
};

export async function getServerSideProps(context) {
  try {
    const cookies = nookies.get(context);
    const token = await verifyIdToken(cookies.token);
    const { uid, email, email_verified } = token;
    if (uid && email && email_verified) {
      context.res.writeHead(302, { Location: "/" });
      context.res.end();
    }
  } catch (err) {
  } finally {
    return { props: {} };
  }
}

export default Auth;
