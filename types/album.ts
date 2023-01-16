export interface IAlbum {
    _id: string;
    name: string;
    artistId?: string;
    picture: string;
    tracks?: string[];
}

export interface AlbumState {
    albums: IAlbum[]
}