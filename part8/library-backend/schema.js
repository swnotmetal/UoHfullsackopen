
const typeDefs = `

type User {
  username: String!
  favoriteGenre: [String!]!
  id: ID!
}


type Token {
  value: String!
}

type Author {
  name: String!
  id: String!
  born: Int
  bookCount: Int!
}

type Book {
  title: String!
  published: Int!
  author: Author!
  id: String!
  genres: [String!]!
}

type Mutation {
  addBook(
    title: String!
    author: String!
    published: Int!
    genres: [String!]!
  ): Book
  editAuthor (
    name: String!
    born: Int
  ): Author
  createUser (
    username:String!
    favoriteGenre: [String!]!
  ): User
  login(
    username:String!
    password: String!
  ):Token
}


type Query {
  bookCount: Int
  allBooks(author: String, genre: String): [Book!]
  findBook(title: String!): Book
  authorCount: Int
  allAuthors: [Author!]!
  findAuthor(name: String!): Author
  me: User
}

type Subscription {
  bookAdded: Book!
}
`

module.exports=typeDefs