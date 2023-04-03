// @flow
import * as React from "react";
import {Link} from "@mui/material";
import {FC, useState} from "react";
import styled from "styled-components";

import AppDialog from "../AppDialog";
import AddArtist from "../../AddArtist";
import SelectTemplate from "./SelectTemplate";
import {IArtist} from "../../../types/artist";
import AddButtonIcon from "../Buttons/AddButtonIcon";
import {useTypedSelector} from "../../../hooks/useTypedSelector";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
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
            <InputWrapper>
                <SelectTemplate label={"Artist..."} onChange={setArtist} options={artists} defaultValue={defaultValue}/>
                <AddButtonIcon onClick={() => setArtistDialog(true)}/>
            </InputWrapper>
            {!defaultValue && showAddNewInfo &&
				<>
					<div>{artistName} Artist not found.</div>
					<div>You can <Link component={"button"}
									   onClick={() => setArtistDialog(true)}
									   sx={{ textDecorationStyle: "dashed" }}
					>
						add new.
					</Link>
					</div>
				</>
            }
            <AppDialog open={artistDialog} setOpen={setArtistDialog} title={"Add new artist"}>
                <AddArtist setOpen={setArtistDialog} defaultValue={artistName} onUpdate={setArtist}/>
            </AppDialog>
        </Container>
    );
};