import { useState,useEffect } from 'react'
import "../styles/playvideo.css"
import moment from 'moment'
import CommentForm from './CommentForm'
import axios from 'axios'
import LikeComment from './LikeComment'

function Comment({videoId}) {


    const profilImage =  (sessionStorage.getItem('profilImage'))
    const userId = sessionStorage.getItem('userId')
    const [commentsData, setCommentsData] = useState([])
    const getCommentUrl = 'http://localhost:9000/comments'

    const getComments = () => {
    fetch(getCommentUrl,{ method : 'GET'})
        .then(res => res.json())
        .then(data => {
                setCommentsData(data)})                        
    }

    useEffect( () => {
        getComments()
   
    },[])
  
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
                                                    <LikeComment userId={userId} commentId={comments._id}/>
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