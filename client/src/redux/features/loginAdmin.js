import { createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react";
const serverUrl = import.meta.env.VITE_SERVER_URL

export const logAdminApi = createApi({
    reducerPath:"admin",
    baseQuery:fetchBaseQuery({
        baseUrl:`${serverUrl}/admin`,
        credentials:"include"
    }),
    tagTypes:["admin"],
    endpoints:(builder)=>({
        logadmin:builder.mutation({
            query:(data)=>({
                url:"/logAdmin",
                method:"POST",
                body:data,
                credentials:"include"
            }),
            invalidatesTags:["admin"]
        })
    })
})


export const {useLogadminMutation} = logAdminApi