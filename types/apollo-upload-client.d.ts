/* eslint-disable @typescript-eslint/no-explicit-any */
declare module 'apollo-upload-client' {
  import { ApolloLink } from '@apollo/client';

  interface UploadLinkOptions {
    uri: string;
    headers?: Record<string, string>;
    credentials?: string;
    fetch?: any;
    fetchOptions?: RequestInit;
  }

  export function createUploadLink(options: UploadLinkOptions): ApolloLink;
}
