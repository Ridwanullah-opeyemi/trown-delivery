import { useContext } from 'react'
import './placeorder.css'
import { StoreContext } from '../../contexts/storeContexts'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


const Placeorder = () => {

    const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext)

    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
        phone: ""
    })

    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData(data => ({ ...data, [name]: value }))
    }

    const placeOrder = async (e) => {
        e.preventDefault()
        let orderItems = [];
        food_list.map((item) => {
            if (cartItems[item._id] > 0) {
                let itemInfo = item;
                itemInfo["quantity"] = cartItems[item._id];
                orderItems.push(itemInfo)
            }
        })
        let orderData = {
            address: data,
            items: orderItems,
            amount: getTotalCartAmount() + 2
        }
        let res = await axios.post(url+"/api/order/place",orderData,{headers: {token}});
        if (res.data.success) {
            const {session_url} = res.data;
            window.location.replace(session_url);
        }
        else{
            alert("Error")
        }
    }

    const navigate = useNavigate();

    useEffect(()=>{
        if (!token) {
            navigate('/cart')
        }
        else if(getTotalCartAmount()===0){
            navigate('/cart')
        }
    },[token])

    return (
        <div className="Placeorder">
            <form className="place_order" onSubmit={placeOrder}>
                <div className="place_left">
                    <p className="title">Delivary Information</p>
                    <div className="multi_fields">
                        <input required name="firstName" onChange={onChangeHandler} type="text" value={data.firstName} id="" Placeholder="First Name" />
                        <input required type="text" name="lastName" onChange={onChangeHandler} value={data.lastName} id="" Placeholder="last Name" />
                    </div>
                    <input required type="email" name="email" onChange={onChangeHandler} value={data.email} id="" Placeholder="email address" />
                    <input required type="text" name="street" onChange={onChangeHandler} value={data.street} id="" Placeholder="street" />
                    <div className="multi_fields">
                        <input required type="text" name="city" onChange={onChangeHandler} value={data.city} id="" Placeholder="City" />
                        <input required type="text" name="state" onChange={onChangeHandler} value={data.state} id="" Placeholder="State" />
                    </div>
                    <div className="multi_fields">
                        <input required type="text" name="zipcode" onChange={onChangeHandler} value={data.zipcode} id="" Placeholder="Zip code" />
                        <input required type="text" name="country" onChange={onChangeHandler} value={data.country} id="" Placeholder="Country" />
                    </div>
                    <input required type="text" name="phone" onChange={onChangeHandler} value={data.phone} id="" Placeholder="Phone" />
                </div>
                <div className="place_rigth">
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
                                <p>${getTotalCartAmount() === 0 ? 0 : 5}</p>
                            </div>
                            <hr />
                            <div className="cart_total_details">
                                <b>Total</b>
                                <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 5}</b>
                            </div>
                        </div>
                        <button type="submit" onClick={() => navigate('/order')} >PROCEED TO CHECHOUT</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Placeorder