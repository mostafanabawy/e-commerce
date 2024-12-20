import axios from "axios";
import { createContext, useContext, useState } from "react";
import { UserContext } from './../UserContext/User.context';
import toast from './../../../node_modules/react-hot-toast/src/index';

export let CartContext = createContext(null)
//let [productDetail, setProductDetail] = useState(null);
export default function CartProvider({ children }) {
    let [cartInfo, setCartInfo] = useState(null);
    let { token } = useContext(UserContext)
    async function addToCart(id) {
        let tost1 = toast.loading("adding product to cart...")
        try {
            let options = {
                url: "https://ecommerce.routemisr.com/api/v1/cart",
                method: "POST",
                headers: {
                    token
                },
                data: {
                    productId: id
                }
            }
            let { data } = await axios.request(options);
            if (data.status === "success") {
                await getCartProducts();
                toast.success("product added !!!")
            }
        } catch (error) {
            console.log(error);
        } finally {
            toast.dismiss(tost1)
        }

    }
    async function getCartProducts() {
        let options = {
            headers: {
                token
            },
            url: "https://ecommerce.routemisr.com/api/v1/cart",
            method: "GET"
        }
        let { data } = await axios.request(options);
        setCartInfo(data);
    }
    async function updateItemCount(count, id) {
        let tost1 = toast.loading("updating product count...")
        try {
            let options = {
                url: `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
                method: "PUT",
                headers: {
                    token
                },
                data: {
                    count
                }
            }
            let { data } = await axios.request(options);
            await getCartProducts();
            toast.success("product count updated!!!")
        } catch (error) {
            console.log(error);
        } finally {
            toast.dismiss(tost1)
        }
    }
    async function removeItem(id) {
        let tost1 = toast.loading("removing product...")
        try {
            let options = {
                url: `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
                method: "DELETE",
                headers: {
                    token
                }
            }
            let { data } = await axios.request(options);
            console.log(data);
            await getCartProducts();
            toast.success("product removed!!!")
        } catch (error) {
            console.log(error);
        }finally{
            toast.dismiss(tost1)
        }
    }

    return <CartContext.Provider value={{
        cartInfo,
        addToCart,
        getCartProducts,
        updateItemCount,
        removeItem
    }}>

        {children}
    </CartContext.Provider>
}