
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { useGetSingleBookQuery, useUpdateBookMutation} from "../../redux/features/bookApi"
import { Link, useNavigate, useParams } from 'react-router-dom';
import { MdExitToApp } from 'react-icons/md';
import Loading from '../../components/loading';

  const UpdateBook = () => {
    const {updatedBookId} = useParams()
    const navigate = useNavigate()

    const [updateBook, { isError: isUpdateError, isLoading: isUpdating }] = useUpdateBookMutation();
    const { data, isError: isFetchError, isLoading: isFetching,refetch } = useGetSingleBookQuery(updatedBookId);
    const { register, setValue,handleSubmit, formState: { errors }, reset } = useForm();
    useEffect(() => {
      if(data && !isFetching){
        const {title,description,oldPrice,newPrice,category,trending} = data?.book
      setValue("title", title); 
      setValue("description", description); 
      setValue("oldPrice", oldPrice); 
      setValue("newPrice",newPrice);
      setValue("category", category);
      setValue("trending", trending);
      
    }

    }, [data,setValue])


    const onSubmit = async(data)=>{

      console.log(data)
      const formData = new FormData();

      formData.append('title', data.title);
      formData.append('description', data.description);
      formData.append('category', data.category);
      formData.append('oldPrice', data.oldPrice);
      formData.append('newPrice', data.newPrice);
      formData.append('trending', data.trending || false);  // Default to false if unchecked
      formData.append('cover', data.Image[0]);  // Append the file itself
      
      try {
      await updateBook({id:updatedBookId,rest:formData}).unwrap()
      Swal.fire({
        position: "center-center",
        icon: "success",
        title: "Book Updated Successfully",
        showConfirmButton: false,
        timer: 2000

      });
      navigate("/manage-books")
      refetch()

    } catch (error) {
      console.log(error)
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `Something went wrong  try again !${error.data}`,
    });
    }

  }
  const options=[
    { value: '', label: 'Choose A Category' },
    { value: 'business', label: 'Business' },
    { value: 'fiction', label: 'Fiction' },
    { value: 'horror', label: 'Horror' },
    { value: 'adventure', label: 'Adventure' },
    // Add more options as needed
  ]

if(isUpdateError) return <>
  <div className='flex justify-center items-center text-3x font-bold font-secondary'>Error while Updateing the data please try again later</div>
    {navigate("/manage-books")}
</>

if(isFetchError) return <>
<div className='flex justify-center items-center text-3x font-bold font-secondary'v>Error while Loading the data please try again later</div>
  {navigate("/manage-books")}
</>

if(isFetching) return <div className=' h-[99vh]'>
  <Loading/>
</div>

  return (

    <div className="max-w-lg   mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
      <div className='float'>
        <Link to={"/dashboard"} className='float-right text-white bg-purple-600 px-4 py-2 rounded-lg hover:bg-purple-900'><MdExitToApp className='size-8'/></Link>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Update Book</h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} >
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
          className=" p-2 border w-full rounded-md focus:outline-none focus:ring focus:border-blue-300 resize-none h-32"
          placeholder="Enter Book description"
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
          <option key={option.value} value={option.value}>
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
              {...register('trending')}
              className="rounded text-blue-600 focus:ring focus:ring-offset-2 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm font-semibold text-gray-700">Trending</span>
          </label>
        </div>
      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700 mb-2 ">Old Price</label>
        <input
          type="text"
          {...register("oldPrice",  { required: true })}
          className=" p-2 border w-full rounded-md focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Enter Price Before Discount"
        />
    </div>
    <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700  mb-2 ">New Price</label>
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

        <button type="submit" className="w-full py-2 bg-green-500 text-white font-bold rounded-md">

              {isUpdating?<span className="">Updating ... </span>:<span>Update Book</span>} 
        </button>
      </form>
    </div>
  )
}



export default UpdateBook