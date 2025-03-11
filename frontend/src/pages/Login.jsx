import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Breadcrumb from "../components/BreadCrumb";
import LoginBox from "../components/LoginBox";

const Login = () => {

    return (
      <>
        <Navbar currentState={null}/>
        <Breadcrumb paths={["Homepage", "Login"]} />
        <LoginBox />
        <Footer />
      </>
    );
};

export default Login;