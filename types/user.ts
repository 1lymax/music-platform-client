export interface IUser {
    _id: string;
    email: string;
    name: string;
    picture: string;

}

export interface UserState {
    user: IUser

}