import {IGenre} from "../types/genre";

export const getEntitiesByArrayEntities = <T extends IGenre>(toFind: T[] | null | undefined, entities: T[]): T[] | null => {
    if (!toFind) return null;
    let foundEntities: T[] = [];
    //console.log(toFind);
    toFind.forEach(element => {
        let item = entities.find(entity => entity === element);
        if (item)
            foundEntities.push(item);
    });
    return foundEntities;
};