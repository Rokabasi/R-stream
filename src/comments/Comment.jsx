import { useState,useEffect } from 'react'
import "../styles/playvideo.css"
import moment from 'moment'
import CommentForm from './CommentForm'
import axios from 'axios'
import LikeComment from './LikeComment'
import Comments from '../pages/Comments'

function Comment({videoId}) {

    const [comments, setComments] = useState([])
    const allComments = comments.filter((comment) => 
    comment.parentId === null)
    
    const getCommentUrl = `http://localhost:9000/comments/${videoId}`

    const getComments = () => {
        fetch(getCommentUrl,{ method : 'GET'})
        .then(res => res.json())
        .then(data => {
            setComments(data)
        })                            
    }

    const getReplies = commentId =>{
        return comments.filter((comment) => comment.parentId === commentId)
    }

    console.log(getReplies);
    useEffect( () => {
        getComments()
   
    },[])
  
  return (
        <>
            <div className="comment-main">
                    <div className="comment-header">
                        <h2>{ allComments.length} Comments</h2>
                        <button><i class="fa-solid fa-arrow-up-wide-short"></i> Filter</button>
                    </div>
                    <CommentForm videoId={videoId} parentId={null} />   
                    {
                        allComments.map((comments)=>(
                            <Comments
                            key = {comments._id}
                            replies = {getReplies(comments._id)}
                            comments = { comments}
                            videoId={videoId}
                            />
                        ))
                    }
            </div>
            {/* <Comments  comments={allComments}/> */}
        </>                  
  )
}

export default Comment 