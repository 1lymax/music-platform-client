// @flow
import * as React from "react";
import {Button} from "@mui/material";
import {useSnackbar} from "notistack";
import styled from "styled-components";
import {FC, useEffect, useState} from "react";
import * as mmb from "music-metadata-browser";
import {AddAPhoto, KeyboardDoubleArrowDown} from "@mui/icons-material";
import {IArtist} from "../../types/artist";
import MainLayout from "../../layouts/MainLayout";
import {IUploaderFile} from "../../types/uploader";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useGetAllAlbumsQuery} from "../../store/api/album.api";
import {useGetAllArtistsQuery} from "../../store/api/artist.api";
import {useCreateTrackMutation} from "../../store/api/track.api";
import DragContainer from "../../components/Uploader/DragContainer";
import {UploaderItem} from "../../components/Uploader/UploaderItem";
import {ImageThumbnail} from "../../components/UI/Image/ImageThumbnail";


const Container = styled.div`
  width: 100%;
`;

const DragWrapper = styled.div`
  display: flex;
  width: 56px;
  flex-direction: column;
  align-items: center;
`;

const ActionContainer = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-self: center;
`;

interface IMultipleCreate {

}

const Multiple: FC<IMultipleCreate> = () => {
    const { albums } = useTypedSelector(state => state.album);
    const { artists } = useTypedSelector(state => state.artist);
    const [fileList, setFileList] = useState<IUploaderFile[]>([]);
    const [createTrack, {}] = useCreateTrackMutation();
    const { enqueueSnackbar } = useSnackbar();

    useGetAllArtistsQuery();
    useGetAllAlbumsQuery();

    const getArtistByName = (name: string | undefined) => {
        return artists.find(artist => artist.name.toLowerCase() === name?.toLowerCase());
    };

    const getAlbumByNameAndArtist = (name: string | undefined, artist: IArtist | undefined) => {
        return albums.find(album => album.name.toLowerCase() === name?.toLowerCase() && album.artist === artist?._id);
    };

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
                                genre: res.common.genre,
                                duration: res.format.duration,
                                posInAlbum: res.common.track.no,
                                albumNameFromTag: res.common.album,
                                artistNameFromTag: res.common.artist,
                                name: res.common.title ? res.common.title : file.name,
                                artist: getArtistByName(res.common.artist),
                                album: getAlbumByNameAndArtist(
                                    res.common.album,
                                    getArtistByName(res.common.artist)),
                            }]
                        );
                    }
                );
            });
    };

    const handleItemChange = (updated: IUploaderFile[][number]) => {
        console.log(updated);
        let updatedList = fileList.map(item => {
            if (item.audio == updated.audio) {
                console.log(updated);
                return updated;
            }
            return item;
        });
        setFileList(updatedList);

    };

    const handleItemRemove = (file: IUploaderFile) => {
        setFileList(prevState => prevState.filter(item => item.name !== file.name));
    };

    const handleUploadToServer = async () => {
        const form = new FormData();
        fileList.map((file, index) => {
            for (const [key, val] of Object.entries(file)) {
                if (val && ["artistNameFromTag", "albumNameFromTag"].indexOf(key) < 0)
                    form.append(`${index}.${key}`, val?._id ? val._id : val);
            }
        });
        form.forEach((key, val) => console.log(key, val));
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
            return { ...item, artist: getArtistByName(item.artistNameFromTag) };
        });
        setFileList(updatedList);
    }, [artists]);


    useEffect(() => {
        // updates select boxes when album state changes
        let updatedList = fileList.map(item => {
            return { ...item, album: getAlbumByNameAndArtist(item.albumNameFromTag, item.artist) };
        });
        setFileList(updatedList);
    }, [albums]);


    return (
        <MainLayout>
            {Boolean(fileList?.length) &&
				<DragWrapper>
					<DragContainer setFiles={handleAllPicturesSetter}
								   accept={"audio"}
								   styles={{ width: "56px", height: "56px", margin: "0 5px 15px 0", padding: "15px" }}
					>
						<AddAPhoto color={"primary"}/>
					</DragContainer>
                    <KeyboardDoubleArrowDown color={"action"}/>
				</DragWrapper>
            }
            <ImageThumbnail source={""}/>
            <Container>
                {fileList && fileList.map((file) => (
                    <UploaderItem file={file}
                                  key={file.audio.name + file.duration}
                                  onUpdate={handleItemChange}
                                  onRemove={handleItemRemove}/>
                ))}
            </Container>
            <ActionContainer>
                <DragContainer setFiles={handleDragnDropFiles}
                               accept={"audio"}
                >Drag'n'Drop files here or browse...</DragContainer>
                <Button variant={"contained"}
                        onClick={handleUploadToServer}
                        disabled={!Boolean(fileList?.length)}>
                    Upload
                </Button>
            </ActionContainer>
        </MainLayout>
    );
};

export default Multiple;