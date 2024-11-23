import PieChart from '../../components/charts/chart';
import SquaresData from '../../components/charts/squares';
import { Link } from 'react-router-dom';
import {  faPen, faEdit } from "@fortawesome/free-solid-svg-icons";
import { MdExitToApp } from 'react-icons/md';import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const DahboardBody = () => {

return (
    
    <section className='w-full bg-[#eee] p-3 font-primary'>
        <div  className=" w-[85%] mx-auto p-4 flex items-center justify-between max-md:flex-col flex-row  max-md:w-full max-md:mb-6 ">
            <div className='max-md:mb-10'>
                <h1 className='text-3xl font-bold mb-4'>Dashboard</h1>
                <p className='text-gray-500 text-[18px]'>Book Store Inventory</p>
            </div>
            <div className='flex items-center max-sm:flex-col gap-4 '>
                <Link className='border-purple-500 border-[2px] p-3 rounded-md text-purple-600 font-semibold hover:bg-purple-500 hover:text-white transition ' to={"/manage-books"}><FontAwesomeIcon className='mr-3'  icon={faEdit}/>Manage Books</Link>

                <Link to={'/add-book'} className='bg-purple-500 text-white p-3 rounded-lg hover:bg-white hover:text-purple-600 hover:border-purple-600  hover:border-[2px] font-semibold transition'> <FontAwesomeIcon icon={faPen} className='mr-2' />Add New Book</Link>
                <Link to={"/"} className='text-white bg-purple-600 px-4 py-2 rounded-lg hover:bg-purple-900'><MdExitToApp className='size-8'/></Link>
            </div>



        </div>
        <SquaresData/>
        <div className='w-[85%] max-md:w-full mx-auto bg-white my-4 rounded-md p-4'>
            <h1 className='font-semibold text-2xl ml-6 '>Book Categories</h1>
            <PieChart/>
        </div>

    </section>

)}

export default DahboardBody