import { createSlice } from "@reduxjs/toolkit";
import Swal from 'sweetalert2'
const initialState={
    cartItems:JSON.parse(localStorage.getItem("cartItems"))||[],

}
export const addingSlice = createSlice({
    name:"shopping",
    initialState:initialState,
    
    reducers:{
        addToCart:(state,action)=>{
            const existingItem = state.cartItems.find((item)=>item._id == action.payload._id)
            if(existingItem ){
                Swal.fire({
                    position: "center-center",
                    icon: "error",
                    title: "Item Already Exist In The Cart ",
                    showConfirmButton: false,
                    timer: 2000
                    });
                return;
            }
            state.cartItems.push(action.payload)
            localStorage.setItem("cartItems",JSON.stringify(state.cartItems))

            Swal.fire({
            position: "center-center",
            icon: "success",
            title: "Item Added To Cart ",
            showConfirmButton: false,
            timer: 1500
            });
        },


        clearItems:(state)=>{
            state.cartItems = []
            localStorage.removeItem("cartItems")
        },
        
        removeItem:(state,action)=>{
        state.cartItems = state.cartItems.filter((item)=>item._id !== action.payload)
        localStorage.setItem("cartItems",JSON.stringify(state.cartItems))
    }
}
})
export const {addToCart,clearItems,removeItem} = addingSlice.actions
export default addingSlice.reducer