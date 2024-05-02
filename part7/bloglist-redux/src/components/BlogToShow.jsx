import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';


const BlogToShow = () => {
  const blogs = useSelector(state => state.blogs);

  return (
    <div>
      <h4>Title</h4>
      <Table striped>
    
        <tbody>
          {blogs.map(blog => (
            <tr key={blog.id}>
              <td>
                <Link  to={`/blogs/${blog.id}`}>
                  {blog.title}
                </Link>
              </td>
              <td>{blog.content}</td>
            </tr>
          ))}
        </tbody>
        </Table>
    </div>
  );
};

export default BlogToShow;
