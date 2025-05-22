
import SquaresData from '../../components/charts/squares';

import { Link } from 'react-router-dom';

import {  faPen, faEdit } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from 'react';

const DashBoardAdminBody = () => {
    const [data,setData] = useState(0);
    useEffect(()=>{
            fetch(`${import.meta.env.VITE_SERVER_URL}/dashboard/wholeBooksCount`,{credentials:"include"}).then(data=>data.json())
            .then(c=>setData(c)).catch(err=>console.log(err))
                
    },[data])
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
                </div>

            </div>
            <SquaresData data={data}/>
            <div className='w-[85%] max-md:w-full mx-auto bg-white  my-4 rounded-md p-4 flex flex-col  justify-start '>
            <h1>All Sellers</h1>
            
            </div>

        </section>

    )}


export default DashBoardAdminBody