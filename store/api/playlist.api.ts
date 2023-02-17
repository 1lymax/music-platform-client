import {HYDRATE} from "next-redux-wrapper";
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {IPlaylist} from "../../types/playlist";

interface IAddTrack {
    playlistId: string | undefined;
    tracks: string[];
}

export const playlistApi = createApi({
    reducerPath: 'playlistApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),
    extractRehydrationInfo(action, { reducerPath }) {
        if (action.type === HYDRATE) {
            return action.payload[reducerPath]
        }
    },
    tagTypes: ['playlist'],
    endpoints: (builder) => ({
        getUserPlaylists: builder.query<IPlaylist[], string>({
            query: (id) => ({
                url: `playlist/user/${id}`,
                credentials: 'include'
            }),
            providesTags: ['playlist']
        }),

        getPlaylistById: builder.query<IPlaylist, string>({
            query: (id) => ({
                url: `playlist/${id}`,
                credentials: 'include'
            }),
        }),

        createPlaylist: builder.mutation<IPlaylist, FormData>({
            query: (args) => ({
                url: `playlist/`,
                method: 'POST',
                credentials: 'include',
                body: args
            }),
            invalidatesTags: ['playlist']
        }),

        addTrackToPlaylist: builder.mutation<IPlaylist, IAddTrack>({
            query: ({ playlistId, tracks }) => ({
                url: 'playlist/' + playlistId + '/track/add',
                credentials: 'include',
                method: 'POST',
                body: tracks
            }),
            invalidatesTags: ['playlist']
        })
    }),
})


export const {
    useCreatePlaylistMutation,
    useGetUserPlaylistsQuery,
    useGetPlaylistByIdQuery,
    useAddTrackToPlaylistMutation
} = playlistApi

export const { getUserPlaylists, getPlaylistById, createPlaylist, addTrackToPlaylist } = playlistApi.endpoints