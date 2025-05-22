import {configureStore} from '@reduxjs/toolkit'
import AddingSlice from './features/addCart'
import { bookApi} from './features/bookApi'
import { dashboardApi } from './features/Stats'
import { ordersApi } from './features/orderApi'
import { logAdminApi } from './features/loginAdmin'
import { payVisaApi } from './features/paymobApi'

export const store  = configureStore({
    reducer:{
        shopping:AddingSlice,
        
        [bookApi.reducerPath]:bookApi.reducer,
        [ordersApi.reducerPath]:ordersApi.reducer,
        [logAdminApi.reducerPath]:logAdminApi.reducer,
        [payVisaApi.reducerPath]:payVisaApi.reducer,
        [dashboardApi.reducerPath]:dashboardApi.reducer,
    },
    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware().concat(bookApi.middleware,
            ordersApi.middleware,
            logAdminApi.middleware,
            payVisaApi.middleware,
            dashboardApi.middleware
        )
})

