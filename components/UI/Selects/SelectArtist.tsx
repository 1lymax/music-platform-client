// @flow
import * as React from "react";
import styled from "styled-components";
import {useEffect, useState} from "react";

import AppDialog from "../AppDialog";
import AddArtistTemplate from "../../AddArtistTemplate";
import SelectTemplate from "./SelectTemplate";
import {IArtist} from "../../../types/artist";
import AddButtonIcon from "../Buttons/AddButtonIcon";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {useUserActions} from "../../../hooks/dispatch";
import {SelectShowAddNewInfo} from "./SelectShowAddNewInfo";

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

interface Props {
    setArtist: (artist: IArtist) => void;
    defaultValue: IArtist | undefined;
    showAddNewInfo?: boolean,
    artistName?: string
}

export const SelectArtist = (props: Props) => {
    const { setArtist, defaultValue, showAddNewInfo = false, artistName = "" } = props;

    const { setDialogAddNewArtist } = useUserActions();
    const { dialogs } = useTypedSelector(state => state.user);
    const { artists } = useTypedSelector(state => state.artist);
    const [valueToShowInAddInfo, setValueToShowInAddInfo] = useState<string>('');

    useEffect(() => {
        if (defaultValue)
            setValueToShowInAddInfo(artistName !== defaultValue.name ? artistName : '');
        else
            setValueToShowInAddInfo(artistName)
    }, [artistName, defaultValue]);

    return (
        <Container>
            <SelectTemplate label={"Artist..."} onChange={setArtist} options={artists} defaultValue={defaultValue}/>
            <ButtonCell>
                <AddButtonIcon onClick={() => setDialogAddNewArtist(true)}/>
            </ButtonCell>
            {showAddNewInfo &&
				<SelectShowAddNewInfo valuesToShow={valueToShowInAddInfo}
									  callBackSetDialog={setDialogAddNewArtist}
				/>
            }
            <AppDialog open={dialogs.addNewArtist} setOpen={setDialogAddNewArtist} title={"Add new artist"}>
                <AddArtistTemplate setOpen={() => setDialogAddNewArtist(true)} defaultValue={artistName}
                                   onUpdate={setArtist}/>
            </AppDialog>
        </Container>
    );
};