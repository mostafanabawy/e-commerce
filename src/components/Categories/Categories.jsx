import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import SingleCategory from "../SingleCategory/SingleCategory";

function Categories() {
    async function getCategories() {
        let options = {
            url: "https://ecommerce.routemisr.com/api/v1/categories",
            method: "GET"
        }
        return await axios.request(options);
    }
    let categoriesQuery = useQuery({
        queryKey: ['categoriesPage'],
        queryFn: getCategories
    })

    if (categoriesQuery.isLoading === true) {
        return <div className='text-center'><i className="fa-solid fa-spinner fa-spin" aria-hidden="true"></i></div>
    }else{
        console.log(categoriesQuery.data.data);
    }
    return <>
        <div className="p-5 w-4/5 mx-auto">
            <div className="grid sm:grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-8">
                {categoriesQuery.data.data.data.map((category) => <SingleCategory categoryData={category} key={category._id} />)}
            </div>
        </div>
    </>
}

export default Categories
