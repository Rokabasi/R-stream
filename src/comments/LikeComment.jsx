import { useState, useEffect } from "react";
import LikeCommentForm from "./LikeCommentForm";
import "../styles/playvideo.css";
import { Context } from "../context/context";
import { useContext } from "react";

function LikeComment({ userId, commentId, commentUserId, videoId, channelId }) {
  const [like, setLike] = useState([]);
  const [dislike, setDislike] = useState([]);
  const { socket } = useContext(Context);

  useEffect(() => {
    socket.emit("getLike", {});
    socket.on("receiveAllLike", (like) => {
      setLike(like);
    });
    socket.on("receiveNewLike", (newLike) => {
      setLike((like) => [newLike, ...like]);
      socket.emit("getDislike", {});
    });
  }, [like, socket]);

  useEffect(() => {
    socket.emit("getDislike", {});
    socket.on("receiveAllDislike", (dislike) => {
      setDislike(dislike);
    });
    socket.on("receiveNewDislike", (newDislike) => {
      setDislike((dislike) => [newDislike, ...dislike]);
      socket.emit("getLike", {});
    });
  }, [socket]);

  return (
    <>
      <LikeCommentForm
        like={like}
        dislike={dislike}
        commentId={commentId}
        userId={userId}
        commentUserId={commentUserId}
        videoId={videoId}
        channelId={channelId}
      />
    </>
  );
}

export default LikeComment;
