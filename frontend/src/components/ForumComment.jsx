import React, { useState } from "react";
import { ArrowUp, ArrowDown } from "lucide-react";
import ReactMarkdown from "react-markdown";

const ForumComment = ({ comments: initialComments }) => {
  const [comments, setComments] = useState(initialComments || []);

  return (
    <div className="bg-gray-50 p-3 rounded mt-2 border">
      <h4 className="font-medium mb-2">Comments</h4>

      {comments.map((comment) => (
        <CommentItem
          key={comment.comment_id}
          comment={comment}
        />
      ))}
    </div>
  );
};

const CommentItem = ({ comment }) => {
  const [score, setScore] = useState(comment.score);
  const [vote, setVote] = useState(null);

  const handleUpvote = () => {
    if (vote === "up") {
      setVote(null);
      setScore(score - 1);
    } else if (vote === "down") {
      setVote("up");
      setScore(score + 2);
    } else {
      setVote("up");
      setScore(score + 1);
    }
  };

  const handleDownvote = () => {
    if (vote === "down") {
      setVote(null);
      setScore(score + 1);
    } else if (vote === "up") {
      setVote("down");
      setScore(score - 2);
    } else {
      setVote("down");
      setScore(score - 1);
    }
  };

  return (
    <div className="flex items-start gap-3 mb-3 text-sm text-gray-600">
      {/* Vote Controls */}
      <div className="flex flex-col items-center text-gray-400">
        <ArrowUp
          className={`cursor-pointer hover:text-orange-500 ${vote === "up" ? "text-orange-500" : ""}`}
          size={16}
          onClick={handleUpvote}
        />
        <span className="font-medium text-medium">{score}</span>
        <ArrowDown
          className={`cursor-pointer hover:text-blue-500 ${vote === "down" ? "text-blue-500" : ""}`}
          size={16}
          onClick={handleDownvote}
        />
      </div>

      {/* Comment Content */}
      <div className="flex-1">
        <div className="flex flex-wrap items-center gap-2">
          {/* <span className="text-xs text-gray-500 font-medium">{score}</span> */}
          <div className="whitespace-pre-wrap">
            <span className="font-semibold">{comment.author}</span>
            <ReactMarkdown className="prose prose-sm mt-1">
              {`\n${comment.content}`}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForumComment;
