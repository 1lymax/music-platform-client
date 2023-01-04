import {createSlice} from "@reduxjs/toolkit";
import {HYDRATE} from "next-redux-wrapper";
import {TrackState} from '../../types/track'


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
    extraReducers: {
        [HYDRATE]: (state, action) => {
            //console.log('HYDRATE', state, action.payload);
            return {
                ...state,
                ...action.payload.track,
            };
        },
    },
})

export const trackActionCreators = trackSlice.actions


export default trackSlice.reducer