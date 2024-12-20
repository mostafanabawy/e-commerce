import x from "../../assets/images/blog-img-1.jpeg"
function SingleOrder({ orderData }) {
    let { id, cartItems, isPaid, isDelivered, totalOrderPrice, } = orderData;
    return <>
        <div className="p-4 mb-5 rounded-md border-2 border-gray-500 border-opacity-25">
            <header className="flex items-center justify-between">
                <div>
                    <h2 className="text-gray-500">Order Id</h2>
                    <span className="text-lg font-semibold text-gray-700">#{id}</span>
                </div>
                <div>
                    <span className={"inline-block px-3 text-white font-semibold rounded-full p-1 pt-0 hover:bg-blue-600 "  + (isPaid? "bg-green-600": "bg-red-500")}>
                        {isPaid?  "payed" :"not payed"}
                    </span>
                    <span className="inline-block px-3 bg-blue-500 text-white font-semibold rounded-full ms-2 p-1 pt-0 hover:bg-blue-600">
                        {isDelivered? "delivered" : "not delivered yet"}
                    </span>
                </div>
            </header>
            <div className="grid sm:grid-cols-1 md:grid-cols-4 md:gap-6 lg:grid-cols-5 xl:grid-cols-6">
                {cartItems? cartItems.map((curr) => <div key={curr._id} className="product-item mt-5 border-2 border-gray-400 border-opacity-30 p-4 rounded-lg shadow-md">
                    <img src={curr.product.imageCover} alt="" className="sm:w-1/2 sm:mx-auto md:w-full" />
                    <h3 className=" font-semibold">product name</h3>
                    <div className="flex justify-between items-center">
                        <p className="font-semibold text-slate-500-700">Count: {curr.count}</p>
                        <span className="font-semibold text-slate-500-700">{curr.price} L.E</span>
                    </div>
                </div>): <div className='text-center'><i className="fa-solid fa-spinner fa-spin" aria-hidden="true"></i></div>}
            </div>
        </div>
    </>
}

export default SingleOrder
