import { Container } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function HomePage(props) {
  const router = useRouter();
  useEffect(() => {
    router.replace('/posts');
  }, [])
  return (
    <>
      <Head>
        <title>Página Inicial</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="author" content="Iron Berny" />
        <meta name="description" content="Página Inicial de Curso em NextJS" />
        <meta name="keywords" content="nextjs, web" />
      </Head>
      <Container maxW="container.xl" p={0}>
      </Container>
    </>
  );
}