import React from "react";
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  Menu,
  MenuButton,
  Image,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Heading,
} from "@chakra-ui/react";

import NextLink from "next/link";

import { FiMenu } from "react-icons/fi";

import { Links } from "../../constants/Links";
import ThemeSwitcher from "../UI/Buttons/ThemeSwitcher";

export default function SidebarWithHeader({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" bg={useColorModeValue("white", "gray.800")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
            <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
}

const SidebarContent = ({ onClose, ...rest }) => {
  return (
    <Box
      bg={useColorModeValue("blue.100", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("orange.100", "gray.800")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      minH={0}
      h='auto'
      top={0}
      bottom={0}
      overflowY='scroll'
      __css={{
        '&::-webkit-scrollbar': {
          display: 'none'
        }
      }}
      {...rest}
    >
      <Flex h="20" alignItems="center" ml={4} justifyContent="space-between">
        <Heading textAlign='center'>Firebase</Heading>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      <Box>
        {Links.map((item) => {
          if (item.multiLinks) {
            return (
              <LinkAccordion
                icon={item.icon}
                key={item.title}
                title={item.title}
                links={item.multiLinks}
                onAccordionLinkOpen={onClose}
              />
            );
          } else {
            return (
              <NavItem key={item.title} link={item.link} icon={item.icon} onLinkOpen={onClose}>
                {item.title}
              </NavItem>
            );
          }
        })}
      </Box>
    </Box>
  );
};

const MobileNav = ({ onOpen, ...rest }) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.800")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("white", "gray.800")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />
      <HStack spacing={{ base: "0", md: "6" }}>
        <ThemeSwitcher />
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <Avatar
                  size={"sm"}
                  src={
                    "https://media-exp1.licdn.com/dms/image/C4D03AQFYTPZMjGlDxw/profile-displayphoto-shrink_200_200/0/1632154442182?e=1665619200&v=beta&t=FyC4KPf-6x6cQD_ms5qjrabHhccVVVWsLy1wH2ibiJQ"
                  }
                />
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">Iron Berny</Text>
                  <Text fontSize="xs" color="gray.600">
                    Developer
                  </Text>
                </VStack>
              </HStack>
            </MenuButton>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};

const LinkAccordion = ({ title, icon, links, onAccordionLinkOpen }) => {
  const linkBgColor = useColorModeValue('blackAlpha.400', 'gray.500')
  return (
    <Accordion allowMultiple border={"0"}>
      <AccordionItem variant={"link"} border={0} width="full">
        <AccordionButton
          width={"97%"}
          borderRadius="lg"
          ml={1}
          _hover={{
            bg: linkBgColor,
            color: "white",
          }}
        >
          <Flex width="full" align="center" role="group" cursor="pointer">
            {icon && (
              <Icon
                mr="4"
                fontSize="16"
                _groupHover={{
                  color: "white",
                }}
                as={icon}
              />
            )}
            {title}
          </Flex>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel p={0} pl={3}>
          {links.map((itemLink) => (
            <NavItem
              key={itemLink.link}
              link={itemLink.link}
              icon={itemLink.icon}
              onLinkOpen={onAccordionLinkOpen}
            >
              {itemLink.title}
            </NavItem>
          ))}
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

const NavItem = ({ icon, children, link, onLinkOpen, ...rest }) => {
  const linkBgColor = useColorModeValue('blackAlpha.400', 'gray.500')
  return (
    <NextLink href={link}>
      <Link style={{ textDecoration: "none" }} _focus={{ boxShadow: "none" }} onClick={() => onLinkOpen()}>
        <Flex
          align="center"
          p="4"
          ml="1"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          _hover={{
            bg: linkBgColor,
            color: "white",
          }}
          {...rest}
        >
          {icon && (
            <Icon
              mr="4"
              fontSize="16"
              _groupHover={{
                color: "white",
              }}
              as={icon}
            />
          )}
          {children}
        </Flex>
      </Link>
    </NextLink>
  );
};
