// import "bootstrap/dist/css/bootstrap.min.css"; 
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import CarouselPractice from "./components/CarouselPractice";
import Checkout from "./components/Checkout";
import Home from "./components/Home";
import Inventory from "./components/Inventory";
import Login from "./components/Login";
import PaymentPopup from "./components/PaymentPopUp";
import PlaceOrder from "./components/PlaceOrder";
import Register from "./components/Register";
<style>
  @import
  url('https://fonts.googleapis.com/css2?family=ADLaM+Display&family=Nova+Mono&family=Tektur&display=swap')
</style>;

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/practice" element={<CarouselPractice />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/payment" element={<PaymentPopup />} />
        <Route path="/inventory" element={<Inventory />} />
        {/* <Route path="/logout" element={<Logout />} /> */}
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;
