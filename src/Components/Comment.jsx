import { useState,useEffect } from 'react'
import "../styles/playvideo.css"
import moment from 'moment'
import CommentForm from './CommentForm'
import axios from 'axios'

function Comment({videoId}) {


    const profilImage =  (sessionStorage.getItem('profilImage'))
    const userId = sessionStorage.getItem('userId')
    const [newCommentLike, setNewCommentLike] = useState(true)
    const [newCommentDislike, setNewCommentDislike] = useState(true)
    const [commentsData, setCommentsData] = useState([])
    const [commentsLike, setCommentsLike] = useState([])
    const [commentsDislike, setCommentsDislike] = useState([]) 
    const getCommentUrl = 'http://localhost:9000/comments'
    const getCommentsLikeUrl = 'http://localhost:9000/like'
    const sendCommentLikeUrl = 'http://localhost:9000/like/add'
    const getCommentsDislikeUrl = 'http://localhost:9000/dislike'
    const sendCommentDislikeUrl = 'http://localhost:9000/dislike/add'


    const getComments = () => {
    fetch(getCommentUrl,{ method : 'GET'})
        .then(res => res.json())
        .then(data => {
                setCommentsData(data)})                        
    }

    useEffect( () => {
        getComments()
   
    },[])
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
    <div className="comment-main">
                    <div className="comment-header">
                        {/* <h2>{ commentsData.filter((comments) => comments.video.includes(id)).length} Comments</h2> */}
                        <button><i class="fa-solid fa-arrow-up-wide-short"></i> Filter</button>
                    </div> 
                    <CommentForm videoId={videoId} />
                
                        
                        {
                            (commentsData)?.map((comments,index)=>{
                                return(
                                    <>
                                    <div className="comment-contain" key={index}>
                                        <div className="user-picture">
                                            <img src={profilImage}  alt="mon profil"/>
                                        </div>
                                        <div className="comment-infos">
                                            <h3>Romain kabasi</h3>
                                            <h5>{moment(comments.createdAt).fromNow()}</h5>
                                            <p>{comments.description}</p>
                                            <div className="comment-details">
                                                <div className="comment-detail-infos">
                                                    {/* <h4 onClick={handleReply}>Reply 2</h4> */}
                                                    <h4 onClick={onSubmitCommentLike(comments._id)}><i className="fa-solid fa-thumbs-up"></i> {(commentsLike.filter((like) => like.idComment.includes(comments._id))).length}</h4>
                                                    <h4 onClick={onSubmitCommentDislike(comments._id)}><i className="fa-solid  fa-thumbs-down"></i> {(commentsDislike.filter((dislike) => dislike.idComment.includes(comments._id))).length}</h4>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    </>
                                )
                            })
                        }
                        
                

                </div>
  )
}

export default Comment 