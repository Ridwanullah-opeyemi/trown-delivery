import { useContext } from 'react'
import './cart.css'
import { StoreContext } from '../../contexts/storeContexts'
import { useNavigate } from 'react-router-dom'


const Cart = () => {

    const { food_list, getTotalCartAmount, removeFromCart, cartItems, url } = useContext(StoreContext)

    const navigate = useNavigate();

    return (
        <div className="Cart">
            <dic className="cartItems">
                <div className="cart_items_title">
                    <p>Items</p>
                    <p>Title</p>
                    <p>Price</p>
                    <p>Quantity</p>
                    <p>Total</p>
                    <p>Remove</p>
                </div>
                <br />
                <hr />
                {
                    food_list.map((item, index) => {
                        if (cartItems[item._id] > 0) {
                            return (
                                <div key={index}>

                                    <div className="cart_items_title cart_items_item">
                                        <img src={item.image} alt="" />
                                        <p>{item.name}</p>
                                        <p>${item.price}</p>
                                        <p>{cartItems[item._id]}</p>
                                        <p>${item.price * cartItems[item._id]}</p>
                                        <p className="cross" onClick={()=>removeFromCart(item._id)}>x</p>
                                    </div>
                                    <hr />
                                </div>
                            )
                        }
                    })
                }
            </dic>
            <div className="cart_bottom">
                <div className="cart_total">
                    <h2>Cart Total</h2>
                    <div>
                        <div className="cart_total_details">
                            <p>Subtotal</p>
                            <p>${getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className="cart_total_details">
                            <p>Delivery fee</p>
                            <p>${getTotalCartAmount()===0?0:5}</p>
                        </div>
                        <hr />
                        <div className="cart_total_details">
                            <b>Total</b>
                            <b>${getTotalCartAmount()===0?0:getTotalCartAmount()+5}</b>
                        </div>
                    </div>
                        <button onClick={()=>navigate('/order')} >PROCEED TO CHECHOUT</button>
                </div>
                <div className="cart_promo_code">
                    <div>
                        <p>If you have a promo code, Enter it here</p>
                        <div className="cart_promo_code_input">
                            <input type="text" placeholder='promo code' />
                            <button>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Cart