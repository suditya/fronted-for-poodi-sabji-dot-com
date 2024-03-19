import { useState } from "react";
import "../styles/Login.css"; // Create a new CSS file for styling
import Navbar from "./Navbar";
import { toast } from "react-toastify";
import axios from "axios";
// import { error } from "console";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");

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

    if (password !== confirmPassword) {
      setPasswordError(() => "Passwords do not match ❌");
      return false;
    }

    return true; // Return true if the form is valid
  };

  const handleRegister = async () => {
    // validate the email and the password
    console.log("register button clicked");
    const isValid = isValidForm();
    console.log(passwordError, "  errors ", emailError);
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
      const userData = { email, password, name };
      const response = await axios.post(
        "http://localhost:3000/api/register",
        userData
      );
      console.log(response);
      //   toast.info(JSON.stringify(response));
      if (response.status === 200) {
        toast.success("Successfully registered 🎉", {
          position: "top-center",
          // delay: 2500,
        });
        localStorage.setItem("UserName", name);
        setTimeout(() => navigate("/login"), 1000);
      } else {
        toast.error(
          `Not able to register due to ${error.response.data.message} ❌`,
          {
            position: "top-center",
            // delay: 2500,
          }
        );
      }
    } catch (error) {
      toast.error(
        `Not able to register due to ${error.response.data.message} ❌`,
        {
          position: "top-center",
          // delay: 2500,
        }
      );
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="heading">REGISTER</div>
        <div className="form">
          <hr />
          <input
            type="text"
            className="email input"
            // id="input"
            placeholder="Enter you name 📛"
            onChange={(e) => setName(e.target.value)}
            required={true}
          ></input>
          <input
            type="email"
            name="email"
            id=""
            className="input"
            onChange={(e) => setEmail(e.target.value)}
            required={true}
            placeholder="Enter your email 📧"
          />
          {emailError && <div className="error">{emailError}</div>}
          <input
            type="password"
            name=""
            id=""
            className="input"
            onChange={(e) => setPassword(e.target.value)}
            required={true}
            placeholder="Enter your password 🔒"
          />
          <input
            type="password"
            name=""
            id=""
            className="input"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required={true}
            placeholder="Confirm your password 🔒"
          />
          {/* {passwordError && <div className="error">{passwordError}</div>} */}
          <button className="submit-btn" onClick={() => handleRegister()}>
            Register 🚀
          </button>
        </div>
        <div className="footer-container">
          <p className="footer-text">
            Already have an account!{" "}
            <Link to={"/login"} className="register-link">
              {" "}
              Login Youself
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
