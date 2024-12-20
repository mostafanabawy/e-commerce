import { Link, NavLink } from "react-router-dom"
import logo from "../../assets/images/favicon.png"
import { useContext, useState } from "react"
import { UserContext } from './../../Context/UserContext/User.context';
import { CartContext } from "../../Context/CartContext/Cart.context";
function Navbar() {
    let { logout, token } = useContext(UserContext);
    let { cartInfo } = useContext(CartContext);
    const [menuOpen, setMenuOpen] = useState(false);
    return <>
        <nav className={`flex items-center p-5 bg-slate-100 relative ${!token ? "justify-between" : "justify-center"}`}>
            <NavLink to="/">
                <img src={logo} className="w-9" alt="Logo" />
            </NavLink>

            <button
                className="sm:block md:hidden text-slate-700 ms-auto"
                onClick={() => setMenuOpen(!menuOpen)}
            >
                <i className={`fa-solid ${menuOpen ? "fa-times" : "fa-bars"} text-2xl`}></i>
            </button>

            <ul
                className={`${menuOpen ? "flex" : "hidden"
                    } md:flex gap-3 absolute sm:absolute md:static top-full left-0 w-full transition-all md:w-auto bg-slate-100 p-5 md:py-0 shadow-md md:shadow-none z-50`}
            >
                <li>
                    <NavLink className="text-slate-700" to="/home">Home</NavLink>
                </li>
                <li>
                    <NavLink className="text-slate-700" to="/products">Search</NavLink>
                </li>
                <li>
                    <NavLink className="text-slate-700" to="/categories">Categories</NavLink>
                </li>
                <li>
                    <NavLink className="text-slate-700" to="/brands">Brands</NavLink>
                </li>
                <li>
                    <NavLink className="text-slate-700" to="/allorders">Orders</NavLink>
                </li>
                <li>
                    <NavLink className="text-slate-700" to="/wishlist">Wishlist</NavLink>
                </li>
            </ul>

            <div className={`flex gap-3 ms-auto relative ${!token ? "hidden" : ""}`}>
                <Link to="/cart">
                    <i className="fa-solid fa-cart-shopping text-lg"></i>
                    <span className="absolute top-0 end-0 h-4 w-4 flex items-center justify-center translate-x-1/2 -translate-y-1/2 text-white bg-[var(--main-color)] rounded-full">
                        {cartInfo ? cartInfo.numOfCartItems : "0"}
                    </span>
                </Link>
            </div>

            <ul className="flex gap-3">
                <li>
                    <Link className={`text-slate-700 ${token ? "hidden" : ""}`} to="/login">Login</Link>
                </li>
                <li>
                    <Link className={`text-slate-700 ${token ? "hidden" : ""}`} to="/sign-up">Sign Up</Link>
                </li>
                <li className={!token ? "hidden" : ""}>
                    <i
                        className="fa-solid fa-right-from-bracket cursor-pointer text-2xl"
                        onClick={logout}
                    ></i>
                </li>
            </ul>
        </nav>
    </>
}

export default Navbar
