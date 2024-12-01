import { Link, useLocation, useNavigate } from "react-router-dom";
import "./manageBooks.css"
import { useGetAllBooksQuery,useDeleteBookMutation} from "../../redux/features/bookApi";
import Swal from "sweetalert2";
import { MdExitToApp } from "react-icons/md";
import Loading from "../../components/loading";
import { useEffect } from "react";
const ManageBooks = () => {
    const [deleteBook] = useDeleteBookMutation()
    const {data,isError,isLoading,isFetching,refetch} = useGetAllBooksQuery()
    const navigate = useNavigate()
    const location = useLocation()
        useEffect(() => {
            if(location.state?.updated){
              refetch()
            }

          }, [location.state])



    if(isLoading || isFetching)return <div className="flex justify-center items-center h-[80vh] "><Loading/></div>
    if(isError)return <div className="flex justify-center items-center h-[80vh]  font-primary flex-col gap-20">
      <h1 className="text-5xl">Error Happen while fetching </h1>
      <Link to={"/"} className="bg-purple-500 text-white text-4xl p-6 rounded-lg hover:bg-purple-800">Home</Link></div>
    if(!data || data.length ==0) return <div className="flex justify-start items-center  w-10/12 shadow-lg p-4 mx-auto font-primary text-3xl h-[90vh] flex-col">
        <h1 className="mb-8"> No Books Found ...</h1>
        <div>

            <Link to={'/add-book'} className=" bg-purple-500 text-white p-3 rounded-lg hover:bg-white hover:text-purple-600 hover:border-purple-600  hover:border-[2px] font-semibold transition inline-block">Add Book</Link>
            <Link to={'/'} className="bg-purple-500 text-white p-3 rounded-lg hover:bg-white hover:text-purple-600 hover:border-purple-600  hover:border-[2px] font-semibold transition inline-block ml-10 max-[440px]:block max-[440px]:mt-10 max-[440px]:ml-0 text-center">Home</Link>
        </div>
      </div>
        const handleDelete = (id)=>{
            Swal.fire({
                title: "Are you sure?",
                text: "You Can't Revert This Book",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
              }).then(async(result) => {
                if (result.isConfirmed) {
                    try {
                        await deleteBook(id).unwrap().then(()=>{
                          refetch()
                            Swal.fire({
                            title: "Deleted!",
                            text: "Book Deleted Successfully",
                            icon: "success"
                          });
                        })
                        
                    } catch (error) {
                        Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: `Something went wrong! While Deleting ${error.data}`,
                            
                        });
                        
                        if(error.data =='Invalid Credentials error with the token'){
                          Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: ` something went wrong please log in as admin first `,
                            
                        });
                          navigate("/admin")
                        }
                    }
                }
              });
        }
    return <div className="projects p-5 rounded-[6px]  m-5 w-10/12 mx-auto max-md:w-full font-secondary">
      <div className="flex items-center justify-between mb-10">
        <h2 className=" mt-0 mb-[15px] text-2xl  font-semibold">All Books</h2>
        <Link to={"/dashboard"} className='text-white bg-purple-600 px-4 py-2 rounded-lg hover:bg-purple-900'><MdExitToApp className='size-8'/></Link>

      </div>
      <div className="responsive-table">
        <table className="w-full text-[15px]">
          <thead className="bg-[#eee] font-bold">
            <tr>
              <td>Book Title</td>
              <td>Category</td>
              <td>Price</td>
              <td >Actions</td>
            </tr>
            
          </thead>
          <tbody className="font-mono">
            {data.map((book,idx)=>{
                return <tr key={idx}>
                <td className="flex items-center justify-between">
                    <span className="basis-1/5">{idx+1}-</span>
                    
                    <span className=" basis-4/5">{book.title}</span>
                </td>
                <td>{book.category}</td>
                <td>$ {book.newPrice}</td>
                <td className="flex justify-center items-center gap-5 font-bold ">
                  <Link className="text-green-500 font-bold  bg  border border-green-600 rounded-2xl px-4 py-1 hover:text-white hover:bg-green-700 transition hover:border-none" to={`/update-book/${book._id}`}> Edit</Link>
                  <button className="bg-red-500 hover:bg-red-700 text-white px-4 py-1 rounded-3xl" onClick={()=>handleDelete(book._id)}>Delete</button>
                </td>
              </tr>
            })}

          </tbody>
        </table>
      </div>
    </div>


};

export default ManageBooks;
