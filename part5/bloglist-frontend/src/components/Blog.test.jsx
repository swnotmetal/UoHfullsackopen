import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('Blog tests', () => {
    test('Blog renders title and author by default', () => {
      const blog = {
        title: 'testing',
        author: 'testingus',
        url: 'testing.com/test'
      }
      
      const { container } = render(<Blog blog={blog}/>)

      const div = container.querySelector('.blog')
      screen.debug(div)
      expect(div).toHaveTextContent('testing')
      expect(div).toHaveTextContent('testingus')
      expect(div).not.toHaveTextContent('testing.com/test')
      expect(div).not.toHaveTextContent('Likes')
    })

    test('URL and like numbers are shown when the button is clicked', async () => {
      const blog = {
        title: 'testing render',
        author: 'the one who renders',
        url: 'testing.com/test',
        user: {
          name: 'tester'
        },
        likes: 0
      }
      const user = userEvent.setup()

      const { container } = render(<Blog blog={blog}/>)
      const button = screen.getByText('view')
      await user.click(button)

      expect(container).toHaveTextContent(blog.url)
      expect(container).toHaveTextContent(`Likes: ${blog.likes}`)
    })

    test('when like button is clicked twice', async () => {
      const blog = {
        title: 'testing render',
        author: 'the one who renders',
        url: 'testing.com/test',
        user: {
          name: 'tester'
        },
        likes: 0
      }
      const mockHanlder = vi.fn()

      render(<Blog blog={blog} addingLikes ={mockHanlder}/>)
      const user = userEvent.setup()
      const viewButton = screen.getByText('view')
      await user.click(viewButton)

      const likeButton = screen.getByText('like')
      await user.click(likeButton)
      await user.click(likeButton)

      expect(mockHanlder.mock.calls).toHaveLength(2)
    })
  })


