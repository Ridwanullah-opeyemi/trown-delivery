import { Route, Routes } from "react-router-dom"
import NavBar from "./component/navBar/navBar"
import Home from "./pages/home/home"
import Cart from "./pages/cart/cart"
import Placeorder from "./pages/placeOrder/placeorder"
import Footer from "./component/footer/footer"
import { useState } from "react"
import LoginPopup from "./component/loginpopor/loginpop"
import Verify from "./pages/verify/verify"
import MyOrders from "./pages/myOrder/myOrder"
import SupportChatbot from "./component/chatbox/chatbox"
import PrivacyPolicy from "./component/privateprolicy/private.jsx"
import VerifyEmail from "./component/VerifyEmail.jsx"
import ResetPasswordPage from "./component/resetpass/resetpass.jsx"
import ForgotPasswordPage from "./component/resetpass/forgetpass.jsx"



const App = () => {

  const [showlogin,setShowlogin] = useState(false)

  return (
    <>
    {
      showlogin ? <LoginPopup setShowlogin={setShowlogin} /> : <></>
    }
      <div className="app">
        <NavBar setShowlogin={setShowlogin} />
        <SupportChatbot/>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/verify' element={<Verify />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<Placeorder />} />
          <Route path='/myorders' element={<MyOrders />} />
          <Route path='/privacyPolicy' element={<PrivacyPolicy />} />
          <Route path="/verify/:token" element={<VerifyEmail />} />
          <Route path="/reset-password/:token" element={<ResetPasswordPage />} /> 
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        </Routes>
      </div>
      <Footer />
    </>
  )
}


export default App