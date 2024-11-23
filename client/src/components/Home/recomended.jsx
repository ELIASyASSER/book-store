import { useEffect, useState} from "react"
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation } from 'swiper/modules';
import CardBook from "./cardBook";
import { useGetAllBooksQuery } from "../../redux/features/bookApi";
import Loading from "../loading";
const RecommendedBooks = () => {
    const {data,isError,isLoading} = useGetAllBooksQuery()
    if(isLoading) return <Loading/> 
    return (
    <section className=" mb-24">
        <h1 className="text-3xl font-semibold mt-14 mb-7">Recommended For You</h1>
        <Swiper
      // install Swiper modules
      
    modules={[Navigation]}
    spaceBetween={0}
    navigation={{
        nextEl: '.custom-button-next',
        prevEl: '.custom-button-prev',
    }}
    loop={false}
    breakpoints={{
        640: {
        slidesPerView: 1,
        spaceBetween: 20,
        },
        768: {
        slidesPerView: 2,
        spaceBetween: 40,
        },
        1024: {
        slidesPerView: 2,
        spaceBetween: 50,
        },
        1180:{
            slidesPerView:3,
            spaceBetween:50,
        }
        }}
        className="mySwiper"
    >

        {data.length >0 && data.slice(8,16).map((book)=>(
            <SwiperSlide key={book._id} >
                    <CardBook book={book}/>
            </SwiperSlide>
        ))
        }

    <div className="custom-button-prev">‹</div>
    <div className="custom-button-next">›</div>
    
    </Swiper>
    </section>
    )
}

export default RecommendedBooks