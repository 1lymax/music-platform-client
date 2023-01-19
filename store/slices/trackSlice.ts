import {createSlice} from "@reduxjs/toolkit";
import {TrackState} from '../../types/track'
import {APP_HYDRATE} from "../index";


const initialState: TrackState = {
    tracks: []
}


export const trackSlice = createSlice({
    name: 'track',
    initialState,
    reducers: {
        setTracks: (state, action) => {
            state.tracks = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(
                APP_HYDRATE, (state, action) => {
                    //console.log('HYDRATE', state, action.payload);
                    return {
                        ...state,
                        ...action.payload.track,
                    };
                })
    },
})

export const trackActionCreators = trackSlice.actions


export default trackSlice.reducer