<div className="comment-main">
<div className="comment-header">
    <h2>{ commentsData.filter((comments) => comments.video.includes(id)).length} Comments</h2>
    <button><i class="fa-solid fa-arrow-up-wide-short"></i> Filter</button>
</div>
{/* <div className="add-comment">
    <div className="user-picture">
        <img src={profilImage}  alt="mon profil"/>
    </div>
    <form onSubmit={((e)=>submit(e))}>
        <input type="text" name="comment" id="comment" value={userComment} placeholder="Add a comment" onChange={handleChangeComment} required/>
        <button>Post</button>
    </form>    
</div> */}
<CommentForm videoId={videoId} />

    
    {
        (commentsData.filter((comments) => comments.video.includes(id))).sort((a,b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
        .map((comments,index)=>{
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
                                <h4 onClick={handleReply}>Reply 2</h4>
                                <h4 onClick={onSubmitCommentLike(comments._id)}><i className="fa-solid fa-thumbs-up"></i> {(commentsLike.filter((like) => like.idComment.includes(comments._id))).length}</h4>
                                <h4 onClick={onSubmitCommentDislike(comments._id)}><i className="fa-solid  fa-thumbs-down"></i> {(commentsDislike.filter((dislike) => dislike.idComment.includes(comments._id))).length}</h4>
                            </div>
                        </div>
                        <div className="comment-reply-contain">
                                <input type="text" name="reply-comment" id="reply-comment" value={sousComment} onChange={handleChangeSousComment} placeholder="repost to this comment"/>
                                <button onClick={onSubSousComment(comments._id)}>Post</button>
                            </div>
                        {
                           
                            sousComments
                            .filter(sousComments => sousComments.id_comment.includes(comments._id)  > 0)
                            .map((sousComment, index) =>{
                                
                                return(
                                    <>
                                         <div className="reply-comment" key={index}>
                            
                           
                            <div className="comment-reply">
                                <div className="user-picture">
                                    <img src={profilImage} alt="" />
                                </div>
                                <div className="comment-reply-detail">
                                    <h4>Romain</h4>
                                    <h5>{moment(sousComment.createdAt).fromNow()}</h5>
                                    <h5>{sousComment.description}</h5>
                                    {/* <div className="comment-reply-detail-infos">
                                        <h4 onClick={onSubmitCommentLike(comments._id)}><i className="fa-solid fa-thumbs-up"></i> {(commentsLike.filter((like) => like.idComment.includes(comments._id))).length}</h4>
                                        <h4 onClick={onSubmitCommentDislike(comments._id)}><i className="fa-solid  fa-thumbs-down"></i> {(commentsDislike.filter((dislike) => dislike.idComment.includes(comments._id))).length}</h4>
                                    </div> */}
                                </div>
                            </div>   
                        </div>      
                                    </>
                                )
                                
                            })

                                                                
                        }
                        
                    </div>
                </div>
                
                </>
            )
        })
    }
    


</div>