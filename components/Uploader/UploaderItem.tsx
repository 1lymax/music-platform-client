// @flow
import {FC, useEffect, useState} from "react";
import * as React from "react";
import styled from "styled-components";
import {TextField} from "@mui/material";
import {AddAPhoto, Delete, NoPhotography} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import {IUploaderFile} from "../../types/uploader";
import {SelectAlbum} from "../UI/Selects/SelectAlbum";
import {SelectArtist} from "../UI/Selects/SelectArtist";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import DragContainer from "./DragContainer";
import {ImageThumbnail} from "../UI/Image/ImageThumbnail";

const FirstColumn = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 200px;
  width: 100%;
`;

const FileContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 10px 0 0;
`;

const SelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0 15px 20px 5px;
  min-width: 200px;
  width: 100%;
`;


interface IUploaderItem {
    file: IUploaderFile,
    onUpdate: (file: IUploaderFile) => void
    onRemove: (file: IUploaderFile) => void
}

export const UploaderItem: FC<IUploaderItem> = ({ file, onUpdate, onRemove }) => {
    const [imagePreview, setImagePreview] = useState<string>("");
    const { artists } = useTypedSelector(state => state.artist);
    const { albums } = useTypedSelector(state => state.album);

    const getArtistByName = (name: string | undefined) => {
        return artists.find(artist => artist.name.toLowerCase() === name?.toLowerCase());
    };

    const getArtistById = (id: string | undefined) => {
        return artists.find(artist => artist._id === id);
    };

    const getAlbumById = (id: string | undefined) => {
        return albums.find(album => album._id === id);
    };

    const getAlbumByName = (name: string | undefined) => {
        return albums.find(album => album.name.toLowerCase() === name?.toLowerCase());
    };

    const handleRemoveImage = () => {
        onUpdate({ ...file, picture: null });
    }

    const handleUploadedImage = (files: (FileList | null)) => {
        if (!files) return null;
        let reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onloadend = () => {
            if (reader.result) {
                setImagePreview(reader.result as string);
                onUpdate({ ...file, picture: files[0] });
            }
        };
    };

    useEffect(() => {
        let reader = new FileReader();
        if (!file.picture) {
            setImagePreview('');
            return
        }
        reader.readAsDataURL(file.picture);
        reader.onloadend = () => {
            if (reader.result) {
                setImagePreview(reader.result as string);
                onUpdate({ ...file, picture: file.picture });
            }
        };
    }, [file.picture]);

    return (
        <FileContainer>
            <ImageContainer>
                <DragContainer setFiles={handleUploadedImage}
                               accept={"image"}
                               isVisible={!imagePreview}
                               styles={{ width: "56px", height: "56px", margin: "0", padding: "15px" }}
                >
                    <AddAPhoto color={"primary"}/>
                </DragContainer>
                {imagePreview &&
					<>
						<ImageThumbnail source={imagePreview}/>
                        <IconButton color={"primary"} size={"small"} onClick={handleRemoveImage}>
                            <NoPhotography/>
                        </IconButton>

					</>
                }
            </ImageContainer>

            <FirstColumn>
                <TextField
                    fullWidth
                    type={"search"}
                    value={file.name}
                    onChange={(e) => onUpdate({ ...file, name: e.target.value })}
                    sx={{ marginBottom: "15px" }}
                />
            </FirstColumn>
            <SelectContainer>
                <SelectArtist showAddNewInfo
                              artistName={file.artistNameFromTag}
                              defaultValue={getArtistByName(file.artist?.name)}
                              setArtist={(artist) => {
                                  onUpdate({ ...file, artist: getArtistById(artist?._id) });
                              }}/>
            </SelectContainer>
            <SelectContainer>
                <SelectAlbum showAddNewInfo
                             artist={file.artist}
                             albumName={file.albumNameFromTag}
                             defaultValue={getAlbumByName(file.album?.name)}
                             setAlbum={(album) =>
                                 onUpdate({ ...file, album: getAlbumById(album?._id) })}/>

            </SelectContainer>
            <IconButton sx={{ height: "40px" }}
                        color="primary"
                        aria-label="Remove"
                        onClick={() => onRemove(file)}
            >
                <Delete/>
            </IconButton>

        </FileContainer>
    );
};