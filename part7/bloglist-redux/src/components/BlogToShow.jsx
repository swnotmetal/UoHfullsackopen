import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const BlogToShow = () => {
  const blogs = useSelector(state => state.blogs);

  return (
    <div>

      <table>
        <thead>
          <tr>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map(blog => (
            <tr key={blog.id}>
              <td>
                <Link to={`/blogs/${blog.id}`}>
                  {blog.title}
                </Link>
              </td>
              <td>{blog.content}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BlogToShow;
