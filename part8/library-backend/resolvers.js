
const { GraphQLError } = require('graphql')
const jwt = require ('jsonwebtoken')
const Book = require('./models/bookSchema')
const User = require('./models/userSchema')
const Author = require('./models/authorSchema')

const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub

const resolvers = {
    Query: {
      bookCount: async () => Book.collection.countDocuments(),
      allBooks: async (root, args) => {
        if (Object.keys(args).length === 0) {
          return Book.find({})
        }
        if (args.author && args.genre) {
          const author = await Author.findOne({ name: args.author })
          return Book.find({ author: author.id, genres: { $in: [args.genre] } })
        }
        if (args.author) {
          const author = await Author.findOne({ name: args.author })
          return Book.find({ author: author.id })
        }
        if (args.genre) {
          return Book.find({ genres: { $in: [args.genre] } })
        }
      },
      
      findBook: async (root, args) => Book.findOne({ title: args.title }).populate('author'),
      authorCount: async () => Author.collection.countDocuments(),
      allAuthors: async () => Author.find({}),
      me: (root, args, context) => context.currentUser,
    },
    Author: {
      bookCount: async(root) => {
       const foundAuthor = await Author.findOne({ name: root.name })
       const foundBooks = await Book.find({ author : foundAuthor.id })
       return foundBooks.length
      }
     },
    Book: {
      author: async(root) => {
        const author = await Author.findOne({_id: root.author})
        return author
      }
    },
  
    
    Mutation : {
      addBook: async (root, args, context) => {
        const dbAuthor = await Author.findOne({ name: args.author })
        const currentUser = context.currentUser
  
        if(!currentUser) {
          throw new GraphQLError('not authenticated', {
            extensions: {
              code: 'BAD_USER_INPUT',
            }
          })
        }
        if(!dbAuthor) {
          const newAuthor = new Author({name: args.author})
          try {
            await newAuthor.save()
          } catch (error) {
            throw new GraphQLError(' saving author failed', {
              extensions: {
                code: 'BAD_USER_INPUT',
                invalidArgs: args,
                error
              }
            })
          }
        }
        const foundAuthor = await Author.findOne({name: args.author})
        const book = new Book({ ...args, author: foundAuthor })
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
        pubsub.publish('BOOK_ADDED', { bookAdded: book })
        return book
      },
  

      editAuthor: async (root, args, context) => {
        const author = await Author.findOne({name: args.name})
        const currentUser = context.currentUser
        if(!currentUser) {
          throw new GraphQLError('not authenticated', {
            extensions: {
              code: 'BAD_USER_INPUT',
            }
          })
        }
        if (!author) 
            return null
        try {
          await Author.updateOne({ _id: author._id }, { $set: { born: args.born } });
        } catch (error) {
          throw new GraphQLError('Editing author failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args,
              error
            }
          })
        }
        return Author.findOne({ _id: author._id });
      }, //updating author through id and using $set to slove updating born as null in db
      
      createUser: async (root, args) => {
        const user = new User({ ...args, favoriteGenre: args.favoriteGenre.split(',') })
        try {
          await user.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
        return user
      },
      
      login: async (root, args) => {
        const user = await User.findOne({ username: args.username })
    
        if ( !user || args.password !== 'secret' ) {
          throw new GraphQLError('wrong credentials', {
            extensions: {
              code: 'BAD_USER_INPUT'
            }
          })        
        }
    
        const userForToken = {
          username: user.username,
          id: user._id,
        }
    
        return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
      },
    },

    Subscription: {
      bookAdded: {
        subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
      }
    },
  
  }

  module.exports = resolvers