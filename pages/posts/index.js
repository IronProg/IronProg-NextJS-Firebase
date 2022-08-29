import { Container, Heading, Link, VStack } from "@chakra-ui/react";
import Head from "next/head";
import NextLink from 'next/link'
import { useRouter } from "next/router";
import { useEffect } from "react";
import PostsList from "../../src/components/Posts/PostsList";

import db from "../../utils/db";

export default function PostsPage(props) {
  const { entriesData } = props;
  
  
  if (entriesData.length < 0) {
    return (
      <>
        <Head>
          <title>Postagens</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <meta name="author" content="Iron Berny" />
          <meta name="description" content="Página Inicial de Curso em NextJS" />
          <meta name="keywords" content="nextjs, web" />
        </Head>
        <Container maxW="container.xl" py={4} px={0}>
        <VStack justifyContent={'center'}>
          <Heading>Nenhuma postagem foi encontrada no banco</Heading>
        </VStack>
        </Container>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Postagens</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="author" content="Iron Berny" />
        <meta name="description" content="Página Inicial de Curso em NextJS" />
        <meta name="keywords" content="nextjs, web" />
      </Head>
      <Container maxW="container.xl" py={4} px={0}>
      <VStack justifyContent={'center'}>
        <Heading>Postagens</Heading>
        <PostsList entries={entriesData} linkType="normal" />
      </VStack>
      </Container>
    </>
  );
}

export const getStaticProps = async () => {
  const entries = await db.collection('entries').orderBy('created', 'desc').get();
  const entriesData = entries.docs.map(entry => ({
    id: entry.id,
    ...entry.data()
  }));
  return {
    props: { entriesData },
    revalidate: 10
  }
}