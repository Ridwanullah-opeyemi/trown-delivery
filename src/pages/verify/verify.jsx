import {useNavigate, useSearchParams} from 'react-router-dom'
import "./verify.css"
import { StoreContext } from '../../contexts/storeContexts';
import { useContext } from 'react';
import axios from 'axios';
import { useEffect } from 'react';

const Verify = ()=>{

    const [searchParams,setSearchParams] = useSearchParams();
    // const cancel
    const success = searchParams.get("success")
    const orderId = searchParams.get("orderId")
    
    const {url} = useContext(StoreContext)
    const navigate = useNavigate();

    const verifyPayment = async () => {
        const res = await axios.post(url+"/api/order/verify",{success,orderId});
        if (res.data.success) {
            navigate("/myorders")
        }
        else{
            navigate("/")
        }
    }
    
    useEffect(()=>{
        verifyPayment();
    },[])

    return (
        <div className="verify">
            <div className="spinner">

            </div>
        </div>
    )
}

export default Verify