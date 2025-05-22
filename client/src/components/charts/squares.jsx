import React from "react";
import "./dashboard.css"
import { faDollarSign, faCartShopping, faChartLine, faBookOpen, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const SquaresData = ({data})=>{
            return <div className="teckets  bg-white rounded-[10px] w-[85%] max-md:w-full mx-auto p-4">
                <div className="flex text-center gap-[20px] flex-wrap">
                    <div className="box p-5 rounded-[10px] text-[18px] text-gray-500">
                        <FontAwesomeIcon icon={faDollarSign} className='mb-3 text-orange-500 text-3xl'/>
                    <span className="block text-black font-bold text-3xl mb-1"> 2200</span>
                    Total Sales
                </div>
                <div className="box p-5 rounded-[10px] text-[18px] text-gray-500">
                    <FontAwesomeIcon icon={faBookOpen} className="fa-2x mb-3 text-blue-600 text-3xl" />

                    <span className="block text-black font-bold text-3xl mb-[5px]">{data}</span>
                    Books
                </div>
                <div className="box p-5 rounded-[10px] text-[18px] text-gray-500">
                    <FontAwesomeIcon icon={faCartShopping} className="fa-2x mb-3 text-green-500 text-3xl" />

                    <span className="block text-black font-bold text-3xl mb-[5px]">2342</span>
                    Orders
                </div>
                <div className="box p-5 rounded-[10px]   text-[18px] text-gray-500">
                    <FontAwesomeIcon icon={faUser} className="fa-2x mb-3 text-red-600 text-3xl" />

                    <span className="block text-black font-bold text-3xl mb-[5px]">1292</span>

                    Users

                </div>
                                <div className="box p-5 rounded-[10px]   text-[18px] text-gray-500">
                    <FontAwesomeIcon icon={faChartLine} className="fa-2x mb-3 text-blue-600 text-3xl" />

                    <span className="block text-black font-bold text-3xl mb-[5px]">1292</span>

                    Best Selling 

                </div>
                </div>
            </div>
}
export default SquaresData