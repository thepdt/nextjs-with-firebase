import { Box } from "@chakra-ui/react";
import MainHeader from "../header/MainHeader";

const Layout = (props) => {
  return (
    <Box>
      <MainHeader {...props} />
      <Box as="main">{props.children}</Box>
    </Box>
  );
};

export default Layout;
