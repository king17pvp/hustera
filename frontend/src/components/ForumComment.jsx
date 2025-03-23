import React, { useState } from "react";
import { ArrowUp, ArrowDown, MessageCircle } from "lucide-react";

const ForumComment = ({ comments: initialComments }) => {
  const [comments, setComments] = useState(initialComments || []);
  const [replyToId, setReplyToId] = useState(null);
  const [replyText, setReplyText] = useState("");

  const handleReply = (parentId) => {
    setReplyToId(parentId);
  };

  const handleReplySubmit = () => {
    if (!replyText.trim()) return;

    const newComment = {
      comment_id: Date.now(),
      author: "You",
      content: replyText,
      score: 0,
      replyTo: replyToId
    };

    setComments([...comments, newComment]);
    setReplyText("");
    setReplyToId(null);
  };

  return (
    <div className="bg-gray-50 p-3 rounded mt-2 border">
      <h4 className="font-medium mb-2">Comments</h4>

      {comments.map((comment, idx) => (
        <CommentItem
          key={comment.comment_id}
          comment={comment}
          onReply={() => handleReply(comment.comment_id)}
        />
      ))}

      {/* 🧠 Only show the reply box at the last comment */}
      {comments.length > 0 && replyToId && (
        <div className="flex items-start gap-3 mt-4 text-sm text-gray-600">
          {/* Placeholder voting UI for consistency */}
          <div className="flex flex-col items-center text-gray-400">
            <ArrowUp size={16} />
            <ArrowDown size={16} />
          </div>

          {/* Reply Textarea */}
          <div className="flex-1">
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              className="w-full border rounded p-2 text-sm"
              placeholder="Write your reply..."
            />
            <button
              onClick={handleReplySubmit}
              className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs"
            >
              Post Reply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const CommentItem = ({ comment, onReply }) => {
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
        <ArrowDown
          className={`cursor-pointer hover:text-blue-500 ${vote === "down" ? "text-blue-500" : ""}`}
          size={16}
          onClick={handleDownvote}
        />
      </div>

      {/* Comment Content */}
      <div className="flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-gray-500 font-medium">Score: {score}</span>
          <span>
            <span className="font-semibold">{comment.author}</span>: {comment.content}
            {comment.replyTo && (
              <span className="text-xs text-gray-400 ml-2">(in reply)</span>
            )}
          </span>
        </div>

        {/* Reply Button */}
        <button
          className="flex items-center gap-1 text-xs text-blue-600 mt-1 hover:underline w-fit"
          onClick={onReply}
        >
          <MessageCircle size={14} /> Reply
        </button>
      </div>
    </div>
  );
};

export default ForumComment;
