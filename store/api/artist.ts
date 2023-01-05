import {HYDRATE} from "next-redux-wrapper";
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {IArtist} from "../../types/artist";
import {setArtists} from "../slices/artistSlice";

export const artistApi = createApi({
    reducerPath: 'artistApi',
    baseQuery: fetchBaseQuery({baseUrl: process.env.NEXT_PUBLIC_API_URL}),
    extractRehydrationInfo(action, {reducerPath}) {
        if (action.type === HYDRATE) {
            return action.payload[reducerPath]
        }
    },
    endpoints: (builder) => ({
        getAllArtists: builder.query<IArtist[], void>({
            query: () => `artist/`,
            onCacheEntryAdded(arg, {dispatch, cacheDataLoaded} ): Promise<void> | void {
                try {
                    cacheDataLoaded.then(result => {
                            dispatch(setArtists(result.data))})
                }catch (e) {
                    console.log(e)
                }

            }
        }),
        getArtistById: builder.query<IArtist, string>({
            query: (id) => `artist/${id}`,
        }),


    }),
})


export const { useGetAllArtistsQuery, useGetArtistByIdQuery } = artistApi

export const { getAllArtists, getArtistById } = artistApi.endpoints