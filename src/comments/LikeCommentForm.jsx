import { useState, useEffect } from "react";
import "../styles/playvideo.css";
import io from "socket.io-client";
const socket = io.connect("http://localhost:9001");

function LikeComment({ userId, commentId, like, dislike }) {
  const [likeData, setLikeData] = useState([]);
  const [dislikeData, setDislikeData] = useState([]);

  
    const onSubmitLike = ()=>{
      const likeData = {
          commentId : commentId,
          userId : userId
      }
      socket.emit("sendLike", ({likeData}));
      socket.emit("getLike", {});
      socket.emit("getDislike", {});
    }
    const onSubmitDislike = ()=>{
      const dislikeData = {
        commentId : commentId,
        userId : userId
    }
      socket.emit("sendDislike", ({dislikeData}));
      socket.emit("getDislike", {});
      socket.emit("getLike", {});
    
  }

  return (
    <div className="comment-detail-infos">
      <h4 onClick={onSubmitLike}>
        <i className="fa-solid fa-thumbs-up"></i>{" "}
        {like.filter((like) => like.idComment.includes(commentId)).length}
      </h4>
      <h4 onClick={onSubmitDislike}>
        <i className="fa-solid  fa-thumbs-down"></i>{" "}
        {dislike.filter((dislike) => dislike.idComment.includes(commentId)).length}
      </h4>
    </div>
  );
}

export default LikeComment;
