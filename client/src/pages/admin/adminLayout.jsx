import { Link } from "react-router-dom";
import DahboardBody from "./DashboardBodyAdmin"
import { MdExitToApp } from "react-icons/md";
const AdminLayout = () => {


    return (
        <>
        <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-6 bg-white transition-all duration-300 w-4/5 mx-auto">
                <Link href="/">
                    <img className="h-9" src="/fav-icon.png" alt="dummyLogoColored" />
                </Link>
                <div className="flex items-center gap-5 text-gray-500">
                    <p className="font-bold">Hi! Admin</p>
                    <Link to={"/"} className='text-white bg-gray-600 px-3 py-2 rounded-lg hover:bg-gray-900'><MdExitToApp className='size-6'/></Link>
                    
                </div>
            </div>

        <DahboardBody/>
        </>
    );
};
export default AdminLayout