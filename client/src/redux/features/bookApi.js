import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react"
const serverUrl = import.meta.env.VITE_SERVER_URL

export const bookApi = createApi({
    reducerPath:"bookApi",
    baseQuery:fetchBaseQuery({baseUrl:`${serverUrl}/api`,credentials:"include",prepareHeaders:(Headers)=>{
        const token = localStorage.getItem("token")
        if(token){
            Headers.set("Authorization",`Bearer ${token}`)
        }
        return Headers
    }}),
    tagTypes:["Books"],
    endpoints:(builder)=>({
        getAllBooks:builder.query({
            query:()=>"/getBooks",
            providesTags:["Books"]

        }),
        getSingleBook:builder.query({
            query:(id)=>`/singleBook/${id}`,
            providesTags:(result,error,id)=>[{type:"Books",id}]

        }),
        createBook:builder.mutation({
            query:(newBook)=>({
                url:"/createBook",
                method:"POST",
                body:newBook
            }),
            invalidatesTags:["Books"]
        }),

        updateBook:builder.mutation({
            query:({id,rest})=>({
                url:`/editBook/${id}`,
                method:"PUT",
                body:rest,
            }),
            invalidatesTags:(result,error,{id})=>[{type:"Books",id:"LIST"}]
        }),
        deleteBook:builder.mutation({
            query:(id)=>({
                url:`/deleteBook/${id}`,
                method:"DELETE",

            }),
            invalidatesTags:[{type:"Books",id:"LIST"}]
        })

    })
})



export const {
    
    useGetAllBooksQuery,
    useGetSingleBookQuery,
    useCreateBookMutation,
    useUpdateBookMutation,
    useDeleteBookMutation

} = bookApi