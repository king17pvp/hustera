import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Breadcrumb from "../components/BreadCrumb";
import loginBanner from "../assets/loginbanner.png"; 
import LoginBox from "../components/LoginBox";

const Login = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar currentState={null} />
      <Breadcrumb paths={["Homepage", "Login"]} />

      {/* Main Content Container */}
      <div className="flex-grow flex justify-center items-center px-6 py-10 mb-15">
        <div className="flex w-full max-w-[1680px] items-center justify-center gap-12">

          {/* Image Section (Larger but Responsive) */}
          <div className="hidden md:flex flex-[1.15] justify-center items-center min-w-0">
            <img
              src={loginBanner}
              alt="Login Banner"
              className="max-w-[800px] md:max-w-[900px] w-full h-auto object-contain rounded-xl"
            />
          </div>

          {/* Login Box Section */}
          <div className="flex-[0.8] flex flex-col justify-center items-center min-w-0">
            <h2 className="text-4xl md:text-5xl font-avant-medium font-semibold text-gray-800 mb-6">
              Welcome Back!
            </h2>

            <LoginBox />
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Login;
