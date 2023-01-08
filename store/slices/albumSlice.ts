import {createSlice} from "@reduxjs/toolkit";
import {AlbumState} from "../../types/album";
import {APP_HYDRATE} from "../index";


const initialState: AlbumState = {
    albums: []
}


export const albumSlice = createSlice({
    name: 'album',
    initialState,
    reducers: {
        setAlbums: (state, action) => {
            state.albums = action.payload
        },
    },
    extraReducers: builder => {
        builder
            .addCase(
                APP_HYDRATE, (state, action) => {
                    return {
                        ...state,
                        ...action.payload.album,
                    };
                })
    },
})

export const {setAlbums} = albumSlice.actions
export const albumActionCreators = albumSlice.actions

export default albumSlice.reducer