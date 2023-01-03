import { useState, useEffect } from "react";
import "../styles/playvideo.css";
import { Context } from "../context/context";
import { useContext } from "react";

function LikeComment({
  userId,
  commentId,
  like,
  dislike,
  commentUserId,
  channelId,
  videoId,
}) {
  const { socket } = useContext(Context);
  const userName = sessionStorage.getItem("userName");
  const profilImage = sessionStorage.getItem("profilImage");

  useEffect(() => {}, []);
  const onSubmitLike = () => {
    const likeData = {
      commentId: commentId,
      userId: userId,
      video: videoId,
      commentUserId: commentUserId,
      notification: "has liked your post",
      userName: userName,
      channelId: channelId,
      userImage: profilImage,
    };

    socket.emit("sendLike", { likeData });
    // socket.emit("getLike", {});
    // socket.emit("getDislike", {});
    socket.emit("getNotifications", userId);
  };

  const onSubmitDislike = () => {
    const dislikeData = {
      commentId: commentId,
      userId: userId,
      video: videoId,
      commentUserId: commentUserId,
      notification: "has disliked your post",
      userName: userName,
      userImage: profilImage,
    };
    socket.emit("sendDislike", { dislikeData });
    // socket.emit("getDislike", {});
    // socket.emit("getLike", {});
    socket.emit("getNotifications", userId);
  };

  return (
    <div className="comment-detail-infos">
      <h4 onClick={onSubmitLike}>
        <i className="fa-solid fa-thumbs-up"></i>{" "}
        {like.filter((like) => like.idComment.includes(commentId)).length}
      </h4>
      <h4 onClick={onSubmitDislike}>
        <i className="fa-solid  fa-thumbs-down"></i>{" "}
        {
          dislike.filter((dislike) => dislike.idComment.includes(commentId))
            .length
        }
      </h4>
    </div>
  );
}

export default LikeComment;
