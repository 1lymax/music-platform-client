// @flow
import * as React from "react";
import {FC, useState} from "react";
import styled from "styled-components";
import {Link, Typography} from "@mui/material";

import AppDialog from "../AppDialog";
import SelectTemplate from "./SelectTemplate";
import AddButtonIcon from "../Buttons/AddButtonIcon";
import {IGenre} from "../../../types/genre";
import {useGetAllGenresQuery} from "../../../store/api/genre.api";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import AddGenreTemplate from "../../AddGenreTemplate";

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

interface ISelectGenre {
    genreNames?: string[],
    showAddNewInfo?: boolean,
    setGenres: (value: IGenre[]) => void;
    defaultValue: (IGenre | null)[] | null;
}

export const SelectGenre: FC<ISelectGenre> = (props) => {
    const { setGenres, showAddNewInfo = false, genreNames = [], defaultValue } = props;
    const { genres } = useTypedSelector(state => state.genre);
    const { refetch } = useGetAllGenresQuery();
    const [genreDialog, setGenreDialog] = useState<boolean>(false);

    const handleAddNew = () => {
        refetch();
    };

    return (
        <Container>
            <SelectTemplate label="Genre"
                            multiple
                            defaultValue={defaultValue}
                            onChange={setGenres}
                            options={genres}/>
            <ButtonCell>
                <AddButtonIcon //icon={<Add/>}
                    onClick={() => setGenreDialog(true)}></AddButtonIcon>
            </ButtonCell>
            {!defaultValue?.length && showAddNewInfo &&
				<WarningCell>
					<Typography variant={"body2"} sx={{ textDecorationStyle: "dashed" }}>
						<span>Add <Link component={"button"}
								   variant={"body2"}
								   onClick={() => setGenreDialog(true)}
								   sx={{ textDecorationStyle: "dashed" }}
						>{genreNames.join(', ')}

						</Link> genres</span>

					</Typography>
				</WarningCell>
            }
            <AppDialog open={genreDialog} setOpen={setGenreDialog} title={"Add Genres"}>
                <AddGenreTemplate setOpen={setGenreDialog} defaultValue={genreNames}
                          onUpdate={handleAddNew}/>
            </AppDialog>
        </Container>
    );
};