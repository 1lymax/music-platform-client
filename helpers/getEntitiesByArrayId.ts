import {IGenre} from "../types/genre";


export const getEntitiesByArrayId = <T extends IGenre>(toFind: T[] | null, entities: T[]) : T[] | null => {
    if (!toFind) return null;
    let foundEntities: T[] = []
    //const newArray = Array.isArray(toFind) ? toFind : [toFind]
    toFind.forEach(element => {
        let item = entities.find(entity => entity._id === element._id);
        if (item)
            foundEntities.push(item)
    });
    return foundEntities
};


