// @flow
import * as React from "react";
import styled from "styled-components";
import {TextField} from "@mui/material";
import {Delete} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import {IUploaderFile} from "../../types/uploader";
import {SelectAlbum} from "../UI/Selects/SelectAlbum";
import {UploaderContainer} from "./UploaderContainer";
import {SelectGenre} from "../UI/Selects/SelectGenre";
import {SelectArtist} from "../UI/Selects/SelectArtist";
import {getEntityById} from "../../helpers/getEntityById";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {getEntityByName} from "../../helpers/getEntityByName";
import {getEntitiesByArrayEntities} from "../../helpers/getEntitiesByArrayEntities";

const Container = styled.div`
  display: grid;
  grid-template-columns: 70px 0.8fr 1fr 1fr 60px;
  grid-column-gap: 1rem;
  grid-row-gap: 1rem;
  margin: 20px 0;
  border-radius: 20px;
  box-shadow: 1px 1px 5px rgba(100, 100, 100, 0.5);
  padding: 20px;
`;

const ImageCell = styled.div`
  grid-row-start: 1;
  grid-row-end: 4;
`;

const Cell = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const TwiceCell = styled.div`
  display: grid;
  grid-template-columns: 1fr 15px 1fr;
  grid-column: 2 / 3;
`;


interface Props {
    file: IUploaderFile,
    onUpdate: (file: IUploaderFile) => void
    onRemove: (file: IUploaderFile) => void
}

export const MusicUploaderItem = ({ file, onUpdate, onRemove }: Props) => {
    const { artists } = useTypedSelector(state => state.artist);
    const { albums } = useTypedSelector(state => state.album);
    const { genres } = useTypedSelector(state => state.genre);

    const handleUploadedImage = (files: (FileList | null)) => {
        onUpdate({ ...file, picture: files ? files[0] : null });
    };

    return (
        <Container>
            <ImageCell>
                <UploaderContainer width="70px"
                                   height="70px"
                                   zoomButton
                                   fileForPreview={file.picture}
                                   setFiles={handleUploadedImage}
                />
            </ImageCell>
            <Cell>
                <TextField
                    fullWidth
                    type={"search"}
                    value={file.name}
                    label={"Song's title"}
                    onChange={(e) => onUpdate({ ...file, name: e.target.value })}
                />
            </Cell>
            <Cell>
                <SelectArtist showAddNewInfo
                              artistName={file.artistNameFromTag}
                              defaultValue={getEntityByName(file.artist?.name, artists)}
                              setArtist={(artist) => {
                                  onUpdate({ ...file, artist: getEntityById(artist?._id, artists) });
                              }}/>
            </Cell>
            <Cell>
                <SelectAlbum showAddNewInfo
                             artist={file.artist}
                             albumName={file.albumNameFromTag}
                             defaultValue={getEntityByName(file.album?.name, albums)}
                             setAlbum={(album) =>
                                 onUpdate({ ...file, album: getEntityById(album?._id, albums) })}/>

            </Cell>
            <Cell>
                <IconButton sx={{ height: "40px", margin: "10px 0" }}
                            color="primary"
                            aria-label="Remove"
                            onClick={() => onRemove(file)}
                >
                    <Delete/>
                </IconButton>
            </Cell>
            <TwiceCell>
                <TextField
                    fullWidth
                    type={"text"}
                    value={file.year}
                    label={"Year"}
                    onChange={(e) => onUpdate({ ...file, year: parseInt(e.target.value) })}
                />
                <div></div>
                <TextField
                    fullWidth
                    type={"text"}
                    value={file.posInAlbum}
                    label={"No. in album"}
                    onChange={(e) => onUpdate({ ...file, posInAlbum: parseInt(e.target.value) })}
                />
            </TwiceCell>
            <Cell>
                <SelectGenre showAddNewInfo
                             genreNames={file.genreFromTag}
                             defaultValue={getEntitiesByArrayEntities(file.genre, genres)}
                             setGenres={(genre) => {
                                 onUpdate({ ...file,
                                     genre: getEntitiesByArrayEntities(genre, genres)
                                 });
                             }}/>
            </Cell>


        </Container>
    );
}