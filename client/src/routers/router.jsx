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
import  DahboardBody from '../pages/seller/DashboardBodySeller'
import  ManageBooks from '../pages/seller/MangaeBooks'
import  AddBook from '../pages/seller/addBook'
import NotFoundPage from '../components/notFound'
import UpdateBook from '../pages/seller/updateBook'
import PricingPage from '../pages/pricing'
import PaymentResult from '../pages/visapayment/paymentResult'
import CheckSubscription from './checkSubscription'
import AdminLayout from '../pages/admin/adminLayout'
import AdminPublicRoute from './adminPublic'


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
                path:"/payment-result",
                element:<PrivateRoute>
                    <PaymentResult/>
                </PrivateRoute>
            },
                {
                path:"/pricing",
                element:<PrivateRoute>
                    <PricingPage/>
                </PrivateRoute>
                }
            ,
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
            },
        ]
    },
    
    
    {
        path:"/dashboard",
        
        element:<CheckSubscription>
            <DahboardBody/>
        </CheckSubscription>
    },
    {
        path:"/manage-books",
        element:<CheckSubscription>
            <ManageBooks/>
        </CheckSubscription>
    },
    {
        path:"/add-book",
        element:
        <CheckSubscription>
            <AddBook/>
        </CheckSubscription>
    },
    {
        path:"/update-book/:updatedBookId",
        element:<CheckSubscription>
            <UpdateBook/>
        </CheckSubscription>
    },
    {
        path:"*",
        element:<NotFoundPage/>
    },
    {
        path:"/adminLayout",
        element:<AdminLayout/>
    },
    {
        path:"/admin",
        element:<AdminPublicRoute/>

    },

])


export default router