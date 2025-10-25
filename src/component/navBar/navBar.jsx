import { useState } from "react"
import { assets } from "../../assets/assets"
import "./navBar.css"
import { Link, useNavigate } from "react-router-dom"
import { useContext } from "react"
import { StoreContext } from "../../contexts/storeContexts"


const NavBar = ({setShowlogin}) => {


  const [menu,setMenu] = useState('')

  const {getTotalCartAmount, token,setToken} = useContext(StoreContext)

  const navigate = useNavigate()
  const logOut = ()=>{
    localStorage.removeItem("token");
    setToken("");
    navigate("/")
  }


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
        {!token ?
          <button onClick={()=>setShowlogin(true)}>sign in</button>:
          <div className="navbar_profile">
            <img src={assets.profile_icon} alt="" />
            <ul className="nav_profile_dropDown">
              <li onClick={()=>navigate('/myorders')}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
              <hr />
              <li onClick={logOut}><img src={assets.logout_icon} alt="" /><p>logOut</p></li>
            </ul>
            </div>}

      </div>
    </div>
  )
}


export default NavBar