import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import { toast } from "react-toastify";
import { getUserName, isAdminLogin, isLoggedIn } from "../services/users";
import { useContext } from "react";
import { CartContext } from "../context/cart";
import { IoCart, IoLogOutOutline } from "react-icons/io5";
import { IoIosHome } from "react-icons/io";

const Navbar = () => {
  const navigate = useNavigate();
  const cart = useContext(CartContext);
  const handleLogout = () => {
    toast.success(`🎉 Successfully logged out`, {
      position: "top-center",
      // delay: 2500,
    });
    localStorage.removeItem("LoggedInEmail");
    localStorage.removeItem("UserName");
    localStorage.removeItem("adminLogin");
    cart.setCartItems([]); // empty array
    // console.log("🔒 After logout", localStorage.getItem("LoggedInEmail"));
    setTimeout(() => navigate("/login"), 2500);
  };

  return (
    <nav className="navbar-container">
      {/* <video className="videoTag" autoPlay loop muted>
        <source src={"https://youtu.be/-YuI-cQtasc"} type="video/mp4" />
      </video> */}
      <div className="left">
        <Link style={{ textDecoration: "none", color: "white" }} to="/">
          {/* <h4 className="website-name">🍽️ poodi-sabji.com</h4> */}
          <div className="website-name-container">
            <p>🍽️ </p>
            <p>poodi-sabji</p>
            <p>dot-com</p>
          </div>
        </Link>
      </div>
      <div className="right">
        <Link to="/">
          Home <IoIosHome className="nav-icons" />
        </Link>
        <Link to="/checkout">
          Checkout <IoCart className="nav-icons" />
        </Link>
        {!isLoggedIn() ? (
          <>
            <Link to="/login">🔐 Login</Link>
            <Link to="/register">📝 Register</Link>
          </>
        ) : (
          <>
            <a className="userName">Hi,{getUserName()}!</a>
            <a className="logout" onClick={handleLogout}>
              Logout <IoLogOutOutline className="nav-icons" />
            </a>
            {isAdminLogin() ? <Link to="/inventory">INVENTORY</Link> : <> </>}
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
