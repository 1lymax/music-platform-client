// @flow
import * as React from "react";
import styled from "styled-components";
import {useEffect, useState} from "react";

import AppDialog from "../AppDialog";
import {IAlbum} from "../../../types/album";
import {IArtist} from "../../../types/artist";
import SelectTemplate from "./SelectTemplate";
import AddButtonIcon from "../Buttons/AddButtonIcon";
import AddAlbumTemplate from "../../AddAlbumTemplate";
import {useUserActions} from "../../../hooks/dispatch";
import {SelectShowAddNewInfo} from "./SelectShowAddNewInfo";
import {useSearchAlbumQuery} from "../../../store/api/album.api";
import {useTypedSelector} from "../../../hooks/useTypedSelector";

const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 40px;
`;

const ButtonCell = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface Props {
    albumName?: string
    showAddNewInfo?: boolean,
    artist: IArtist | undefined;
    setAlbum: (value: IAlbum) => void;
    defaultValue: IAlbum | undefined;
}

export const SelectAlbum = (props: Props) => {
    const { setAlbum, artist, showAddNewInfo = false, albumName = "", defaultValue } = props;

    const { setDialogAddNewAlbum } = useUserActions();
    const [albums, setAlbums] = useState<IAlbum[]>([]);
    const { dialogs } = useTypedSelector(state => state.user);
    const [valueToShowInAddInfo, setValueToShowInAddInfo] = useState<string>('');


    const { data, refetch } = useSearchAlbumQuery({ artist: artist?._id }, {});

    const getAlbumName = () => {
        if (artist) {
            return artist.name + "'s albums (" + albums?.length + ")";
        } else
            return "Album (Select artist first)";
    };

    const handleAddNew = (album: IAlbum) => {
        refetch();
        setAlbum(album);
    };

    useEffect(() => {
        if (data)
            setAlbums(data);
    }, [data]);

    useEffect(() => {
        if (defaultValue)
            setValueToShowInAddInfo(albumName !== defaultValue.name ? albumName : '');
        else
            setValueToShowInAddInfo(albumName)
    }, [albumName, defaultValue]);

    return (
        <Container>
            <SelectTemplate label={getAlbumName()} defaultValue={defaultValue} onChange={setAlbum}
                            options={albums}/>
            <ButtonCell>
                <AddButtonIcon //icon={<Add/>}
                    onClick={() => setDialogAddNewAlbum(true)}></AddButtonIcon>
            </ButtonCell>
            {showAddNewInfo &&
				<SelectShowAddNewInfo valuesToShow={valueToShowInAddInfo}
                                      callBackSetDialog={setDialogAddNewAlbum}
                />
            }
            <AppDialog open={dialogs.addNewAlbum} setOpen={setDialogAddNewAlbum} title={"Add new album"}>
                <AddAlbumTemplate setOpen={() => setDialogAddNewAlbum(true)} defaultValue={albumName} defaultArtist={artist}
                                  onUpdate={handleAddNew}/>
            </AppDialog>
        </Container>
    );
};