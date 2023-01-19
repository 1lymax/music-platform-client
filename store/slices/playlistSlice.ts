import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ITrack} from "../../types/track";
import {PlaylistState, playModes} from "../../types/playlist";


const initialState: PlaylistState = {
    playlistActive: false,
    playlist: [],
    currentTrack: -1,
    playMode: playModes.all
}


export const playlistSlice = createSlice({
    name: 'playlist',
    initialState,
    reducers: {
        setPlayMode: (state, action:PayloadAction<PlaylistState["playMode"]>) => {
            state.playMode = action.payload
        },
        setActive: (state, action:PayloadAction<boolean>) => {
            state.playlistActive = action.payload
        },
        setPlayList: (state, action:PayloadAction<PlaylistState["playlist"]>) => {
            state.playlist = action.payload
        },
        setCurrentTrack: (state, action:PayloadAction<PlaylistState["currentTrack"]>) => {
            state.currentTrack = action.payload
        },
        addTrack: (state, action:PayloadAction<ITrack>) => {
            state.playlist.push(action.payload)
        },
        removeTrack: (state, action:PayloadAction<ITrack>) => {
            state.playlist.push(action.payload)
        },
        changeTrack: (state) => {
            if (state.playMode === playModes.all) {
                if (state.currentTrack === state.playlist.length) {
                    state.currentTrack = 0
                }else{
                    state.currentTrack = state.currentTrack + 1
                }
            }
        }

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

export const playlistActionCreators = playlistSlice.actions

export default playlistSlice.reducer