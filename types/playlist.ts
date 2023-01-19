import {ITrack} from "./track";

export enum playModes {
    all = 'all',
    shuffle = 'shuffle',
    single = 'single'
}

export interface PlaylistState {
    playlistActive: boolean;
    playlist: ITrack[];
    currentTrack: number;
    playMode: playModes
}