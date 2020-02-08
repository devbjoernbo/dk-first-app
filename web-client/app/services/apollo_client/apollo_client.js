import ApolloClient from "apollo-boost";

export default new ApolloClient({
  uri: "http://localhost/api",
  credentials: "include"
});
