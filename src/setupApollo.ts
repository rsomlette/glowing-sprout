import {

    ApolloClient,
    InMemoryCache,
    createHttpLink,
    from,
  } from "@apollo/client";
  import { onError } from "@apollo/client/link/error";
  import { setContext } from "@apollo/client/link/context";
  
  import { userSession } from "./helpers/auth";
  
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
  
  export const client = new ApolloClient({
    cache,
    link: from([onErrorLink, authLink, httpLink]),
  });