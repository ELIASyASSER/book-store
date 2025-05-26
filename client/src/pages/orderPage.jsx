import React, {  useRef, useState } from 'react'
import { useGetOrderByEmailQuery } from '../redux/features/orderApi'

import { useParams,Link } from 'react-router-dom'
import Loading from '../components/loading'

const OrderPage = () => {
    const {orderEmail} = useParams()
    const {isError,isLoading,data} = useGetOrderByEmailQuery(orderEmail)
    console.log(data)

    const [success,setSuccess] = useState(false)
    const orderId = useRef(null)
    if(isError) return <div>Error happen please try again later</div>
    
    if(isLoading)return <div className="flex justify-center items-center h-[80vh] "><Loading/></div>
    
    if(!data || data?.length <1 || data ==null) return <div className='text-center '>


        <p className='mb-8 lg:text-4xl text-2xl font-semibold'>You Dont have any orders yet</p>
        <Link to={'/'} className='bg-violet-600 text-white font-bold px-4 py-2 rounded-md block w-full  text-xl'> Continue Shopping</Link>
    </div>

    const copyToClipboard = ()=>{
            navigator.clipboard.writeText(orderId.current.innerText)
            setSuccess(true)
            
            setTimeout(() => {
                setSuccess(false)
            }, 3000);
    }


    return (

        <>

            <h1 className='text-4xl mb-4  font-mono font-semibold lg:w-11/12 lg:mx-auto w-full '>Your Orders:-</h1>
            <main className='bg-slate-100 p-4  px-2  rounded-md font-primary lg:w-11/12 w-full lg:mx-auto orders '>

            {data.map((item,idx)=>{
                const {orderData }= item
                const amount = item.count;
                
                const date = new Date(item?.createdAt).toLocaleDateString()
                return <div key={idx} className="mb-8 overflow-hidden"> 
                    <div>

                    <div className='font-bold rounded-lg mb-4 bg-black p-2 text-white   '>#############</div>
                        <p className='mb-8'>fullName: <span>{item.addressDetails.fullName}</span></p>
                        <p className='mb-8'>Email: <span>{item.addressDetails.email}</span></p>
                        <p className='mb-8'>Total Price $<span>{item?.price}</span></p>
                        <p className='mb-8'>PayMent Type<span>{item.paymentType}</span></p>
                        <p className='mb-8'>phone Number: <span className='tracking-widest'>{item.addressDetails.phone}</span></p>
                        <time className='mb-8 block'>Date Of Order: <span>{date}</span></time>
                        <address className='mb-8'>city: <span>{item.addressDetails.city}</span></address>
                        <address className='mb-8'>FullAddress <span >{item.addressDetails.fullAddress}</span></address>
                    </div> 

                {orderData.map((book,idx)=>{
                        return<div className='bg-white orders p-2 border border-gray-600  rounded-lg billDetails' key={idx}>
                            {/* <div className='bg-black text-white p-2 text-center rounded-full mb-4'>==============================</div> */}
                            <div className='data ml-6'>
                                <p className='mb-6'>Book Name:<span> {book.title}</span></p>
                                <div className='w-36 mb-6'>
                                    <img src={book.coverImage} alt="bookImage"  
                                    className='bg-cover w-full rounded-lg'
                                    />
                                </div>
                                <p className='mb-6'>Book price:<span> ${book.newPrice}</span></p>
                                
                                <p className='mb-6 text-slate-500 inline-flex items-center'>{amount[idx]}<span>Items</span></p>

                            </div>
                            </div>
                })}

                <div className='block bg-sky-400 text-center md:text-2xl cursor-pointer rounded-md p-2 ' role="button" onClick={copyToClipboard}>order Id: 
                    <i className='text-white inline-block tracking-widest ml-3 ' ref={orderId}>#{item?._id}</i>
                    {success &&<p className='text-sm  text-green-800'>Copied To ClipBoard Successfully </p>}
                </div>
            </div>
        })}

    </main>
    </>
)}

export default OrderPage