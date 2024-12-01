import { Link } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { getImgUrl } from '../utils/getImgUrl'
import { clearItems, removeItem } from '../redux/features/addCart'

const ShoppingCart = () => {
  const dispatch = useDispatch()

  const handleClear = ()=>{
    dispatch(clearItems())
  }
  const {cartItems} = useSelector((state)=>state.shopping)
  
  let {oldPrice,newPrice} = cartItems.reduce((prev,curr)=>{
    const {oldPrice,newPrice} = curr;
    prev.newPrice+=newPrice
    if(oldPrice ==null){
      prev.oldPrice+=newPrice

    }
    prev.oldPrice+=oldPrice
    return prev
  
  },{
    oldPrice:0,
    newPrice:0
  })
  return (
    <>
    <section className="shadow-lg w-9/12 p-3 mx-auto max-md:w-full">
      <div className="header flex  justify-between font-primary items-center mb-10 ">
        <h2 className="font-semibold text-xl">Shopping Cart</h2>
        <button className={`bg-red-600 hover:bg-red-800 text-white px-2 py-1 rounded-md ${cartItems.length<1?'opacity-40':''}`} disabled={cartItems.length<1} onClick={handleClear} >Clear Cart</button>
      </div>
      {

      cartItems.length>0 &&
      (cartItems.map((cart)=>{
      
      return <div key={cart.title} className="body border-b border-blue-800  mb-4">
        <div className='flex justify-between max-lg:flex-col  mb-2'>
          <div className="left flex gap-4 ">
            <div className="img w-32 md:flex-shrink-0 overflow-hidden" >
            <img src={cart.coverImage} alt="bookImg" className=' bg-cover w-full rounded-md transition-all duration-200 cursor-pointer '/> 
            </div>
            <div className='font-secondary'>
              <p className='text-xl mb-4 sm:font-bold'>{cart.title}</p>
              <p className='text-slate-500 sm:mb-16 mb-8'>Category: <span className='text-black font-semibold text-[20px] '>{cart.category}</span></p>
              <p className='font-bold text-slate-600'>items: <span className='text-black'>1</span></p>
            </div>

          </div>

          <div className="right max-lg:flex max-lg:items-end max-lg:justify-center max-lg:flex-col max-lg:mr-4 mr-2 "> 
            <p className='mb-2'>price: <strong>${cart.newPrice}</strong></p>
            <button className='text-violet-700  p-2 'onClick={()=>dispatch(removeItem(cart._id))}>Remove</button>
          </div>
        </div>
      </div>
      })
      )}


      {cartItems.length<1&&
      <div className='p-3 text-center font-secondary'>
        <p className='font-bold text-3xl mb-8 '>Your Cart Is Empty</p>
        <Link to={'/'} className='text-violet-600 px-4 py-2 rounded-md block w-full  text-xl'> Continue Shopping</Link>
      </div>
      }
      {
        cartItems.length>0&&
      <div className="footer font-primary mt-4 ">
        <div className='flex justify-between items-center'>

          <strong className='text-2xl font-mono'>Total Price:</strong>
          <div className="price">
            <del className='mr-6 tracking-widest  text-[20px] oldPrice'>${oldPrice.toFixed(2)}</del>
            <span className='newPrice text-[28px] font-mono'>${newPrice.toFixed(2)}</span>
          </div>

        </div>
        <div className='checkout mt-5 text-center'>
          <Link to={'/checkout'} className='bg-violet-600 hover:bg-violet-800 text-white px-4 py-2 rounded-md block w-full  text-xl mb-3'>CeckOut</Link>
          {cartItems.length>0&&
             <Link to={'/'} className='text-violet-600 px-4 py-2 rounded-md block w-full  text-xl'><span className='text-base text-black  mr-1'>or</span> Continue Shopping</Link>}
        </div>
      </div>
      }
    </section>
    
    
    </>
  
)
}

export default ShoppingCart