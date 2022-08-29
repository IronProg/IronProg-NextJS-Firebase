import { ChakraProvider } from "@chakra-ui/react";
import SidebarWithHeader from "../src/components/Layout/Sidebar";

import theme from "../src/theme";

import "../src/theme/styles.css";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <SidebarWithHeader>
        <Component {...pageProps} />
      </SidebarWithHeader>
    </ChakraProvider>
  );
}

export default MyApp;
