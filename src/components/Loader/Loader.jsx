import x from "../../assets/images/favicon.png"
function Loader() {
    return <>
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="relative flex items-center justify-center w-20 h-20">
                <div className="absolute w-full h-full border-4 border-t-blue-500 border-r-transparent border-b-blue-500 border-l-transparent rounded-full animate-spin"></div>
                <img
                    src={x} 
                    alt="Site Icon"
                    className="w-12 h-12"
                />
            </div>
        </div>
    </>
}

export default Loader




