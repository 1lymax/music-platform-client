import {IArtist} from "../types/artist";
import {IAlbum} from "../types/album";

export const getEntityById = <T extends IArtist | IAlbum>(id: string | undefined, entities:T[]): T | undefined => {
    return entities.find(entity => entity._id === id);
};