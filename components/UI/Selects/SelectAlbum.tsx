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
import {Link, Typography} from "@mui/material";

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

const WarningCell = styled.div`
  margin: 0 5px;
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
        refetch();
        setAlbum(album);
    };

    return (
        <Container>
            <SelectTemplate label={getAlbumName()} defaultValue={defaultValue} onChange={setAlbum}
                            options={albums}/>
            <ButtonCell>
                <AddButtonIcon //icon={<Add/>}
                    onClick={() => setAlbumDialog(true)}></AddButtonIcon>
            </ButtonCell>
            {!defaultValue && showAddNewInfo &&
				<WarningCell>
					<Typography variant={"body2"} sx={{ textDecorationStyle: "dashed" }}>
						<div><Link component={"button"}
								   variant={"body2"}
								   onClick={() => setAlbumDialog(true)}
								   sx={{ textDecorationStyle: "dashed" }}
						>
							Add album
						</Link> {albumName}</div>

					</Typography>
				</WarningCell>
            }
            <AppDialog open={albumDialog} setOpen={setAlbumDialog} title={"Add new album"}>
                <AddAlbum setOpen={setAlbumDialog} defaultValue={albumName} defaultArtist={artist}
                          onUpdate={handleAddNew}/>
            </AppDialog>
        </Container>
    );
};