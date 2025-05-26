import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthUser";
import { useEffect, useState } from "react";
import { MdExitToApp } from "react-icons/md";
const VITE_SERVER_URL = import.meta.env.VITE_SERVER_URL

function WalletPay() {
  const { axios } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!location.state?.placeanOrder) {
      navigate("/checkout");
    } else {
      const order = location.state.placeanOrder;
      setData(order);
      // setPhone(order.addressDetails.phone || "");
      setPhone("01010101010" );
      setAmount(order.price || "");
    }
  }, [location.state, navigate]);

  const handlePay = async () => {
    try {
      setLoading(true);
      const res = await axios.post(`${VITE_SERVER_URL}/mobile/paymob/wallet`, {
      phone,
      amount,
      addressDetails:data.addressDetails,
      count:data.count,
      orderData:data.orderData,//books ids
      orderdEmail:data.orderdEmail
        
      });
      
  if (res.data.success && res.data.paymentLink) {
    window.location.href = res.data.paymentLink;
  } else {
    alert("Something went wrong. Please try again.");
  }


    //   window.location.href = res.data.paymentLink;
    } catch (err) {
      alert("Payment failed");
      console.error(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

 return (
  <div className="min-h-screen flex items-center justify-center flex-col bg-gray-50 px-4">
    <div className="w-fit p-4 max-w-md mb-4 flex justify-end border-4 border-blue-500 rounded-2xl ">
      <Link
        to="/checkout"
        className="flex items-center gap-2 text-purple-600 hover:text-purple-800 font-medium transition"
        title="Back to Checkout"
      >
        <MdExitToApp className="text-2xl" />
        <span className="hidden sm:inline">Back to Checkout</span>
      </Link>
    </div>

    <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        Pay with Mobile Wallet
      </h2>

      <div className="mb-4">
        <label className="block text-gray-600 mb-1">Phone Number</label>
        <input
          type="text"
          placeholder="e.g. 01010101010"
          onChange={(e) => setPhone(e.target.value)}
          className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-600 mb-1">Amount (EGP)</label>
        <input
          type="number"
          readOnly
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        onClick={handlePay}
        disabled={loading}
        className={`w-full py-2 rounded-xl text-white font-medium transition duration-200 ${
          loading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Processing..." : "Pay with Wallet"}
      </button>
    </div>
  </div>
);

}

export default WalletPay;
