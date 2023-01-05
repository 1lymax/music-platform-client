import {HYDRATE} from "next-redux-wrapper";
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {IAlbum} from "../../types/album";
import {setAlbums} from "../slices/albumSlice";

export const albumApi = createApi({
    reducerPath: 'albumApi',
    baseQuery: fetchBaseQuery({baseUrl: process.env.NEXT_PUBLIC_API_URL}),
    extractRehydrationInfo(action, {reducerPath}) {
        if (action.type === HYDRATE) {
            return action.payload[reducerPath]
        }
    },
    endpoints: (builder) => ({
        getAllAlbums: builder.query<IAlbum[], void>({
            query: () => `album/`,
        }),

        getAlbumById: builder.query<IAlbum, string>({
            query: (id) => `album/${id}`,
        }),

        searchAlbum: builder.query<IAlbum[], any>({
            query: (arg) => ({
                url: `album/search/artist`,
                params: arg
            }),
            onCacheEntryAdded(arg, {dispatch, cacheDataLoaded} ): Promise<void> | void {
                try {
                    cacheDataLoaded.then(result => {
                        dispatch(setAlbums(result.data))})
                }catch (e) {
                    console.log(e)
                }

            }
        }),
    }),
})


export const {useGetAllAlbumsQuery, useGetAlbumByIdQuery, useSearchAlbumQuery} = albumApi

export const {getAllAlbums, getAlbumById} = albumApi.endpoints