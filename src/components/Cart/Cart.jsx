import { useContext, useEffect } from "react"
import CartItem from "../CartItem/CartItem"
import { CartContext } from "../../Context/CartContext/Cart.context"
import { Link } from "react-router-dom";

function Cart() {
    let { cartInfo, getCartProducts } = useContext(CartContext);
    useEffect(() => {
        getCartProducts();
    }, [])
    return <>
        {cartInfo ? cartInfo.numOfCartItems === 0 ?
            <div className="p-5 mt-5 ">
                <div className="flex  bg-white">
                    <h2 className="font-bold text-2xl">Your Cart :</h2>
                </div>
                <div className="bg-slate-100 w-3/4 mx-auto px-5 pt-1 pb-3 rounded shadow-sm mt-3">
                    <div className="flex flex-col justify-center items-center mt-3">
                        <p className="text-sm text-center mb-2">oops! No items in cart yet. Start shopping now by clicking the button below and find something you love!</p>
                        <Link to="/" className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-500">BACK TO HOME</Link>
                    </div>
                </div>
            </div>
            :
            <div className="p-5 mt-5">
                <div className="flex">
                    <h2 className="font-bold text-2xl">Your Cart :</h2>
                    <Link to="/checkout" className="ml-auto bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-500">Checkout</Link>
                </div>
                <div className="flex justify-between mt-3">
                    <p className="text-[var(--main-color)]">Total Price : {cartInfo.data.totalCartPrice}</p>
                    <p>total number of items: <span className="text-[var(--main-color)]">{cartInfo.numOfCartItems}</span></p>
                </div>
                {cartInfo && cartInfo.data.products.map((product) => <CartItem itemData={product} key={product.id} />)}
            </div> : <div className='text-center'><i className="fa-solid fa-spinner fa-spin" aria-hidden="true"></i></div>}
    </>
}

export default Cart
