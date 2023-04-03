export interface IArtist {
    _id: string;
    name: string;
    picture?: string;
    tracks?: string[];
    albums?: string[];
}

export interface ArtistState {
    artists: IArtist[]
}