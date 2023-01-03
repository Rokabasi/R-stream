import { useState, useEffect } from "react";
import "../styles/playvideo.css";
import CommentForm from "./CommentForm";
import Comments from "../pages/Comments";
import { Context } from "../context/context";
import { useContext } from "react";

function Comment({ videoId, channelId }) {
  const [comments, setComments] = useState([]);
  const { socket } = useContext(Context);
  const allComments = comments
    .filter((comments) => comments.video === videoId)
    .filter((comment) => comment.parentId === null);
  const getReplies = (commentId) => {
    return comments.filter((comment) => comment.parentId === commentId);
  };

  useEffect(() => {
    socket.emit("getAllComments", {});
    socket.on("receiveAllComments", (comment) => {
      setComments(comment);
    });
    socket.on("getNewComment", (newComment) => {
      setComments((comments) => [newComment, ...comments]);
    });
  }, [socket]);

  return (
    <>
      <div className="comment-main">
        <div className="comment-header">
          <h2>{allComments.length} Comments</h2>
          <button>
            <i class="fa-solid fa-arrow-up-wide-short"></i> Filter
          </button>
        </div>
        <CommentForm videoId={videoId} parentId={null} />
        <div className="all-comments">
          {allComments?.map((comments) => (
            <Comments
              key={comments._id}
              replies={getReplies(comments._id)}
              comments={comments}
              videoId={videoId}
              channelId={channelId}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Comment;
