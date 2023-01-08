import React, {FC, useEffect, useState} from 'react';
import MainLayout from "../../layouts/MainLayout";
import styled from "styled-components";
import StepWrapper from "../../components/StepWrapper";
import {Button, TextField} from "@mui/material";
import {useInput} from "../../hooks/useInput";
import SelectBox from "../../components/UI/SelectBox";
import {useGetAllArtistsQuery} from "../../store/api/artist";
import {useSearchAlbumQuery} from "../../store/api/album";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {IArtist} from "../../types/artist";
import {IAlbum} from "../../types/album";
import {useCreateTrackMutation} from "../../store/api/track";
import FileUploader from "../../components/FileUploader";
import ImagePreview from "../../components/UI/ImagePreview";
import AudioPreview from "../../components/UI/AudioPreview";
import {useSuccessMessage} from "../../hooks/useSuccessMessage";
import {useErrorMessage} from "../../hooks/useErrorMessage";
import {useRouter} from "next/router";
import AddButton from "../../components/UI/AddButton";
import {Add} from "@mui/icons-material";
import AddArtistDialog from "../../components/AddArtistDialog";
import AddAlbumDialog from "../../components/AddAlbumDialog";

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
    const [artistDialog, setArtistDialog] = useState(false);
    const [albumDialog, setAlbumDialog] = useState(false);

    const name = useInput('')
    const text = useInput('')

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
    }, [isSuccess]);



    const back = () => {
        setActiveStep(prevState => prevState - 1)
    }

    const next = () => {
        if (activeStep < 2) {
            setActiveStep(prevState => prevState + 1)
        } else {
            const form = new FormData()
            form.append("name", name.value)
            form.append("text", text.value)
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
                            {...name}
							label={"Track title"}
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
                            {...text}
							rows={4}
							multiline
							label={"Track lyrics"}
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
            <AddArtistDialog open={artistDialog} setOpen={setArtistDialog}/>
            <AddAlbumDialog open={albumDialog} setOpen={setAlbumDialog}/>
        </MainLayout>
    );
};

export default Create;