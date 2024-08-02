import { useState } from "react";

import Comment from "./Comment";
import CommentForm from "./CommentForm";

const CommentsContainer = ({ className, logginedUserId, comments }) => {
  const [affectedComment, setAffectedComment] = useState(null);

  const addCommentHandler = (value, parent = null, replyOnUser = null) => {};

  const updateCommentHandler = (value, commentId) => {
    setAffectedComment(null);
  };

  const deleteCommentHandler = (commentId) => {};

  return (
    <div className={`${className}`}>
      <CommentForm
        btnLabel="Envoi"
        formSubmitHanlder={(value) => addCommentHandler(value)}
      />
      <div className="space-y-4 mt-8">
        {comments.map((comment) => (
          <Comment
            key={comment._id}
            comment={comment}
            logginedUserId={logginedUserId}
            affectedComment={affectedComment}
            setAffectedComment={setAffectedComment}
            addComment={addCommentHandler}
            updateComment={updateCommentHandler}
            deleteComment={deleteCommentHandler}
            replies={comment.replies}
          />
        ))}
      </div>
    </div>
  );
};

export default CommentsContainer;
