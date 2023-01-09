import * as React from 'react';
import {Dispatch, FC, forwardRef, SetStateAction, useEffect, useImperativeHandle, useState} from 'react';
import styled from "styled-components";
import {TextField} from "@mui/material";

import SelectBox from "./UI/SelectBox";
import AddButton from "./UI/AddButton";
import {IArtist} from "../types/artist";
import {Add} from "@mui/icons-material";
import FileUploader from "./FileUploader";
import {useInput} from "../hooks/useInput";
import ImagePreview from "./UI/ImagePreview";
import AddArtist from "./AddArtist";
import {useErrorMessage} from "../hooks/useErrorMessage";
import {useCreateAlbumMutation} from "../store/api/album";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useSuccessMessage} from "../hooks/useSuccessMessage";
import AddDialog from "./AddDialog";

interface AddAlbumProps {
    setSuccess?: Dispatch<SetStateAction<boolean>>

}

const Step = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 500px;
`

const SelectContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`

const AddAlbum: FC<AddAlbumProps> = forwardRef((props, ref) => {
    const name = useInput('')
    const [picture, setPicture] = useState<any>();
    const [artist, setArtist] = useState<IArtist>();
    const [artistDialog, setArtistDialog] = useState(false);

    const {artists} = useTypedSelector(state => state.artist)

    const [createAlbum, {isSuccess, error,}] = useCreateAlbumMutation()


    useSuccessMessage('Album successfully added', isSuccess)
    useErrorMessage('Add album error', error)

    useEffect(() => {
        if (isSuccess) {
            name.value = ''
            setPicture(null)
            props.setSuccess && props.setSuccess(true)
        }
    }, [isSuccess]);

    useImperativeHandle(ref, () => ({
        save: () => {
            const form = new FormData()
            form.append("name", name.value)
            form.append("picture", picture)
            if (artist?._id) form.append("artistId", artist._id)
            createAlbum(form)
        }
    }))


    return (
        <div>
            <Step>
                <TextField
                    {...name}
                    label={"Album name"}
                    sx={{margin: '15px 0'}}
                />
                <SelectContainer>
                    <SelectBox label={'Artist...'} setValue={setArtist} options={artists}/>
                    <AddButton icon={<Add/>}
                               onClick={() => setArtistDialog(true)}>Add...</AddButton>
                </SelectContainer>
                <FileUploader setFile={setPicture} accept="image/*">
                    {picture &&
						<ImagePreview file={picture}/>
                    }
                </FileUploader>

            </Step>
            <AddDialog open={artistDialog} setOpen={setArtistDialog} title={'Add new artist'}>
                <AddArtist setSuccess={setArtistDialog}/>
            </AddDialog>
        </div>
    );
})

export default AddAlbum