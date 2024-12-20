import { useQuery } from "@tanstack/react-query"
import { useContext, useEffect, useState } from "react"
import { ProductsContext } from "../../Context/Products/Products.context"
import Card from "../Card/Card";

function Products() {
    let { getProducts, getLoggedWishlist } = useContext(ProductsContext);
    const [query, setQuery] = useState("")
    const [filtered, setFiltered] = useState(null)
    let wishlistQuery = useQuery({
        queryKey: ['wishlist'],
        queryFn: getLoggedWishlist
    })
    let { data, isLoading, isError } = useQuery({
        queryKey: ['products'],
        queryFn: getProducts
    })
    useEffect(()=>{
        if(data){
            setFiltered(data.data.data.filter((product) =>
                product.title.toLowerCase().includes(query.toLowerCase())
        ))
    }
    },[data, query])

    
    if (isError === true) {
        return <div>Error fetching data</div>
    }
    if (isLoading === true || wishlistQuery.isLoading === true) {
        return <>
            <div className="p-5">
                <div className="grid grid-cols-12">
                    <input type="search" id="" placeholder="write product name"
                        className="border-2 border-gray-500 border-opacity-30 p-1 pt-0 rounded-md me-1 col-span-11" />
                    <button className="px-1 pb-1 pt-0 bg-green-600 text-white hover:bg-green-700 rounded-md">Search</button>
                </div>
            </div>
            <div className='text-center'><i className="fa-solid fa-spinner fa-spin" aria-hidden="true"></i></div>
        </>
    }
    if (data) {
        return <>
            <div className="p-5">
                <div className="grid grid-cols-12">
                    <input type="search" id="" placeholder="write product name"
                        className="border-2 border-gray-500 border-opacity-30 p-1 pt-0 rounded-md me-1 col-span-11"
                        value={query}
                        onChange={(e) => { setQuery(e.target.value) }} />
                    <button className="px-1 pb-1 pt-0 bg-green-600 text-white hover:bg-green-700 rounded-md"
                        onClick={(e) => { setQuery(e.target.previousElementSibling.value);}}>Search</button>
                </div>
                <div className="grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-3">
                    {filtered? filtered.map(product => <Card cardData={product} key={product._id}  wishlistData={wishlistQuery}/>): ""}
                </div>
            </div>
        </>
    }
}

export default Products
