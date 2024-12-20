import { useContext } from "react";
import { CartContext } from "../../Context/CartContext/Cart.context";

function CartItem({itemData}) {
    let {updateItemCount, removeItem} = useContext(CartContext);
    let {price, product, count} = itemData;
    let {category, imageCover, title, _id, ratingsAverage} = product;
    console.log(imageCover);
    return <>
        <div className="bg-slate-100 grid grid-cols-12 items-center p-2 rounded-md overflow-hidden shadow-md mt-2">
            <div className="grid grid-cols-12 gap-2 col-span-11">
                <figure className="overflow-hidden rounded-full col-span-1 ">
                    <img src={imageCover} className="w-full" alt="" />
                </figure>
                <div className="col-span-11 ms-1">
                    <h2 className="text-slate-700 mt-3">{title}</h2>
                    <p className="text-[var(--main-color)]">Price : {price}</p>
                    <button className="cursor-pointer mt-3" onClick={()=>{removeItem(_id)}}>
                        <i className="fa-solid fa-trash-can text-[var(--main-color)]" aria-hidden="true"></i>
                        <span className="ms-1 text-slate-700">Remove</span>
                    </button>
                </div>
            </div>
            <div className="flex items-center col-span-1">
                <div className="border-2 rounded-md h-7 w-5 flex items-center justify-center  border-[var(--main-color)] p-1">
                    <i className="fa-solid text-slate-700 fa-plus text-[10px] cursor-pointer" aria-hidden="true" onClick={()=>{updateItemCount(count+1, _id)}}></i>
                </div>
                <span className="mx-1">{count}</span>
                <div className="border-2  rounded-md h-7 w-5 flex items-center justify-center border-[var(--main-color)] p-1">
                    <i className="fa-solid text-slate-700 fa-minus text-[10px] cursor-pointer" aria-hidden="true" onClick={()=>{updateItemCount(count-1, _id)}}></i>
                </div>
            </div>
        </div>
    </>
}

export default CartItem
