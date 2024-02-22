const blogRouter = require('express').Router()
const Blog = require('../models/bloglist')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}). populate('user')

  response.json(blogs.map( b => b.toJSON()))
})

blogRouter.post('/', async (request, response) => {
  const body = request.body

  const user = request.user

  if(!user){
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes? body.likes : 0,
    user: user._id
  })

  if(body.title === undefined || body.url === undefined){
    response.status(400).end()
  }else{
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
  }
})


blogRouter.delete('/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!decodedToken.id) {
    return response.json(401).json({ error: 'token invalid' })
  }

  const user = await User.findById(decodedToken.id)
  const blog = await Blog.findById(request.params.id)

  //console.log('blogid', blog.user.toString())
  //console.log('userid', user.id.toString())

  if (user) {
    if (blog.user.toString() === user.id.toString()) {
      await Blog.findByIdAndDelete(request.params.id)
      response.status(204).end()
    } else {
      return response
        .status(401)
        .json({ error: 'user unauthorized to delete blog' })
    }
  } else {
    return response.status(403).end()
  }
})

blogRouter.put('/:id', async (req, res, next) => {
  try {
    const body = req.body

    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes
    }

    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
    res.json(updatedBlog)
  } catch (error) {
    next(error)
  }
})
module.exports = blogRouter