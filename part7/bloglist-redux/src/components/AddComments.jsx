import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";
import { loadComments, addComments } from "../reducers/commentReducer";


const AddBlogComments = ({ id }) => {
    const dispatch = useDispatch()
    
    const handleComments = async(event) => {
        event.preventDefault()
        const commentContent = event.target.elements.comment.value
        event.target.elements.comment.value = ''
        console.log(id, 'check id for comments');

        dispatch(addComments(id, commentContent))
        dispatch(setNotification(`Comment '${commentContent}' added`, 2))
    }

    return (
        <div>
            <form onSubmit={handleComments}>
                <input name="comment" type="text" />
                <button type="submit">submit</button>
            </form>
        </div>
    )
}

export default AddBlogComments;
