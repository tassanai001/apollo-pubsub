const { ApolloServer, gql, PubSub, withFilter } = require('apollo-server');
const database = require('./database');

const pubsub = new PubSub();
const POST_ADDED = 'GETBOOKS_SUB';

const typeDefs = gql`
  type Book {
    title: String
    author: String
    _id: String
  }

  type DeleteStatus  {
    status: String
  }

  type Query {
    getbooks: [Book]
  }

  type Subscription {
    getbooksSub: [Book]
  }

  type Mutation {
    createbooks(title: String, author: String): Book
    updateBook(_id: String, title: String, author: String): Book
    deleteBook(_id: String): DeleteStatus
  }
`;

const resolvers = {
  Subscription: {
    getbooksSub: {
      // Additional event labels can be passed to asyncIterator creation
      // subscribe: async () => await pubsub.asyncIterator([POST_ADDED]),
      subscribe: withFilter(
        () => pubsub.asyncIterator([POST_ADDED]),
        (payload) => {
          if (payload.getbooksSub) {
            return true
          }
          return false
        },
      )
    }
  },
  Query: {
    getbooks: async () =>  {
      const response = await database.getBooks()
      return response
    },
  },
  Mutation: {
    createbooks: async (root, args) =>  {
      const response = await database.createBook(args)
      const bookList = await database.getBooks()
      await pubsub.publish(POST_ADDED, { getbooksSub: bookList })
      return response
    },
    updateBook: async (root, args) => await database.updateBook(args),
    deleteBook: async (root, args) => await database.deleteBook(args),
  },
};


const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

