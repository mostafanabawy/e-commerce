import { useFormik } from "formik"
import { useContext, useState } from "react"
import { UserContext } from './../../Context/UserContext/User.context';
import { CartContext } from "../../Context/CartContext/Cart.context";
import axios from "axios";

function Checkout() {
    let { token } = useContext(UserContext);
    let { cartInfo, getCartProducts } = useContext(CartContext);
    let [paymentMethod, setPaymentMethod] = useState(null);
    let formik = useFormik({
        initialValues: {
            shippingAddress: {
                details: "",
                phone: "",
                city: ""
            }
        },
        onSubmit: (values)=>{
            if(paymentMethod === "cash"){
                checkoutCash(values);
            }else{
                checkoutOnline(values);
            }
        }
    })

    async function checkoutCash(values) {
        try {
            let options = {
                url: `https://ecommerce.routemisr.com/api/v1/orders/${cartInfo.cartId}`,
                method: "POST",
                headers: {
                    token
                },
                data: values
            }
            let { data } = await axios.request(options);
            getCartProducts();
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }
    async function checkoutOnline(values) {
        try {
            let options = {
                url: `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartInfo.cartId}?url=${location.origin}`,
                method: "POST",
                headers: {
                    token
                },
                data: values
            }
            let { data } = await axios.request(options);
            console.log(data);
            if (data.status === "success") {
                setTimeout(() => {
                    location.href = data.session.url;
                }, 2000)
            }
        } catch (error) {
            console.log(error);
        }
    }
    return <>
        <div className="p-5">
            <h1 className="text-2xl">Shipping Address</h1>
            <form onSubmit={formik.handleSubmit} >
                <div>
                    <input type="text" id="shippingAddress.city" placeholder="City" value={formik.values.shippingAddress.city} onChange={formik.handleChange}
                        className="mt-3 border-2 border-slate-300 w-full p-1 rounded-md" />
                </div>
                <div>
                    <input type="tel" id="shippingAddress.phone" placeholder="phone"
                        className="mt-3 border-2 border-slate-300 w-full p-1 rounded-md" value={formik.values.shippingAddress.phone} onChange={formik.handleChange} />
                </div>
                <div>
                    <textarea id="shippingAddress.details" placeholder="details" value={formik.values.shippingAddress.details} onChange={formik.handleChange}
                        className="mt-3 border-2 border-slate-300 w-full p-1 rounded-md"></textarea>
                </div>

                <button className="bg-blue-600 text-white p-2 rounded-md" onClick={()=>{setPaymentMethod("cash")}} type="submit">Cash Order</button>
                <button className="bg-green-600 text-white ms-3 p-2 rounded-md" onClick={()=>{setPaymentMethod("online")}} type="submit">Pay Online</button>

            </form> 
        </div>
    </>
}

export default Checkout
