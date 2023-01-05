import {createSlice} from "@reduxjs/toolkit";
import {HYDRATE} from "next-redux-wrapper";
import {AlbumState} from "../../types/album";


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
    extraReducers: {
        [HYDRATE]: (state, action) => {
            //console.log('HYDRATE', state, action.payload);
            return {
                ...state,
                ...action.payload.album,
            };
        },
    },
})

export const {setAlbums} = albumSlice.actions
export const albumActionCreators = albumSlice.actions

export default albumSlice.reducer