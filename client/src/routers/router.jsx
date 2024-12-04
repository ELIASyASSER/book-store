import  {createBrowserRouter} from 'react-router-dom'
import  App from '../App'
import  Home from '../pages/home'
import  ShoppingCart from '../pages/shoppingCart'
import  Login from '../pages/login'
import  Register from '../pages/register'
import  CheckOut from '../pages/checkout'
import  SingleBook from '../pages/singleBook'
import  PrivateRoute from './privateRoute'
import  OrderPage from '../pages/orderPage'
import  AdminLogin from '../pages/admin/loginAdmin'
import  DashBoardProtection from './DashBoardProtection'
import  DahboardBody from '../pages/admin/DahboardBody'
import  ManageBooks from '../pages/admin/MangaeBooks'
import  AddBook from '../pages/admin/addBook'
import NotFoundPage from '../components/notFound'
import UpdateBook from '../pages/admin/updateBook'


const router = createBrowserRouter([


    {
        path:"/",
        element:<App/>,
        children:[
            {
                path:"",
                element:<Home/>
            },
            {
                path:"/login",
                element:<Login/>
            },
            {
                path:"/register",
                element:<Register/>
            },
            
            {
                path:"/about",
                element:<div>About page</div>
            },

            {
                path:"/profile",
                element:<div>Profile Page</div>
            },
            
            {
                path:"/cart",
                element:<ShoppingCart/>
            },
            {
                    path:"/checkout",
                    element:<PrivateRoute>
                                <CheckOut/>
                            </PrivateRoute>
            },
            {
                path:"getOrder/:orderEmail",
                element:<PrivateRoute>
                            <OrderPage/>
                        </PrivateRoute>
            },
            {
                path:"singleBook/:bookId",
                element:<SingleBook/>
            }
        ]
    },
    {
        path:"/admin",
        element:<AdminLogin/>,

    },
    {
        path:"/dashboard",
        
        element:<DashBoardProtection>
            <DahboardBody/>
        </DashBoardProtection>
    },
    {
        path:"/manage-books",
        element:<DashBoardProtection>
            <ManageBooks/>
        </DashBoardProtection>
    },
    {
        path:"/add-book",
        element:
        <DashBoardProtection>
            <AddBook/>
        </DashBoardProtection>
    },
    {
        path:"/update-book/:updatedBookId",
        element:<DashBoardProtection>
            <UpdateBook/>
        </DashBoardProtection>
    },
    {
        path:"*",
        element:<NotFoundPage/>
    }

])


export default router