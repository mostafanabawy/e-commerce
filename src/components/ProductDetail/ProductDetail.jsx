import { useParams } from "react-router-dom"
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/CartContext/Cart.context";
import axios from "axios";

function ProductDetail() {
    let { id } = useParams()
    let {addToCart} = useContext(CartContext);
    let [productDetails, setProductDetails] = useState(null);
    async function getSingleProduct() {
        let options = {
            url:`https://ecommerce.routemisr.com/api/v1/products/${id}`,
            method:"GET"
        }
        let {data} = await axios.request(options)
        console.log(data.data);
        setProductDetails(data.data);
        console.log(productDetails);
    }
    useEffect(() => {
        getSingleProduct();
    },[]);
    return <>
        {productDetails? <div className="p-5 mt-5">
            <div className="grid grid-cols-9">
                <div className="sm:col-span-9 md:col-span-3">
                    <img className="w-4/5 mx-auto h-96 object-contain" src={productDetails.images[0]} alt="" />
                </div>
                <div className="sm:col-span-9 sm:mt-5 md:col-span-5">
                    <h2>{productDetails.title}</h2>
                    <p className="text-sm text-slate-600">{productDetails.description}</p>
                    <div className="text-sm mt-2">{productDetails.category.name}</div>
                    <div className="flex justify-between items-center pt-0">
                        <span className="text-sm">{productDetails.price} L.E</span>
                        <div className="flex gap-1 items-center mt-3 text-sm">
                            <i className="fa-solid fa-star text-yellow-500 text-sm" aria-hidden="true"></i>
                            <span className="text-sm">{productDetails.ratingsAverage}</span>
                        </div>
                    </div>
                    <button onClick={()=> {addToCart(id)}} className=" text-white bg-green-700 hover:bg-green-600 rounded-md w-full mt-3 py-0">add to cart</button>
                </div>
            </div>
        </div>: <div className='text-center'><i className="fa-solid fa-spinner fa-spin" aria-hidden="true"></i></div>}
    </>
}

export default ProductDetail
