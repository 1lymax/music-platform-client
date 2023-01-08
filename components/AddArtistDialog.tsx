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
import {useCreateArtistMutation} from "../store/api/artist";

interface AddArtistDialogProps {
    open: boolean;
    setOpen: (open: boolean) => void
}

const Step = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 500px;
`

const AddArtistDialog: FC<AddArtistDialogProps> = ({open, setOpen}) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const name = useInput('')
    const [picture, setPicture] = useState<any>();

    const [createArtist, {isSuccess, error,}] = useCreateArtistMutation()

    const handleClose = () => {
        setOpen(false);
    };

    useSuccessMessage('Track successfully added', isSuccess)
    useErrorMessage('Add track error', error)

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
        createArtist(form)
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
                    Add new artist
                </DialogTitle>
                <DialogContent>
                    <Step>
                        <TextField
                            {...name}
                            label={"Artist name"}
                            sx={{margin: '15px 0'}}
                        />
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
        </div>
    );
}

export default AddArtistDialog