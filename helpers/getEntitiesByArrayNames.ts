import {IGenre} from "../types/genre";

export const getEntitiesByArrayNames = <T extends IGenre>(toFind: string[] | undefined, entities:T[]): T[] | null => {
    if (!toFind) return null;
    let foundEntities: T[] = []
    toFind.forEach(element => {
        let item = entities.find(entity => entity.name === element);
        if (item)
        foundEntities.push(item)
    });
    return foundEntities;
};