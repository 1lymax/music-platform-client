import {createSlice} from "@reduxjs/toolkit";
import {APP_HYDRATE} from "../index";
import {artistApi} from "../api/artist.api";
import {ArtistState} from "../../types/artist";


const initialState: ArtistState = {
    artists: []
};

export const artistSlice = createSlice({
    name: "artist",
    initialState,
    reducers: {
        setArtists: (state, action) => {
            state.artists = action.payload;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(
                APP_HYDRATE, (state, action) => {
                    return {
                        ...state,
                        ...action.payload.artist,
                    };
                })
            .addMatcher(artistApi.endpoints.getAllArtists.matchFulfilled, (state, action) => {
                state.artists = action.payload;
            });
    },
});



export const { setArtists } = artistSlice.actions;
export const artistActionCreators = artistSlice.actions;

export default artistSlice.reducer;
