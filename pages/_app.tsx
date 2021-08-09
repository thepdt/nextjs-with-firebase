import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "utils/auth";
import Layout from "components/share/layout/Layout";

import "../styles/globals.css";

const MyApp = ({ Component, pageProps }) => {
  return (
    <ChakraProvider>
      <AuthProvider>
        <Layout>
          <Component {...pageProps} />;
        </Layout>
      </AuthProvider>
    </ChakraProvider>
  );
};

export default MyApp;
