import { useEffect, useState, useRef } from "react";
import { useCreateVisaPaymentMutation } from "../../redux/features/paymobApi";
import Loading from "../../components/loading";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const VisaPayment = ({plan}) => {
const navigate = useNavigate()
    const [iframeUrl, setIframeUrl] = useState("");

      const iframeRef = useRef(null);

  const [createVisaPayment, { isLoading }] = useCreateVisaPaymentMutation();
  useEffect(() => {
    createVisaPayment({price:plan.price,title:plan.title})
      .unwrap()
      .then((data) => setIframeUrl(data.iframeUrl))
      .catch((err) => {console.error("Payment Error:", err)
      Swal.fire({
        title: err?.data?.message|| "try again later",
        icon: "warning",
      draggable: true
      });
        navigate("/")
      });
  }, [plan]);

  
  

  if (isLoading || !iframeUrl) return <div className="flex items-center justify-center h-screen"><Loading/></div>;
  
  return (
    <div className="w-full h-screen">
    <iframe
      ref={iframeRef}
      src={iframeUrl}
      width="100%"
      height="100%"
      frameBorder="0"
      allowFullScreen
      title="Visa Payment"
      />
      </div>
      
    );
};




export default VisaPayment;
