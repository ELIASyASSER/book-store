import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Navigation } from 'swiper/modules';
import { useEffect, useState } from 'react';
import CardBook from './cardBook';
import { useGetAllBooksQuery } from '../../redux/features/bookApi';
import Loading from '../loading';

const TopSellers = () => {
    
    const {data:books,isError,isLoading} = useGetAllBooksQuery()
    const categories = ["choose a genre","fiction","business","horror","adventure"]
    const [selectedCategory,setSelectedCategory] = useState("choose a genre")
    const filterdBooks = selectedCategory =="choose a genre"?books:books?.filter((book)=>book.category == selectedCategory)
    if(isLoading)return <Loading/>
    if(isError)return <div>Error Happening while Fetching Data</div>
    
    return (
    
    <section >
        <h1 className="text-3xl font-semibold mt-14">Top Sellers</h1>
        <select name="sellers" id="sellers" className="my-10  bg-[#EAEAEA] py-2 px-4  font-secondary text-xl hover:outline-none outline-none" onChange={(e)=>setSelectedCategory(e.target.value)} >
            {
                categories
                .map((category,idx)=>{
                    return <option key={idx} value={category}>{category}</option>

                })
            }
        </select>
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
        slidesPerView: 2,
        spaceBetween: 40,
        },
        1024: {
        slidesPerView: 2,
        spaceBetween: 50,
        },
        1180:{
            slidesPerView:3,
            spaceBetween:20,
        }
        }}
    >
        {filterdBooks?.map((book)=>(
        <SwiperSlide key={book._id} >
            <CardBook book={book}/>
        </SwiperSlide>
        ))}

        {!books || filterdBooks?.length <1 &&<div className='text-red-600 text-xl font-bold'>No books Added Yet in This Field</div>}

    <div className="custom-button-prev">‹</div>
    <div className="custom-button-next">›</div>
        </Swiper>
    </section>
  )
}

export default TopSellers