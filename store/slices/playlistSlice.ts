import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {APP_HYDRATE} from "../index";
import {ITrack} from "../../types/track";
import {playlistApi} from "../api/playlist.api";
import {PlaylistState, playModes} from "../../types/playlist";


const initialState: PlaylistState = {
    _id: '',
    playlistActive: false,
    playlist: [],
    playlists: [],
    currentTrack: -1,
    playMode: playModes.shuffle
}


export const playlistSlice = createSlice({
    name: 'playlist',
    initialState,
    reducers: {
        changePlayMode: (state, action:PayloadAction<playModes>) => {
            state.playMode = action.payload
        },
        setActive: (state, action:PayloadAction<boolean>) => {
            state.playlistActive = action.payload
        },
        setPlayList: (state, action:PayloadAction<PlaylistState["playlist"]>) => {
            state.playlist = action.payload
        },
        setPlayLists: (state, action:PayloadAction<PlaylistState["playlists"]>) => {
            state.playlists = action.payload
        },
        setCurrentTrack: (state, action:PayloadAction<PlaylistState["currentTrack"]>) => {
            state.currentTrack = action.payload
        },
        addTrack: (state, action:PayloadAction<ITrack>) => {
            state.playlist.push({ track: action.payload, position: state.playlist.length })
        },
        // removeTrack: (state, action:PayloadAction<ITrack>) => {
        //     state.playlist.push({ track: action.payload, position: 0 })
        // },

        changeTrack: (state) => {
            if (state.playMode === playModes.all) {
                if (state.currentTrack + 1 === state.playlist.length) {
                    state.currentTrack = 0
                }else{
                    state.currentTrack = state.currentTrack + 1
                }
            }
            if (state.playMode === playModes.shuffle) {
                let random
                do {
                    random = Math.floor(Math.random() * state.playlist.length)
                }while (random === state.currentTrack)
                state.currentTrack = random
            }
            if (state.playMode === playModes.single) {}
        }

    },
    extraReducers (builder)  {
        builder
            .addCase(
                APP_HYDRATE, (state, action) => {
                    return {
                        ...state,
                        ...action.payload.playlist,
                    };
                })
            .addMatcher(playlistApi.endpoints.getUserPlaylists.matchFulfilled, (state, action) => {
                state.playlists = action.payload
            })
    },
})

export const playlistActionCreators = playlistSlice.actions

export default playlistSlice.reducer