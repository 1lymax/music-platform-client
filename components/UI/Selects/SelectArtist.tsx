// @flow
import * as React from "react";
import {Link, Typography} from "@mui/material";
import {FC, useState} from "react";
import styled from "styled-components";

import AppDialog from "../AppDialog";
import AddArtistTemplate from "../../AddArtistTemplate";
import SelectTemplate from "./SelectTemplate";
import {IArtist} from "../../../types/artist";
import AddButtonIcon from "../Buttons/AddButtonIcon";
import {useTypedSelector} from "../../../hooks/useTypedSelector";

const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 40px;
`;

const ButtonCell = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const WarningCell = styled.div`
  margin: 0 10px;
`;

interface ISelectArtist {
    setArtist: (artist: IArtist) => void;
    defaultValue: IArtist | undefined;
    showAddNewInfo?: boolean,
    artistName?: string
}

export const SelectArtist: FC<ISelectArtist> = (props) => {
    const { setArtist, defaultValue, showAddNewInfo = false, artistName = "" } = props;
    const [artistDialog, setArtistDialog] = useState<boolean>(false);
    const { artists } = useTypedSelector(state => state.artist);

    return (
        <Container>
            <SelectTemplate label={"Artist..."} onChange={setArtist} options={artists} defaultValue={defaultValue}/>
            <ButtonCell>
                <AddButtonIcon onClick={() => setArtistDialog(true)}/>
            </ButtonCell>
            {!defaultValue && showAddNewInfo &&
				<WarningCell>
					<Typography variant={"body2"}>
						<div>Add <Link component={"button"}
										   onClick={() => setArtistDialog(true)}
										   sx={{ textDecorationStyle: "dashed" }}
						>{artistName}</Link>
						</div>
					</Typography>
				</WarningCell>
            }
            <AppDialog open={artistDialog} setOpen={setArtistDialog} title={"Add new artist"}>
                <AddArtistTemplate setOpen={setArtistDialog} defaultValue={artistName} onUpdate={setArtist}/>
            </AppDialog>
        </Container>
    );
};