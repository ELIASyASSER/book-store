import { useState } from "react";
import { plans } from "../utils/plans";
import VisaPayment from "./visapayment/payment";
import { MdExitToApp } from "react-icons/md";
import { Link } from "react-router-dom";


export default function PricingPage() {
  const [selectedPlan,setSelectedPlan] = useState(null);
  const handlePlan = (index)=>{
  const price =Number(plans[index].price)*100
  const title =plans[index].title
    setSelectedPlan({title,price});

    
  }
  
  if(selectedPlan){
    return <VisaPayment plan={selectedPlan}/>
  }







  return (
    <div className="bg-gradient-to-br from-blue-50 to-white py-20 px-6 ">
      <div className="text-center mb-16">
        <Link className=' bg-blue-600 p-3 mb-4 text-white text-xl font-bold  w-fit flex justify-self-end items-center rounded-md hover:bg-purple-800 transition' to="/">
              <MdExitToApp className='size-8'/>
              </Link>
        <h1 className="text-5xl font-bold mb-4 text-gray-800">Plans to Promote Your Books</h1>
        <p className="text-gray-600 text-xl">Start selling smarter and reach more readers today.</p>
      </div>

      <div className={`max-w-6xl  mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10  `}>
        {plans.map((plan, idx) => (
          <div
            key={idx}
            className={`relative rounded-2xl border shadow-lg p-8   bg-white  transition-transform duration-300 hover:scale-105 ${
              plan.popular ? "border-blue-600 bg-blue-50" : "border-gray-200 translate-y-12 mb-10 " 
              
              } ` }
              
          >
            {plan.popular && (
              <div className="absolute -top-3 right-3 bg-blue-600 text-white px-3 py-1 text-base font-semibold rounded-full shadow">
                Most Popular
              </div>
            )}

            <h2 className="text-4xl font-bold mb-1 text-center text-gray-900">{plan.title}</h2>
            <p className="text-center text-4xl font-extrabold text-blue-600  mt-4">{plan.price}
                <span className="text-xl block text-gray-500 font-semibold">Per {plan.time}</span>
            </p>

            <ul className="mt-16 space-y-6 text-gray-700 ">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="text-blue-500">✔</span> {feature}
                </li>
              ))}
            </ul>

            <div className="mt-16 text-center ">
              <button onClick={()=>handlePlan(idx)} className="w-4/5  border-2 border-sky-500 hover:text-white hover:bg-sky-500 text-sky-700 font-medium py-2.5 px-4 mx-auto rounded-xl transition duration-700 absolute bottom-4 left-1/2 -translate-x-1/2">
                {plan.buttonText}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
