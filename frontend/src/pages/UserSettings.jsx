import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Breadcrumb from "../components/BreadCrumb";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const UserSettings = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const [userData, setUserData] = useState({
    fullName: "",
    dob: "",
    gender: "other",
  });

  const [avatar, setAvatar] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });

    // Clear errors on input
    if (value.trim() !== "") {
      setErrors((prev) => ({ ...prev, [name]: false }));
    }
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {
      fullName: userData.fullName.trim() === "",
      dob: userData.dob.trim() === "",
    };
    setErrors(newErrors);

    return !Object.values(newErrors).some((error) => error);
  };

  const handleSave = () => {
    if (!validateForm()) {
      return;
    }

    // Perform the save operation here
    console.log("Saving user data...", userData);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Breadcrumb paths={["Homepage", "Settings"]} />

      <div className="w-full flex flex-col items-center flex-grow mt-8">
        <div className="w-[1680px] bg-white">
          <h2 className="text-[52px] font-avant-medium font-bold mb-8">Personal Info</h2>

          <div className="grid grid-cols-1 md:grid-cols-[1fr_0.5fr] gap-6">
            <div>
              {/* Full Name */}
              <label className="block font-avant-medium text-[23px] font-semibold mb-1">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={userData.fullName}
                onChange={handleChange}
                className={`w-full text-xl mt-1 px-5 py-3 border-3 rounded-xl ${errors.fullName ? "border-red-500" : ""}`}
                placeholder="Enter your full name"
              />

              {/* Email */}
              <label className="block font-avant-medium text-[23px] font-semibold mt-4 mb-1">Email</label>
              <input
                type="email"
                value={isAuthenticated ? user.email : ""}
                disabled
                className="w-full text-xl mt-1 px-5 py-3 border-3 rounded-xl bg-gray-200"
              />

              {/* Role */}
              <label className="block font-avant-medium text-[23px] font-semibold mt-4 mb-1">Role</label>
              <input
                type="text"
                value={isAuthenticated ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : ""}
                disabled
                className="w-full text-xl mt-1 px-5 py-3 border-3 rounded-xl bg-gray-200"
              />

              {/* Date of Birth */}
              <label className="block font-avant-medium text-[23px] font-semibold mt-4 mb-1">Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={userData.dob}
                onChange={handleChange}
                className={`w-full text-xl mt-1 px-5 py-3 border-3 rounded-xl ${errors.dob ? "border-red-500" : ""}`}
              />

              {/* Gender */}
              <label className="block font-avant-medium text-[23px] font-semibold mt-4 mb-1">Gender</label>
              <div className="relative w-full">
                <select
                  name="gender"
                  value={userData.gender}
                  onChange={handleChange}
                  className="w-full text-xl mt-1 px-5 py-3 border-3 rounded-xl appearance-none bg-white cursor-pointer pr-10"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                <div className="absolute right-6 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500">
                  ▼
                </div>
              </div>
            </div>

            {/* Avatar Upload */}
            <div className="flex flex-col items-center justify-center">
              <div className="w-100 h-100 rounded-full overflow-hidden border-3">
                {avatar ? (
                  <img src={avatar} alt="User Avatar" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex font-avant-medium items-center justify-center text-gray-400">
                    No Image
                  </div>
                )}
              </div>

              <label className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-xl font-avant-medium text-[18px] hover:bg-blue-700 transition cursor-pointer">
                Upload Avatar
                <input type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
              </label>
            </div>
          </div>

          {/* Save Button */}
          <button
            className="mt-8 mb-8 px-6 py-3 bg-blue-600 text-white rounded-xl font-avant-medium text-[18px] hover:bg-blue-700 transition cursor-pointer"
            onClick={handleSave}
          >
            Save Changes
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default UserSettings;
