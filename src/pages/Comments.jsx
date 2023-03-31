import "../styles/playvideo.css";
import moment from "moment";
import LikeComment from "../comments/LikeComment";
import CommentForm from "../comments/CommentForm";
import { useState } from "react";

function Comments({ comments, videoId, replies, parentId = null, channelId }) {

  const userId = sessionStorage.getItem("userId");
  const profilImage = sessionStorage.getItem("profilImage");
  const [activeComment, setActiveComment] = useState(null);
  const [activeDisplayComment, setActiveDisplayComment] = useState(null);
  const [showResponses, setShowResponses] = useState(false);
  const [showReplyFrom, setShowReplyForm] = useState(false);
  const canReply = Boolean(userId);
  console.log(comments);
  const isReplying =
    activeComment &&
    activeComment.type === "replying" &&
    activeComment.id === comments._id &&
    showReplyFrom;
    
  const canDisplay =
    activeDisplayComment &&
    activeDisplayComment.type === "displaying" &&
    activeDisplayComment.id === comments._id &&
    showResponses === true;

  const displayReplies = () => {
    setActiveDisplayComment({ id: comments._id, type: "displaying" });
    setShowResponses(!showResponses);
  };
  const displayRepliesForm = () => {
    setActiveComment({ id: comments._id, type: "replying" });
    setShowReplyForm(!showReplyFrom);
  };

  return (
    <div id={comments._id} className="comment-contain">
      
      <div className="user-picture">
        <img src={comments.userImage} alt="mon profil" />
      </div>
      <div className="comment-infos">
        <h3>{comments.userName}</h3>
        <h5>{moment(comments.createdAt).fromNow()}</h5>
        <p>{comments.description}</p>
        <div className="comment-details">
          <div className="comment-detail-infos">
            <LikeComment
              userId={userId}
              commentUserId={comments.userId}
              commentId={comments._id}
              videoId={videoId}
              channelId = {channelId}
            />
            {<h4 onClick={() => displayRepliesForm()}>Reply</h4>}
          </div>
        </div>
        {isReplying && parentId === null && (
          <CommentForm
            videoId={videoId}
            parentId={comments._id}
            commentUserId={comments.userId}
            channelId={channelId}
          />
        )}
        {isReplying && parentId !== null && (
          <CommentForm
            videoId={videoId}
            parentId={parentId}
            commentUserId={comments.userId}
            channelId={channelId}
          />
        )}

        {comments.parentId === null && (
          <div className="sous-comments">
            <button onClick={() => displayReplies()}>
              <i class="fa-solid fa-arrow-down"></i> {replies.length} Answers
            </button>
          </div>
        )}
        {replies.length > 0 && canDisplay && (
          <div className="sous-comments-contain">
            {replies.map((reply) => (
              <Comments
                comments={reply}
                replies={[]}
                key={replies.key}
                parentId={comments._id}
                activeComment={activeComment}
                setActiveComment={setActiveComment}
                videoId={videoId}
                channelId ={channelId}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Comments;
