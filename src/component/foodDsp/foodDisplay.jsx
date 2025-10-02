import { useContext } from 'react'
import './foodDisplay.css'
import { StoreContext } from '../../contexts/storeContexts'
import FoodItem from '../foodItem/foodItem'


const FoodDisplay = ({category}) => {


    const {food_list} = useContext(StoreContext)


    return (
    <div className="FoodDisplay" id="FoodDisplay">
        <h2>Top dishes near you</h2>
        <div className="food_display_list">
            {
                food_list.map((item,index)=>{
                    if (category === "All" || category === item.category) {
                        return <FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image} />
                    }
                })
            }
        </div>
    </div>
  )
}



export default FoodDisplay