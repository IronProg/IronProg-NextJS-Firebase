import React from "react";
import dashify from "dashify";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { Container } from "@chakra-ui/react";

import PostsForm from "../../src/components/Posts/PostsForm";

export default function PostPage(props) {
  const router = useRouter();

  const formCompleteHandler = async (content) => {
    const { title, body } = content;
    await axios.post('/api/entry', { title, slug: dashify(title), body});
    router.replace('/admin/edit');
  }
  return (
    <>
      <Head>
        <title>Postar</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="author" content="Iron Berny" />
        <meta name="description" content="Página Inicial de Curso em NextJS" />
        <meta name="keywords" content="nextjs, web" />
      </Head>
      <Container maxW="container.md" p={0}>
        <PostsForm onFormComplete={formCompleteHandler} />
      </Container>
    </>
  );
}