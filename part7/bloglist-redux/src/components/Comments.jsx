import React from 'react';
import { useSelector } from 'react-redux';
import AddBlogComments from './AddComments';
import { Table } from 'react-bootstrap'

const BlogComment = ({ id }) => {
  const comments = useSelector(state => state.comments);
  console.log('comment', comments);
  console.log('id in BlogComment', id);

  return (
    <div className="container">
      <div className="row justify-content-start">
        <div className="col-lg-10 offset-lg-1">
          <h4 className="mb-4">Comments</h4>
          <Table striped>
            <tbody>
              <AddBlogComments id={id}/> 
              {comments.map((comment) => (
                <tr key={comment.id}>
                  <td>{comment.content}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
  
  
  
}

export default BlogComment;
