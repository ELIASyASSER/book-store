import { FaFacebook, FaWhatsapp } from 'react-icons/fa'
import { MdEmail} from "react-icons/md"
import { Link } from 'react-router-dom'
const Footer = () => {
  return (
    <footer className="footer bg-black text-white font-primary text-2xl pt-8 pb-5 relative ">
    <div className="  flex flex-col justify-center items-center ">
        <p className='text-center mb-8 font-bold'>We Are Social</p>
        <div className="flex justify-center items-center  gap-12 mb-3 ">
          <Link to={"https://www.facebook.com"}>
              <FaFacebook  className='size-14 border-[4px] border-green-600  bg-white rounded-full  text-blue-600'/>
          </Link>
          <Link to={"https://www.whatsap.com"}>
              <MdEmail className='size-14 border-[4px] border-green-600  bg-white rounded-full  text-blue-600'/>
          </Link>
          <Link to={"https://www.youtube.com"}>
            <FaWhatsapp className='size-14 border-[4px] border-green-600  bg-white rounded-full  text-blue-600'/>
          </Link>
        </div>
        <div>
        </div>
        <p className="text-center mt-8  ">&copy;2024 <span className='text-blue-300 font-bold'>EYM Dev </span>All rights reserved</p>
    </div>
</footer>
  )
}

export default Footer