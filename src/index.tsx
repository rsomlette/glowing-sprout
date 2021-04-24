import React from "react";
import ReactDOM from "react-dom";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";

import "./index.css";
import App from "./app/App";

import * as serviceWorker from "./serviceWorker";
import { userSession } from "./helpers/auth";
// import { IS_USER_LOGGED_IN } from "./graphql/queries";

const httpLink = createHttpLink({
  uri: `http://localhost:4000/`,
  // credentials: "include",
});

const onErrorLink = onError(({ networkError }) => {
  console.log("networkError", networkError);
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = userSession.getUser();
  console.log("AUTH LINK CALLED", token);
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const cache = new InMemoryCache();

const client = new ApolloClient({
  cache,
  link: from([onErrorLink, authLink, httpLink]),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
