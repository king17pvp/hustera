import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Breadcrumb from "../components/BreadCrumb";
import ForumQuestion from "../components/ForumQuestion";
import ForumComment from "../components/ForumComment";
import ForumReplyCard from "../components/ForumReplyCard";

import { ArrowUp, ArrowDown } from "lucide-react";

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
            {thread.answers.map((answer) => (
              <div
              key={answer.answer_id}
              className={`flex gap-6 border rounded p-4 mb-6 ${
                answer.is_accepted ? "border-green-500 bg-green-50" : "border-gray-300"
              }`}
            >
              {/* Voting Section */}
              <div className="flex flex-col items-center text-gray-500">
                <ArrowUp className="cursor-pointer hover:text-orange-500" />
                <span className="font-medium text-lg">{answer.score}</span>
                <ArrowDown className="cursor-pointer hover:text-blue-500" />
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
                <div className="whitespace-pre-wrap text-gray-800 mb-2">
                  {answer.content}
                </div>
                {answer.comments.length > 0 && (
                  <ForumComment comments={answer.comments} />
                )}
              </div>
            </div>
            ))}
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