import React, { useState } from "react";
import { ArrowUp, ArrowDown, MessageCircle } from "lucide-react";
import ReactMarkdown from "react-markdown";
import ForumComment from "./ForumComment";
import ForumReplyCard from "./ForumReplyCard";
import { useSelector } from "react-redux";

const AnswerCard = ({ answer, threadId }) => {
  const [score, setScore] = useState(answer.score);
  const [userVote, setUserVote] = useState(null); // "up" | "down" | null
  const [showReply, setShowReply] = useState(false);
  const [comments, setComments] = useState(answer.comments || []);
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  console.log(user.id);

  const sendVote = async (voteType) => {
    try {
      const res = await fetch(`http://localhost:5000/forum/${threadId}/answers/${answer.answer_id}/vote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`, // nếu có auth
        },
        body: JSON.stringify({
          vote_type: voteType,
          user_ID: user?.id,  // 👈 Gửi từ frontend
        }),
      });

      const data = await res.json();
      if (data.success) {
        if (data.result.removed) {
          setUserVote(null);
          setScore((prev) => prev + (voteType === "upvote" ? -1 : 1));
        } else if (data.result.updated) {
          setUserVote(voteType === "upvote" ? "up" : "down");
          setScore((prev) => prev + (voteType === "upvote" ? 2 : -2));
        } else if (data.result.inserted) {
          setUserVote(voteType === "upvote" ? "up" : "down");
          setScore((prev) => prev + (voteType === "upvote" ? 1 : -1));
        }
      } else {
        console.error("Vote failed:", data.message);
      }
    } catch (err) {
      console.error("API vote error:", err);
    }
  };

  const handleUpvote = () => {
    sendVote("upvote");
  };

  const handleDownvote = () => {
    sendVote("downvote");
  };

  const handleAddComment = (newComment) => {
    const updatedComments = [
      ...comments,
      {
        author: "CurrentUser",
        content: newComment,
        created_utc: new Date().toISOString(),
      },
    ];
    setComments(updatedComments);
    setShowReply(false);
  };

  return (
    <div
      className={`flex gap-6 border rounded-xl p-4 mb-6 ${
        answer.is_accepted ? "border-blue-400 bg-blue-50" : "border-gray-600"
      }`}
    >
      {/* Voting Section */}
      <div className="flex flex-col items-center text-gray-500">
        <ArrowUp
          className={`cursor-pointer hover:text-orange-500 ${
            userVote === "up" ? "text-orange-500" : ""
          }`}
          onClick={handleUpvote}
        />
        <span className="font-semibold text-2xl">{score}</span>
        <ArrowDown
          className={`cursor-pointer hover:text-blue-500 ${
            userVote === "down" ? "text-blue-500" : ""
          }`}
          onClick={handleDownvote}
        />
      </div>

      {/* Answer Content */}
      <div className="flex-1 pr-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[18px] text-gray-700">
            Answered by <strong>{answer.author}</strong> on{" "}
            {new Date(answer.created_utc).toLocaleString()}
          </span>
          {answer.is_accepted && (
            <span className="text-green-700 text-xl font-semibold mt-2">
              ✔ Accepted
            </span>
          )}
        </div>
        <div className="prose max-w-none text-gray-800 text-xl mb-2">
          <ReactMarkdown>{answer.content}</ReactMarkdown>
        </div>
        {comments.length > 0 && <ForumComment comments={comments} />}

        <div
          className="flex items-center text-xl font-semibold text-gray-600 cursor-pointer hover:text-gray-900 mt-3"
          onClick={() => setShowReply(!showReply)}
        >
          <MessageCircle className="w-5 h-5 mr-2" /> Reply
        </div>

        {showReply && (
          <ForumReplyCard
            onSubmit={(content) => {
              handleAddComment(content);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default AnswerCard;
