import { Button, FormControl, FormLabel, Heading, HStack, Input, Textarea, useColorModeValue } from "@chakra-ui/react";
import { useState } from "react";
export default function PostsForm(props) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [message, setMessage] = useState("");

  const submitHandler = (event) => {
    event.preventDefault();

    const post = {
      title,
      body
    }

    console.log(post);
    props.onFormComplete(post);
  }

  return (
    <form onSubmit={submitHandler}>
      <FormControl my={4}>
          <FormLabel>Título</FormLabel>
          <Input type='text' name='title' value={title} onChange={(evt) => setTitle(evt.target.value)} />
        </FormControl>
        <FormControl my={4} rounded='lg'>
          <FormLabel>Corpo</FormLabel>
          <Textarea textAlign='center' bg={useColorModeValue("blue.100", 'gray.700')} value={body} onChange={(evt) => setBody(evt.target.value)}/>
        </FormControl>
        <HStack justifyContent={'center'}>
          <Button type="submit" colorScheme="green">Enviar</Button>
        </HStack>
        {message && (
          <HStack justifyContent={'center'}>
            <Heading>{message}</Heading>
          </HStack>
        )}
    </form>
  )
}