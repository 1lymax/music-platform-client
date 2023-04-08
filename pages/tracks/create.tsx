// @flow
import * as React from "react";
import {useEffect, useState} from "react";
import {Button} from "@mui/material";
import {useSnackbar} from "notistack";
import styled from "styled-components";
import * as mmb from "music-metadata-browser";
import MainLayout from "../../layouts/MainLayout";
import {IUploaderFile} from "../../types/uploader";
import {getEntityByName} from "../../helpers/getEntityByName";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useGetAllAlbumsQuery} from "../../store/api/album.api";
import {useGetAllArtistsQuery} from "../../store/api/artist.api";
import {useCreateTrackMutation} from "../../store/api/track.api";
import DragContainer from "../../components/Uploader/DragContainer";
import {setValueOrEntityId} from "../../helpers/setValueOrEntityId";
import {MusicUploaderItem} from "../../components/Uploader/MusicUploaderItem";
import {UploaderContainer} from "../../components/Uploader/UploaderContainer";
import {getEntitiesByArrayEntities} from "../../helpers/getEntitiesByArrayEntities";
import {getEntityByNameAndForeignEntity} from "../../helpers/getEntityByNameAndForeignEntity";


const Container = styled.div`
  width: 100%;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`

const ActionContainer = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-self: center;
`;


const Create = () => {
    const [fileList, setFileList] = useState<IUploaderFile[]>([]);
    const { albums } = useTypedSelector(state => state.album);
    const { artists } = useTypedSelector(state => state.artist);
    const { genres } = useTypedSelector(state => state.genre);
    const [createTrack, {}] = useCreateTrackMutation();
    const { enqueueSnackbar } = useSnackbar();

    useGetAllArtistsQuery();
    useGetAllAlbumsQuery();

    const handleDragnDropFiles = (files: FileList | null) => {
        if (files)
            Array.from(files).forEach(file => {
                const isInFilelist = fileList.find(item => item.audio.name === file.name);
                if (Boolean(isInFilelist)) {
                    enqueueSnackbar("Some songs are already added to the list", { variant: "warning" });
                    return;
                }
                mmb.parseBlob(file).then(res => {
                        setFileList((prevState) => [...prevState, {
                                audio: file,
                                picture: null,
                                year: res.common.year,
                                label: res.common.label,
                                genre: getEntitiesByArrayEntities(res.common.genre, genres),
                                //genre: getEntitiesByArrayEntities(['Rock', 'Blues', 'Hard Rock'], genres),
                                genreFromTag: res.common.genre,
                                duration: res.format.duration,
                                posInAlbum: res.common.track.no,
                                albumNameFromTag: res.common.album,
                                artistNameFromTag: res.common.artist,
                                name: res.common.title ? res.common.title : file.name,
                                artist: getEntityByName(res.common.artist, artists),
                                album: getEntityByNameAndForeignEntity(
                                    res.common.album,
                                    getEntityByName(res.common.artist, artists),
                                    albums),
                            }]
                        );
                    }
                );
            });
    }

    const handleItemChange =(toUpdate: IUploaderFile[][number]) => {
        let updatedList = fileList.map(item => {
            if (item.audio == toUpdate.audio) {
                return toUpdate;
            }
            return item;
        });

        setFileList(updatedList);
    }

    const handleItemRemove =(file: IUploaderFile) => {
        setFileList(prevState => prevState.filter(item => item.name !== file.name));
    }

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = new FormData();
        fileList.map((file, index) => {
            for (let [key, val] of Object.entries(file)) {
                if (val && ["artistNameFromTag", "albumNameFromTag", "genreFromTag"].indexOf(key) < 0)
                    form.append(`${index}.${key}`, setValueOrEntityId(val));
            }
        });
        //form.forEach((key, val) => console.log(key, val));
        createTrack(form);
    };

    const handleAllPicturesSetter = (files: (FileList | null)) => {
        // updates all fileList's pictures
        if (!files) return null;
        const updatedList = fileList.map(file => {
            return { ...file, picture: files[0] };
        });
        setFileList(updatedList);
    };


    useEffect(() => {
        // updates select boxes when artists state changes
        let updatedList = fileList.map(item => {
            return { ...item, artist: getEntityByName(item.artistNameFromTag, artists) };
        });
        setFileList(updatedList);
    }, [artists]);


    useEffect(() => {
        // updates select boxes when album state changes
        let updatedList = fileList.map(item => {
            return { ...item, album: getEntityByNameAndForeignEntity(item.albumNameFromTag, item.artist, albums) };
        });
        setFileList(updatedList);
    }, [albums]);


    useEffect(() => {
       // console.log('fileList', fileList);
    }, [fileList]);

    return (
        <MainLayout>
            {Boolean(fileList?.length) &&

				<UploaderContainer width="70px"
								   height="70px"
								   zoomButton
								   isPreviewVisible={false}
								   setFiles={handleAllPicturesSetter}
				/>
            }
            <Form onSubmit={onSubmit}>
                <Container>
                    {fileList && fileList.map((file) => (
                        <MusicUploaderItem file={file}
                                           key={file.audio.name + file.duration}
                                           onUpdate={handleItemChange}
                                           onRemove={handleItemRemove}/>
                    ))}
                </Container>
                <ActionContainer>
                    <DragContainer setFiles={handleDragnDropFiles}
                                   accept={"audio"}
                    >Drag&Drop files here or browse...</DragContainer>
                    <Button variant={"contained"}
                            type={"submit"}
                            disabled={!Boolean(fileList?.length)}>
                        Upload
                    </Button>
                </ActionContainer>
            </Form>
        </MainLayout>
    );
};

export default Create;