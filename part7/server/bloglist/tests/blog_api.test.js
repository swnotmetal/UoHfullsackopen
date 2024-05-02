const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./blogtest.helper')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const app = require('../app')
const Blog = require('../models/bloglist')
const jwt = require('jsonwebtoken')


const api = supertest(app)
let userToken
beforeEach(async () => {
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('beetfarmingbest', 10)
  const user = new User ({ username: 'Dschur', passwordHash })
  await user.save ()

  userToken = jwt.sign({ id: user.id }, process.env.SECRET)
}, 30000)

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs.map(
    (blog) => new Blog({ ...blog })
  )

  const blogPromiseArray = blogObjects.map((blog) => blog.save())
  await Promise.all(blogPromiseArray)
}, 30000)

describe('when there is initially some blogs saved', () => {
  test('blog lists are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('verifies unique identifier id', async () => {
    const blogsAtEnd = await helper.blogsInDb()

    for (const blog of blogsAtEnd) {
      expect(blog.id).toBeDefined()
    }
  })

  test('HTTP request new blog', async () => {
    const newBlog = {
      title: 'What kind of bear is best',
      author: 'Dwight Schrute',
      url: 'www.office.com/schurtebeetfarm',
      likes: 66
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .set({ Authorization: `Bearer ${userToken}` })
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)

    const result = blogsAtEnd.map(b => b.title)
    expect(result).toContain(
      newBlog.title
    )
  })
})

describe('error-handles specific situations', () => {
  test('checks if the likes property is missing, it defaults to 0', async () => {
    const newBlog = {
      title: 'What kind of bear is best',
      author: 'Dwight Schrute',
      url: 'www.office.com/schurtebeetfarm',
    }

    const response = await api.post('/api/blogs').send(newBlog)

    expect(response.body.likes || 0).toBe(0)
  })

  test('create new blog list, handle if the title or url was missing', async () => {

    const newBlogNoTitle = {
      author: 'Dwight Schurute',
      likes: 66,
      url: 'www.office.com/schurtebeetfarm',
    }

    let response = await api
      .post('/api/blogs')
      .send(newBlogNoTitle)
      .set ('Authorization',`Bearer ${userToken}`)

    expect(response.status).toBe(400)

    const newBlogNoUrl = {
      title: 'What kind of bear is best',
      author: 'Dwight Schrute',
      likes: 66
    }

    response = await api
      .post('/api/blogs')
      .set ('Authorization',`Bearer ${userToken}`)
      .send(newBlogNoUrl)
    expect(response.status).toBe(400)
  })
})

describe('deletion of blogs', () => {
  test('succeeds with status code 204 if blog id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogstoDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogstoDelete.id}`)
      .expect(204)
      .set ('Authorization',`Bearer ${userToken}`)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
    )

    const titles = blogsAtEnd.map(b => b.title)

    expect(titles).not.toContain(blogsToDelete.title)
  }, 10000)
})

describe('the update of blogs', () => {
  test('updating the information of an individual blog post', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const blogsToView = blogsAtStart[0]

    const newBlog = {
      title: blogsAtStart[0].title,
      author: blogsAtStart[0].author,
      url: blogsAtStart[0].url,
      likes: 123
    }

    await api
      .put(`/api/blogs/${blogsToView.id}`)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

    const oriLikes = blogsAtStart.map (b => b.likes)
    const updatedLikes = blogsAtEnd.map (b => b.likes)

    expect(updatedLikes).not.toContain(oriLikes)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})





