import {ITrack} from "./track";
import {IUser} from "./user";

export enum playModes {
    all = 'all',
    shuffle = 'shuffle',
    single = 'single'
}

export interface IPlaylist {
    _id?: string;
    name: string;
    picture: string;
    public: boolean;
    saved: boolean;
    tracks: ITrack[];
    user: IUser
}

export interface PlaylistState {
    _id: string;
    playlistActive: boolean;
    playlist: { track: ITrack, position: number }[];
    playlists: IPlaylist[];
    currentTrack: number;
    playMode: playModes
}
// extra 'position' in the playlist for correct play between same tracks in the playlist when useEffect hook