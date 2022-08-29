import {
  extendTheme,
  theme as base,
  withDefaultColorScheme,
  withDefaultVariant,
} from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const inputSelectStyles = {
  variants: {
    filled: (props) => ({
      field: {
        backgroundColor: mode("blue.100", "gray.700")(props),
        _hover: {
          backgroundColor: mode("blue.200", "gray.600")(props),
        },
        _focus: {
          backgroundColor: mode("blue.200", "gray.600")(props),
          borderColor: mode("blue.300", "gray.500")(props),
        },
      },
    }),
  },
  sizes: {
    md: {
      field: {
        borderRadius: "lg",
      },
    },
  },
};

const brandRing = {
  _focus: {
    ring: 2,
    ringColor: "blue.700",
  },
};

const theme = extendTheme(
  {
    colors: {
      brand: {
        50: "#f9f4e7",
        100: "#e4ddcc",
        200: "#d0c6af",
        300: "#bdaf90",
        400: "#a99872",
        500: "#8f7f58",
        600: "#706343",
        700: "#50462f",
        800: "#312a1a",
        900: "#130e00",
      },
    },
    fonts: {
      heading: `Montserrat, ${base.fonts?.heading}`,
      body: `Inter, ${base.fonts?.body}`,
    },
    components: {
      Accordion: {
        variants: {
          link: (props) => ({
            border: 0,
          }),
        },
      },
      Button: {
        variants: {
          primary: (props) => ({
            rounded: "xl",
            ...brandRing,
            color: mode("white", "gray.800")(props),
            backgroundColor: mode("blue.500", "blue.300")(props),
            _hover: {
              backgroundColor: mode("brand.600", "blue.400")(props),
            },
            _active: {
              backgroundColor: mode("brand.700", "blue.500")(props),
            },
          }),
          themeSwitcher: (props) => ({
            rounded: "3xl",
            marginY: 'auto',
            width: "20%",
            backgroundColor: mode("blue.100", "gray.900")(props),
            color: mode("gray.900", "white")(props),
            _hover: {
              backgroundColor: mode("gray.800", "blue.100")(props),
              color: mode("white", "gray.900")(props),
            },
          }),
        },
      },
      Input: { ...inputSelectStyles },
      Select: { ...inputSelectStyles },
      Textarea: { ...inputSelectStyles},
      Checkbox: {
        baseStyle: {
          control: {
            borderRadius: "none",
            ...brandRing,
          },
        },
      },
    },
  },
  withDefaultColorScheme({
    colorScheme: "blue",
    components: ["Checkbox"],
  }),
  withDefaultVariant({
    variant: "filled",
    components: ["Input", "Select"],
  })
);

export default theme;
