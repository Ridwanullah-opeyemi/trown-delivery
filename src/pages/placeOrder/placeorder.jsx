import { useContext } from 'react'
import './placeorder.css'
import { StoreContext } from '../../contexts/storeContexts'


const Placeorder = () => {

    const {getTotalCartAmount} = useContext(StoreContext)

  return (
    <div className="Placeorder">
        <form className="place_order">
            <div className="place_left">
                <p className="title">Delivary Information</p>
                <div className="multi_fields">
                    <input type="text" name="" id="" Placeholder="First Name" />
                    <input type="text" name="" id="" Placeholder="last Name" />
                </div>
                <input type="email" name="" id="" Placeholder="email address" />
                <input type="text" name="" id="" Placeholder="street" />
                <div className="multi_fields">
                    <input type="text" name="" id="" Placeholder="City" />
                    <input type="text" name="" id="" Placeholder="State" />
                </div>
                <div className="multi_fields">
                    <input type="text" name="" id="" Placeholder="Zip code" />
                    <input type="text" name="" id="" Placeholder="Country" />
                </div>
                <input type="text" name="" id="" Placeholder="Phone"/>
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
            </div>
        </form>
    </div>
  )
}

export default Placeorder