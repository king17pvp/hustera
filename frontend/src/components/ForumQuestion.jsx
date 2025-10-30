import React, { useState, useEffect } from "react";
import { ArrowUp, ArrowDown } from "lucide-react";
import { useSelector } from "react-redux";
import axios from "axios";
import ReactMarkdown from "react-markdown";

const ForumQuestion = ({ thread }) => {
  const [score, setScore] = useState(thread.score);
  const [userVote, setUserVote] = useState(null); // 'upvote', 'downvote', or null
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const threadId = thread.question_id;
  console.log("Thread ID", threadId);
  useEffect(() => {
    const fetchUserVote = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/forum/${threadId}/getVote/${user?.id}`, // Adjust the URL based on your backend route
        );

        if (response.data.success) {
          // Set the user vote based on the response from the backend
          console.log("Data: ", response.data);
          setUserVote(response.data.result.vote_type); // Assuming the backend returns the vote type
        }
      } catch (error) {
        console.error("Error fetching vote data:", error);
      }
    };

    fetchUserVote();
  }, [threadId]);
  const sendVote = async (voteType) => {
    try {
      const res = await fetch(`http://localhost:5001/forum/${threadId}/vote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
          setUserVote(voteType === "upvote" ? "upvote" : "downvote");
          setScore((prev) => prev + (voteType === "upvote" ? 2 : -2));
        } else if (data.result.inserted) {
          setUserVote(voteType === "upvote" ? "upvote" : "downvote");
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

  const handleOpenImage = (base64String) => {
    const imageType = base64String.substring(
      base64String.indexOf(':') + 1,
      base64String.indexOf(';')
    ); // Extract "image/png", etc.

    // Convert base64 to a Blob
    const byteString = atob(base64String.split(',')[1]);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const intArray = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
      intArray[i] = byteString.charCodeAt(i);
    }

    const blob = new Blob([intArray], { type: imageType });
    const blobUrl = URL.createObjectURL(blob);

    // Open in a new tab
    window.open(blobUrl, "_blank");
  };

  return (
    <div className="mb-10 border-b pb-6 flex gap-6">
      {/* Voting Section */}
      <div className="flex flex-col items-center text-gray-500">
        <ArrowUp
          className={`cursor-pointer hover:text-orange-500 ${userVote === "upvote" ? "text-orange-500" : ""
            }`}
          onClick={handleUpvote}
        />
        <span className="font-avant_medium font-semibold text-2xl">{score}</span>
        <ArrowDown
          className={`cursor-pointer hover:text-blue-500 ${userVote === "downvote" ? "text-blue-500" : ""
            }`}
          onClick={handleDownvote}
        />
      </div>

      {/* Question Content */}
      <div className="flex-1">
        <h1 className="text-4xl font-avant-medium font-semibold mb-2">{thread.title}</h1>
        <div className="text-[17px] text-gray-500 mb-3">
          Asked by <span className="font-medium">{thread.author}</span> on{" "}
          {new Date(thread.created_utc).toLocaleString()}
        </div>
        <div className="mb-3 text-gray-700 text-xl whitespace-pre-wrap"><ReactMarkdown>{thread.content}</ReactMarkdown></div>

        <div className="flex flex-wrap gap-2 text-lg mb-4">
          {thread.tags.map((tag) => (
            <span
              key={tag}
              className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Attachments Section */}
        {thread.attachments && thread.attachments.length > 0 && (
          <div className="mt-4">
            <h2 className="text-2xl font-avant-medium font-semibold mb-2">Attachments:</h2>
            <div className="flex gap-4 overflow-x-auto">
              {thread.attachments.map((attachment, index) => (
                <div key={index} className="border rounded-lg overflow-hidden flex-shrink-0">
                  <a href={attachment} target="_blank" rel="noopener noreferrer">
                    <img
                      src={attachment}
                      alt={`Attachment ${index + 1}`}
                      className="w-48 h-48 object-cover hover:opacity-90 transition cursor-pointer"
                      onClick={() => handleOpenImage(attachment)}
                    />
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* {thread.comments.length > 0 && (
          <ForumComment comments={thread.comments} />
        )} */}
      </div>
    </div>
  );
};

export default ForumQuestion;
