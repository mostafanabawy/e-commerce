import axios from "axios";
import { useContext, useEffect, useState } from "react"
import { UserContext } from './../../Context/UserContext/User.context';
import SingleOrder from "../SingleOrder/SingleOrder";
import toast from './../../../node_modules/react-hot-toast/src/index';
import {jwtDecode} from "jwt-decode"

function AllOrders() {
    let [allOrders, setAllOrders] = useState(null);
    let {token} = useContext(UserContext);
    let {id} = jwtDecode(token)
    async function getAllORders() {
        let options = {
            url: `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`,
            method: "GET"
        }
        let {data} = await axios.request(options);
        console.log(data);
        setAllOrders(data);
    }
    useEffect(() => {
        getAllORders();
    }, [])
    return <>
        <div className="p-5">
        {allOrders? allOrders.map((curr) => <SingleOrder orderData = {curr} key= {curr.id}/> ) : 
        <div className='text-center'><i className="fa-solid fa-spinner fa-spin" aria-hidden="true"></i></div> }
        </div>
    </>
}

export default AllOrders
