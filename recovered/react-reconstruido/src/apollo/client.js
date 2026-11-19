import { ApolloClient, InMemoryCache } from "@apollo/client";

// Confirmado en el bundle de producción (index-eb42d4ee.js, línea ~29089):
// new ApolloClient({ uri: "https://api.ceromarket.com.uy/graphql", cache: new InMemoryCache() })
const client = new ApolloClient({
  uri: import.meta.env.VITE_GRAPHQL_ENDPOINT || "https://api.ceromarket.com.uy/graphql",
  cache: new InMemoryCache(),
});

export default client;
