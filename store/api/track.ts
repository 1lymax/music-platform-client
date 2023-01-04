import {ITrack} from "../../types/track";
import {HYDRATE} from "next-redux-wrapper";
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const trackApi = createApi({
    reducerPath: 'trackApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5000/'}),
    extractRehydrationInfo(action, {reducerPath}) {
        if (action.type === HYDRATE) {
            return action.payload[reducerPath]
        }
    },
    endpoints: (builder) => ({
        getAllTracks: builder.query<ITrack[], void>({
            query: () => `track/`,
        }),
    }),
})


export const { useGetAllTracksQuery } = trackApi


export const { getAllTracks } = trackApi.endpoints