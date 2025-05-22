import  {HiOutlineBars3CenterLeft } from "react-icons/hi2";
import  {FaRegUser, FaSearch} from "react-icons/fa";
import  avatar from "../../assets/avatar.png"
import  {IoMdHeartEmpty } from "react-icons/io";
import  {BsCart3 } from "react-icons/bs";
import  {useSelector } from "react-redux";
import  {Link } from "react-router-dom";
import  {useState } from "react";
import  {useAuth } from "../../context/AuthUser";

const Header = () => {

    const [openModal,setOpenModal] = useState(false)
    const {signOutUser,currentUser,profileImg,subscription} = useAuth()    
    const {cartItems} = useSelector((state)=>state.shopping)
    const userImg = profileImg || avatar
    const modalLinks = [
        {href:"/",title:"Home"},
        {href:`/getOrder/${currentUser?.email}`,title:"Orders"},
    ]
    const signingLinks = [
        {href:"/register",title:"Register"},
        {href:"/login",title:"Log In"},
        
    ]

return (

    <header className=" flex justify-between items-center content flex-wrap ">
        <div className="left flex gap-10 items-center  basis-1/2  relative">
            <HiOutlineBars3CenterLeft onClick={()=>setOpenModal((prev)=>!prev)}  className="w-[28px] h-[22px] cursor-pointer "/>

                            {openModal&&
                            <div onMouseLeave={()=>setOpenModal(false)} className="absolute w-40  text-center rounded-md  bg-slate-300   -bottom-24 translate-y-[50%] -left-4  overflow-hidden">

                                    {

                                        modalLinks.map((item,idx)=>{
                                            return <Link key={idx} className="block hover:bg-[#8dc0ff98] duration-300 p-2 border-b-2 z-20" onClick={()=>setOpenModal(false)} to={item.href}>{item.title}
                                                </Link>
                                            })
                                    
                                    }
                                    {
                                        currentUser && <Link to={"dashboard"} className="block hover:bg-[#8dc0ff98] duration-300 p-2 border-b-2">ٍSell Your Book</Link>
                                    }      

                                    {
                                        currentUser==null&&signingLinks.map((item,idx)=>{
                                            return <Link key={idx} className="block hover:bg-[#8dc0ff98] duration-300 p-2 border-b-2 z-20" onClick={()=>setOpenModal(false)} to={item.href}>{item.title}
                                            </Link>
                                            })
                                    }

                            {/* {localStorage.getItem("ThE_SeCrEt_ToKeN")?<Link  className="block hover:bg-[#8dc0ff98] duration-300 p-2 border-b-2 z-20" onClick={()=>setOpenModal(false)} to={"/dashboard"}>Dashboard
                            </Link>:
                                <Link  className="block hover:bg-[#8dc0ff98] duration-300 p-2 border-b-2 z-20" onClick={()=>setOpenModal(false)} to={"/admin"}>Admin
                                </Link>
                            
                            } */}
                        
                        {
                            currentUser !=null &&
                            <button  onClick={signOutUser} className="block hover:bg-[#ccc] duration-300 p-2 pr-8 w-full ml-2 " >Log Out</button>

                        }
                        

                            
                </div>
                }
            <form className="w-[16rem] max-sm:w-[12rem] bg-[#EAEAEA] px-2 py-1 rounded-md flex items-center gap-3 ">
                <FaSearch className="inline-block cursor-pointer"/>
                <input type="text"  className="bg-transparent w-[90%] outline-none" placeholder="What Are You Looking For"/>
            </form>
        </div>

        <div className="right flex  basis-1/2 justify-end items-center sm:gap-8 gap-3">

            {currentUser ?<img src={userImg} alt="avatar img" className="size-10 cursor-pointer rounded-full" />:<FaRegUser className="size-8 cursor-pointer"/>}
            <IoMdHeartEmpty className="size-8 cursor-pointer hidden sm:block "/>
            
            <Link to={'/cart'} className="flex items-center bg-primary px-3 py-1  rounded-md text-black cursor-pointer font-secondary hover:bg-transparent hover:text-primary border border-primary  transition">
                <BsCart3 className="inline-block mr-2  "/>
                <span className="font-semibold">{cartItems?.length}</span>
            </Link>

        </div>
    </header>
    )
}

export default Header