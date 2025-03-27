import React, { useState } from "react";
import ReactMarkdown from "react-markdown";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Breadcrumb from "../components/BreadCrumb";
import ForumQuestion from "../components/ForumQuestion";
import ForumComment from "../components/ForumComment";
import ForumReplyCard from "../components/ForumReplyCard";

import { ArrowUp, ArrowDown, MessageCircle } from "lucide-react";

const ForumSingle = ({ thread }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar currentState="Courses/" />

      <div className="flex-1">
        <Breadcrumb paths={["Homepage", "Forum", thread.title]} />
        <div className="flex-1 max-w-[1280px] mx-auto px-4 py-12">
          <ForumQuestion thread={thread} />

          {/* Answers */}
          <div>
            <h2 className="text-xl font-semibold mb-4">
              {thread.answers.length} Answers
            </h2>
            {thread.answers.map((answer) => {
              const [score, setScore] = useState(answer.score);
              const [userVote, setUserVote] = useState(null);
              const [showReply, setShowReply] = useState(false);
              const [comments, setComments] = useState(answer.comments || []);

              const handleUpvote = () => {
                if (userVote === "up") {
                  setScore(score - 1);
                  setUserVote(null);
                } else if (userVote === "down") {
                  setScore(score + 2);
                  setUserVote("up");
                } else {
                  setScore(score + 1);
                  setUserVote("up");
                }
              };

              const handleDownvote = () => {
                if (userVote === "down") {
                  setScore(score + 1);
                  setUserVote(null);
                } else if (userVote === "up") {
                  setScore(score - 2);
                  setUserVote("down");
                } else {
                  setScore(score - 1);
                  setUserVote("down");
                }
              };

              const handleAddComment = (newComment) => {
                const updatedComments = [
                  ...comments,
                  {
                    author: "CurrentUser", // Replace with actual user
                    content: newComment,
                    created_utc: new Date().toISOString(),
                  },
                ];
                setComments(updatedComments);
                setShowReply(false);
              
                // Simulate backend interaction
                console.log("Reply has been posted:", newComment);
              };
              

              return (
                <div
                  key={answer.answer_id}
                  className={`flex gap-6 border rounded p-4 mb-6 ${
                    answer.is_accepted
                      ? "border-green-500 bg-green-50"
                      : "border-gray-300"
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
                    <span className="font-medium text-lg">{score}</span>
                    <ArrowDown
                      className={`cursor-pointer hover:text-blue-500 ${
                        userVote === "down" ? "text-blue-500" : ""
                      }`}
                      onClick={handleDownvote}
                    />
                  </div>

                  {/* Answer Content */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-700">
                        Answered by <strong>{answer.author}</strong> on{" "}
                        {new Date(answer.created_utc).toLocaleString()}
                      </span>
                      {answer.is_accepted && (
                        <span className="text-green-700 text-sm font-semibold">
                          ✔ Accepted
                        </span>
                      )}
                    </div>
                    <div className="prose max-w-none text-gray-800 mb-2">
                      <ReactMarkdown>{answer.content}</ReactMarkdown>
                    </div>
                    {/* Comments */}
                    {comments.length > 0 && <ForumComment comments={comments} />}

                    {/* Reply Toggle */}
                    <div
                      className="flex items-center text-sm text-gray-600 cursor-pointer hover:text-gray-900 mt-2"
                      onClick={() => setShowReply(!showReply)}
                    >
                      <MessageCircle className="w-4 h-4 mr-1" /> Reply
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
            })}
            <ForumReplyCard
              onSubmit={(content) => {
                console.log("New answer submitted:", content);
                // You can later integrate API call here
              }}
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ForumSingle;
