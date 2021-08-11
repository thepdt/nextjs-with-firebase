import Router from "next/router";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "utils/auth";
import Layout from "components/share/layout/Layout";
import "../styles/globals.css";
import NProgress from "nprogress"; //nprogress module
import "nprogress/nprogress.css"; //styles of nprogress

// Show progress indicator when change router
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

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
