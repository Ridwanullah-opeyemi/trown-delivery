import { assets } from '../../assets/assets'
import './footer.css'


const Footer = () => {
  return (
    <div className="footer" id="footer">
        <div className="footer_content">
            <div className="footer_content_left">
                <img src={assets.logo} alt="" />
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Saepe quidem nesciunt explicabo blanditiis debitis doloremque deleniti ad, dolores culpa ipsum. Odio ratione atque impedit fugit porro magni, optio fuga adipisci!</p>
                <div className="footer_social_icons">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />
                </div>
            </div>
            <div className="footer_content_right">
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About</li>
                    <li>Delivery</li>
                    <li>privacy policy</li>
                </ul>
            </div>
            <div className="footer_content_center">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+2347041763688</li>
                    <li>ridwanullah@gmil.com</li>
                </ul>
            </div>
        </div>
        <hr />
        <p className="footer_copyright">Copyright 2025 ◎ Tomato.com - All Right Reserved.</p>
    </div>
  )
}


export default Footer