import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getTokenId } from "../../firebase/getauth";

const serverUrl = import.meta.env.VITE_SERVER_URL;
export const dashboardApi = createApi({
    reducerPath:"dashboardApi",
    baseQuery:fetchBaseQuery({
        baseUrl:`${serverUrl}/dashboard`,
        credentials:"include",
        prepareHeaders:async(headers)=>{
            const tokenid = await getTokenId();
            if(!tokenid) throw new Error("token id is not defined");
            
            headers.set("Authorization",`Bearer ${tokenid}`)
            return headers
        }
    }),

    tagTypes:"Stats",
    
    endpoints:(builder)=>({
        getBooksCount:builder.query({
            query:()=>"/booksCount",
            providesTags:["Stats"]
        }),
        

    })


}) 
export const {useGetBooksCountQuery} = dashboardApi