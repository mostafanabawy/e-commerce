import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function Brands() {
    async function getAllBrands() {
        let options = {
            url: "https://ecommerce.routemisr.com/api/v1/brands",
            method: "GET"
        }
        return axios.request(options);
    }
    let brandsQuery = useQuery({
        queryKey: ['brands'],
        queryFn: getAllBrands
    })
    if (brandsQuery.isLoading) {
        return <div className='text-center'><i className="fa-solid fa-spinner fa-spin" aria-hidden="true"></i></div>
    } else {
        console.log(brandsQuery.data);
    }
    return <>
        <div className="p-5">
            <h2 className="text-3xl text-center text-[var(--main-color)] font-semibold mb-5">All Brands</h2>
            <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {brandsQuery.data.data.data.map((brand) => <div key={brand._id} className="border-[1px] p-4 hover:shadow-md hover:shadow-green-200">
                    <img src={brand.image} alt={brand.name} className="w-full rounded-md" />
                    <h3 className="text-center text-[var(--main-color)] font-semibold text-lg">{brand.name}</h3>
                </div>
                )}
            </div>
        </div>
    </>
}

export default Brands
