import 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/client';

import './index.css';
import Routes from './Routes';
import apolloClient from './gql/client';

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>
      <Routes />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
