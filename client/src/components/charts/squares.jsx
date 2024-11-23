import React from "react";
import "./dashboard.css"
import { faDollarSign, faCartShopping, faChartLine, faBookOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const SquaresData = ()=>{
            return <div className="teckets  bg-white rounded-[10px] w-[85%] max-md:w-full mx-auto p-4">
                <div className="flex text-center gap-[20px] flex-wrap">
                    <div className="box p-5 rounded-[10px] text-[18px] text-gray-500">
                        <FontAwesomeIcon icon={faDollarSign} className='mb-3 text-orange-500 text-3xl'/>
                    <span className="block text-black font-bold text-3xl mb-1"> 2200</span>
                    Total Sales
                </div>
                <div className="box p-5 rounded-[10px] text-[18px] text-gray-500">
                    <FontAwesomeIcon icon={faBookOpen} className="fa-2x mb-3 text-blue-600 text-3xl" />

                    <span className="block text-black font-bold text-3xl mb-[5px]">233</span>
                    Books
                </div>
                <div className="box p-5 rounded-[10px] text-[18px] text-gray-500">
                    <FontAwesomeIcon icon={faCartShopping} className="fa-2x mb-3 text-green-500 text-3xl" />

                    <span className="block text-black font-bold text-3xl mb-[5px]">2342</span>
                    Orders
                </div>
                <div className="box p-5 rounded-[10px]   text-[18px] text-gray-500">
                    <i className="fa-regular fa-rectangle-xmark fa-2x "></i>
                    <FontAwesomeIcon icon={faChartLine} className="fa-2x mb-3 text-red-600 text-3xl" />

                    <span className="block text-black font-bold text-3xl mb-[5px]">1292</span>

                    best Selling

                </div>
                </div>
            </div>
}
export default SquaresData