import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Breadcrumb from "../components/BreadCrumb";
import RegisterBox from "../components/RegisterBox";
import loginBanner from "../assets/loginbanner.png"; // Import the image

const Register = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar currentState={null} />
      <Breadcrumb paths={["Homepage", "Register"]} />

      {/* Main Content: Image (3/5) + Register Box (2/5) */}
      <div className="flex-grow flex justify-center items-center">
        <div className="flex w-4/5 max-w-[1680px]">
          
          {/* Image Section (3/5) */}
          <div className="relative w-3/5 flex justify-center">
            <img
              src={loginBanner}
              alt="Login Banner"
              className="absolute top-[-138px] left-110 transform -translate-x-1/2 w-[900px] h-auto object-cover rounded-xl"
            />
          </div>

          {/* Login Box Section (2/5) */}
          <div className="w-2/5 flex flex-col justify-center items-center mr-11">
            {/* Welcome Text */}
            <h2 className="text-5xl font-avant-medium font-semibold text-gray-800">Welcome Onboard !</h2>

            {/* Login Box */}
            <RegisterBox />
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Register;
