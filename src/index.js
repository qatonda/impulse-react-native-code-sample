import React from 'react';
import ReactDOM from 'react-dom';
import { AppRegistry, Platform } from 'react-native';
import { QueryClient, QueryClientProvider, QueryCache } from 'react-query';
import toast from 'react-hot-toast';
import { StoreProvider } from 'easy-peasy';
import App from './App';
import GlobalStore from './store';

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => toast.error(`Something went wrong: ${error}`),
  }),
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 60,
    },
  },
});

AppRegistry.registerComponent('App', () => App);

if (Platform.OS === 'web') {
  ReactDOM.render(
    <React.StrictMode>
      <StoreProvider store={GlobalStore}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </StoreProvider>
    </React.StrictMode>,
    document.getElementById('root'));
}


