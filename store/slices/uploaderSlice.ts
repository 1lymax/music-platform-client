import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {APP_HYDRATE} from "../index";
import {IUploaderFile, IUploaderState} from "../../types/uploader";


const initialState: IUploaderState = {
    filesData: [],
    status: ""
};


export const uploaderSlice = createSlice({
    name: "uploader",
    initialState,
    reducers: {
        // setStatus: (state, action: PayloadAction<string>) => {
        //     state.status = action.payload;
        // },
        // setFileData: (state, action: PayloadAction<{ file: File, artists: IArtist[], genres: IGenre[], albums: IAlbum[] }>) => {
        //     let uploadedList:IUploaderFile[] = []
        //     mmb.parseBlob(action.payload.file).then(res => {
        //             uploadedList.push( {
        //                 audio: action.payload.file,
        //                 picture: null,
        //                 year: res.common.year,
        //                 label: res.common.label,
        //                 genreFromTag: res.common.genre,
        //                 duration: res.format.duration,
        //                 //genre: getEntitiesByArrayEntities(['Rock', 'Blues', 'Hard Rock'], genres),
        //                 posInAlbum: res.common.track.no,
        //                 albumNameFromTag: res.common.album,
        //                 artistNameFromTag: res.common.artist,
        //                 name: res.common.title ? res.common.title : action.payload.file.name,
        //                 nameFromTag: res.common.title ? res.common.title : action.payload.file.name,
        //                 artist: getEntityByName(res.common.artist, action.payload.artists),
        //                 album: getEntityByNameAndForeignEntity(
        //                     res.common.album,
        //                     getEntityByName(res.common.artist, action.payload.artists),
        //                     action.payload.albums),
        //                 genre: getEntitiesByArrayEntities(res.common.genre, action.payload.genres),
        //             });
        //
        //         }
        //     );
        //     state.filesData = uploadedList
        // },
        updateFileData: (state, action: PayloadAction<IUploaderFile>) => {
            state.filesData = [...state.filesData, action.payload];
        },
        setAllData: (state, action: PayloadAction<IUploaderFile[]>) => {
            state.filesData = action.payload;
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(
                APP_HYDRATE, (state, action) => {
                    //console.log('HYDRATE', state, action.payload);
                    return {
                        ...state,
                        ...action.payload,
                    };
                });
    },
});

export const uploaderActionCreators = uploaderSlice.actions;


export default uploaderSlice.reducer;