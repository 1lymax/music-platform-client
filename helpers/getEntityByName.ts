import {IArtist} from "../types/artist";

export const getEntityByName = <T extends IArtist>(name: string | undefined, entities: T[]): T | undefined => {
    return entities.find(element => element.name.toLowerCase() === name?.toLowerCase());
};