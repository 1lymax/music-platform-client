export interface IAlbum {
    _id: string;
    name: string;
    artist?: string;
    picture: string;
    tracks?: string[];
}

export interface AlbumState {
    albums: IAlbum[]
}