'use client';

import '@ant-design/v5-patch-for-react-19';
import { ApolloProvider } from '@apollo/client';
import dynamic from 'next/dynamic';
import { client } from '../lib/apollo-client';
// Динамически импортируем AntdRegistry, отключая серверный рендеринг.
const AntdRegistry = dynamic(
  () => import('@ant-design/nextjs-registry').then(mod => mod.AntdRegistry),
  { ssr: false }
);

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body>
        <ApolloProvider client={client}>
          <AntdRegistry>{children}</AntdRegistry>
        </ApolloProvider>
      </body>
    </html>
  );
}
