import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation } from 'swiper/modules';
import CardBook from "./cardBook";
import { useGetWholeBooksQuery } from "../../redux/features/bookApi";
import Loading from "../loading";
const RecommendedBooks = () => {
    const {data,isError,isLoading} = useGetWholeBooksQuery()
    if(isLoading) return <Loading/>
    const recommended_for_you = data?.filter((book)=>book.offer == true)||[]

    return (
    <section className=" mb-24 ">
        <h1 className="text-3xl font-semibold mt-14 mb-7">Recommended For You</h1>
        <Swiper
      // install Swiper modules
    autoplay={{
        delay:3000
    }}
    modules={[Navigation,Autoplay]}
    spaceBetween={0}
    navigation={{
        nextEl: '.custom-button-next',
        prevEl: '.custom-button-prev',
    }}
    loop={true}
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
    {
        recommended_for_you.length >0 && recommended_for_you.map((book)=>(
            <SwiperSlide key={book._id} >
                    <CardBook book={book}/>
            </SwiperSlide>
        
    ))
    }

        {!recommended_for_you || recommended_for_you.length<1 && <div className='text-red-600 text-xl font-bold'>No Books Have Offers Added Yet</div>}

    <div className="custom-button-prev">‹</div>
    <div className="custom-button-next">›</div>
    
    </Swiper>
    </section>
    )
}

export default RecommendedBooks