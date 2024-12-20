import { Link, NavLink } from "react-router-dom"
import logo from "../../assets/images/favicon.png"
import { useContext } from "react"
import { UserContext } from './../../Context/UserContext/User.context';
import { CartContext } from "../../Context/CartContext/Cart.context";
function Navbar() {
    let {logout, token} = useContext(UserContext);
    let {cartInfo} = useContext(CartContext)
    return <>
        <nav className={"flex items-center p-5 bg-slate-100 " + (!token ? "justify-between" : "justify-center")}>
            <NavLink to="/"><img src={logo} className="w-9" alt="" /></NavLink>
            <ul className={"flex gap-3 " + (!token ? "hidden" : "")}>
                <li><NavLink className="text-slate-700" to="/home"></NavLink></li>
                <li><NavLink className="text-slate-700" to="/products">Search</NavLink></li>
                <li><NavLink className="text-slate-700" to="/categories">Categories</NavLink></li>
                <li><NavLink className="text-slate-700" to="/brands">Brands</NavLink></li>
                <li><NavLink className="text-slate-700" to="/allorders">Orders</NavLink></li>
                <li><NavLink className="text-slate-700" to="/wishlist">Wishlist</NavLink></li>
            </ul>
            <div className={"flex gap-3 ms-auto relative " + (!token ? "hidden" : "")}>
                <Link to="/cart" >
                    <i className="fa-solid fa-cart-shopping text-lg"></i>
                    <span className="absolute top-0 end-0 h-4 w-4 flex items-center justify-center translate-x-1/2 -translate-y-1/2 text-white bg-[var(--main-color)] rounded-full">{cartInfo?cartInfo.numOfCartItems  :"0"}</span>
                </Link>
            </div>
            <ul className="flex gap-3">
                <li><Link className={"text-slate-700 " + (token ? "hidden" : "")} to="/login">Login</Link></li>
                <li><Link className={"text-slate-700 " + (token ? "hidden" : "")} to="/sign-up">Sign Up</Link></li>
                <li className={!token? "hidden" :""}><i className="fa-solid fa-right-from-bracket cursor-pointer text-2xl" onClick={logout}></i></li>
            </ul>
        </nav>
    </>
}

export default Navbar
