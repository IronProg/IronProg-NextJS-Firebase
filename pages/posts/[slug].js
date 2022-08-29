import { Container, Heading, Text, VStack } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import db from "../../utils/db";

export default function PostPage(props) {
  const { entry } = props;
  const router = useRouter();
  const isFallback = router.isFallback;
  return (
    <>
      <Head>
        {isFallback ? (
          <title>Carregando Postagem</title>
        ) : entry ? (
          <title>{entry.title}</title>
        ) : (
          <title>Postagem não encontrada</title>
        )}
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="author" content="Iron Berny" />
        <meta name="description" content="Página Inicial de Curso em NextJS" />
        <meta name="keywords" content="nextjs, web" />
      </Head>
      <Container maxW="container.md" py={4} px={0}>
        <VStack justifyContent={"center"}>
          {isFallback ? (
            <Heading>Carregando Postagem</Heading>
          ) : entry ? (
            <>
              <VStack w={'full'} alignItems='flex-start' justifyContent={'flex-start'}>
                <Heading>{entry.title}</Heading>
                <Text color={'gray'}>
                  {new Date(entry.created).toLocaleDateString('pt-BR', {
                    dateStyle: 'full'
                  })}
                </Text>
              </VStack>
              <Text>{entry.body}</Text>
            </>
          ) : (
            <Heading>Postagem não encontrada</Heading>
          )}
        </VStack>
      </Container>
    </>
  );
}

export const getStaticPaths = async () => {
  const entries = await db.collection("entries").get();
  const paths = entries.docs.map((entry) => ({
    params: {
      slug: entry.data().slug,
    },
  }));
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async (context) => {
  const { slug } = context.params;
  const res = await db.collection("entries").where("slug", "==", slug).get();
  const entry = res.docs.map((item) => item.data());
  if (entry.length) {
    return {
      props: {
        entry: entry[0],
      },
    };
  } else {
    return {
      props: {},
    };
  }
};
