export interface IGenre {
    _id: string;
    name: string;
}

export interface IGenreState {
    genres: IGenre[]
}