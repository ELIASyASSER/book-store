import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getTokenId } from "../../firebase/getauth";
const serverUrl = import.meta.env.VITE_SERVER_URL
export const payVisaApi = createApi({
    reducerPath:"payment",
    baseQuery:fetchBaseQuery({
        baseUrl:`${serverUrl}/pay`,
        prepareHeaders:async(headers)=>{
            headers.set("Content-Type","application/json")
            const tokenId = await getTokenId();
            if(!tokenId)throw new Error("token is not defined")
            headers.set("Authorization",`Bearer ${tokenId}`)
            return headers
        }
    }),
    endpoints:(builder)=>({
        createVisaPayment:builder.mutation({
            query:(data)=>({
                url:"/paymob/planPay",
                body:data,//here this is {"standard",100} for example
                method:"POST"
            })
        })
    })
})

export const {useCreateVisaPaymentMutation} = payVisaApi