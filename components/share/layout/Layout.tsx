import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import MainHeader from "../header/MainHeader";
import classes from "./Layout.module.scss";

const Layout = (props) => {
  return (
    <Box>
      <MainHeader {...props} />
      <Box as="main">{props.children}</Box>
    </Box>
  );
};

export default Layout;
