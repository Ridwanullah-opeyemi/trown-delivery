import { assets } from '../../assets/assets'
import './foodItem.css'
import { useContext } from 'react'
import { StoreContext } from '../../contexts/storeContexts'


const FoodItem = ({ id, name, price, description, image }) => {

    const { addToCart, removeFromCart, cartItems } = useContext(StoreContext);

    return (
        <div className="FoodItem">
            <div className="food_item_image_containar">
                <img src={image} alt="" className="food_item_image" />
                {
                    !cartItems[id]
                        ? <img className="add" onClick={() => addToCart(id)} src={assets.add_icon_white} alt="" />
                        : <div className="food_item_containar">
                            <img onClick={() => removeFromCart(id)} src={assets.remove_icon_red} alt="" />
                            <p>{cartItems[id]}</p>
                            <img onClick={() => addToCart(id)} src={assets.add_icon_green} alt="" />
                        </div>
                }
            </div>
            <div className="food_item_info">
                <div className="food_item_name_rating">
                    <p>{name}</p>
                    <img src={assets.rating_starts} alt="" />
                </div>
                <p className="food_item_desc">{description}</p>
                <p className="food_item_price">${price}</p>
            </div>
        </div>
    )
}


export default FoodItem