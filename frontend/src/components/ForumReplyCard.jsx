import React, { useState } from "react";

const ForumReplyCard = ({ onSubmit }) => {
  const [content, setContent] = useState("");
  const [attachments, setAttachments] = useState([]); // State for image attachments

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && attachments.length < 4) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAttachments([...attachments, reader.result]); // Add new image to attachments state
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageRemove = (index) => {
    const newAttachments = attachments.filter((_, i) => i !== index);
    setAttachments(newAttachments); // Remove the image at the given index
  };

  const handleSubmit = () => {
    if (!content.trim()) return;
    onSubmit({ content, attachments }); // Pass content and attachments to onSubmit
    setContent(""); // Clear input after submit
    setAttachments([]); // Clear attachments after submit
  };

  return (
    <div className="border-3 border-gray-500 rounded-xl p-6 mt-10 mb-3">
      <h3 className="text-2xl font-avant-medium font-semibold mb-2">Your Answer</h3>
      <textarea
        className="w-full border-3 border-gray-400 rounded-xl px-5 py-3 font-avant-medium min-h-[120px] resize-none text-[17px] focus:outline-none focus:ring-1 focus:ring-gray-500"
        placeholder="Write your answer here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      {/* Image Upload Section */}
      <div className="mt-4">
        <h4 className="text-2xl font-avant-medium font-semibold mb-2">Attachments:</h4>
        <div className="flex gap-4 flex-wrap">
          {attachments.map((attachment, index) => (
            <div key={index} className="relative w-45 h-35 border-3 rounded-xl overflow-hidden">
              <img
                src={attachment}
                alt={`Attachment ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => handleImageRemove(index)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"
              >
                ✕
              </button>
            </div>
          ))}
          {attachments.length < 4 && (
            <label className="w-45 h-35 border-4 border-dashed rounded-xl flex items-center justify-center cursor-pointer text-gray-500 hover:bg-gray-100">
              <span className="text-4xl font-avant-medium">+</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>
          )}
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-[18px] font-avant-medium"
      >
        Post Answer
      </button>
    </div>
  );
};

export default ForumReplyCard;