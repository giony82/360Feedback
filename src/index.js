import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { onError } from '@apollo/link-error';
import { setContext } from '@apollo/client/link/context';
import App from './App';
import reportWebVitals from './reportWebVitals';

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_API_URL + '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token'); 

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (networkError && 'statusCode' in networkError && networkError.statusCode === 401) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  }
});

const client = new ApolloClient({
  link: errorLink.concat(authLink.concat(httpLink)),
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);

reportWebVitals();
