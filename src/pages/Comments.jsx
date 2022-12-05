import "../styles/playvideo.css"
import moment from 'moment'
import LikeComment from '../comments/LikeComment'
import CommentForm from '../comments/CommentForm'
import { useState } from "react"
import { useEffect } from "react"

function Comments({comments,videoId,replies,parentId=null}) {

    const userId = sessionStorage.getItem('userId')
    const profilImage = sessionStorage.getItem('profilImage')
    const [activeComment,setActiveComment] = useState(null)
    const [activeDisplayComment,setActiveDisplayComment] = useState(null)
    const [showResponses,setShowResponses] = useState(false)
    const canReply = Boolean(userId)
    const isReplying = activeComment && activeComment.type === "replying"  &&
    activeComment.id === comments._id 
    const canDisplay = activeDisplayComment && activeDisplayComment.type === "displaying" && 
    activeDisplayComment.id === comments._id && showResponses === true

    const displayReplies = ()=>{
        setActiveDisplayComment({id:comments._id,type:"displaying"})
        setShowResponses(!showResponses)
    }
  
  return (
            <div className="comment-contain">
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
                        {canReply && <h4 onClick={()=>setActiveComment({id:comments._id,type:"replying"})}>Reply</h4> }                                     
                    </div>
                    <div>
                        { canReply &&  <h4 onClick={()=> displayReplies()}>Responses</h4> }
                    </div>
                    { isReplying && (<CommentForm videoId={videoId} parentId={comments._id}/>)}   
                </div>
                    {
                        replies.length > 0 && canDisplay && (
                            <div className="sous-comments-contain">
                                    {
                                        replies.map((reply) => (
                                            <Comments
                                                comments = {reply}
                                                replies = {[]}
                                                key = {replies.key}
                                                parentId = {comments._id}
                                            />
                                        ))
                                    }
                            </div>
                        )
                    }
                </div>
            </div>
  )
}

export default Comments