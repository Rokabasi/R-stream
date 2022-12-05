import React from 'react'
import { useState } from 'react'
import axios from 'axios'

function CommentForm ({videoId, parentId}) {
    const profilImage =  (sessionStorage.getItem('profilImage'))
    const userId = sessionStorage.getItem('userId')
    const [userComment, setUserComment] = useState("")
    const isTextareaDisabled = userComment.trim().length === 0
    const sendCommentUrl = 'http://localhost:9000/comments/add'
    const handleChangeComment = (event) =>{
        setUserComment(event.target.value)
    }
    const submit = (e)=>{
        e.preventDefault()
        if(userComment.trim()){
            axios.post(sendCommentUrl,{
                description: userComment,
                video : videoId,
                userid : userId,
                parentId : parentId
            })
            .then(res => {
                setUserComment("")
            })   
        }

    }
  return (
    <div className="add-comment">
    <div className="user-picture">
        <img src={profilImage}  alt="mon profil"/>
    </div>
    <form onSubmit={((e)=>submit(e))}>
        <input type="text" name="comment" id="comment" value={userComment} placeholder="Add a comment" onChange={handleChangeComment} required/>
        <button disabled={isTextareaDisabled}>Post</button>
    </form>    
</div>
  )
}

export default CommentForm