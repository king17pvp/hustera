import React, { useState } from "react";
import ForumComment from "./ForumComment";
import { ArrowUp, ArrowDown } from "lucide-react";

const ForumQuestion = ({ thread }) => {
  const [score, setScore] = useState(thread.score);
  const [userVote, setUserVote] = useState(null); // 'up', 'down', or null
  
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
    <div className="mb-10 border-b pb-6 flex gap-6">
      {/* Voting Section */}
      <div className="flex flex-col items-center text-gray-500">
        <ArrowUp
          className={`cursor-pointer hover:text-orange-500 ${
            userVote === "up" ? "text-orange-500" : ""
          }`}
          onClick={handleUpvote}
        />
        <span className="font-medium text-lg">{score}</span>
        <ArrowDown
          className={`cursor-pointer hover:text-blue-500 ${
            userVote === "down" ? "text-blue-500" : ""
          }`}
          onClick={handleDownvote}
        />
      </div>

      {/* Question Content */}
      <div className="flex-1">
        <h1 className="text-2xl font-semibold mb-2">{thread.title}</h1>
        <div className="text-sm text-gray-500 mb-1">
          Asked by <span className="font-medium">{thread.author}</span> on{" "}
          {new Date(thread.created_utc).toLocaleString()}
        </div>
        <div className="mb-3 text-gray-700 whitespace-pre-wrap">{thread.content}</div>
        <div className="flex flex-wrap gap-2 text-sm mb-4">
          {thread.tags.map((tag) => (
            <span
              key={tag}
              className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* {thread.comments.length > 0 && (
          <ForumComment comments={thread.comments} />
        )} */}
      </div>
    </div>
  );
};

export default ForumQuestion;
