import * as React from "react";
import {Dispatch, FC, forwardRef, SetStateAction, useEffect, useImperativeHandle, useState} from "react";
import styled from "styled-components";
import {Add} from "@mui/icons-material";
import {TextField} from "@mui/material";

import AddArtist from "./AddArtist";
import {IAlbum} from "../types/album";
import AppDialog from "./UI/AppDialog";
import {IArtist} from "../types/artist";
import FileUploader from "./FileUploader";
import {useInput} from "../hooks/useInput";
import ImagePreview from "./UI/ImagePreview";
import AddButton from "./UI/Buttons/AddButton";
import SelectTemplate from "./UI/Selects/SelectTemplate";
import {useErrorMessage} from "../hooks/useErrorMessage";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useSuccessMessage} from "../hooks/useSuccessMessage";
import {useCreateAlbumMutation} from "../store/api/album.api";

interface AddAlbumProps {
    setOpen?: Dispatch<SetStateAction<boolean>>;
    defaultValue?: string;
    defaultArtist?: IArtist | undefined
    onUpdate?: (album: IAlbum) => void;
}

const Step = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 500px;
`;

const SelectContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;
/* eslint-disable react/display-name */
const AddAlbum: FC<AddAlbumProps> = forwardRef((props, ref) => {
    const { setOpen, onUpdate, defaultValue, defaultArtist } = props;
    const name = useInput(defaultValue);
    const [picture, setPicture] = useState<any>();
    const [artist, setArtist] = useState<IArtist | undefined>(defaultArtist);
    const [artistDialog, setArtistDialog] = useState(false);

    const { artists } = useTypedSelector(state => state.artist);

    const [createAlbum, { isSuccess, error, data}] = useCreateAlbumMutation();


    useSuccessMessage("Album successfully added", isSuccess);
    useErrorMessage("Add album error", error);

    useEffect(() => {
        if (isSuccess) {
            name.setValue("");
            setPicture(null);
            setOpen && setOpen(false);
            if (data && onUpdate) {
                onUpdate(data)
            }
        }
    }, [isSuccess]);

    useImperativeHandle(ref, () => ({
        save: () => {
            const form = new FormData();
            form.append("name", name.componentProps.value);
            form.append("picture", picture);
            if (artist?._id) form.append("artist", artist._id);
            createAlbum(form);
        }
    }));

    const handleArtistChange = (artist: IArtist) => {
        setArtist(artist)
    }

    return (
        <>
            <Step>
                <TextField
                    {...name.componentProps}
                    label={"Album name"}
                    sx={{ margin: "15px 0" }}
                />
                <SelectContainer>
                    <SelectTemplate label={"Artist..."}
                                    onChange={setArtist}
                                    options={artists}
                                    defaultValue={defaultArtist}
                    />
                    <AddButton icon={<Add/>}
                               onClick={() => setArtistDialog(true)}>Add...</AddButton>
                </SelectContainer>
                <FileUploader setFile={setPicture} accept="image/*">
                    {picture &&
						<ImagePreview file={picture}/>
                    }
                </FileUploader>

            </Step>
            <AppDialog open={artistDialog} setOpen={setArtistDialog} title={"Add new artist"}>
                <AddArtist setOpen={setArtistDialog}/>
            </AppDialog>
        </>
    );
});

export default AddAlbum;