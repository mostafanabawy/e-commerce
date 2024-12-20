import { useNavigate } from "react-router-dom";

function SingleCategory({ categoryData }) {
    let { image, name, _id } = categoryData;
    let navigate = useNavigate()
    return <>
        <div className="border-[1px] border-opacity-30 border-black shadow-md hover:shadow-xl transition-all cursor-pointer" onClick={(e) => { navigate(`/sub-category/${_id}`, { state: name }) }}>
            <div className="overflow-hidden">
                <img src={image} alt="" className="w-full h-80 object-cover hover:transform hover:scale-110 transition-all" />
            </div>
            <h2 className="text-center text-2xl py-1 text-[var(--main-color)]">{name}</h2>
        </div>
    </>
}

export default SingleCategory
