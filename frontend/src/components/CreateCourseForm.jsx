import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const CreateCourseForm = () => {
  const navigate = useNavigate();
  const { user, token } = useSelector((state) => state.auth);
  
  useEffect(() => {
    console.log('Auth State:', { user, token });
  }, [user, token]);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    duration: '',
    level: 'Beginner',
    instructor_ID: user?.user_ID,
    weeks: [{ title: '', videos: [{ title: '', url: '' }] }]
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleWeekChange = (weekIndex, field, value) => {
    const newWeeks = [...formData.weeks];
    newWeeks[weekIndex] = {
      ...newWeeks[weekIndex],
      [field]: value
    };
    setFormData(prev => ({
      ...prev,
      weeks: newWeeks
    }));
  };

  const handleVideoChange = (weekIndex, videoIndex, field, value) => {
    const newWeeks = [...formData.weeks];
    newWeeks[weekIndex].videos[videoIndex] = {
      ...newWeeks[weekIndex].videos[videoIndex],
      [field]: value
    };
    setFormData(prev => ({
      ...prev,
      weeks: newWeeks
    }));
  };

  const addWeek = () => {
    setFormData(prev => ({
      ...prev,
      weeks: [...prev.weeks, { title: '', videos: [{ title: '', url: '' }] }]
    }));
  };

  const addVideo = (weekIndex) => {
    const newWeeks = [...formData.weeks];
    newWeeks[weekIndex].videos.push({ title: '', url: '' });
    setFormData(prev => ({
      ...prev,
      weeks: newWeeks
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Submitting with token:', token);
      console.log('Form data:', formData);
      
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };

      console.log('Request config:', config);

      const response = await axios.post('http://localhost:5000/courses/create', formData, config);
      
      if (response.data.success) {
        alert('Course created successfully!');
        navigate('/courses');
      }
    } catch (error) {
      console.error('Full error:', error);
      console.error('Error response:', error.response);
      alert(error.response?.data?.message || 'Error creating course');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Create New Course</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            rows="4"
            required
          />
        </div>

        <div>
          <label className="block mb-2">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-2">Price ($)</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            min="0"
            step="0.01"
            required
          />
        </div>

        <div>
          <label className="block mb-2">Duration (weeks)</label>
          <input
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            min="1"
            required
          />
        </div>

        <div>
          <label className="block mb-2">Level</label>
          <select
            name="level"
            value={formData.level}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Expert">Expert</option>
          </select>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Course Content</h3>
          {formData.weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="p-4 border rounded">
              <h4 className="font-medium">Week {weekIndex + 1}</h4>
              <input
                type="text"
                placeholder="Week Title"
                value={week.title}
                onChange={(e) => handleWeekChange(weekIndex, 'title', e.target.value)}
                className="w-full p-2 border rounded mt-2"
              />

              <div className="space-y-2 mt-4">
                {week.videos.map((video, videoIndex) => (
                  <div key={videoIndex} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Video Title"
                      value={video.title}
                      onChange={(e) => handleVideoChange(weekIndex, videoIndex, 'title', e.target.value)}
                      className="flex-1 p-2 border rounded"
                    />
                    <input
                      type="text"
                      placeholder="Video URL"
                      value={video.url}
                      onChange={(e) => handleVideoChange(weekIndex, videoIndex, 'url', e.target.value)}
                      className="flex-1 p-2 border rounded"
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addVideo(weekIndex)}
                  className="mt-2 px-4 py-2 bg-gray-200 rounded"
                >
                  Add Video
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addWeek}
            className="w-full py-2 bg-gray-200 rounded"
          >
            Add Week
          </button>
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Create Course
        </button>
      </form>
    </div>
  );
};

export default CreateCourseForm; 