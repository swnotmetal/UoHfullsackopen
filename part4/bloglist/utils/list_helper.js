const _= require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const likeSum = blogs.reduce((sum, blog) => {
    console.log(`Processing blog: ${blog.title}`)
    console.log(`Current sum: ${sum}`)
    console.log(`Adding likes: ${blog.likes}`)
    console.log('-----------------------------')
    return sum +  blog.likes
  }, 0)
  return likeSum
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }
  const mostliked = blogs.reduce((fav, blog) => {
    return  fav.likes > blog.likes
      ? { title: fav.title, author: fav.author, likes: fav.likes }
      : { title: blog.title, author: blog.author, likes: blog.likes }
  },0)
  return mostliked
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0)
    return null
  const blogCounts = _.countBy(blogs, 'author')
  const mostBlogged = _.maxBy(Object.keys(blogCounts), author => blogCounts[author])
  return {
    author: mostBlogged,
    blogs: blogCounts[mostBlogged]
  }
}
const mostLikes = (blogs) => {
  if (blogs.length === 0)
    return null

  const blogGroups = _.groupBy(blogs, 'author')
  const sortedAuthor = _.map(blogGroups, (array) => {
    console.log(array)
    return {
      author: array[0].author,
      likes: _.sumBy(array, 'likes')
    }

  })
  console.log(sortedAuthor)
  const maxLikesAuthor = _.maxBy(sortedAuthor, (x) => x.likes)
  const authorName_is = _.head(_.values(maxLikesAuthor))

  return {
    author: authorName_is,
    likes:  maxLikesAuthor.likes
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes

}
