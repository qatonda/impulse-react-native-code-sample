import React from 'react';
import { QueryClientProvider, QueryClient, QueryCache } from 'react-query';
import { StoreProvider } from 'easy-peasy';
import GlobalStore from '../../src/store';

const queryClient = new QueryClient({
  queryCache: new QueryCache(),
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 60,
    },
  },
});

export default function Providers(props: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <StoreProvider store={GlobalStore}>
        {props.children}
      </StoreProvider>
    </QueryClientProvider>
  );
}
