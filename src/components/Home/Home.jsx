import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import "swiper/css/autoplay"; // Styles for Autoplay
import "swiper/css/pagination"; // Styles for Pagination
import "swiper/css/navigation"; // Styles for Navigation
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import sw from "./Home.module.css"
import slider1 from "../../assets/images/slider-image-3.jpeg"
import slider2 from "../../assets/images/slider-image-1.jpeg"
import slider3 from "../../assets/images/slider-image-2.jpeg"
import slider4 from "../../assets/images/slider-2.jpeg"
import axios from "axios"
import Card from '../Card/Card';
import CategorySlider from './../CategorySlider/CategorySlider';
import { useQuery } from '@tanstack/react-query';
import { useContext, useEffect } from 'react';
import { CartContext } from '../../Context/CartContext/Cart.context';
import { ProductsContext } from '../../Context/Products/Products.context';
function Home() {
    let {getCartProducts} = useContext(CartContext);
    let {getProducts, getLoggedWishlist} = useContext(ProductsContext);
    useEffect(()=>{
        getCartProducts();
    },[])
    
    async function getCategories() {
        let options = {
            url: "https://ecommerce.routemisr.com/api/v1/categories",
            method: "GET"
        }
        return axios.request(options);

    }
    

    let productQuery = useQuery({
        queryKey: ['products'],
        queryFn: getProducts
    })
    let wishlistQuery = useQuery({
        queryKey: ['loggedWishlist'],
        queryFn: getLoggedWishlist
    })
    let categoryQuery = useQuery({
        queryKey: ['categories'],
        queryFn: getCategories
    })
    if (productQuery.isLoading === true || categoryQuery.isLoading === true || wishlistQuery.isLoading === true) {
        return <div className='text-center'><i className="fa-solid fa-spinner fa-spin" aria-hidden="true"></i></div>
    }
    if (productQuery.error || categoryQuery.error) {
        return <div>Error: {productQuery.error?.message || categoryQuery.error?.message}</div>
    }
    return <>
        <div className='grid md:grid-cols-12 p-4'>
            <div className='col-span-12'>
                <Swiper
                    loop={true}
                    spaceBetween={40}
                    slidesPerView={1}
                    autoplay={{
                        delay: 7000,
                        disableOnInteractionChange: false
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Autoplay, Pagination, Navigation]}
                    className={"w-full " + sw.theSwiper}
                >
                    <SwiperSlide><img src={slider1} className='object-contain h-96 w-full' alt="" /></SwiperSlide>
                    <SwiperSlide><img src={slider2} className='object-contain h-96 w-full' alt="" /></SwiperSlide>
                    <SwiperSlide><img src={slider3} className='object-contain h-96 w-full' alt="" /></SwiperSlide>
                    <SwiperSlide><img src={slider4} className='object-contain h-96 w-full' alt="" /></SwiperSlide>
                </Swiper>

            </div>
        </div>
        <div className='p-4'>
            <h2 className='font-bold text-lg'>Categories</h2>
            {<CategorySlider categoryInfo={categoryQuery.data.data.data} />}
        </div>
        <div className='p-4'>
            <h2 className='font-bold text-lg'>Browse Products</h2>
            <div className="grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {productQuery.data.data.data.map(product => <Card cardData={product} key={product._id}   wishlistData = {wishlistQuery}/>)}
            </div>
        </div>
    </>
}

export default Home
