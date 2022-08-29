import { Button, useColorMode, useColorModeValue } from "@chakra-ui/react"
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

export default function ThemeSwitcher(props) {
  const {toggleColorMode} = useColorMode();

  return (
    <Button
      variant="themeSwitcher"
      alignSelf="stretch"
      onClick={toggleColorMode}
    >
      {useColorModeValue(<SunIcon />, <MoonIcon />)}
    </Button>
  )
}