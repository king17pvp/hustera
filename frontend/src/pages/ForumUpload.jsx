import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Breadcrumb from "../components/BreadCrumb";
import ReactMarkdown from "react-markdown";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux"; 
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Trash2 } from 'lucide-react';

const ForumUpload = () => {
  const [phase, setPhase] = useState(1);
  const [viewMode, setViewMode] = useState("Text");
  const [basicInfo, setBasicInfo] = useState({
    title: "",
    body: "",
    attachments: [],
    category: "",
    tags: "",
  });
  const { user } = useSelector((state) => state.auth);
  const predefinedTags = ["React", "JavaScript", "Tailwind", "CSS", "HTML"];
  const predefinedCategories = ["Programming", "Design", "Marketing", "Business", "Data Science"];
  const navigate = useNavigate();
  const [errors, setErrors] = useState({
    title: false,
    body: false,
    category: false,
  });

  // Function to handle image uploads
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && basicInfo.attachments.length < 4) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBasicInfo((prev) => ({
          ...prev,
          attachments: [...prev.attachments, reader.result],
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Function to remove an image from attachments
  const handleImageRemove = (index) => {
    setBasicInfo((prev) => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index),
    }));
  };

  const handleToggle = () => {
    setViewMode(viewMode === "Text" ? "Preview" : "Text");
  };

  // Function to handle tag selection/deselection
  const handleTagClick = (tag) => {
    const currentTags = basicInfo.tags.split(",").map((t) => t.trim()).filter(Boolean);
    const updatedTags = currentTags.includes(tag)
      ? currentTags.filter((t) => t !== tag)
      : [...currentTags, tag];
    setBasicInfo((prev) => ({
      ...prev,
      tags: updatedTags.join(","),
    }));
  };

  const handleValidation = () => {
    const titleValid = basicInfo.title.trim() !== "";
    const bodyValid = basicInfo.body.trim() !== "";
    const categoryValid = basicInfo.category.trim() !== "";
    setErrors({
      title: !titleValid,
      body: !bodyValid,
      category: !categoryValid, // Set error for category
    });
    return titleValid && bodyValid && categoryValid;
  };

  const handleNext = () => {
    if (handleValidation()) {
      setPhase(phase + 1);
    }
  };

  // Function to handle the "Back" button in Phase 2
  const handleBack = () => {
    setPhase(1); // Go back to Phase 1
  };

  // Function to handle the "Submit" button in Phase 2
  const handleSubmit = async () => {
    const data = {
      title: basicInfo.title,
      body: basicInfo.body,
      tags: basicInfo.tags,
      attachments: basicInfo.attachments,
      category: basicInfo.category,
    };

    try {
      // Step 2: Send the data to the backend using Axios
      const response = await axios.post("http://localhost:5000/forum/uploadForum", {
        ...data,            // hoặc title, body, tags, attachments...
        user_ID: user?.id,  // truyền kèm user_ID nếu không dùng token
      }, {
        headers: {
          "Content-Type": "application/json"
        }
      });
  
      // Step 3: Handle the response
      if (response.status === 201) {
        // Optionally, reset the form or navigate to another page after submission
        setPhase(1); // Reset to Phase 1 if needed
        setBasicInfo({
          title: "",
          body: "",
          attachments: [],
          category: "",
          tags: "",
        });
        navigate("/forum"); // Redirect to the forum page or any other page
      } else {
        // Failure
        alert("There was an error submitting the thread.");
      }
    } catch (error) {
      console.error("Error submitting thread:", error);
      alert("Failed to submit the thread. Please try again.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar currentState={null} />
      <Breadcrumb paths={["Homepage", "Forum", "Upload A Thread"]} />

      {/* Main Content Container */}
      <div className="flex-grow px-3 py-10 w-[1700px] mx-auto">
        <h1 className="text-5xl font-avant-medium font-bold mb-6">
          Start a New Thread
        </h1>

        <div className="flex gap-10">
          {/* Left Column: 4/7 – Phase Bar + Form Content */}
          <div className="w-5/7">
            {/* Phase Stepper */}
            <div className="mb-6 mt-6 relative">
              <div className="relative flex items-center justify-between mb-8 px-4">
                <div className="absolute top-8 left-0 right-0 h-1 flex z-0">
                  <div className={`flex-1 transition-colors duration-300 ${phase === 1 ? "bg-blue-600" : "bg-gray-300"}`} />
                  <div className={`flex-1 transition-colors duration-300 ${phase === 2 ? "bg-blue-600" : "bg-gray-300"}`} />
                </div>

                {[1, 2].map((step) => (
                  <div key={step} className="relative z-10 flex flex-col items-center w-1/2">
                    <div className={`w-16 h-16 flex items-center justify-center rounded-full text-white text-[23px] font-avant-medium font-bold transition-all duration-300 ${phase === step ? "bg-blue-600" : "bg-gray-300"}`}>
                      {step}
                    </div>
                    <div className="mt-2 text-[23px] font-avant-medium font-semibold text-center">
                      {step === 1 && "Thread Content"}
                      {step === 2 && "Review & Publish"}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Form Sections (Phase Based) */}
            <div className="space-y-6">
              <AnimatePresence mode="wait">
                {phase === 1 && (
                  <motion.div
                    key="phase1"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    {/* === Phase 1 === */}
                    <label className="block text-[26px] font-avant-medium font-semibold">Thread Title<span className="text-red-600">*</span></label>
                    <label className="block text-lg text-gray-700 font-avant-medium mt-[-18px] mb-1">Be specific and imagine you're asking a question to another person</label>
                    <input
                      type="text"
                      value={basicInfo.title}
                      onChange={(e) =>
                        setBasicInfo((prev) => ({ ...prev, title: e.target.value }))
                      }
                      placeholder="e.g. Is there an R function for finding the index of an element in a vector?"
                      className={`w-full border-3 font-avant-medium rounded-xl px-5 py-3 text-[19px] placeholder-gray-300 ${errors.title ? 'border-red-600' : 'border-gray-500'}`}
                    />

                    {/* Category Selection */}
                    <div className="mt-4 relative">
                      <label className="block text-[26px] font-avant-medium font-semibold">
                        Category<span className="text-red-600">*</span>
                      </label>
                      <label className="block text-lg text-gray-700 font-avant-medium mt-[-3px] mb-1">
                        Select the category that best fits your thread
                      </label>
                      <select
                        value={basicInfo.category || ""}
                        onChange={(e) =>
                          setBasicInfo((prev) => ({ ...prev, category: e.target.value }))
                        }
                        className={`appearance-none w-full border-3 font-avant-medium rounded-xl px-5 py-3 text-[19px] pr-10 ${errors.category ? "border-red-600" : "border-gray-500"}`}
                      >
                        <option value="" disabled >
                          Select a category
                        </option>
                        {predefinedCategories.map((category) => (
                          <option key={category} value={category.toLowerCase().replace(/\s/g, "-")}>
                            {category}
                          </option>
                        ))}
                      </select>
                      {/* Triangle Icon */}
                      <div className="pointer-events-none absolute right-4 top-24 transform -translate-y-1/2 text-gray-600">
                        ▼
                      </div>
                    </div>

                    <label className="block text-[26px] font-avant-medium font-semibold">Thread Body<span className="text-red-600">*</span> <span className="text-[19px]">(Plain Text / Markdown)</span></label>
                    <label className="block text-lg text-gray-700 font-avant-medium mt-[-18px] mb-1">Include all the information someone would need to answer your question</label>

                    {/* Toggle */}
                    <div className="relative flex items-center w-full justify-start mt-2">
                      <button
                        onClick={handleToggle}
                        className="relative w-[300px] h-12 bg-gray-300 rounded-full border-3 border-gray-300 cursor-pointer"
                      >
                        <motion.div
                          layout
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                          className="absolute top-0 left-0 bottom-0 w-1/2 rounded-full bg-gray-800"
                          style={{ left: viewMode === "Text" ? "0%" : "50%" }}
                        />
                        <span className={`absolute top-0 left-0 w-1/2 h-full flex items-center justify-center text-[19px] font-avant-medium font-semibold ${viewMode === "Text" ? "text-white" : "text-gray-800"}`}>
                          Edit
                        </span>
                        <span className={`absolute top-0 right-0 w-1/2 h-full flex items-center justify-center text-[19px] font-avant-medium font-semibold ${viewMode === "Preview" ? "text-white" : "text-black"}`}>
                          Preview
                        </span>
                      </button>
                    </div>

                    {viewMode === "Preview" ? (
                      <div className="w-full border-3 border-gray-500 font-avant-medium rounded-xl px-5 py-3 text-[19px] placeholder-gray-300 h-80 resize-none">
                        <ReactMarkdown>{threadBody}</ReactMarkdown>
                      </div>
                    ) : (
                      <textarea
                        value={basicInfo.body}
                        onChange={(e) =>
                          setBasicInfo((prev) => ({ ...prev, body: e.target.value }))
                        }
                        placeholder="Start writing your question or discussion..."
                        className={`w-full border-3 font-avant-medium rounded-xl mb-[11px] px-5 py-3 text-[19px] placeholder-gray-300 h-80 resize-none ${errors.body ? 'border-red-600' : 'border-gray-500'}`}
                      />
                    )}

                    {/* Attachments */}
                    <label className="block text-[26px] font-avant-medium font-semibold">Attachments</label>
                    <label className="block text-lg text-gray-700 font-avant-medium mt-[-18px] mb-1">Add up to 4 images to support your question</label>
                    <div className="mt-2 flex items-center space-x-3">
                      {basicInfo.attachments.length > 0 && (
                        <div className="flex space-x-3 overflow-x-auto">
                          {basicInfo.attachments.map((image, index) => (
                            <div key={index} className="relative">
                              <img
                                src={image}
                                alt={`attachment-${index}`}
                                className="w-[282px] h-44 border-4 border-dashed border-gray-700 p-[1px] rounded-xl object-fill"
                              />
                              <button
                                onClick={() => handleImageRemove(index)}
                                className="absolute top-0 right-0 text-white font-bold bg-red-500 rounded-full w-10 h-10 text-center text-lg cursor-pointer"
                              >
                                X
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                      {basicInfo.attachments.length < 4 && (
                        <div className="relative">
                          <button
                            onClick={() => document.getElementById('imageUpload').click()}
                            className="border-4 border-dashed border-gray-700 text-5xl text-gray-500 font-avant-medium px-31 py-15 rounded-xl flex items-center space-x-2 cursor-pointer"
                          >
                            <span>+</span>
                          </button>
                          <input
                            id="imageUpload"
                            type="file"
                            className="hidden"
                            onChange={handleImageUpload}
                            accept="image/*"
                          />
                        </div>
                      )}
                    </div>

                    {/* Tags */}
                    <div className="mt-6">
                      <label className="block mb-2 text-[23px] font-avant-medium font-semibold">Tags</label>
                      <label className="block text-lg text-gray-700 font-avant-medium mt-[-10px] mb-2">Select tags that are relevant to your thread's content</label>
                      <div className="flex flex-wrap gap-3">
                      {predefinedTags.map((tag) => (
  <button
    key={tag}
    type="button"
    onClick={() => handleTagClick(tag)}
    className={`px-4 py-2 rounded-xl font-avant-medium text-lg text-gray-600 border transition cursor-pointer ${basicInfo.tags.split(",").includes(tag)
      ? "bg-gray-800 border-gray-800 text-white"
      : "bg-white border-gray-400 hover:bg-gray-100"
      }`}
  >
    {tag}
  </button>
))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {phase === 2 && (
                  <motion.div
                    key="phase2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    {/* === Phase 2 === */}

                    <div className="mt-6 p-6 bg-white border-3 border-gray-700 rounded-2xl space-y-4">
                      <h2 className="text-3xl font-avant-medium font-semibold text-gray-900">{threadTitle}</h2>
                      {basicInfo.tags && (
                        <div className="mt-2">
                          <div className="flex gap-2 flex-wrap mt-2 items-center border-t border-gray-300 pt-3">
                            <span className="text-[22px] mr-2 font-avant-medium font-semibold">Tags:</span>
                            {basicInfo.tags.split(",").map((tag, idx) => (
                              <span
                                key={idx}
                                className="bg-gray-200 text-gray-800 px-4 py-1 rounded-xl font-avant-medium text-lg"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      <div className="prose border-t border-gray-300 py-3 text-xl font-avant-medium max-w-none">
                        <ReactMarkdown>{threadBody}</ReactMarkdown>
                      </div>

                      {attachments.length > 0 && (

                        <div className="flex flex-wrap gap-4 border-t border-gray-300 pt-4">
                          <span className="text-[24px] mr-2 font-avant-medium font-semibold">Attachments:</span>
                          {attachments.map((image, idx) => (
                            <img
                              key={idx}
                              src={image}
                              alt={`preview-${idx}`}
                              className="w-[230px] h-[180px] object-fill border rounded-xl"
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center mt-8">
                {phase === 1 && (
                  <button
                    onClick={handleNext}
                    className="text-blue-600 font-avant-medium font-semibold text-2xl flex items-center gap-1 group transition cursor-pointer"
                  >
                    Review & Publish
                    <ArrowRight className="w-7 h-7 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                )}

                {phase === 2 && (
                  <>
                    <button
                      onClick={handleBack}
                      className="text-gray-700 font-avant-medium font-semibold text-2xl flex items-center gap-1 group transition cursor-pointer"
                    >
                      <ArrowLeft className="w-7 h-7 transition-transform duration-300 group-hover:-translate-x-1" />
                      Back
                    </button>
                    <button
                      onClick={handleSubmit}
                      className="text-green-600 font-avant-medium font-semibold text-2xl flex items-center gap-1 group transition cursor-pointer"
                    >
                      Publish
                      <ArrowRight className="w-7 h-7 transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: 3/7 – Tutorial Panel */}
          <div className="w-2/7 flex-col space-y-6 mt-15">
            <div className=" bg-yellow-50 border-4 border-yellow-300 rounded-2xl px-8 py-6 h-fit leading-6">
              <h2 className="text-3xl font-avant-medium font-semibold mb-4 text-gray-800">
                Posting Guidelines
              </h2>
              <p className="text-gray-600 text-lg font-avant-medium mb-4">
                The community is here to help you with specific coding, algorithm, or course-relating problems.
                Avoid asking opinion-based questions.
              </p>
              <ol className="list-decimal list-inside text-black text-xl font-avant-medium space-y-8">
                <li>
                  <strong>Summarize the problem</strong>
                  <br />
                  <span className="text-lg text-gray-600">Include details about your goal.</span>
                </li>
                <li>
                  <strong>Describe what you’ve tried</strong>
                  <br />
                  <span className="text-lg text-gray-600">Show what you’ve tried and tell us what you found (on this site or elsewhere) and why it didn’t meet your needs. You can get better answers when you provide research.</span>
                </li>
                <li>
                  <strong>Show some examples</strong>
                  <br />
                  <span className="text-lg text-gray-600">When appropriate, share the minimum amount of resources others need to reproduce your problem (also called a minimum, reproducible example). Describe expected and actual results.</span>
                </li>
              </ol>
              <div className="mt-6 p-4 border-4 border-dashed border-orange-400 bg-orange-50 text-yellow-800 font-avant-medium rounded-xl text-lg">
                <strong className="text-lg">Tip:</strong> Threads with detailed titles and proper tags get more visibility!
              </div>
            </div>

            {/* Hustera Banner */}
            <div className="max-w-[470px] rounded-xl p-5 bg-gradient-to-r from-blue-400 to-yellow-200 shadow-md text-white text-center">
              <h3 className="text-5xl font-avant-medium font-bold tracking-wide">hustera</h3>
              <p className="text-md font-avant-medium">education for everyone</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ForumUpload;
