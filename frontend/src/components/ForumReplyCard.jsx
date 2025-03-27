import React, { useState } from "react";

const ForumReplyCard = ({ onSubmit }) => {
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    if (!content.trim()) return;
    onSubmit(content);
    setContent(""); // Clear input after submit
  };

  return (
    <div className="border rounded p-4 mt-10">
      <h3 className="text-lg font-semibold mb-2">Your Answer</h3>
      <textarea
        className="w-full border rounded p-2 min-h-[120px] resize-y text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Write your answer here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        className="mt-3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm"
      >
        Post Answer
      </button>
    </div>
  );
};

export default ForumReplyCard;
