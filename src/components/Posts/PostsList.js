import NextLink from 'next/link'
import { Heading, SimpleGrid, VStack, Text, useColorModeValue } from "@chakra-ui/react";

export default function (props) {
  const cardColor = useColorModeValue('blue.50', 'gray.900')
  const entries = props.entries;
  const link = props.linkType === "normal" ? `/posts/` : `/admin/edit/`
  return (
    <SimpleGrid w="full" px={20} columns={2} gap={5}>
      {entries
        .map((item) => {
          if (item.body != undefined) {
            return {
              ...item,
              body: item.body.split("\n"),
            };
          } else {
            return item;
          }
        })
        .map((entry) => (
          <NextLink href={props.linkType === "normal" ? `/posts/${entry.slug}` : `/admin/edit/${entry.id}`} key={entry.id} >
            <VStack w="full" cursor="pointer" border='1px' bg={cardColor} shadow='lg'>
              <Heading textAlign="center" w="full" borderBottom='1px' p={2}>
                {entry.title}
              </Heading>
              {typeof entry.body === "undefined" ? (
                <Text textAlign="center" w="full" mb={1}>
                  {entry.body}
                </Text>
              ) : (
                <>
                  {entry.body.map((item) => (
                    <Text textAlign="center" w="full" key={entry.id + item} mb={1}>{item}</Text>
                  ))}
                </>
              )}
            </VStack>
          </NextLink>
        ))}
    </SimpleGrid>
  );
}
