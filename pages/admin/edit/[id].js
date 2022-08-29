import { Button, Container, FormControl, FormLabel, HStack, Input, Textarea } from "@chakra-ui/react";
import { useRouter } from 'next/router';
import Head from "next/head";
import { useEffect, useState } from "react";
import axios from "axios";
import dashify from "dashify";

export default function EditarPostPage(props) {
  const router = useRouter();
  const [content, setContent] = useState({
    title: undefined,
    body: undefined
  })

  useEffect(() => {
    async function getContent() {
      const { id } = router.query;
      if (id) {
        const res = await axios.get(`/api/entry/${id}`);
        const { title, body} = res.data;
        setContent({
          title,
          body
        })
      }
    }
    getContent();
  }, [router])

  const changeHandler = (e) => {
    const { value, name } = e.target;
    setContent(prevState => ({ ...prevState, [name]: value}));
  }

  const submitHandler = async (e) => {
    const { id } = router.query;
    const { title, body } = content;
    console.log(id, title, body);
    await axios.put(`/api/entry/${id}`, {
      slug: dashify(title),
      title,
      body
    });
  }

  const deleteHandler = async () => {
    const { id } = router.query;
    await axios.delete(`/api/entry/${id}`);
    router.back();
  }
  return (
    <>
      <Head>
        <title>Editar Post Específico</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="author" content="Iron Berny" />
        <meta name="description" content="Página Inicial de Curso em NextJS" />
        <meta name="keywords" content="nextjs, web" />
      </Head>
      <Container maxW="container.xl" p={0}>
        <FormControl my={4}>
          <FormLabel>Title</FormLabel>
          <Input type='text' name='title' value={content.title} onChange={changeHandler} />
        </FormControl>
        <FormControl my={4}>
          <FormLabel>Body</FormLabel>
          <Textarea name="body" value={content.body} onChange={changeHandler} />
        </FormControl>
        <HStack justifyContent={'center'}>
          <Button type="button" colorScheme="green" onClick={submitHandler}>Enviar</Button>
          <Button type="button" colorScheme="red" onClick={deleteHandler}>Excluir</Button>
        </HStack>
      </Container>
    </>
  );
}