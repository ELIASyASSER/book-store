import { useState } from "react"
import { FaGoogle } from "react-icons/fa"
import { Link, useLocation, useNavigate } from "react-router-dom"
import {useForm} from "react-hook-form"
import { useAuth } from "../context/AuthUser"
import Swal from "sweetalert2"

const Login = () => {

  const navigate = useNavigate()
  const [message,setMessage] = useState("")
  const {loginUser,signInWithGoogle,loading,setLoading} = useAuth()
  const location = useLocation()
  const from = location.state?.from?.pathname || "/" 
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()



  const handleGoogle =async()=>{
      try {
        await signInWithGoogle()
        Swal.fire({
          position: "center-center",
          icon: "success",
          title: "You  Sign in Successfully ",
          showConfirmButton: false,
          timer: 1500
          });
          navigate(from,{replace:true})

      } catch (error) {
        console.log(error)
        Swal.fire({
          position: "center-center",
          icon: "error",
          title: "Failed To Sign With Google",
          showConfirmButton: false,
          timer: 1500
          });
      }
    }


    const onSubmit = async(data) => {
      try {
        await loginUser(data.email,data.password)
        Swal.fire({
          position: "center-center",
          icon: "success",
          title: "You Logged In successfully",
          showConfirmButton: false,
          timer: 1500
          });
          navigate(from,{replace:true})

      } catch (error) {
        console.log(error.code)
        if(error.code =="auth/network-request-failed"){
          setMessage("SomeThing Went Wrong Please Try Later")

        }
        else{
          setMessage("please enter valid email and password")
          
        }
      }
    }
  return (
    <section className="font-secondary login shadow-2xl md:w-7/12 mx-auto w-full rounded-md p-4">
      <h1 className="text-2xl font-semibold ml-4 mb-4">Please Login</h1>
        <form className="center p-4" onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="email"  className="font-semibold text-xl">Email</label>
            <input type="email" id="email" name="email" placeholder="example@gmail.com" className="block border border-gray-500 w-full p-2 rounded-md mt-3 outline-none mb-3"  {...register("email")} required/>

            <label htmlFor="password" className="font-semibold text-xl" >Password</label>
            <input type="password" id="password" name="password" placeholder="password" className="block border border-gray-500 w-full p-2 rounded-md mt-3 outline-none mb-3 " {...register("password")} required minLength={6}/>

            <button type="submit" className="bg-blue-500 hover:bg-blue-800 text-white px-5 py-1 rounded-lg text-xl font-semibold mb-2">Login</button>
            {message&&<p className="my-3 text-red-700 font-bold font-mono text-[15px] ">{message}</p>}
            <p className="text-slate-600  mb-4">Haven't an account please <Link to={'/register'} className="text-sky-600 font-bold underline">Register</Link></p>
            <button className="bg-blue-950 hover:bg-blue-600 text-white px-8 py-2  rounded-lg mx-auto block" onClick={handleGoogle}><FaGoogle className="inline-block mr-4"/>Sign In With Google</button>
            <p className="block mx-auto w-full  text-center mt-4 text-gray-500"> &copy; 2024 All rights reserved </p>
            
        </form>
    </section>
  )
}

export default Login