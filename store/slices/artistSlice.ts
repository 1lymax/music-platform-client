import {createSlice} from "@reduxjs/toolkit";
import {HYDRATE} from "next-redux-wrapper";
import {ArtistState} from "../../types/artist";


const initialState: ArtistState = {
    artists: []
}


export const artistSlice = createSlice({
    name: 'artist',
    initialState,
    reducers: {
        setArtists: (state, action) => {
            state.artists = action.payload
        },
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            //console.log('HYDRATE', state, action.payload);
            return {
                ...state,
                ...action.payload.artist,
            };
        },
    },
})

export const artistActionCreators = artistSlice.actions


export default artistSlice.reducer