// @flow
import * as React from "react";
import styled from "styled-components";
import {useEffect, useState} from "react";

import AppDialog from "../AppDialog";
import {IGenre} from "../../../types/genre";
import SelectTemplate from "./SelectTemplate";
import AddButtonIcon from "../Buttons/AddButtonIcon";
import AddGenreTemplate from "../../AddGenreTemplate";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {useGetAllGenresQuery} from "../../../store/api/genre.api";
import {SelectShowAddNewInfo} from "./SelectShowAddNewInfo";
import {useUserActions} from "../../../hooks/dispatch";

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
    genreNames?: string[],
    showAddNewInfo?: boolean,
    setGenres: (value: IGenre[]) => void;
    defaultValue: IGenre[] | undefined;
}

export const SelectGenre = (props: Props) => {
    const { setGenres, showAddNewInfo = false, genreNames = [], defaultValue } = props;

    const { setDialogAddNewGenre } = useUserActions();
    const { genres } = useTypedSelector(state => state.genre);
    const { dialogs } = useTypedSelector(state => state.user);
    const [valuesToShowInAddInfo, setValuesToShowInAddInfo] = useState<typeof defaultValue>(defaultValue);

    const { refetch } = useGetAllGenresQuery();

    const handleAddNew = () => {
        refetch();
        setGenres(genres);
    };

    const handleChangeValue = (value: any) => {
        setGenres(value);
        setValuesToShowInAddInfo(value);
    }

    useEffect(() => {
        if (defaultValue)
            setValuesToShowInAddInfo(genreNames.filter(entity => {
                return defaultValue.indexOf(entity) === -1;
            }));
    }, [genreNames.length, defaultValue?.length]);


    return (
        <Container>
            <SelectTemplate multiple
                            label="Genre"
                            options={genres}
                            defaultValue={defaultValue}
                            onChange={handleChangeValue}
            />
            <ButtonCell>
                <AddButtonIcon //icon={<Add/>}
                    onClick={() => setDialogAddNewGenre(true)}></AddButtonIcon>
            </ButtonCell>
            {showAddNewInfo &&
				<SelectShowAddNewInfo valuesToShow={valuesToShowInAddInfo && valuesToShowInAddInfo?.join(',')}
									  callBackSetDialog={setDialogAddNewGenre}
				/>
            }
            <AppDialog open={dialogs.addNewGenre} setOpen={setDialogAddNewGenre} title={"Add Genres"}>
                <AddGenreTemplate setOpen={() => setDialogAddNewGenre(true)} defaultValue={genreNames}
                                  onUpdate={handleAddNew}/>
            </AppDialog>
        </Container>
    );
};