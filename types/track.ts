
export interface IComment {
    _id: string;
    username: string;
    text: string
}


export interface ITrack {
    _id: string;
    name: string;
    artistId: {
        _id?: string;
        name?: string;
        tracks?: string[];
        albums?: string[];
    }
    albumId: {
        _id?: string;
        name?: string;
        year?: number;
        picture?: string;
        artistId?: string;
        tracks?: string[]
    }
    text: string;
    listens: number;
    picture: string;
    audio: string;
    comments: IComment[]
}

export interface TrackState {
    tracks: ITrack[];
}