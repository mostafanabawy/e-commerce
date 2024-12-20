import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/CartContext/Cart.context";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../Context/UserContext/User.context";
import toast from './../../../node_modules/react-hot-toast/src/index';

function Card({ cardData, wishlistData }) {
    let { images, title, price, category, ratingsAverage, id } = cardData;
    let navigate = useNavigate();
    let { addToCart } = useContext(CartContext);
    let { token } = useContext(UserContext);
    let [wishlistItem, setWishlistItem] = useState(null);
    useEffect(()=>{
        console.log(wishlistData);
        setWishlistItem(wishlistData.data.data.data.find(item => item._id === id));
    },[])

    async function addToWishlist(id) {
        let id1 = toast.loading("adding to wishlist...")
        try {
            let options = {
                url: "https://ecommerce.routemisr.com/api/v1/wishlist",
                method: "POST",
                headers: {
                    token
                },
                data: {
                    productId: id
                }
            }
            let { data } = await axios.request(options);
            console.log(data);
            if (data.status === "success") {
                toast.success("product added !!!")
            }
        } catch (error) {
            console.log(error);
        } finally {
            toast.dismiss(id1);
        }
    }
    return <>
        <div className="overflow-hidden rounded-md shadow-lg p-2">
            <div className="relative group">
                <img src={images[0]} className="w-full object-cover" alt="" />
                <div className="overlay absolute inset-0 bg-black/15 flex gap-1 justify-center items-center opacity-0 transition-all group-hover:opacity-100 ">
                    <div className="icon w-10 h-10 rounded-full text-sm text-white flex justify-center items-center bg-[var(--main-color)]">
                        <i className={"fa-solid fa-heart cursor-pointer " + (wishlistItem ? "text-red-600" : "text-white")} aria-hidden="true" onClick={async (e) => {await addToWishlist(id); e.target.css = "font-color: red" }}></i>
                    </div>
                    <div className="icon w-10 h-10 rounded-full text-sm text-white flex justify-center items-center bg-[var(--main-color)]">
                        <i className="fa-solid fa-cart-shopping cursor-pointer" onClick={() => { addToCart(id) }} aria-hidden="true"></i>
                    </div>
                    <div className="icon w-10 h-10 rounded-full text-sm text-white flex justify-center items-center bg-[var(--main-color)]"
                    >
                        <i onClick={() => { navigate(`/product/${id}`) }} className="fa-solid fa-eye cursor-pointer" aria-hidden="true"></i>
                    </div>
                </div>
            </div>
            <div>
                <h3 className="text-[var(--main-color)] text-sm p-2 line-clamp-2">{category.name}</h3>
                <h2 className="font-semibold text-lg px-2 line-clamp-1" title={title}>{title}</h2>
                <div className="flex justify-between items-center p-2 pt-0">
                    <span>{price} L.E</span>
                    <div className="flex gap-1 items-center pe-1">
                        <i className="fa-solid fa-star text-yellow-500" aria-hidden="true"></i>
                        <span>{ratingsAverage}</span>
                    </div>
                </div>
                <button onClick={() => { addToCart(id) }} className="border-2 border-[var(--main-color)] text-green-900 hover:text-white hover:bg-[var(--main-color)] rounded-md w-full mt-1 py-1">add to cart</button>
            </div>
        </div>
    </>
}

export default Card
