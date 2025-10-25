import { useState } from "react"
import "./myOrder.css"
import { useContext } from "react";
import { StoreContext } from "../../contexts/storeContexts";
import axios from "axios";
import { useEffect } from "react";
import { assets } from "../../assets/assets";

const MyOrders = () => {

    const {url,token} = useContext(StoreContext)
    const [data, setData] = useState([]);

    const fetchOrders = async () => {
        const res = await axios.post(url+"/api/order/userOrders",{},{headers:{token}});
        setData(res.data.data);
    }

    useEffect(()=>{
        if (token) {
            fetchOrders();
        }
    },[token])

    return(
        <div className="MyOrders">
            <h2>My Orders</h2>
            <div className="container">
                {
                    data.map((order,index)=>{
                        return (
                            <div key={index} className='my_orders_order'>
                                <img src={assets.parcel_icon} alt="" />
                                <p>{order.items.map((item,i)=>{
                                    if (i === order.items.length-1) {
                                        return item.name+ " x " + item.quantity
                                    }
                                    else{
                                        return item.name+ " x " + item.quantity + ', '
                                    }
                                })}</p>
                                <p>${order.amount}.00</p>
                                <p>Items: {order.items.length}</p>
                                <p><span><i class="fa fa-circle" aria-hidden="true"></i></span><b>{order.status}</b></p>
                                <button onClick={fetchOrders}>Track Order</button>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default MyOrders