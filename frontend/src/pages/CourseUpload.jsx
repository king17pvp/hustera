import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Breadcrumb from "../components/BreadCrumb";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Trash2, X } from "lucide-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";

const predefinedTags = ["JavaScript", "React", "Python", "SQL", "Machine Learning"];
const predefinedCategories = [
  "Accounting",
  "Anthropology",
  "Architecture",
  "Art & Creativity",
  "Artificial Intelligence",
  "Astronomy",
  "Biology",
  "Business",
  "Chemistry",
  "Civil Engineering",
  "Communication",
  "Computer Science",
  "Data Science",
  "Design",
  "Economics",
  "Education",
  "Electrical Engineering",
  "Engineering",
  "Environmental Science",
  "Ethics",
  "Finance",
  "Geography",
  "Graphic Design",
  "History",
  "Law",
  "Linguistics",
  "Machine Learning",
  "Marketing",
  "Mathematics",
  "Mechanical Engineering",
  "Media Studies",
  "Medicine",
  "Philosophy",
  "Physics",
  "Political Science",
  "Psychology",
  "Public Health",
  "Sociology",
  "Software Engineering",
  "Statistics",
  "Theology",
  "UI/UX Design"
];

const CourseUpload = () => {

  const { user } = useSelector((state) => state.auth);

  const [phase, setPhase] = useState(1);
  const [direction, setDirection] = useState(1);
  const [validationErrors, setValidationErrors] = useState([]);
  const navigate = useNavigate();
  const [basicInfo, setBasicInfo] = useState({
    title: "",
    description: "",
    category: "",
    tags: "",
    price: "",
    thumbnail: "",
    difficulty: "Beginner",
  });

  const [curriculum, setCurriculum] = useState([
    {
      title: "",
      videos: [
        {
          title: "",
          url: ""
        }
      ]
    }
  ]);

  const [errors, setErrors] = useState({});

  const validateFieldsPhase1 = () => {
    const newErrors = {
      title: !basicInfo.title.trim(),
      description: !basicInfo.description.trim(),
      category: !basicInfo.category.trim(),
      difficulty: !basicInfo.difficulty.trim(),
      price:
        !basicInfo.price ||
        (basicInfo.price !== "Free" && Number(basicInfo.price) <= 0),
      thumbnail: !basicInfo.thumbnail,
    };

    setErrors(newErrors);

    return !Object.values(newErrors).includes(true);
  };

  const validateFieldsPhase2 = () => {
    const curriculumErrors = [];

    curriculum.forEach((week, weekIndex) => {
      if (!week.title.trim()) {
        curriculumErrors.push({ type: "weekTitle", weekIndex });
      }

      week.videos.forEach((video, videoIndex) => {
        if (!video.title.trim()) {
          curriculumErrors.push({ type: "videoTitle", weekIndex, videoIndex });
        }
        if (!video.url.trim()) {
          curriculumErrors.push({ type: "videoUrl", weekIndex, videoIndex });
        }
      });
    });

    setValidationErrors(curriculumErrors);

    return curriculumErrors.length === 0;
  };

  const handleBasicInfoChange = (e) => {
    const { name, value } = e.target;
    setBasicInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleWeekTitleChange = (weekIndex, newTitle) => {
    const updated = [...curriculum];
    updated[weekIndex].title = newTitle;
    setCurriculum(updated);
  };

  const handleVideoChange = (weekIndex, videoIndex, field, value) => {
    const updated = [...curriculum];
    updated[weekIndex].videos[videoIndex][field] = value;
    setCurriculum(updated);
  };

  const addVideo = (weekIndex) => {
    const updated = [...curriculum];
    updated[weekIndex].videos.push({ title: "", url: "" });
    setCurriculum(updated);
  };

  const removeVideo = (weekIndex, videoIndex) => {
    const updated = [...curriculum];
    updated[weekIndex].videos.splice(videoIndex, 1);
    setCurriculum(updated);
  };

  const addWeek = () => {
    setCurriculum([...curriculum, { title: "", videos: [{ title: "", url: "" }] }]);
  };

  const removeWeek = (weekIndex) => {
    const updated = [...curriculum];
    updated.splice(weekIndex, 1);
    setCurriculum(updated);
  };

  const changePhase = (newPhase) => {
    setDirection(newPhase > phase ? 1 : -1);
    setPhase(newPhase);
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
    }),
  };

  const submitCourse = async () => {
    const data = {
      instructor_id: user.id,
      title: basicInfo.title,
      description: basicInfo.description,
      category: basicInfo.category,
      tags: basicInfo.tags.split(",").map(tag => tag.trim()),
      price: basicInfo.price,
      difficulty: basicInfo.difficulty,
      thumbnail: basicInfo.thumbnail, // Base64-encoded thumbnail
      curriculum,
    };

    try {
      const response = await axios.post("https://your-backend-api.com/courses", data);

      if (response.status === 200) {
        alert("Course submitted successfully!");
        console.log("Response:", response.data);
        setBasicInfo({
          title: "",
          description: "",
          category: "",
          tags: "",
          price: "",
          thumbnail: "",
          difficulty: "Beginner",
        });
        setCurriculum([
          {
            title: "",
            videos: [
              {
                title: "",
                url: "",
              },
            ],
          },
        ]);
        setErrors({});
        setValidationErrors([]);
        navigate("/courses"); // Redirect to courses page after successful submission
      } else {
        alert("Failed to submit course. Please try again.");
        console.error("Error:", response.data);
      }
    } catch (error) {
      console.error("Error submitting course:", error);
      alert("An error occurred while submitting the course.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar currentState={null} />
      <Breadcrumb paths={["Homepage", "Courses", "Upload A Course"]} />

      <div className="flex-grow px-3 py-10 w-[1700px] mx-auto">
        <h1 className="text-5xl font-avant-medium font-bold mb-6">Upload a New Course</h1>

        <div className="mb-12 mt-12 relative">
          <div className="relative flex items-center justify-between mb-8 px-4">
            <div className="absolute top-8 left-0 right-0 h-1 flex z-0">
              <div className={`flex-1 transition-colors duration-300 ${phase === 1 ? "bg-blue-600" : "bg-gray-300"}`} />
              <div className={`flex-1 transition-colors duration-300 ${phase === 2 ? "bg-blue-600" : "bg-gray-300"}`} />
              <div className={`flex-1 transition-colors duration-300 ${phase === 3 ? "bg-blue-600" : "bg-gray-300"}`} />
            </div>

            {[1, 2, 3].map((step) => (
              <div key={step} className="relative z-10 flex flex-col items-center w-1/3">
                <div className={`w-16 h-16 flex items-center justify-center rounded-full text-white text-[23px] font-avant-medium font-bold transition-all duration-300 ${phase === step ? "bg-blue-600" : "bg-gray-300"}`}>
                  {step}
                </div>
                <div className="mt-2 text-[23px] font-avant-medium font-semibold text-center">
                  {step === 1 && "Basic Info"}
                  {step === 2 && "Curriculum"}
                  {step === 3 && "Confirm & Publish"}
                </div>
              </div>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait" custom={direction}>
          {phase === 1 && (
            <>
              <motion.div
                key="phase-1"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="grid grid-cols-1 md:grid-cols-7 gap-6"
              >
                {/* Left side (2 columns wide) */}
                <div className="md:col-span-4 space-y-6">
                  {/* Course Title */}
                  <div>
                    <label className="block mb-1 text-[23px] font-avant-medium font-semibold">Course Title</label>
                    <input
                      name="title"
                      placeholder="Enter course title"
                      className={`w-full font-avant-medium text-[19px] text-gray-600 border-3 px-5 py-3 rounded-xl ${errors.title ? "border-red-500" : "border-gray-700"}`}
                      maxLength={100}
                      value={basicInfo.title}
                      onChange={handleBasicInfoChange}
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block mb-1 text-[23px] font-avant-medium font-semibold">Description</label>
                    <textarea
                      name="description"
                      placeholder="Enter course description"
                      className={`w-full font-avant-medium text-[19px] text-gray-600 border-3 px-5 py-3 rounded-xl resize-none ${errors.description ? "border-red-500" : "border-gray-700"}`}
                      rows={5}
                      maxLength={350}
                      value={basicInfo.description}
                      onChange={handleBasicInfoChange}
                    />
                  </div>

                  {/* Category */}
                  <div className="relative">
                    <label className="block mb-1 text-[23px] font-avant-medium font-semibold">Category</label>
                    <div className="relative">
                      <select
                        name="category"
                        className={`appearance-none w-full font-avant-medium text-[19px] border-3 px-5 py-3 rounded-xl pr-10 cursor-pointer ${errors.category ? "border-red-500" : "border-gray-700"} ${basicInfo.category ? "text-gray-600" : "text-gray-400"}`}
                        value={basicInfo.category}
                        onChange={handleBasicInfoChange}
                      >
                        <option value="" disabled className="text-gray-400">
                          Select a category
                        </option>
                        {predefinedCategories.map((cat) => (
                          <option
                            key={cat}
                            value={cat.toLowerCase().replace(/\s/g, "-")}
                            className="text-gray-600"
                          >
                            {cat}
                          </option>
                        ))}
                      </select>

                      {/* Triangle icon */}
                      <div className="pointer-events-none absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600">
                        ▼
                      </div>
                    </div>
                  </div>


                  {/* Difficulty */}
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Difficulty */}
                    <div className="w-[513px]">
                      <label className="block mb-1 text-[23px] font-avant-medium font-semibold">
                        Difficulty Level
                      </label>
                      <div className="relative bg-gray-200 rounded-full p-1 flex w-full mt-2">
                        <div className="relative flex w-full px-1">
                          <motion.div
                            layout
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="absolute top-0 bottom-0 w-1/3 rounded-full bg-gray-800 z-0"
                            style={{
                              left: `${["Beginner", "Intermediate", "Advanced"].indexOf(basicInfo.difficulty) * 33.3333}%`,
                            }}
                          />
                          {["Beginner", "Intermediate", "Advanced"].map((level) => (
                            <button
                              key={level}
                              onClick={() => setBasicInfo((prev) => ({ ...prev, difficulty: level }))}
                              className={`relative z-10 w-1/3 text-center py-2 rounded-full transition-all font-avant-medium text-[19px] cursor-pointer ${basicInfo.difficulty === level ? "text-white" : "text-gray-700"
                                }`}
                            >
                              {level}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="w-[420px]">
                      <label className="block mb-1 text-[23px] font-avant-medium font-semibold">Price</label>
                      <div className="flex items-center mt-2">
                        {/* Free/Paid Toggle */}
                        <div className="relative bg-gray-200 rounded-full p-1 flex w-[250px]">
                          <motion.div
                            layout
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="absolute top-1 bottom-1 w-1/2 rounded-full bg-gray-800 z-0"
                            style={{
                              left: basicInfo.price === "Free" ? "4px" : "calc(50% - 4px)",
                            }}
                          />
                          <button
                            onClick={() => setBasicInfo((prev) => ({ ...prev, price: "Free" }))}
                            className={`relative z-10 w-1/2 text-center py-2 rounded-full transition-all font-avant-medium text-[19px] cursor-pointer ${basicInfo.price === "Free" ? "text-white" : "text-gray-700"
                              }`}
                          >
                            Free
                          </button>
                          <button
                            onClick={() => setBasicInfo((prev) => ({ ...prev, price: "" }))}
                            className={`relative z-10 w-1/2 text-center py-2 rounded-full transition-all font-avant-medium text-[19px] cursor-pointer ${basicInfo.price !== "Free" ? "text-white" : "text-gray-700"
                              }`}
                          >
                            Paid
                          </button>
                        </div>

                        {/* Price Input */}
                        <AnimatePresence mode="wait">
                          {basicInfo.price !== "Free" && (
                            <motion.div
                              key="price-input-container"
                              initial={{ opacity: 0, x: -30 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -30 }}
                              transition={{ duration: 0.35 }}
                              className="ml-4 relative w-[150px]"
                            >
                              <span className="absolute left-3 top-1/2 -translate-y-1/2 font-avant-medium text-[19px] text-gray-600">$</span>
                              <input
                                type="number"
                                name="price"
                                placeholder="49.99"
                                className={`pl-8 pr-3 py-2 border-3 rounded-xl font-avant-medium text-[19px] text-gray-600 w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${errors.price ? "border-red-500" : "border-gray-700"}`}
                                value={basicInfo.price}
                                onChange={handleBasicInfoChange}
                              />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>

                  {/* Tags */}
                  <div>
                    <label className="block mb-2 text-[23px] font-avant-medium font-semibold">Tags</label>
                    <div className="flex flex-wrap gap-3">
                      {predefinedTags.map((tag) => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => {
                            const current = basicInfo.tags.split(",").map((t) => t.trim()).filter(Boolean);
                            const updated = current.includes(tag)
                              ? current.filter((t) => t !== tag)
                              : [...current, tag];
                            setBasicInfo((prev) => ({
                              ...prev,
                              tags: updated.join(","),
                            }));
                          }}
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
                </div>

                {/* Right side (Thumbnail only) */}
                <div className="md:col-span-3 space-y-4 ml-5">
                  <label className="block mb-1 text-[23px] font-avant-medium font-semibold">Thumbnail</label>

                  {/* Placeholder area */}
                  <div className={`w-full h-90 border-3 border-dashed rounded-xl flex items-center justify-center text-gray-400 ${errors.thumbnail ? "border-red-500" : "border-gray-700"}`}>
                    {basicInfo.thumbnail ? (
                      <img
                        src={basicInfo.thumbnail}
                        alt="Thumbnail preview"
                        className="w-full h-full object-fill rounded-xl p-1"
                      />
                    ) : (
                      <span className="text-center font-avant-medium text-xl">No thumbnail selected</span>
                    )}
                  </div>

                  {/* Upload button */}
                  <div className="flex justify-center">
                    <label className="inline-block bg-gray-800 text-white px-5 py-2 mt-2 rounded-xl font-avant-medium text-lg cursor-pointer text-center">
                      Upload Thumbnail
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setBasicInfo((prev) => ({ ...prev, thumbnail: reader.result })); // Store Base64 string
                            };
                            reader.readAsDataURL(file); // Read file as Base64
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>
              </motion.div>

              {/* Bottom-right positioned button */}
              <div className="w-full flex justify-end ">
                <button
                  onClick={() => {
                    if (validateFieldsPhase1()) {
                      changePhase(2);
                    }
                  }}
                  className="text-blue-600 font-avant-medium font-semibold text-2xl flex items-center gap-1 group transition cursor-pointer"
                >
                  Curriculum
                  <ArrowRight className="w-7 h-7 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </>
          )}

          {phase === 2 && (
            <motion.div
              key="phase-2"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="space-y-8"
            >
              {curriculum.map((week, weekIndex) => (
                <div
                  key={weekIndex}
                  className="bg-white rounded-2xl p-7 border-3 space-y-4"
                >
                  <div className="flex items-center justify-between mb-5">
                    <h2 className="text-3xl font-bold font-avant-medium ">Week {weekIndex + 1}</h2>
                    <button
                      onClick={() => removeWeek(weekIndex)}
                      className="ml-4 text-red-600 hover:text-red-800 cursor-pointer"
                    >
                      <Trash2 className="w-9 h-9" />
                    </button>
                  </div>

                  {/* Week Title */}
                  <input
                    type="text"
                    placeholder={`Week ${weekIndex + 1} Title (e.g. JavaScript Basics)`}
                    value={week.title}
                    onChange={(e) => handleWeekTitleChange(weekIndex, e.target.value)}
                    className={`w-full px-5 py-2 border-3 ${validationErrors.some(
                      (err) => err.type === "weekTitle" && err.weekIndex === weekIndex
                    )
                      ? "border-red-500"
                      : "border-gray-500"
                      } rounded-xl text-xl font-avant-medium text-gray-800`}
                  />

                  {/* Videos */}
                  <div className="space-y-[-1px]">
                    {week.videos.map((video, videoIndex) => (
                      <div
                        key={videoIndex}
                        className="flex flex-wrap items-center gap-3 border-t border-b border-gray-300 p-4"
                      >
                        {/* Video Label */}
                        <h3 className="text-2xl font-avant-medium font-semibold text-black mr-2">
                          Video {videoIndex + 1}:
                        </h3>

                        {/* Video Title */}
                        <label className="text-[22px] font-avant-medium text-black">Title:</label>
                        <input
                          type="text"
                          value={video.title}
                          onChange={(e) =>
                            handleVideoChange(weekIndex, videoIndex, "title", e.target.value)
                          }
                          placeholder="e.g. Variables and Data Types"
                          className={`px-4 py-2 border-3 ${validationErrors.some(
                            (err) =>
                              err.type === "videoTitle" &&
                              err.weekIndex === weekIndex &&
                              err.videoIndex === videoIndex
                          )
                            ? "border-red-500"
                            : "border-gray-500"
                            } rounded-xl text-xl font-avant-medium w-170`}
                        />

                        {/* Video URL */}
                        <label className="ml-2 text-[22px] font-avant-medium text-black">URL:</label>
                        <input
                          type="text"
                          value={video.url}
                          onChange={(e) =>
                            handleVideoChange(weekIndex, videoIndex, "url", e.target.value)
                          }
                          placeholder="https://video-link.com"
                          className={`px-4 py-2 border-3 ${validationErrors.some(
                            (err) =>
                              err.type === "videoUrl" &&
                              err.weekIndex === weekIndex &&
                              err.videoIndex === videoIndex
                          )
                            ? "border-red-500"
                            : "border-gray-500"
                            } rounded-xl text-xl font-avant-medium w-150`}
                        />

                        {/* Remove Icon */}
                        <button
                          onClick={() => removeVideo(weekIndex, videoIndex)}
                          className="text-red-500 hover:text-red-700 ml-auto"
                          aria-label="Remove Video"
                        >
                          <X className="w-8 h-8" />
                        </button>
                      </div>

                    ))}

                    {/* Add video */}
                    <button
                      onClick={() => addVideo(weekIndex)}
                      className="text-blue-600 mt-4 text-xl font-avant-medium font-semibold hover:underline cursor-pointer"
                    >
                      + Add another video
                    </button>
                  </div>

                </div>
              ))}

              {/* Add new week */}
              <button
                onClick={addWeek}
                className="w-full py-3 text-blue-black text-[21px] font-avant-medium font-bold border-dashed border-3 border-black rounded-xl hover:bg-gray-50 transition cursor-pointer"
              >
                + Add New Week
              </button>

              {/* Navigation */}
              <div className="flex justify-between items-center pt-8 mb-8">
                <button
                  onClick={() => changePhase(1)}
                  className="font-avant-medium font-semibold text-2xl flex items-center gap-1 group transition cursor-pointer"
                >
                  <ArrowLeft className="w-7 h-7 transition-transform duration-300 group-hover:-translate-x-1" />
                  Back to Basic Info
                </button>

                <button
                  onClick={() => {
                    if (validateFieldsPhase2()) {
                      changePhase(3);
                    }
                  }}
                  className="text-blue-600 font-avant-medium font-semibold text-2xl flex items-center gap-1 group transition cursor-pointer"
                >
                  Continue to Confirmation
                  <ArrowRight className="w-7 h-7 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </motion.div>
          )}

          {phase === 3 && (
            <motion.div
              key="phase-3"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="space-y-8"
            >
              {/* Basic Info and Thumbnail Section */}
              <div className="flex space-x-6 items-start">
                {/* Basic Info Section */}
                <div className="bg-white rounded-2xl p-6 border-3 border-gray-700 space-y-3 flex-1 overflow-hidden">
                  <h3 className="text-3xl font-avant-medium font-semibold text-black">📘 Basic Information</h3>
                  <div className="text-[21px] font-avant-medium text-gray-600 space-y-2 pl-2">
                    <p><strong className="text-black">Title:</strong> {basicInfo.title}</p>
                    <p><strong className="text-black">Description:</strong> {basicInfo.description}</p>
                    <p>
                      <strong className="text-black">Category:</strong>{" "}
                      {basicInfo.category
                        .split("-")
                        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(" ")}
                    </p>
                    <p>
                      <strong className="text-black">Tags:</strong>{" "}
                      {basicInfo.tags
                        .split(",")
                        .map(tag =>
                          tag
                            .trim()
                            .split("-")
                            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                            .join(" ")
                        )
                        .join(", ")}
                    </p>
                    <p>
                      <strong className="text-black">Price:</strong>{" "}
                      {basicInfo.price.charAt(0).toUpperCase() + basicInfo.price.slice(1)}
                    </p>
                    <p>
                      <strong className="text-black">Difficulty:</strong>{" "}
                      {basicInfo.difficulty
                        .split("-")
                        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(" ")}
                    </p>
                  </div>
                </div>

                {/* Thumbnail Section */}
                <div className="bg-white rounded-2xl p-1 border-4 border-dashed border-gray-700 flex-col items-center justify-center w-[36%]">
                  <h3 className="text-3xl px-4 py-3 font-avant-medium font-semibold text-black">📷 Thumbnail Picture</h3>
                  {basicInfo.thumbnail ? (
                    <img
                      src={basicInfo.thumbnail}
                      alt="Thumbnail preview"
                      className="w-full h-95 rounded-xl"
                    />
                  ) : (
                    <span className="text-center font-avant-medium text-xl text-gray-400">No thumbnail uploaded</span>
                  )}
                </div>
              </div>

              {/* Curriculum Section */}
              <div className="bg-white rounded-2xl p-6 border-3 border-gray-700 space-y-4">
                <h3 className="text-3xl font-avant-medium font-semibold text-black">📚 Curriculum Overview</h3>
                {curriculum.map((week, index) => (
                  <div key={index} className="border-t border-gray-300 pt-4 space-y-1">
                    <h4 className="text-[22px] font-avant-medium font-semibold text-black">Week {index + 1}: {week.title}</h4>
                    <ul className="list-disc list-inside text-gray-700 ml-4 space-y-1">
                      {week.videos.map((video, i) => (
                        <li key={i} className="text-xl font-avant-medium">
                          <span className=" text-gray-800 font-semibold"> Video {i + 1}:</span> {video.title} – <a className="text-blue-600 underline" href={video.url} target="_blank" rel="noreferrer">{video.url}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center mt-12 mb-5">
                <button
                  onClick={() => changePhase(2)}
                  className="font-avant-medium font-semibold text-2xl flex items-center gap-1 group transition cursor-pointer"
                >
                  <ArrowLeft className="w-7 h-7 transition-transform duration-300 group-hover:-translate-x-1" />
                  Back to Curriculum
                </button>

                <button
                  onClick={submitCourse}
                  className="text-green-600 font-avant-medium font-semibold text-2xl flex items-center gap-1 group transition cursor-pointer"
                >
                  Submit Course
                  <ArrowRight className="w-7 h-7 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <Footer />
    </div>
  );
};

export default CourseUpload;
