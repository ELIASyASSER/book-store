import { useEffect, useState, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import Loading from "../../components/loading";
const SERVER_URL = import.meta.env.VITE_SERVER_URL;
import { clearItems } from "../../redux/features/addCart";
import { useDispatch } from "react-redux";
import { useAuth } from "../../context/AuthUser";
const BookPaymentResult = () => {
  const [searchParams] = useSearchParams();
 const dispatch = useDispatch()
  const navigate = useNavigate();
  const {userDetails} = useAuth()
  const [status, setStatus] = useState("loading"); // "loading" | "success" | "failed"
  const redirectTimer = useRef(null);
console.log(userDetails())
  useEffect(() => {
  
    const transactionId = searchParams.get("id");

    if (transactionId) {

      fetch(`${SERVER_URL}/mobile/verify-payment?txn=${transactionId}`).then(res=>res.json())
        .then((data) => {
          if (data.success) {
            setStatus("success");
            dispatch(clearItems())
            redirectTimer.current = setTimeout(() => navigate(`/`), 7000);

          } else {
            setStatus("failed");
            redirectTimer.current = setTimeout(() => navigate("/checkout"), 7000);
          }
        })
        .catch((err) => {
          console.error("Verification error:", err);
          setStatus("failed");
          redirectTimer.current = setTimeout(() => navigate("/checkout"), 7000);
        });
    } else {
      setStatus("failed");
      redirectTimer.current = setTimeout(() => navigate("/checkout"), 7000);
    }

    return () => {
      if (redirectTimer.current) clearTimeout(redirectTimer.current);
    };
  }, [searchParams, navigate]);

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center transition-all duration-300 ${
        status === "success"
          ? "bg-green-50"
          : status === "failed"
          ? "bg-red-50"
          : "bg-white"
      } p-6`}
    >
      {status === "loading" ? (
        <><Loading/></>
      ) : status === "success" ? (
        <>
          <AiOutlineCheckCircle className="text-green-600" size={100} />
          <h1 className="text-3xl font-bold text-green-700 mt-4">Payment Successful!</h1>
          <p className="text-gray-600 text-lg mt-2 text-center">
            Thank you for your purchase. Redirecting to your dashboard...
          </p>
        </>
      ) : (
        <>
          <AiOutlineCloseCircle className="text-red-600" size={100} />
          <h1 className="text-3xl font-bold text-red-700 mt-4">Payment Failed</h1>
          <p className="text-gray-600 text-lg mt-2 text-center">
            The payment could not be processed. Redirecting to pricing...
          </p>
        </>
      )}
    </div>
  );
};

export default BookPaymentResult;
