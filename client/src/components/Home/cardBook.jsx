import { BsCart3 } from "react-icons/bs"
import { getImgUrl } from "../../utils/getImgUrl"
import { useDispatch} from "react-redux"
import { addToCart } from "../../redux/features/addCart"
import {useNavigate} from "react-router-dom"
import { Link } from "react-router-dom"
const CardBook = (props) => {
    // const navigate = useNavigate()
    // const singleBookNavigate = ()=>{
    //     navigate(`/${props.book._id}`)
    // }
    const dispatch = useDispatch()

    const handleAdding = ()=>{
        dispatch(addToCart(props.book))
    }
  return (
    <section  className='rounded-lg transition-shadow duration-300'>
                        <div className="flex flex-col sm:flex-row items-center sm:h-72  sm:justify-center gap-4  p-4">
                                <div className='sm:flex-shrink-0  sm:h-56 max-sm:w-[60%]  border rounded-md'>
                                    <Link to={`/singleBook/${props.book._id}`}>

                                        <img src={props.book.coverImage}  alt="book photo" className='w-full max-w-[180px] max-h-[250px] bg-cover p-2 rounded-md transition-all duration-200 cursor-pointer hover:scale-105'  />
                                    </Link>
                                </div>
                                <div>
                                    <h2 className='text-xl font-primary mb-2 '>{props.book.title}</h2>
                                    <p className='leading-loose text-[15px] font-primary  text-gray-500 break-words w-[180px]'>{props.book.description.slice(0,55)}...</p>
                                    <div className='prices my-4'>
                                        <span className='price mr-5 font-semibold text-xl'>${props.book.newPrice}</span>
                                        <del className='old-price'>${props.book.oldPrice}</del>
                                    </div>
                                    <button className='btn-primary' onClick={handleAdding}><BsCart3 className='mr-2'/>  Add To Cart</button>
                                </div>
                        </div>


                    </section>
  )
}

export default CardBook