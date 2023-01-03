import {PlayerState} from "../../types/player";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";
import {HYDRATE} from "next-redux-wrapper";

const initialState: PlayerState = {
    active: null,
    currentTime: 0,
    duration: 0,
    pause: true,
    volume: 30
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

    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            console.log('HYDRATE', state, action.payload);
            return {
                ...state,
                ...action.payload.player,
            };
        },
    },
})

export const {setActive, setDuration, setCurrentTime, pauseTrack, setVolume, playTrack} = playerSlice.actions
export const actionCreators = playerSlice.actions

export const playerActive = (state: RootState) => state.player.active
export const playerPause = (state: RootState) => state.player.pause

export default playerSlice.reducer