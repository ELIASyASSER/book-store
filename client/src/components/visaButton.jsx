// VisaButton.jsx
import { FaCcVisa } from 'react-icons/fa';

const VisaButton = () => {
  return (
    <button
      className="flex items-center gap-2 bg-[#1A1F71] text-white px-5 py-3 rounded-lg text-base font-semibold shadow-md hover:bg-[#15195d] transition "
    >
      <FaCcVisa size={24} />
      Pay with Visa
    </button>
  );
};

export default VisaButton;
