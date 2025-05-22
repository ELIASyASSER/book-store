import { Link } from 'react-router-dom'
import Banner from '../../assets/banner.png'

const MainPage = () => {
    return (
    <main className='flex items-center justify-between flex-col lg:flex-row '>
        <section className="left">
            <h1 className='text-4xl font-semibold font-secondary mb-7 '>New Releases This Week</h1>
            <p className='max-w-xl text-gray-500 text-xl leading-relaxed '>Its time to update your reading list with some of the latest and greatest releases in the literary world. From heart-pumping thrillers to captivating memoirs, this weeks new releases offer something for everyone</p>
            <Link to={"/pricing"} className='btn-primary mt-6 text-xl w-fit '>Subscribe</Link>
        </section>
        <section className="right max-lg:mt-28">
            <img src={Banner} alt="cover" />
        </section>
    </main>
)}

export default MainPage