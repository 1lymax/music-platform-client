import {ITrack} from "../../types/track";
import {HYDRATE} from "next-redux-wrapper";
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const trackApi = createApi({
    reducerPath: 'trackApi',
    baseQuery: fetchBaseQuery({baseUrl: process.env.NEXT_PUBLIC_API_URL}),
    extractRehydrationInfo(action, {reducerPath}) {
        if (action.type === HYDRATE) {
            return action.payload[reducerPath]
        }
    },
    endpoints: (builder) => ({
        getAllTracks: builder.query<ITrack[], void>({
            query: () => `track/`,
        }),
        getTrackById: builder.query<ITrack, string>({
            query: (id) => `track/${id}`,
        }),
        createTrack: builder.mutation<ITrack, FormData>({
            query: (args) => ({
                url: `track/`,
                method: 'POST',
                body: args
            }),

        })

    }),
})


export const { useGetAllTracksQuery, useCreateTrackMutation } = trackApi

export const { getAllTracks, getTrackById } = trackApi.endpoints