import { useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"

const UserIndividuals = () => {

    const users = useSelector(state => state.users)
    const id = useParams().id 
    console.log('id is' ,id);
    const user = users.find(u => u.id === String(id))
    console.log('the user is...', user);

    if (!user) return null

    return (
      <div>
        <h2>{user.username}</h2>
        <h3>added blogs</h3>
        <ul>
            {user.blogs.map(blog =>
            <li key={blog.id}>
                {blog.title}
            </li>)}
        </ul>
      </div>
    )
  }

export default UserIndividuals