// @flow
import * as React from "react";
import styled from "styled-components";
import {FC, useEffect, useState} from "react";

import AppDialog from "../AppDialog";
import AddAlbum from "../../AddAlbum";
import {IAlbum} from "../../../types/album";
import {IArtist} from "../../../types/artist";
import SelectTemplate from "./SelectTemplate";
import AddButtonIcon from "../Buttons/AddButtonIcon";
import {useSearchAlbumQuery} from "../../../store/api/album.api";
import {Link} from "@mui/material";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

interface ISelectAlbum {
    setAlbum: (value: IAlbum) => void;
    defaultValue: IAlbum | undefined;
    artist: IArtist | undefined;
    showAddNewInfo?: boolean,
    albumName?: string
}

export const SelectAlbum: FC<ISelectAlbum> = (props) => {
    const { setAlbum, artist, showAddNewInfo = false, albumName = "", defaultValue } = props;
    const [albums, setAlbums] = useState<IAlbum[]>([]);

    const { data, refetch } = useSearchAlbumQuery({ artist: artist?._id }, {});
    const [albumDialog, setAlbumDialog] = useState<boolean>(false);

    useEffect(() => {
        if (data)
            setAlbums(data);
    }, [data]);

    const getAlbumName = () => {
        if (artist)
            return artist.name + "'s albums (" + albums?.length + ")";
        else
            return "Album (Select artist first)";
    };

    const handleAddNew = (album: IAlbum) => {
        refetch()
        setAlbum(album)
    }

    return (
        <Container>
            <InputWrapper>
                <SelectTemplate label={getAlbumName()} defaultValue={defaultValue} onChange={setAlbum}
                                options={albums}/>
                <AddButtonIcon //icon={<Add/>}
                    onClick={() => setAlbumDialog(true)}></AddButtonIcon>
            </InputWrapper>
            {!defaultValue && showAddNewInfo &&
				<>
					<div>{albumName} Album not found.</div>
					<div>You can <Link component={"button"}
									   onClick={() => setAlbumDialog(true)}
									   sx={{ textDecorationStyle: "dashed" }}
					>
						add new.
					</Link>
					</div>
				</>
            }
            <AppDialog open={albumDialog} setOpen={setAlbumDialog} title={"Add new album"}>
                <AddAlbum setOpen={setAlbumDialog} defaultValue={albumName} defaultArtist={artist} onUpdate={handleAddNew}/>
            </AppDialog>
        </Container>
    );
};