import React from "react";
import { useState } from "react";
import io from "socket.io-client";
const socket = io.connect("http://localhost:9001");

function CommentForm({ videoId, parentId, commentUserId,channelId  }) {
  const profilImage = sessionStorage.getItem("profilImage");
  const userId = sessionStorage.getItem("userId");
  const userName =  sessionStorage.getItem("userName");
  const [currentComment, setCurrentComment] = useState("");
  const isTextareaDisabled = currentComment.trim().length === 0;
  const handleChangeComment = (event) => {
    setCurrentComment(event.target.value);
  };

  const sendMessage = (e) => {
    e.preventDefault();
    const comment = {
      description: currentComment,
      video: videoId,
      userId: userId,
      parentId: parentId,
      notification: "has commented on your post",
      commentUserId: commentUserId,
      userName : userName,
      channelId : channelId
    };

    socket.emit("sendComment", comment);
    socket.emit("getAllComments", {});
    socket.emit("getNotifications", userId);
    socket.emit("getSomeNotifications", userId);
    setCurrentComment("");
  };

  return (
    <div className="add-comment">
      <div className="user-picture">
        <img src={profilImage} alt="mon profil" />
      </div>
      <form onSubmit={(e) => sendMessage(e)}>
        <input
          type="text"
          name="comment"
          id="comment"
          value={currentComment}
          placeholder="Add a comment"
          onChange={handleChangeComment}
          required
        />
        <button disabled={isTextareaDisabled}>Post</button>
      </form>
    </div>
  );
}

export default CommentForm;
