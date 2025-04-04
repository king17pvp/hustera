import React, { useState } from "react";

const ForumReplyCard = ({ onSubmit }) => {
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    if (!content.trim()) return;
    onSubmit(content);
    setContent(""); // Clear input after submit
  };

  return (
    <div className="border border-gray-500 rounded-xl p-6 mt-10 mb-3">
      <h3 className="text-2xl font-avant-medium font-semibold mb-2">Your Answer</h3>
      <textarea
        className="w-full border border-gray-400 rounded-xl px-4 py-2 min-h-[120px] resize-y text-[17px] focus:outline-none focus:ring-1 focus:ring-gray-500"
        placeholder="Write your answer here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        className="mt-3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-[18px]"
      >
        Post Answer
      </button>
    </div>
  );
};

export default ForumReplyCard;
