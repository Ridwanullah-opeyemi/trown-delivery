import { createContext } from "react";
import { useState, useEffect } from "react";
import axios from "axios"

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState({});
    const url = "http://localhost:4002"
    const [token, setToken] = useState("")
    const [food_list, setFood_list] = useState([])


    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
        }
        else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }
        if (token) {
            await axios.post(url+"/api/cart/add", {itemId},{headers:{token}})
        }
    }

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
        if (token) {
            await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
        }
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemIfo = food_list.find((product) => product._id === item);
                if (itemIfo) {
                    totalAmount += itemIfo.price * cartItems[item];
                }
            }
        }
        return totalAmount;
    }

    const fetchFood_list = async () => {
        const res = await axios.get(url + "/api/food/list")
        setFood_list(res.data.data)
        console.log(res);
        
    }

    const loadCartData =async (token) => {
        const res = await axios.post(url+"/api/cart/get",{},{headers:{token}});
        setCartItems(res.data.cartData);
    }

    useEffect(() => {

        async function loaData() {
            await fetchFood_list()
            console.log("loading data");
            
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"))
            }
        }
        loaData();
    }, [])

    const contextValue = {
        food_list,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        setCartItems,
        cartItems,
        url,
        token,
        setToken
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider