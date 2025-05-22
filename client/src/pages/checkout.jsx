import { Link, useNavigate } from "react-router-dom"
import "./checkout.css"
import { useEffect, useState } from "react"
import { useSelector,useDispatch } from "react-redux"

import {clearItems} from "../redux/features/addCart"
import { useForm, useWatch } from "react-hook-form"
import { useAuth } from "../context/AuthUser"

import {useCreateOrderMutation} from "../redux/features/orderApi"
import Swal  from "sweetalert2"
import Loading from "../components/loading"
import { MdExitToApp } from "react-icons/md"

const CheckOut = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
        const [createOrder,{isError,isLoading}] = useCreateOrderMutation();
    const {userDetails} = useAuth()
    const { 
        register,
        handleSubmit,
        formState: { errors },
        watch
    } = useForm({mode:"onChange"})
    const toggler = watch("terms")
    const {cartItems} = useSelector((state)=>state.shopping)

    let orderd_books = cartItems.map((book)=>{
        return book._id;
    })

    let order_count = cartItems.map((book)=>{
        return book.count;
    })
    
    


    let {newPrice,count} = cartItems.reduce((prev,curr)=>{


        const {newPrice,count} = curr;
        prev.newPrice+=(newPrice*count)
        prev.count+=count
        return prev

    },{
        newPrice:0,
        count:0
    })


    newPrice = newPrice.toFixed(2)
    const onSubmit = async(data) => {

        const placeanOrder = {
            fullName:data.fullName,
            email:data.email,

            phone:data.phone,
                price:newPrice,
                orderdEmail:userDetails().email,

                addressDetails:{
                    fullAddress:data.fullAddress,
                    city:data.city,

                },
                orderData:orderd_books,
                count:order_count
            }


    try {

        await createOrder(placeanOrder).unwrap();

            Swal.fire({
            position: "center-center",
            icon: "success",
            title: "You'r Order done  ",
            showConfirmButton: false,
            timer: 2000
            });
        

        Swal.fire({
            title: "We recieve your order , our customer service will contact you soon",
            showClass: {
                popup: `
                animate__animated
                animate__fadeInUp
                animate__faster
                `
            },
            hideClass: {
                popup: `
                animate__animated
                animate__fadeOutDown
                animate__faster
                `
            }
        });
        navigate("/")
        dispatch(clearItems())
        // Optionally, show a success message or redirect
    } catch (error) {

        console.error("Error placing order:", error);
        
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `Something went wrong  try again !${error.data}`,
        });
        
        // Optionally, handle errors (e.g., show error messages)
    
    }}

    // if(isError) return <div>Error please try again later</div>
    if(isLoading)return <Loading/>
    return (

    
        <main className="w-11/12 bg-gray-300 mx-auto lg:px-12 px-4 py-6 flex flex-col">
            <Link to={"/cart"} className=' w-fit text-white bg-gray-500 px-4 py-2 rounded-lg hover:bg-purple-900'><MdExitToApp className='size-8'/></Link>
        <div className="top font-primary  lg:w-[85%] lg:mx-auto mb-4">
        <h2 className="font-semibold text-xl">Cash On Delivery</h2>
        <div className="text-slate-700 text-[18px] font-mono">
        <p >Total Price :<span>${newPrice}</span></p>
        <p>Items:<span>{count}</span> </p>
        </div>
        </div>
        <div className="white-page flex justify-between flex-wrap bg-white w-full lg:w-[85%] mx-auto shadow-lg rounded-md px-8 py-6 ">
            <div className="left ">
                <h3 className="text-xl font-secondary font-bold text-slate-500">Personal Details</h3>
                <p className="text-[14px] mt-2 text-gray-500 font-semibold">Please Fill Out All This Fields</p>
            </div>
            <form className=" right flex flex-col " onSubmit={handleSubmit(onSubmit)}>

                <label htmlFor="fullName">Full Name</label>
                <input type="text" id="fullName" name="fullname" {...register("fullName",{ maxLength: 40 ,minLength:10})} required/>
                {errors.fullName && <span className="text-red-600">{errors.fullName.type =="minLength"?'min characters must be more than 10':'please type less than 40 characters'}</span>}
                <label htmlFor="address">Email Address</label>
                <input
                    id="email"
                    type="email"
                    {...register("email", {
                        required: "Email is required",
                        pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                        message: "Invalid email address",
                             },
                    })}
                        />
                        {errors.email&&<span className="text-red-600">{errors.email.message}</span>}

                <label htmlFor="number">Phone Number</label>
                <input type="phone" name="phone" id="number" {...register("phone",{  maxLength: 11 ,minLength:11,  pattern: {value: /^01[0-2|5][0-9]{8}$/,message: "Please enter a valid Egyptian phone number"}})} required/>
                {errors.phone && <span className="text-red-600">Enter correct Phone Number</span>}
                <div className="place">
                    <label htmlFor="fullAddress">Address/Street</label>
                    <textarea name="fullAddress" id="fullAddress" {...register("fullAddress",{ required: true, maxLength: 220 ,minLength:60})}  ></textarea>

                {errors.fullAddress && <span className="text-red-600">{errors.fullAddress.type =="minLength"?'please descripe full address min charachters 60':errors.fullAddress.type=='maxLength'?'You should enter less than 220 charachters':'please enter your full address'}</span>}

                    <div>
                        <label htmlFor="city">City</label>
                        <input type="text" name="city" id="city" {...register("city",{ required: true, maxLength: 14 })}/>
                        
                        {errors.city && <span className="text-red-600">{errors.city.type =="required"?'please enter your city':'please enter valid city'}</span>
                        }
                    </div>
                    <div className=" ml-[4%]">
                        
                    </div>
                    <div className=" flex items-center text-[11px]  w-full font-primary   ">
                        <input type="checkbox" id="privacy"{...register("terms", { required: true })}  className="flex-1"/>
                        <label className="w-11/12  block" htmlFor="privacy">I agree to the <Link className="text-blue-600 font-bold underline">Terms &Conditions </Link>and <Link className="text-blue-600 font-bold underline">Privacy Policy</Link></label>
                    </div>
                    <button type="submit"  className={` bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-900 text-lg mt-8 justify-self-end flex ${!toggler?"pointer-events-none opacity-30":""}`}>Place An Order</button>
                </div>



            </form>
        </div>
    </main>
)

}

export default CheckOut