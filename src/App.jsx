import { Route, Routes } from "react-router-dom"
import NavBar from "./component/navBar/navBar"
import Home from "./pages/home/home"
import Cart from "./pages/cart/cart"
import Placeorder from "./pages/placeOrder/placeorder"
import Footer from "./component/footer/footer"
import { useState } from "react"
import LoginPopup from "./component/loginpopor/loginpop"



const App = () => {

  const [showlogin,setShowlogin] = useState(false)

  return (
    <>
    {
      showlogin ? <LoginPopup setShowlogin={setShowlogin} /> : <></>
    }
      <div className="app">
        <NavBar setShowlogin={setShowlogin} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<Placeorder />} />
        </Routes>
      </div>
      <Footer />
    </>
  )
}


export default App