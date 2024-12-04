import { MdExitToApp } from "react-icons/md";
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'
import { useLogadminMutation } from '../../redux/features/loginAdmin'
import { useAuth } from '../../context/AuthUser'
import Loading from '../../components/loading'
const AdminLogin = () => {
    const [logadmin,{isError,isLoading}] = useLogadminMutation()
    const [message,setMessage] = useState("")
    
    const {isSubscribe,setIsSubscribe} = useAuth()
    const navigate = useNavigate()
    const {
    register,
    handleSubmit,
    formState: { errors },
    } = useForm()

    const onSubmit = async(data) => {

        const details ={

          username:data?.username,
            password:data?.password,
            role:"admin",
            subscribe:isSubscribe
          }

        try {

        const resp = await logadmin(details).unwrap()
        
        if(resp.token){
          localStorage.setItem("ThE_SeCrEt_ToKeN",resp.token)
          const expiredToken = new Date().getTime() + 3600000
          localStorage.setItem("expiredToken",expiredToken)

        }
        Swal.fire({
        position: "center-center",
        icon: "success",
        title: "Admin Logged In successfully",
        showConfirmButton: false,
        timer: 1500
        });
        navigate("/dashboard")

    } catch (error) {

        console.error("Error while login:", error);

        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `!${error.data||"something went wrong please try again later"}`,
      })
    }
}
    if(isLoading)return <Loading/>
  return (
    <section className='h-screen flex justify-center items-center '>
        <div className="font-secondary login shadow-2xl md:w-7/12 mx-auto w-full rounded-md p-4 ">
      <Link className=' bg-blue-600 p-3 mb-4 text-white text-xl font-bold  w-fit flex justify-self-end items-center rounded-md hover:bg-purple-800 transition' to="/">
      <MdExitToApp className='size-8'/>
      </Link>
      <h1 className="text-2xl font-semibold ml-4 mb-4">Log In As Admin </h1>
        <form className="center p-4" onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="username"  className="font-semibold text-xl">Username</label>
            <input type="text" id="username" name="username" placeholder="username" className="block border border-gray-500 w-full p-2 rounded-md mt-3 outline-none mb-3"  {...register("username",{minLength:6})} required/>
            {errors.username &&<span className='text-red-600 text-sm block font-semibold mb-4'>{errors.username.type == "minLength"?'please enter more than 6 characters':""}</span>}
            <label htmlFor="password" className="font-semibold text-xl" >Password</label>
            <input type="password" id="password" name="password" placeholder="password" className="block border border-gray-500 w-full p-2 rounded-md mt-3 outline-none mb-3 " {...register("password",{minLength:6})} required minLength={6}/>

            {errors.password &&<span className='text-red-600 text-sm block font-semibold mb-4'>{errors.password.type == "minLength"?'please enter more than 6 characters':""}</span>}

            <button type="submit" className="bg-blue-500 hover:bg-blue-800 text-white px-5 py-1 rounded-lg text-xl font-semibold mb-2">Login</button>
            {message&&<p className="my-3 text-red-700 font-bold font-mono text-[15px] ">{message}</p>}

            <p className="text-slate-600  mb-4">Sell books On Website  <Link to={'/'} className="text-sky-600 font-bold underline">Subscribe</Link></p>
            <p className="block mx-auto w-full  text-center mt-4 text-gray-500"> &copy; 2024 All rights reserved </p>
            
        </form>
        </div>
    
    </section>

  )


}
export default AdminLogin