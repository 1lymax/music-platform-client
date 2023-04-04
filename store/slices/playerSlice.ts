import {PlayerState} from "../../types/player";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {APP_HYDRATE} from "../index";


const initialState: PlayerState = {
    active: null,
    currentTime: 0,
    duration: 0,
    pause: true,
    volume: 30,
}


export const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        playTrack: (state) => {
            state.pause = false
        },
        pauseTrack: (state) => {
            state.pause = true
        },
        setActive: (state, action:PayloadAction<PlayerState["active"]>) => {
            state.active = action.payload
            state.currentTime = 0
        },
        setDuration: (state, action:PayloadAction<PlayerState["duration"]>) => {
            state.duration = action.payload
        },
        setCurrentTime: (state, action:PayloadAction<PlayerState["currentTime"]>) => {
            state.currentTime = action.payload
        },
        setVolume: (state, action:PayloadAction<PlayerState["volume"]>) => {
            state.volume = action.payload
        },
        playPause: (state) => {
            state.pause = !state.pause
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(
                APP_HYDRATE, (state, action) => {
                    //console.log('HYDRATE player', state, action.payload);
                    return {
                        ...state,
                        ...action.payload.player,
                    };
                })
    },

    // extraReducers: {
    //     [HYDRATE]: (state, action) => {
    //         return {
    //             ...state,
    //             ...action.payload.player,
    //         };
    //     },
    // },
})

export const playerActionCreators = playerSlice.actions

export default playerSlice.reducer