import React from 'react'
import axios from 'axios'
import { useState,useEffect } from 'react'
import "../styles/playvideo.css"

function LikeComment({userId,commentId}) {

   
    console.log(commentId)
    const [commentsLike, setCommentsLike] = useState([])
    const [newCommentLike, setNewCommentLike] = useState(true)
    const [newCommentDislike, setNewCommentDislike] = useState(true)
    const [commentsDislike, setCommentsDislike] = useState([]) 

    const getCommentsLikeUrl = 'http://localhost:9000/like'
    const sendCommentLikeUrl = 'http://localhost:9000/like/add'
    const getCommentsDislikeUrl = 'http://localhost:9000/dislike'
    const sendCommentDislikeUrl = 'http://localhost:9000/dislike/add'

    const onSubmitCommentLike = (commentid) => ()=> {
        axios.post(sendCommentLikeUrl,{
            commentId : commentid,
            userId: userId
        })
        .then(res => { console.log(res.data)
            setNewCommentLike(!newCommentLike) })
    }

    const onSubmitCommentDislike = (commentid) => ()=> {
        axios.post(sendCommentDislikeUrl,{
            commentId : commentid,
            userId: userId
        })
        .then(res => { console.log(res.data)
            setNewCommentDislike(!newCommentDislike) })
    }

    const getCommentsLike = () => {
        fetch(getCommentsLikeUrl,{method : 'GET'})
            .then(res => res.json())
            .then(data => {
                setCommentsLike(data)})
    }
    const getCommentsDislike = () => {
        fetch(getCommentsDislikeUrl,{method : 'GET'})
            .then(res => res.json())
            .then(data => {
                setCommentsDislike(data)
            })
    }

    useEffect( () => {
        getCommentsLike()
    },[newCommentLike,newCommentDislike])

    useEffect( () => {
        getCommentsDislike()
    },[newCommentDislike,newCommentLike])

  return (
    <div className='comment-detail-infos'>
         <h4 onClick={onSubmitCommentLike(commentId)}><i className="fa-solid fa-thumbs-up"></i> {(commentsLike.filter((like) => like.idComment.includes(commentId))).length}</h4>
         <h4 onClick={onSubmitCommentDislike(commentId)}><i className="fa-solid  fa-thumbs-down"></i> {(commentsDislike.filter((dislike) => dislike.idComment.includes(commentId))).length}</h4>
    </div>
  )
}

export default LikeComment