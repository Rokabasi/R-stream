import React from 'react'
import { useState } from 'react'
import io from "socket.io-client"
const socket = io.connect("http://localhost:9000")

function CommentForm ({videoId, parentId}) {
    const profilImage =  (sessionStorage.getItem('profilImage'))
    const userId = sessionStorage.getItem('userId')
    const [userComment, setUserComment] = useState("")
    const [comment,setComment] = useState ({
        description :"",
        video :"",
        userId : "",
        parentId : ""
    })
    const isTextareaDisabled = userComment.trim().length === 0
    const handleChangeComment = (event) =>{
        setUserComment(event.target.value)
    }
    

    const sendMessage = () =>{
        setComment({
            description : userComment,
            video : videoId ,
            userId : userId,
            parentId : parentId 
        })
        socket.emit("sendComment", {comment})
    }

  return (
    <div className="add-comment">
    <div className="user-picture">
        <img src={profilImage}  alt="mon profil"/>
    </div>
    <form onSubmit={sendMessage}>
        <input type="text" name="comment" id="comment" value={userComment} placeholder="Add a comment" onChange={handleChangeComment} required/>
        <button disabled={isTextareaDisabled}>Post</button>
    </form>    
</div>
  )
}

export default CommentForm