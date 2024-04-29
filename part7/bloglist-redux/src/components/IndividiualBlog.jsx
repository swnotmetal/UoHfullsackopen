import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { castingLikes } from "../reducers/blogReducer"

const BlogIndividuals = () => {

  const dispatch = useDispatch()
    const blogs = useSelector(state => state.blogs)
    const id = useParams().id
    console.log('id is', id)
    const blog = blogs.find(b => b.id === String(id))
    console.log('the blog fetched is', blog)

    const addingLikes = async (likeObject) => {
      dispatch(castingLikes(likeObject))
    }
      
  const handleLike = (event) => {
    event.preventDefault()
    addingLikes({
      id: blog.id, 
      likes: blog.likes + 1
    })
  }

    if (!blog) return null
    return (
      <div>
        <h3>{blog.title}</h3>
        <table>
          <tbody>
            <tr>
              <th>URL</th>
              <td>{blog.url}</td>
            </tr>
            <tr>
              <th>Likes</th>
              <td>{blog.likes} <button onClick={handleLike} id="like-button">like</button></td>
            </tr>
            <tr>
              <th>Author</th>
              <td>{blog.author}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
    
    
}

export default BlogIndividuals