import axios from "axios";
import { createContext, useContext } from "react";
import { UserContext } from "../UserContext/User.context";


export let ProductsContext = createContext(null);
export default function ProductsProvider({children}) {
    let {token} = useContext(UserContext)
    async function getProducts() {
        let options = {
            url: "https://ecommerce.routemisr.com/api/v1/products",
            method: "GET"
        }
        return axios.request(options);
    }
    async function getLoggedWishlist() {
        let options = {
            url: "https://ecommerce.routemisr.com/api/v1/wishlist",
            method: "GET",
            headers: {
                token
            }
        }
        return axios.request(options);
    }

    return <ProductsContext.Provider value = {{
        getProducts,
        getLoggedWishlist
        }}>
        {children}
    </ProductsContext.Provider>
    
}