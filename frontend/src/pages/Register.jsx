import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Breadcrumb from "../components/BreadCrumb";
import RegisterBox from "../components/RegisterBox";
import loginBanner from "../assets/loginbanner.png"; 

const Register = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar currentState={null} />
      <Breadcrumb paths={["Homepage", "Register"]} />

      {/* Main Content Container */}
      <div className="flex-grow flex justify-center items-center px-6 py-10 mb-15">
        <div className="flex w-full max-w-[1680px] items-center justify-center gap-12">

          {/* Image Section (Larger & Responsive) */}
          <div className="hidden md:flex flex-[1.15] justify-center items-center min-w-0">
            <img
              src={loginBanner}
              alt="Register Banner"
              className="max-w-[800px] md:max-w-[900px] w-full h-auto object-contain rounded-xl"
            />
          </div>

          {/* Register Box Section */}
          <div className="flex-[0.8] flex flex-col justify-center items-center min-w-0">
            <h2 className="text-4xl md:text-5xl font-avant-medium font-semibold text-gray-800 mb-6">
              Welcome Onboard!
            </h2>

            <RegisterBox />
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Register;
