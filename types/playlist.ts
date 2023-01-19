import {ITrack} from "./track";

export enum playModes {
    all = 'all',
    shuffle = 'shuffle',
    single = 'single'
}

export interface PlaylistState {
    playlistActive: boolean;
    playlist: { track: ITrack, position: number }[];
    currentTrack: number;
    playMode: playModes
}
// extra 'position' in the playlist for correct play between same tracks in the playlist when useEffect hook