import { useState } from 'react'
import './login.css'
import { assets } from '../../assets/assets'
import { useContext } from 'react'
import { StoreContext } from '../../contexts/storeContexts'
import axios from "axios"
import { useNavigate } from 'react-router-dom'


const LoginPopup = ({setShowlogin}) => {
     const [currState,setCurrState] = useState("login")
     const {url,setToken} = useContext(StoreContext)
     const [data,setData] = useState({
        name: "",
        email: "",
        password:""
     })

     const onChangeHandler = (e) =>{
        const name = e.target.name;
        const value = e.target.value;
        setData(data=>({...data,[name]:value}))
     }

     const onLogin = async (e) => {
        e.preventDefault()
        let newUrl = url;
        if (currState === "login") {
            newUrl += "/api/user/login"
        }else{
            newUrl += "/api/user/register"
        }

        console.log(newUrl);
        
        const res = await axios.post(newUrl,data);
        if (res.data.success) {
            setToken(res.data.token);
            localStorage.setItem("token",res.data.token)
            setShowlogin(false)
            alert(res.data.message)
        }
        else{
            alert(res.data.message)
        }
     }
     const navigate = useNavigate()
     return (
    <div className="loginPopup">
        <form className="login_popup_cotainar" onSubmit={onLogin}>
            <div className="login_popup_title">
                <h2>{currState}</h2>
                <img onClick={()=>setShowlogin(false)} src={assets.cross_icon} alt="" />
            </div>
            <div className="login_popup_inputs">
                {currState==="login"? <></> : <input type="text" name="name" value={data.name} onChange={onChangeHandler} placeholder='Your name' required />}
                <input type="email" name="email" value={data.email} onChange={onChangeHandler} placeholder='example@gmail.com' required />
                <input type="password" name="password" value={data.password} onChange={onChangeHandler} placeholder='Pssword' required />
                <button type='submit' >{currState==="Sign Up"? "Create account": "login"}</button>
                <div className="login_popup_condition" >
                    <input type="Checkbox" required/>
                    <p onClick={()=>{navigate('privacyPolicy');setShowlogin(false)}}>By continuing, i agree to the terms of use & privacy policy.</p>
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