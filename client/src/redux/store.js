import {configureStore} from '@reduxjs/toolkit'
import AddingSlice from './features/addCart'
import { bookApi} from './features/bookApi'
import { ordersApi } from './features/orderApi'
import { logAdminApi } from './features/loginAdmin'

export const store  = configureStore({
    reducer:{
        shopping:AddingSlice,
        
        [bookApi.reducerPath]:bookApi.reducer,
        [ordersApi.reducerPath]:ordersApi.reducer,
        [logAdminApi.reducerPath]:logAdminApi.reducer
    },
    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware().concat(bookApi.middleware,
            ordersApi.middleware,
            logAdminApi.middleware)
})

