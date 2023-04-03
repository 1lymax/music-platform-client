import {createSlice} from "@reduxjs/toolkit";
import {APP_HYDRATE} from "../index";
import {IUploaderState} from "../../types/uploader";


const initialState: IUploaderState = {
    files: []
}


export const uploaderSlice = createSlice({
    name: 'uploader',
    initialState,
    reducers: {
        setFiles: (state, action) => {
            state.files = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(
                APP_HYDRATE, (state, action) => {
                    //console.log('HYDRATE', state, action.payload);
                    return {
                        ...state,
                        ...action.payload,
                    };
                })
    },
})

export const uploaderActionCreators = uploaderSlice.actions


export default uploaderSlice.reducer