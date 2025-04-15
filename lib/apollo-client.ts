import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client';
// @ts-expect-error — apollo-upload-client не имеет деклараций
import { createUploadLink } from 'apollo-upload-client';

const uploadLink = createUploadLink({
  uri: 'http://localhost:4000/graphql',
}) as ApolloLink;

export const client = new ApolloClient({
  link: uploadLink,
  cache: new InMemoryCache(),
});
