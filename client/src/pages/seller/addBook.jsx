import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import {useCreateBookMutation} from "../../redux/features/bookApi"
import { Link, useNavigate } from 'react-router-dom';

import { MdExitToApp } from 'react-icons/md';
  const AddBook = () => {
    const [createBook,{isError,isLoading}] = useCreateBookMutation()
    const { register, handleSubmit, formState: { errors }, reset ,watch,setError} = useForm({mode:"onChange"});
    const navigate = useNavigate()
    const isOffer = watch("offer")
    const [offerState,setOfferState] = useState(false)
    useEffect(()=>{
      setOfferState(isOffer)
    },[isOffer])


  const onSubmit = async (data) => {
  const formData = new FormData();
  const newPrice = Number(data.newPrice);
  const oldPrice = Number(data.oldPrice);

  
  // Offer validation error handling
  if (isOffer && oldPrice <= newPrice) {
    setError("oldPrice", {
      type: "manual",
      message: "Old price must be greater than new price",
    });
    return;
  }
      let finalOldPrice = isOffer?oldPrice:0;
      let finalNewPrice = newPrice;
      console.log(finalOldPrice)
      console.log(finalNewPrice)

  // Append form data
  formData.append('title', data.title);
  formData.append('description', data.description);
  formData.append('category', data.category);
  formData.append('oldPrice', finalOldPrice);
  formData.append('newPrice', finalNewPrice);
  formData.append('offer', isOffer);  
  formData.append('cover', data.Image[0]);

  try {
    await createBook(formData).unwrap();

    Swal.fire({
      position: "center-center",
      icon: "success",
      title: "Book Published Successfully",
      showConfirmButton: false,
      timer: 2000,
    });
    reset();
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.message || `Something went wrong. Try again.`,
    });

    if (error.data === 'Invalid Credentials error with the token') {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `Please Log In As Admin First`,
      });
      navigate("/admin");
    }
  }
};

  const options=[
    { value: '', label: 'Choose A Category' },
    { value: 'business', label: 'Business' },
    { value: 'fiction', label: 'Fiction' },
    { value: 'horror', label: 'Horror' },
    { value: 'adventure', label: 'Adventure' },
    // Add more options as needed
  ]

  return (

    <div className="max-w-lg   mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
      <div className='float'>
        <Link to={"/dashboard"} className='float-right text-white bg-purple-600 px-4 py-2 rounded-lg hover:bg-purple-900'><MdExitToApp className='size-8'/></Link>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Book</h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className=''>
    <div className="mb-4">
      <label className="block text-sm font-semibold text-gray-700 mb-2 ">Title</label>
      <input
        type="text"
        {...register("title",  { required: true ,minLength:4,maxLength:65})}
        className=" p-2 border w-full rounded-md focus:outline-none focus:ring focus:border-blue-300"
        placeholder="Enter Book Title"
      />

      {errors.title && <span className="text-red-600">{errors.title.type =="minLength"?'The Book Name Is Too short please enter valid name':errors.title.type=='maxLength'?'The Book Name Is Too Long maxLength 65 charachters':''}</span>}
    </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700 mb-2 ">Description</label>
        <textarea
          type="text"

          {...register("description",  { required: true,minLength:100,maxLength:1000 })}
          className=" p-2 border w-full rounded-md resize-none h-40 focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Enter Book description "
        />
      {errors.description && <span className="text-red-600">{errors.description.type =="minLength"?'Please enter 100 characters At Least The Book Description Is Too short':errors.description.type=='maxLength'?'The Book Name Is Too Long maxLength 1000 charachters':''}</span>}
    </div>

          
      <div className="mb-4">
      <label className="block text-sm font-semibold text-gray-700 mb-2 ">Category</label>
      <select
        {...register("category",  { required: true })}
        className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
      >
        {options.map((option) => (
          <option key={option.value} valshue={option.value}>
            {option.label}
          </option>
        ))}

      </select>
    </div>

        {/* Trending Checkbox */}
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              {...register('offer')}
              className="rounded text-blue-600 focus:ring focus:ring-offset-2 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm font-semibold text-gray-700">Offer</span>
          </label>
        </div>
        {offerState && <div className="mb-4">
  <label className="block text-sm font-semibold text-gray-700 mb-2 ">Old Price</label>
  <input
    type="text"
    {...register("oldPrice", { required: "Old price is required when offer is enabled" })}
    className="p-2 border w-full rounded-md focus:outline-none focus:ring focus:border-blue-300"
    placeholder="Enter Price Before Discount"
  />
  {errors.oldPrice && <span className="text-red-600 text-sm">{errors.oldPrice.message}</span>}
</div>}

    <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700  mb-2 ">{isOffer&&'New'} Price</label>
        <input
          type="text"
          {...register("newPrice",  { required: true })}
          className=" p-2 border w-full rounded-md focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Enter Price Of Book"
        />

    </div>

        {/* Cover Image Upload */}
        <div className="mb-4 ">
          <label className="block text-sm font-semibold text-gray-700 mb-4 " htmlFor='file' >Book Cover: </label>
          <input  type="file" accept="image/*"  className="mb-2 w-full "  id='file' {...register("Image",{required:true})}/>
            {errors.Image && <span className="text-red-600">{errors.Image.type =="required"&&"please choose image for the book"}</span>}
        </div>

        {/* Submit Button */}

        <button type="submit" className={`w-full py-2 bg-green-500 text-white font-bold rounded-md ${isLoading?'pointer-events-none opacity-35':''}`}>

              {isLoading?<span className="">Adding.. </span>:<span>Add Book</span>} 
        </button>
      </form>
    </div>
  )
}



export default AddBook