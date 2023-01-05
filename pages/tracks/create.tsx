import React, {FC, useState} from 'react';
import MainLayout from "../../layouts/MainLayout";
import styled from "styled-components";
import StepWrapper from "../../components/StepWrapper";
import {Button, TextField} from "@mui/material";
import {useInput} from "../../hooks/useInput";
import SelectBox from "../../components/SelectBox";
import {useGetAllArtistsQuery} from "../../store/api/artist";
import {useSearchAlbumQuery} from "../../store/api/album";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {IArtist} from "../../types/artist";
import {IAlbum} from "../../types/album";
import {useCreateTrackMutation} from "../../store/api/track";
import FileUploader from "../../components/FileUploader";
import ImagePreview from "../../components/UI/ImagePreview";
import AudioPreview from "../../components/UI/AudioPreview";


const Step = styled.div`
  display: flex;
  flex-direction: column;
`

const SelectContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`


const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

const Create: FC = () => {
    const [album, setAlbum] = useState<IAlbum>();
    const [artist, setArtist] = useState<IArtist>();
    const [audio, setAudio] = useState<any>();
    const [picture, setPicture] = useState<any>();
    const [activeStep, setActiveStep] = useState<number>(0);
    const [dragEnter, setDragEnter] = useState<boolean>(false);

    const name = useInput('')
    const text = useInput('')

    const {artists} = useTypedSelector(state => state.artist)
    const {albums} = useTypedSelector(state => state.album)

    const {data: artistsFetching, isSuccess: artistsSuccess} = useGetAllArtistsQuery()
    const {data: albumsFetching, isSuccess: albumsSuccess} = useSearchAlbumQuery(
        {artistId: artist?._id},
        {refetchOnMountOrArgChange: true})
    const [createTrack, result] = useCreateTrackMutation()
    const {} = useCreateTrackMutation()

    const dragEnterHandler = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setDragEnter(true)
    }

    const dragLeaveHandler = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setDragEnter(false)
    }

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

    console.log(picture)

    return (
        <MainLayout>
            <StepWrapper activeStep={activeStep}>
                {activeStep === 0 &&
					<Step>
						<TextField
                            {...name}
							label={"Track title"}
							sx={{marginBottom: '10px'}}
						/>
						<SelectContainer>
							<SelectBox label={'Artist...'} setValue={setArtist} options={artists}/>
							<Button
								sx={{marginLeft: '10px'}}
							>Add..</Button>
						</SelectContainer>
						<SelectContainer>
							<SelectBox label={albumName()} setValue={setAlbum} options={albums}/>
							<Button
								sx={{marginLeft: '10px'}}
							>Add..</Button>
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
						<FileUploader
							setFile={setPicture}
							dragEnter={dragEnter}
							dragEnterHandler={dragEnterHandler}
							dragLeaveHandler={dragLeaveHandler}
                            accept="image/*"
                         >
                            {picture &&
								<ImagePreview file={picture}/>
                            }
                                <>Drag'n'Drop here</>

                        </FileUploader>
					</Step>
                }
                {activeStep === 2 &&
					<Step>
						Upload audio track
						<FileUploader
							setFile={setAudio}
							dragEnter={dragEnter}
							dragEnterHandler={dragEnterHandler}
							dragLeaveHandler={dragLeaveHandler}
                            accept="audio/*"
						>
                            {audio &&
								<AudioPreview file={audio}/>
                            }
							<>Drag'n'Drop here</>

						</FileUploader>
					</Step>
                }
            </StepWrapper>
            <ButtonContainer>
                <Button disabled={activeStep === 0} onClick={back}>Back</Button>
                <Button onClick={next}>Next</Button>
            </ButtonContainer>

        </MainLayout>
    );
};

export default Create;

// export const getServerSideProps = wrapper.getServerSideProps(store => async () => {
//     const artists = await store.dispatch(getAllArtists.initiate())
//     const albums = await store.dispatch(getAllAlbums.initiate())
//     //await Promise.all(store.dispatch(getAllArtists.util.getRunningQueriesThunk()))
//     console.log(artists)
//     return {
//         props: {
//             artists: artists.data
//         }
//     }
// })