import {IArtist} from "./artist";
import {IAlbum} from "./album";
import {IGenre} from "./genre";

export interface IUploaderState {
    filesData: IUploaderFile[],
    status: string
}


export interface IUploaderFile {
    audio: File,
    name: string,
    picture: File | null,
    year: number | undefined,
    posInAlbum: number | null
    album: IAlbum | undefined,
    artist: IArtist | undefined,
    label: string[] | undefined,
    genre: IGenre[] | undefined,
    genreFromTag: string[] | undefined,
    duration: number | undefined,
    artistNameFromTag: string | undefined,
    albumNameFromTag: string | undefined,
}

export interface IUploaderFile2 {
    name: string,
    nameFromTag: string | undefined,
    year: number | undefined,
    posInAlbum: number | null
    album: IAlbum | undefined,
    artist: IArtist | undefined,
    label: string[] | undefined,
    genre: IGenre[] | undefined,
    genreFromTag: string[] | undefined,
    duration: number | undefined,
    artistNameFromTag: string | undefined,
    albumNameFromTag: string | undefined,
}
