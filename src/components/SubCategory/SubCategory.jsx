import { useQuery } from "@tanstack/react-query"
import axios from "axios";
import { useState } from "react";
import { useLocation, useParams } from "react-router-dom"

function SubCategory() {
    const location = useLocation();
    const { state } = location;
    let [categoryName, setCategoryName] = useState(state)
    let { id } = useParams()
    console.log("categoryName: " + categoryName);
    async function getSubCategory() {
        let options = {
            url: `https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`,
            method: "GET"
        }
        return axios.request(options);
    }
    let subQuery = useQuery({
        queryKey: ['subCategory'],
        queryFn: getSubCategory
    })
    if (subQuery.isLoading === true) {
        return <div className='text-center'><i className="fa-solid fa-spinner fa-spin" aria-hidden="true"></i></div>
    } else {
        console.log(subQuery.data.data);
    }
    return <>
        <h2 className="text-center text-[var(--main-color)] text-2xl font-semibold mt-10 mb-4">{categoryName}</h2>
        <div className="grid sm:grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-3 w-4/5 mx-auto">
            {subQuery.data.data.data.map((subCat) =>
                <div key={subCat._id} className="border-[1px] p-2 shadow-sm">
                    <h3 className="text-center text-lg font-semibold">{subCat.name}</h3>
                </div>
            )}
        </div>
    </>
}

export default SubCategory
