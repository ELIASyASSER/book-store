import 'swiper/css';
import { BsCart3 } from "react-icons/bs";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Navigation, Pagination } from 'swiper/modules';
import news1 from '../../assets/news/news-1.png'
import news2 from '../../assets/news/news-2.png'
import news3 from '../../assets/news/news-3.png'
import news4 from '../../assets/news/news-4.png'
const news = [
    {
        "id": 1,
        "title": "Global Climate Summit Calls for Urgent Action",
        "description": "World leaders gather at the Global Climate Summit to discuss urgent strategies to combat climate change, focusing on reducing carbon emissions and fostering renewable energy solutions.",
        "image": news1
    },
    {
        "id": 2,
        "title": "Breakthrough in AI Technology Announced",
        "description": "A major breakthrough in artificial intelligence has been announced by researchers, with new advancements promising to revolutionize industries from healthcare to finance.",
        "image": news2
    },
    {
        "id": 3,
        "title": "New Space Mission Aims to Explore Distant Galaxies",
        "description": "NASA has unveiled plans for a new space mission that will aim to explore distant galaxies, with hopes of uncovering insights into the origins of the universe.",
        "image": news3
    },
    {
        "id": 4,
        "title": "Stock Markets Reach Record Highs Amid Economic Recovery",
        "description": "Global stock markets have reached record highs as signs of economic recovery continue to emerge following the challenges posed by the global pandemic.",
        "image": news4
    },
    {
        "id": 5,
        "title": "Innovative New Smartphone Released by Leading Tech Company",
        "description": "A leading tech company has released its latest smartphone model, featuring cutting-edge technology, improved battery life, and a sleek new design.",
        "image": news2
    }
]

const News = () => {
    
    return (
        <section className=' mb-16 news '>
            <h2 className='text-3xl font-primary font-semibold mb-2'>News</h2>
            <Swiper
      // install Swiper modules
    modules={[Navigation,Pagination]}
    spaceBetween={0}
    pagination={{clickable:true}}

    loop={false}
    breakpoints={{
        600: {
        slidesPerView: 1,
        spaceBetween: 10,
        },
        768: {
        slidesPerView: 1,
        spaceBetween: 20,
        },
        1024: {
        slidesPerView: 2,
        spaceBetween: 50,
        },
        }}
    >
            {news.map((it)=>{
                return <SwiperSlide key={it.id} >
                <section className='flex flex-col sm:flex-row sm:justify-between items-center p-4 '>
                    <div className="left py-4">
                        <h3 className='text-2xl font-secondary mb-4 text-slate-600 max-sm:text-xl'>{it.title}</h3>
                        <div className=' bg-primary h-1 w-24 rounded-3xl mb-4'></div>
                        <p className='w-11/12 break-words  max-sm:w-[70%] max-sm:mx-auto'>{it.description}</p>
                    </div>
                    <div className="right flex-shrink-0 ">
                        <img src={it.image} alt="" className='w-full object-cover' />
                    </div>
                </section>

            </SwiperSlide>

            })}
        </Swiper>
        </section>

        
    
    
)}


export default News