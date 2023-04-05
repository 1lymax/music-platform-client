import {IArtist} from "../types/artist";
import {IAlbum} from "../types/album";

// type T = IAlbum
//
// interface f<T, U> {
//     (
//         name: string | undefined,
//         foreignEntity: U | undefined,
//         entities: T[]
//     ) : T
// }

export const getEntityByNameAndForeignEntity =
    <T extends IAlbum, U extends IArtist>(
        name: string | undefined,
        foreignEntity: IArtist | undefined,
        entities: IAlbum[]
    ): T | undefined => {

        return entities.find(entity =>
            entity.name.toLowerCase() === name?.toLowerCase() &&
            entity.artist === foreignEntity?._id
        ) as T;
    };