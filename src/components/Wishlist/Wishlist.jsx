import { useContext } from "react"
import { ProductsContext } from "../../Context/Products/Products.context"
import { useQuery } from "@tanstack/react-query";
import { UserContext } from "../../Context/UserContext/User.context";
import axios from "axios";
import toast from './../../../node_modules/react-hot-toast/src/index';
import { CartContext } from "../../Context/CartContext/Cart.context";

function Wishlist() {
    let { getLoggedWishlist } = useContext(ProductsContext);
    let { token } = useContext(UserContext);
    let {addToCart} = useContext(CartContext);
    let wishlistQuery = useQuery({
        queryKey: "getLoggedWishlist",
        queryFn: getLoggedWishlist
    })
    async function removeItem(id) {
        let id1 = toast.loading("Removing item...")
        try {
            let options = {
                url: `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
                method: "DELETE",
                headers: {
                    token
                }
            }
            let { data } = await axios.request(options);
            console.log(data);
            if (data.status === "success") {
                wishlistQuery.refetch();
                toast.success("Item removed successfully!")
            }
        } catch (error) {
            console.log(error);
        }
        toast.dismiss(id1);

    }
    if (wishlistQuery.isLoading) {
        return <div className='text-center'><i className="fa-solid fa-spinner fa-spin" aria-hidden="true"></i></div>
    }
    return <>
        <div className="p-5 mt-10">
            <h2 className="text-2xl w-3/4 mx-auto mb-5">My Wish List</h2>
            <div className="px-10 w-4/5 mx-auto">
                {wishlistQuery.data.data.data.map((item) => <div key={item._id} className="border-b-[1px] pb-4 grid md:grid-cols-4 items-center justify-items-center">
                    <div className="my-4">
                        <img className="w-[200px]" src={item.imageCover} alt={item.title} />
                    </div>
                    <div className="col-span-2 justify-self-start">
                        <h3>{item.title}</h3>
                        <p>{item.price} L.E</p>
                        <button className="cursor-pointer mt-3" onClick={() => { removeItem(item._id) }}>
                            <i className="fa-solid fa-trash-can text-[var(--main-color)]" aria-hidden="true"></i>
                            <span className="ms-1 text-slate-700">Remove</span>
                        </button>
                    </div>
                    <div className="col-span-1">
                        <button onClick={()=>{addToCart(item._id)}}
                            className="px-3 py-1 rounded-md border-2 border-[var(--main-color)]">add to Cart</button>
                    </div>
                </div>)}
            </div>
        </div>
    </>
}

export default Wishlist
