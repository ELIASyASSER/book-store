import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Navigation } from 'swiper/modules';
import i1 from "../../../assets/upcoming.webp"
import i2 from "../../../assets/upcoming2.jpg"
const UpcomingBooks = () => {
    
    
    return (
    
    <section >
        <h1 className="text-3xl font-semibold mt-14">Upcoming Books</h1>
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
        600: {
        slidesPerView: 1,
        spaceBetween: 10,
        },
        768: {
        slidesPerView: 1,
        spaceBetween: 40,
        },
        1024: {
        slidesPerView: 1,
        spaceBetween: 50,
        },
        1180:{
            slidesPerView:1,
            spaceBetween:20,
        }
        }}
    >
        <SwiperSlide >
          <section>
            <div className='w-16'>
              <img src={i1} alt=""  className='w-16 h-16'/>
            </div>
          </section>
        </SwiperSlide>


    <div className="custom-button-prev">‹</div>
    <div className="custom-button-next">›</div>
        </Swiper>
    </section>
  )
}

export default UpcomingBooks