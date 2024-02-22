const bcrypt = require('bcrypt')
const User = require('../models/user')
const helper = require('./blogtest.helper')
const app = require('../app')
const supertest = require('supertest')
const mongoose = require('mongoose')

const api = supertest(app)
describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'Kielo',
      name: 'Kielo kissani poikka',
      password: 'bellyrubs'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Super',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/ )

    expect(result.body.error).toContain('expected `username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })

  test ('when the username or password is shorter than required', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'hi',
      name: 'li',
      password:'12',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/ )

    expect(result.body.error).toContain('User validation failed: username: Path `username` (`hi`) is shorter than the minimum allowed length (3)')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  afterAll(async () => {
    await mongoose.connection.close()
  })
})