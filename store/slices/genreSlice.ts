import {createSlice} from "@reduxjs/toolkit";
import {APP_HYDRATE} from "../index";
import {genreApi} from "../api/genre.api";
import {IGenreState} from "../../types/genre";



const initialState: IGenreState = {
    genres: []
}


export const genreSlice = createSlice({
    name: 'genre',
    initialState,
    reducers: {
        setGenres: (state, action) => {
            state.genres = action.payload
        },
    },
    extraReducers (builder) {
        builder
            .addCase(
                APP_HYDRATE, (state, action) => {
                    return {
                        ...state,
                        ...action.payload.genre,
                    };
                })
            .addMatcher(genreApi.endpoints.getAllGenres.matchFulfilled, (state, action) => {
                state.genres = action.payload
            })
    },
})

export const {setGenres} = genreSlice.actions
export const genreActionCreators = genreSlice.actions

export default genreSlice.reducer