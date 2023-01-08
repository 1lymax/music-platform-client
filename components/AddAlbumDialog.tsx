import * as React from 'react';
import {FC, useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import {useTheme} from '@mui/material/styles';
import {TextField} from "@mui/material";
import styled from "styled-components";
import {useInput} from "../hooks/useInput";
import ImagePreview from "./UI/ImagePreview";
import FileUploader from "./FileUploader";
import {useSuccessMessage} from "../hooks/useSuccessMessage";
import {useErrorMessage} from "../hooks/useErrorMessage";
import {useCreateAlbumMutation} from "../store/api/album";
import SelectBox from "./UI/SelectBox";
import AddButton from "./UI/AddButton";
import {Add} from "@mui/icons-material";
import {IArtist} from "../types/artist";
import {useTypedSelector} from "../hooks/useTypedSelector";
import AddArtistDialog from "./AddArtistDialog";

interface AddAlbumDialogProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    //albumId: string
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

const AddAlbumDialog: FC<AddAlbumDialogProps> = ({open, setOpen}) => {
    const theme = useTheme();
    const name = useInput('')
    const [picture, setPicture] = useState<any>();
    const [artist, setArtist] = useState<IArtist>();
    const [artistDialog, setArtistDialog] = useState(false);

    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const {artists} = useTypedSelector(state => state.artist)

    const [createAlbum, {isSuccess, error,}] = useCreateAlbumMutation()

    const handleClose = () => {
        setOpen(false);
    };

    useSuccessMessage('Album successfully added', isSuccess)
    useErrorMessage('Add album error', error)

    useEffect(() => {
        if (isSuccess) {
            console.log('success save')
            name.value = ''
            setPicture(null)
            setOpen(false)
        }
    }, [isSuccess]);

    const save = () => {
        const form = new FormData()
        form.append("name", name.value)
        form.append("picture", picture)
        if (artist?._id) form.append("artistId", artist._id)
        createAlbum(form)
    }

    return (
        <div>
            <Dialog
                sx={{ '& .MuiDialog-paper': {height: 550 } }}
                fullScreen={fullScreen}
                open={open}
                scroll={"paper"}
                onClose={handleClose}
            >
                <DialogTitle>
                    Add new album
                </DialogTitle>
                <DialogContent>
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
                        {/*<SelectContainer>*/}
                        {/*    <SelectBox label={'Artist...'} setValue={setArtist} options={artists}/>*/}
                        {/*</SelectContainer>*/}

                        <FileUploader setFile={setPicture} accept="image/*">
                            {picture &&
								<ImagePreview file={picture}/>
                            }
                        </FileUploader>

                    </Step>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button onClick={save} autoFocus>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
            <AddArtistDialog open={artistDialog} setOpen={setArtistDialog}/>
        </div>
    );
}

export default AddAlbumDialog