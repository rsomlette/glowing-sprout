const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");
const logger = require("pino")();
const env = require("./config/env");

const typeDefs = require("./graphql/schema");
const resolvers = require("./graphql/resolvers");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  logger,
});

mongoose
  .connect(env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => logger.info("📚  Connected to the database"))
  .catch((err) => logger.error("💥  ", err));

mongoose.connection.once("open", () =>
  logger.info("🔮  Connected to a MongoDB instance")
);

mongoose.connection.on("error", (error) => logger.error(error));

server.listen().then(({ url }) => logger.info(`🚀  Server ready at ${url}`));
