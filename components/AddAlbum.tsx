import * as React from "react";
import {Dispatch, FC, forwardRef, SetStateAction, useEffect, useImperativeHandle, useState} from "react";
import styled from "styled-components";
import {Add} from "@mui/icons-material";
import {TextField} from "@mui/material";

import AddArtist from "./AddArtist";
import {IAlbum} from "../types/album";
import AppDialog from "./UI/AppDialog";
import {IArtist} from "../types/artist";
import {useInput} from "../hooks/useInput";
import AddButton from "./UI/Buttons/AddButton";
import SelectTemplate from "./UI/Selects/SelectTemplate";
import {useErrorMessage} from "../hooks/useErrorMessage";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useSuccessMessage} from "../hooks/useSuccessMessage";
import {useCreateAlbumMutation} from "../store/api/album.api";
import {UploaderContainer} from "./Uploader/UploaderContainer";

interface AddAlbumProps {
    setOpen?: Dispatch<SetStateAction<boolean>>;
    defaultValue?: string;
    defaultArtist?: IArtist | undefined
    onUpdate?: (album: IAlbum) => void;
}

const Step = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 15px;
  height: 100%;
  width: 500px;
`;

const SelectContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
/* eslint-disable react/display-name */
const AddAlbum: FC<AddAlbumProps> = forwardRef((props, ref) => {
    const { setOpen, onUpdate, defaultValue, defaultArtist } = props;
    const name = useInput(defaultValue);
    const year = useInput('');
    const [image, setImage] = useState<any>(null);
    const [artist, setArtist] = useState<IArtist | undefined>(defaultArtist);
    const [artistDialog, setArtistDialog] = useState(false);

    const { artists } = useTypedSelector(state => state.artist);

    const [createAlbum, { isSuccess, error, data}] = useCreateAlbumMutation();


    useSuccessMessage("Album successfully added", isSuccess);
    useErrorMessage("Add album error", error);

    useEffect(() => {
        if (isSuccess) {
            name.setValue("");
            setImage(null);
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
            form.append("year", year.componentProps.value);
            form.append("picture", image);
            if (artist?._id) form.append("artist", artist._id);
            createAlbum(form);
        }
    }));

    return (
        <>
            <Step>
                <TextField
                    {...name.componentProps}
                    label={"Album name"}
                />
                <TextField
                    {...year.componentProps}
                    label={"Release year"}
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
                <UploaderContainer setFiles={setImage} zoomButton={false} width="200px" height="200px"/>
            </Step>
            <AppDialog open={artistDialog} setOpen={setArtistDialog} title={"Add new artist"}>
                <AddArtist setOpen={setArtistDialog}/>
            </AppDialog>
        </>
    );
});

export default AddAlbum;