import {IArtist} from "../types/artist";
import {IAlbum} from "../types/album";

export const getEntityByName = <T extends IArtist | IAlbum>(name: string | undefined, entities: T[]): T | undefined => {
    return entities.find(element => element.name.toLowerCase() === name?.toLowerCase());
};