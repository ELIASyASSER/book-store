import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const serverUrl = import.meta.env.VITE_SERVER_URL

export const ordersApi = createApi({
    reducerPath:"ordersApi",

    baseQuery:fetchBaseQuery({
        baseUrl:`${serverUrl}/orders`,
        credentials:"include"
    }
),
    tagTypes:["Orders"],

    endpoints:(builder)=>({

        createOrder:builder.mutation({

            query:(newOrder)=>({
                url:"/postOrder",
                method:"POST",
                body:newOrder,
                credentials:"include"
            }),

            invalidatesTags:["Orders"]

        }),
        getOrderByEmail:builder.query({
            query:(email)=>`/getOrder/${email}`,
            providesTags:(result,error,email)=>[{type:"Orders",email}]
        })
    })
})


export const
{

    useCreateOrderMutation ,
    useGetOrderByEmailQuery

} = ordersApi