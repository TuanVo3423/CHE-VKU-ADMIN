import { createSlice } from "@reduxjs/toolkit";

export const SystemReducer = createSlice({
    name : 'system',
    initialState : {
        isLoading : false,
        isError : false,
        MessageAlert : undefined,
        typeAlert : undefined,
        isOpenModalEdit : false,
        data : undefined,
    },
    reducers : {
        reset : (state,action) => {
            state.isLoading = false;
            state.isError = false;
            state.MessageAlert = undefined;
            state.typeAlert = undefined;
            state.isOpenModalEdit = false;
        },
        setIsLoading : (state,action) => {
            state.isLoading = action.payload;
        },
        setIsOpenModalEdit : (state, action) => { 
            state.isOpenModalEdit = true;
            state.data = action.payload;
         }
    }
});