import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useParams, useLocation } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Breadcrumb from "../components/BreadCrumb";
import ForumQuestion from "../components/ForumQuestion";

import ForumReplyCard from "../components/ForumReplyCard";
import AnswerCard from "../components/AnswerCard";
import { useSelector } from "react-redux"; 
import { ArrowUp, ArrowDown, MessageCircle } from "lucide-react";

const ForumSingle = () => {
  const { threadId } = useParams();

  const [thread, setThread] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);
  const [reloadFlag, setReloadFlag] = useState(false);

  // Extract search query from URL if present (same as CourseListing)
  const searchParams = new URLSearchParams(location.search);
  useEffect(() => {
    // console.log("🎯 useEffect RUNNING...");
    const fetchThread = async () => {
      try {
        console.log("🚀 Fetching thread...");
        const res = await fetch(`http://localhost:5000/forum/${threadId}`);
        const data = await res.json();
        if (data.success) {
          setThread(data.thread);
          console.log(data);
        } else {
          console.error("Thread not found:", data.message);
        }
      } catch (error) {
        console.error("Failed to fetch thread:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchThread();
  }, [threadId, reloadFlag]);
  useEffect(() => {
    console.log("Retrieved thread", thread);
  }, [thread]);
  // return (
  //   <div>
  //     <h1>ForumSingle</h1>
  //     <p>Thread ID: {threadId}</p>
  //     <pre>{JSON.stringify(thread, null, 2)}</pre>
  //   </div>
  // );
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar currentState="Courses/" />
  
      <div className="flex-1">
        {loading || !thread ? (
          <div className="text-center py-20 text-2xl text-gray-600">
            Loading...
          </div>
        ) : (
          <>
            <Breadcrumb paths={["Homepage", "Forum", thread.title]} />
            <div className="flex-1 max-w-[1680px] mx-auto px-4 py-12">
              <ForumQuestion thread={thread} />
  
              {/* Answers */}
              <div>
                <h2 className="text-3xl font-avant-medium font-semibold mb-4">
                  {thread.answers.length} Answers
                </h2>
                {thread.answers.map((answer) => (
                  <AnswerCard key={answer.answer_id} answer={answer}threadId={threadId} />
                ))}
                <ForumReplyCard
                  onSubmit={async (content) => {
                    try {
                      const res = await fetch(`http://localhost:5000/forum/${threadId}/answers`, {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          content,
                          user_ID: user?.id, // hoặc dùng token nếu bạn có auth middleware
                        }),
                      });

                      const data = await res.json();
                      if (data.success) {
                        console.log("✅ Answer posted:", data.answer);
                        setReloadFlag(prev => !prev); // sẽ trigger lại useEffect

                      } else {
                        console.error("❌ Post failed:", data.message);
                      }
                    } catch (error) {
                      console.error("❌ Error submitting answer:", error);
                    }
                  }}
                />
              </div>
            </div>
          </>
        )}
      </div>
  
      <Footer />
    </div>
  );
};

export default ForumSingle;
