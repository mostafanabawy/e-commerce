import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
function CategorySlider({categoryInfo}) {
    return <>
        <Swiper slidesPerView={5} >
            {categoryInfo.map(category => <SwiperSlide key={category._id}><img src={category.image} className='object-cover h-52 w-full cursor-pointer' alt="" /><h2 className="text-center">{category.name}</h2></SwiperSlide>)} 
        </Swiper>
    </>
}

export default CategorySlider
