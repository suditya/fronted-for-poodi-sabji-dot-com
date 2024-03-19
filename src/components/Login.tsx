import { useContext, useState } from "react";
import "../styles/Login.css";
import Navbar from "./Navbar";
import { toast } from "react-toastify";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_DEV_URL } from "../utility/common";
import { CartContext } from "../context/cart";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [adminLogin, setAdminLogin] = useState<boolean>(false);
  //   console.log(email, " ", password);
  const cart = useContext(CartContext);

  const navigate = useNavigate();

  const isValidForm = () => {
    setEmailError("");
    setPasswordError("");

    // Check if the user has entered both fields correctly
    if ("" === email) {
      setEmailError(() => "Please enter your email 📧");
      return false;
    }

    if (!/^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError(() => "Please enter a valid email 📧");
      return false;
    }

    if ("" === password) {
      setPasswordError(() => "Please enter a password 🔒");
      return false;
    }

    if (password.length < 7) {
      setPasswordError(() => "The password must be 8 characters or longer 🔒");
      return false;
    }

    return true; // Return true if the form is valid
  };

  const handleSubmit = async () => {
    // validate the email and the password
    // console.log("submit button clicked");
    const isValid = isValidForm();
    // console.log(passwordError, "  errros ", emailError);
    if (!isValid) {
      if (passwordError) {
        toast.error(passwordError, {
          position: "top-center",
          // delay: 2500,
        });
      }
      if (emailError) {
        toast.error(emailError, {
          position: "top-center",
          // delay: 2500,
        });
      }
      return;
    }
    try {
      const userData = {
        email,
        password,
        adminLogin,
      };
      console.log(userData);
      const response = await axios.post(BACKEND_DEV_URL + "/login", userData);
      console.log(response);
      //   toast.info(JSON.stringify(response));
      if (response.status === 200) {
        toast.success(
          `Successfully LoggedIn ${adminLogin ? "as a admin" : ""} 🎉`,
          {
            position: "top-center",
          }
        );
        localStorage.setItem("LoggedInEmail", email);
        if (adminLogin) {
          localStorage.setItem("adminLogin", "true");
        }
        console.log(localStorage);
        const response = await axios.get(BACKEND_DEV_URL + "/get-cart", {
          params: { email: email },
        });
        // console.log(response, " from the backend after login");
        cart.setCartItems(response.data.cartItems);
        if (adminLogin) {
          setTimeout(() => navigate("/inventory"), 2000);
        } else {
          setTimeout(() => navigate("/"), 2000);
        }
      } else {
        toast.error(`Could not login due to: ${response.data.message} ❌`, {
          position: "top-center",
          // delay: 2500,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(`Could not login due to: ${error.response.data.message} ❌`, {
        position: "top-center",
        // delay: 2500,
      });
    }
    // toast.success("Succesfully Logged In!");
  };

  return (
    <>
      <Navbar />
      <div className="container">
        {/* {toast("hello world!")} */}
        <div className="heading">LOGIN</div>
        <div className="form">
          <hr />
          {/* <label htmlFor="email">Email 📧:</label> */}
          <input
            type="email"
            name="email"
            className="input"
            id=""
            onChange={(e) => setEmail(e.target.value)}
            required={true}
            placeholder="Enter your email 📧:"
          />
          {/* <label htmlFor="error">{emailError}</label> */}
          {/* <label htmlFor="password">Password 🔒:</label> */}
          <input
            type="password"
            name=""
            id=""
            className="input"
            onChange={(e) => setPassword(e.target.value)}
            required={true}
            placeholder="Enter your password 🔒"
          />
          <span className="login-as-admin">
            <label htmlFor="">login as a Admin</label>
            <input
              type="checkbox"
              name=""
              id=""
              onChange={() => setAdminLogin(!adminLogin)}
            />
          </span>
          <hr />
          {/* <label htmlFor="error">{passwordError}</label> */}
          <button className="submit-btn" onClick={() => handleSubmit()}>
            Submit 🚀
          </button>
        </div>
        <div className="footer-container">
          <p className="footer-text">
            Don't have an account yet?{" "}
            <Link to={"/register"} className="register-link">
              {" "}
              Register Now
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
