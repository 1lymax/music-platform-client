import styled from "styled-components";
import React, {FC, useEffect, useState} from 'react';

import {useRouter} from "next/router";
import {Add} from "@mui/icons-material";
import {IAlbum} from "../../types/album";
import {IArtist} from "../../types/artist";
import {useInput} from "../../hooks/useInput";
import {Button, TextField} from "@mui/material";
import AddAlbum from "../../components/AddAlbum";
import MainLayout from "../../layouts/MainLayout";
import AddDialog from "../../components/UI/AddDialog";
import AddArtist from "../../components/AddArtist";
import AddButton from "../../components/UI/AddButton";
import SelectBox from "../../components/UI/SelectBox";
import StepWrapper from "../../components/StepWrapper";
import FileUploader from "../../components/FileUploader";
import {useSearchAlbumQuery} from "../../store/api/album.api";
import {useErrorMessage} from "../../hooks/useErrorMessage";
import ImagePreview from "../../components/UI/ImagePreview";
import AudioPreview from "../../components/UI/AudioPreview";
import {useGetAllArtistsQuery} from "../../store/api/artist.api";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useCreateTrackMutation} from "../../store/api/track.api";
import {useSuccessMessage} from "../../hooks/useSuccessMessage";


const Step = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const SelectContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 600px;
  align-self: center;
`

const Create: FC = () => {
    const router = useRouter()
    const [album, setAlbum] = useState<IAlbum>();
    const [artist, setArtist] = useState<IArtist>();
    const [audio, setAudio] = useState<any>();
    const [picture, setPicture] = useState<any>();
    const [activeStep, setActiveStep] = useState<number>(0);
    const [artistDialog, setArtistDialog] = useState<boolean>(false);
    const [albumDialog, setAlbumDialog] = useState<boolean>(false);

    const name = useInput('', 'Track title')
    const text = useInput('', 'Track lyrics')

    const {artists} = useTypedSelector(state => state.artist)
    const {albums} = useTypedSelector(state => state.album)

    useGetAllArtistsQuery()
    useSearchAlbumQuery({artistId: artist?._id})

    const [createTrack, {isSuccess, error, }] = useCreateTrackMutation()

    useSuccessMessage('Track successfully added', isSuccess)
    useErrorMessage('Add track error', error)

    useEffect(() => {
        if (isSuccess)
            router.push('/tracks')
        //@ts-ignore
    }, [isSuccess]);

    const back = () => {
        setActiveStep(prevState => prevState - 1)
    }

    const next = () => {
        if (activeStep < 2) {
            setActiveStep(prevState => prevState + 1)
        } else {
            const form = new FormData()
            form.append("name", name.componentProps.value)
            form.append("text", text.componentProps.value)
            form.append("picture", picture)
            form.append("audio", audio)
            if (album?._id) form.append("albumId", album._id)
            if (artist?._id) form.append("artistId", artist._id)
            createTrack(form)
        }
    }

    const albumName = () => {
        if (artist)
            return "Album (" + albums.length + ")"
        else
            return 'Select artist first'
    }

    return (
        <MainLayout>
            <StepWrapper activeStep={activeStep}>
                {activeStep === 0 &&
					<Step>
						<TextField
                            {...name.componentProps}
							sx={{marginBottom: '15px'}}
						/>
						<SelectContainer>
							<SelectBox label={'Artist...'} setValue={setArtist} options={artists}/>
							<AddButton icon={<Add/>}
                                       onClick={() => setArtistDialog(true)}>Add...</AddButton>
						</SelectContainer>
						<SelectContainer>
							<SelectBox label={albumName()} setValue={setAlbum} options={albums}/>
							<AddButton icon={<Add/>}
                                       onClick={() => setAlbumDialog(true)}>Add...</AddButton>
						</SelectContainer>
                        <TextField
                            {...text.componentProps}
							rows={4}
							multiline
							sx={{marginBottom: '10px'}}
						/>
                    </Step>
                }
                {activeStep === 1 &&
					<Step>
						Upload picture
						<FileUploader setFile={setPicture} accept="image/*">
                            {picture &&
								<ImagePreview file={picture}/>
                            }
						</FileUploader>

					</Step>
                }
                {activeStep === 2 &&
					<Step>
						Upload audio track
						<FileUploader setFile={setAudio} accept="audio/*">
                            {audio &&
								<AudioPreview file={audio}/>
                            }
						</FileUploader>
                    </Step>
                }
            </StepWrapper>
            <ButtonContainer>
                <Button variant={"contained"} disabled={activeStep === 0} onClick={back}>Back</Button>
                <Button variant={"contained"} onClick={next}>{activeStep === 2 ? 'Save' : 'Next'}</Button>
            </ButtonContainer>
            <AddDialog open={artistDialog} setOpen={setArtistDialog} title={'Add new artist'}>
                <AddArtist setSuccess={setArtistDialog}/>
            </AddDialog>
            <AddDialog open={albumDialog} setOpen={setAlbumDialog} title={'Add new album'}>
                <AddAlbum setSuccess={setAlbumDialog}/>
            </AddDialog>
        </MainLayout>
    );
};

export default Create;