import { useState } from "react"
import { assets } from "../../assets/assets"
import "./navBar.css"
import { Link } from "react-router-dom"
import { useContext } from "react"
import { StoreContext } from "../../contexts/storeContexts"


const NavBar = ({setShowlogin}) => {


  const [menu,setMenu] = useState('')

  const {getTotalCartAmount} = useContext(StoreContext)


  return (
    <div className="navBar">
      <Link to="/"><img src={assets.logo} className="logo" alt="" /></Link>
      <ul className="navbar_menu">
        <Link to="/" onClick={()=>setMenu("home")} className={menu==="home"?"active":""}>Home</Link>
        <a href="#ExploreMenu" onClick={()=>setMenu("menu")} className={menu==="menu"?"active":""}>Menu</a>
        <a href="#appdownload" onClick={()=>setMenu("mobile-app")} className={menu==="mobile-app"?"active":""}>Mobile-app</a>
        <a href="#footer" onClick={()=>setMenu("contact-us")} className={menu==="contact-us"?"active":""}>Contact us</a>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className="navbar-search-icon">
          <Link to="/cart"><img src={assets.basket_icon} alt="" /></Link>
          <div className={getTotalCartAmount()===0?'':'dot'}></div>
        </div>
        <button onClick={()=>setShowlogin(true)}>sign in</button>
      </div>
    </div>
  )
}


export default NavBar