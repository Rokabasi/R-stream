import { useState, useEffect } from "react";
import "../styles/playvideo.css";
import CommentForm from "./CommentForm";
import io from "socket.io-client";
import Comments from "../pages/Comments";
const socket = io.connect("http://localhost:9000");

function Comment({ videoId }) {
  const [comments, setComments] = useState([]);
  const allComments = comments.filter((comment) => comment.parentId === null);
  const getReplies = (commentId) => {
    return comments.filter((comment) => comment.parentId === commentId);
  };
  const getAllComment = () => {
    socket.emit("getAllComments", {});
  };

  useEffect(() => {
    getAllComment();
    socket.on("receiveAllComments", (comment) => {
      setComments(comment);
    });
  }, []);

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
          {allComments.map((comments) => (
            <Comments
              key={comments._id}
              replies={getReplies(comments._id)}
              comments={comments}
              videoId={videoId}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Comment;
