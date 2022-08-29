import { useEffect, useState } from "react";
import Head from "next/head";
import NextLink from 'next/link';
import axios from "axios";
import { Button, Container, Heading, Icon, VStack } from "@chakra-ui/react";
import { MdPostAdd } from "react-icons/md";
import PostsList from "../../../src/components/Posts/PostsList";

export default function EditarPage(props) {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    async function loadEntries () {
      const res = await axios.get('/api/entries');
      setEntries(res.data.entriesData);
    }
    loadEntries();
  }, [])


  return (
    <>
      <Head>
        <title>Admin</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="author" content="Iron Berny" />
        <meta name="description" content="Página Inicial de Curso em NextJS" />
        <meta name="keywords" content="nextjs, web" />
      </Head>
      <Container maxW="container.xl" p={0}>
        <VStack justifyContent={'center'}>
          <Heading>Postagens</Heading>
          <NextLink href={`/admin/post`}>
            <Button colorScheme="green" float='left'>
              <Icon as={MdPostAdd} fontSize={20} mr={1} /> Post
            </Button>
          </NextLink>
          <PostsList entries={entries} />
        </VStack>
      </Container>
    </>
  );
}