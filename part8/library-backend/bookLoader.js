const DataLoader = require('dataloader')
const Book = require('./models/bookSchema')

const batchFunc = async (a_Ids) => {
    const books = await Book.find({ author: { $in: a_Ids}})
    return a_Ids.map(a_Id => books.filter(book => book.author.toString() ===a_Id.toString()))
}

const bookLoader = () => new DataLoader(batchFunc)

module.exports = { bookLoader }