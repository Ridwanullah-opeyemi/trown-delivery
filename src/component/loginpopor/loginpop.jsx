import { useState } from 'react'
import './login.css'
import { assets } from '../../assets/assets'


const LoginPopup = ({setShowlogin}) => {

    const [currState,setCurrState] = useState("Sign Up")

  return (
    <div className="loginPopup">
        <form className="login_popup_cotainar">
            <div className="login_popup_title">
                <h2>{currState}</h2>
                <img onClick={()=>setShowlogin(false)} src={assets.cross_icon} alt="" />
            </div>
            <div className="login_popup_inputs">
                {currState==="login"? <></> : <input type="text" placeholder='Your name' required />}
                <input type="email" placeholder='Exampleatemail.com' required />
                <input type="password" placeholder='Pssword' required />
                <button>{currState==="Sign Up"? "Create account": "login"}</button>
                <div className="login_popup_condition">
                    <input type="Checkbox" />
                    <p>By continuing, i agree to the terms of use & privacy policy.</p>
                </div>
            </div>
            {
                currState==="login"
                ?<p>Create a new accout? <span onClick={()=>{setCurrState("Sign Up")}}>Click here</span></p>
                :
            <p>Already have an accout? <span onClick={()=>{setCurrState("login")}}>Login here</span></p>
            }
            
        </form>
    </div>
  )
}


export default LoginPopup