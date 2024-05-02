import React from 'react';
import { useSelector } from 'react-redux';
import AddBlogComments from './AddComments';

const BlogComment = ({ id }) => {
  const comments = useSelector(state => state.comments);
  console.log('comment', comments);
  console.log('id in BlogComment', id);


  return(
    <div>
      <h3>comments</h3>
      <AddBlogComments id={id}/> 
      {comments.map((comment) => (
        <li key={comment.id}>{comment.content}</li>
      ))}
    </div>
  );
}

export default BlogComment;
