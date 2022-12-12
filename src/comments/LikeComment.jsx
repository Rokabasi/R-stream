import { useState, useEffect } from "react";
import LikeCommentForm from "./LikeCommentForm"
import "../styles/playvideo.css";
import io from "socket.io-client";
const socket = io.connect("http://localhost:9001");

function LikeComment({ userId, commentId, commentUserId }) {
  const [like, setLike] = useState([]);
  const [dislike, setDislike] = useState([]);

  const getAllLike = () => {
    socket.emit("getLike", {});
  };

  const getAllDislike = () => {
    socket.emit("getDislike", {});
  };

  useEffect(() => {
    getAllLike();
    socket.on("receiveAllLike", (like) => {
      setLike(like);

    });
  }, []);

  useEffect(() => {
    getAllDislike();
    socket.on("receiveAllDislike", (dislike) => {
      setDislike(dislike);
    });
  }, []);

 

  return (
    <>
      <LikeCommentForm
        like={like}
        dislike={dislike}
        commentId ={commentId}
        userId={userId}
        commentUserId={commentUserId}
      />
    </>
  );
}

export default LikeComment;
