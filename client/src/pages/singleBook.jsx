import { useParams } from "react-router-dom"
import { useGetSingleBookQuery } from "../redux/features/bookApi"
import { useDispatch } from "react-redux"
import { addToCart } from "../redux/features/addCart"
import { BsCart3 } from "react-icons/bs"
import Loading from "../components/loading"
import { useEffect } from "react"

const SingleBook = () => {
    useEffect(()=>{
        scroll({
            top:0,
            behavior:"smooth"
        })
    },[])
    const dispatch = useDispatch()
    const {bookId} = useParams()
    const {data,isError,isLoading} = useGetSingleBookQuery(bookId)
    const handleAdding = (product)=>{
        dispatch(addToCart(product))
    }
    const books = data?.book
    if(!books) return <div className="flex justify-center items-center"><Loading/></div>
    
    const {title,category,coverImage,description,createdAt,newPrice,oldPrice} = books
    const date = new Date(createdAt).toLocaleDateString()
    if(isError) return <div>Error Happening while Loading ...</div>

    else{
        return (
        <main className="shadow-2xl  lg:w-2/3 lg:mx-auto p-6  rounded-md font-primary">
            <h1 className="text-3xl font-bold mb-8 mx-auto ">
                Book Name: <span className="text-2xl font-semibold">{title}</span>
            </h1>
            <div className="sm:flex-shrink-0 w-56 max-md:w-40 ">
                <img src={coverImage} alt="book image" className="bg-cover w-full" />
            </div>
            <div>
                    <h2 className="text-2xl font-bold my-6">Author: <span className="text-gray-500 font-semibold text-xl ">Admin</span></h2>
                    <time className="text-2xl font-bold mb-8 block">Published: <span className="text-gray-500 font-semibold text-xl">{date}</span></time>
                    <h2 className="text-2xl font-bold mb-8">Category: <span className="text-gray-500 font-semibold text-xl">{category}</span></h2>
                    <p className="text-2xl font-bold mb-8 w-[80%] break-words tracking-wider ">description: <span className="text-gray-500 font-semibold text-xl">{description}</span></p>

                    <div className="price flex justify-between flex-row max-sm:flex-col">
                            <p className="text-2xl font-bold mb-8 w-[80%] break-words tracking-wider ">Old Price: <span className="text-gray-500 font-semibold text-2xl"><del>${oldPrice}</del></span></p>

                            <p className="text-2xl font-bold mb-8 w-[80%] break-words tracking-wider ">New Price: <span className="text-gray-500 font-semibold text-2xl">${newPrice}</span></p>
                    </div>
                    

                    <button className='btn-primary' onClick={()=>handleAdding(books)}><BsCart3 className='mr-2'/>  Add To Cart</button>
            </div>

        </main>

)
}}

export default SingleBook