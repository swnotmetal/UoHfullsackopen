const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v1: uuid } = require ('uuid')
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const Author = require('./models/authorSchema')
const Book = require('./models/bookSchema')
require('dotenv').config()
const { GraphQLError } = require('graphql');




const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })


/*let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  { 
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  { 
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]*/

/*let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },  
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'Demons',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]*/



const typeDefs = `

type Book {
    title: String!
    published: Int!
    author: Author!
    id: String!
    genres:[String!]!

}

type Author {
    name: String!
    id: String!
    born: Int
    bookCount: Int!
}

type Mutation {
  addBook (
    title: String!
    published: Int!
    author: String!
    id: String
    genres:[String!]!
  ): Book
  editAuthor (
    name: String!
    setBornTo: Int!
  ): Author
}


type Query {
    bookCount: Int 
    allBooks(author: String, genre: String): [Book!]!
    findBook(name: String!): Book
    authorCount: Int
    allAuthors: [Author!]!
    findAuthor(name: String!): Author
  }
`

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    allBooks: async (root, args) => {
      let query = {};
      if (args.author) {
        query.author = args.author;
      }
      if (args.genre) {
        query.genres = {  $elemMatch : {$in: [args.genre]} };
      }
      return await Book.find(query);
    },  //at this point the author field is still not functioning at all
    findBook: async (root, args) =>
        Book.findOne({ title: args.title}),
    authorCount: async () => Author.collection.countDocuments(),
    allAuthors: () => authors,
    findAuthor: async (root, args) =>
        Author.findOne({ name: args.name})   
  },
  Author: {
    bookCount: (author) => books.filter(b => b.author === author.name).length
  },
  Mutation : {
    addBook: async (root, args) => {
      const author = await Author.findOne({ name: args.author })
 	//this is written that the author is already in the db, otherwise the function breaks
      const book = new Book({ ...args, author: author })
      try {        
        await book.save()      
      } catch (error) {        
        throw new GraphQLError('Saving book failed', {          
          extensions: {            
            code: 'BAD_USER_INPUT',            
            invalidArgs: args,            
            error          
          }        
        })      
      }
      return book
    },

    editAuthor: (root, args) => {

      const author = authors.find(author => author.name === args.name)
      if (!author) {
        return null
      }
      const updatedAuthor = {...author, born: args.setBornTo}
      authors = authors.map (a => a.name === args.name ? updatedAuthor : a)
      return updatedAuthor
    }
  }

}


const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})




