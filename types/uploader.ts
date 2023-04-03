import {IArtist} from "./artist";
import {IAlbum} from "./album";

export interface IUploaderState {
    files: IUploaderFile[]
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
    genre: string[] | undefined,
    duration: number | undefined,
    artistNameFromTag: string | undefined,
    albumNameFromTag: string | undefined,
}

