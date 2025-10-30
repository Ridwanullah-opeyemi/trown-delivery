import { useState, useContext } from 'react'
import './login.css' 
import { assets } from '../../assets/assets'
import { StoreContext } from '../../contexts/storeContexts'
import axios from "axios"
import { useNavigate } from 'react-router-dom'


const LoginPopup = ({ setShowlogin }) => {
    const [currState, setCurrState] = useState("login")
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false); 
    const [statusMessage, setStatusMessage] = useState({ text: '', type: '' }); 

    const { url, setToken } = useContext(StoreContext) 
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    })

    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData(data => ({ ...data, [name]: value }))
    }

    const onLogin = async (e) => {
        e.preventDefault()
        setIsLoading(true); 
        setStatusMessage({ text: '', type: '' });

        let newUrl = url;
        if (currState === "login") {
            newUrl += "/api/user/login"
        } else {
            newUrl += "/api/user/register"
        }

        console.log("Attempting API call to:", newUrl);

        try {
            const res = await axios.post(newUrl, data);

            if (res.data.success) {
                setToken(res.data.token);
                localStorage.setItem("token", res.data.token)
                setStatusMessage({ text: res.data.message || "Authentication successful!", type: 'success' }); 
                
                setTimeout(() => {
                    setShowlogin(false);
                }, 500); 

            } else {
                setStatusMessage({ text: res.data.message || "Authentication failed. Please check your credentials.", type: 'error' });
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Could not connect to server. Check network connection.";
            setStatusMessage({ text: errorMessage, type: 'error' });
            console.error("Login/Register API Error:", error);
        } finally {
            setIsLoading(false);
        }
    }


    const togglePasswordVisibility = (e) => {
        e.preventDefault();
        setPasswordVisible(prev => !prev);
    }

    const navigate = useNavigate()
    return (
        <div className="loginPopup">
            <form className="login_popup_cotainar" onSubmit={onLogin}>
                <div className="login_popup_title">
                    <h2>{currState === "login" ? "Login" : "Sign Up"}</h2>
                    <img onClick={() => setShowlogin(false)} src={assets.cross_icon} alt="Close" />
                </div>
                <div className="login_popup_inputs">
                    {statusMessage.text && (
                        <div className={`status_message ${statusMessage.type === 'success' ? 'success' : 'error'}`}>
                            {statusMessage.text}
                        </div>
                    )}

                    {currState === "login" ? <></> : <input type="text" name="name" value={data.name} onChange={onChangeHandler} placeholder='Your name' required />}
                    <input type="email" name="email" value={data.email} onChange={onChangeHandler} placeholder='example@gmail.com' required />

                    <div className="login_popup_input showpasscon">

                        <input
                            type={passwordVisible ? "text" : "password"}
                            name="password"
                            id="passinp"
                            value={data.password}
                            onChange={onChangeHandler}
                            placeholder='Password'
                            required
                        />

                        <button
                            className="passshowbtn"
                            type="button"
                            onClick={togglePasswordVisibility}
                        >
                            {passwordVisible ? "Hide" : "Show"}
                        </button>
                    </div>

                    <button 
                        type='submit' 
                        disabled={isLoading} 
                        className={isLoading ? 'loading-btn' : ''} 
                    >
                        {isLoading 
                            ? 'Loading...' 
                            : (currState === "Sign Up" ? "Create account" : "Login")
                        }
                    </button>


                </div>

                {
                    currState === "login"
                        ?
                        <div>
                            <div className="passcon">
                                <p>forget your password: <span onClick={() => { navigate('/forgot-password'); setShowlogin(false) }}>click here to reset</span></p>
                            </div>
                            <p>Create a new account? <span onClick={() => { setCurrState("Sign Up") }}>Click here</span></p>
                        </div>
                        :
                        <div>
                            <div className="login_popup_condition" >
                                <label htmlFor="check">
                                    <input type="Checkbox" id="check" required />
                                    <p>By continuing, i agree to the <span onClick={() => { navigate('privacyPolicy'); setShowlogin(false) }}>terms of use & privacy policy.</span> </p>
                                </label>
                            </div>
                            <p>Already have an account? <span onClick={() => { setCurrState("login") }}>Login here</span></p>
                        </div>
                }

            </form>
        </div>
    )
}


export default LoginPopup
