import * as React from "react";
import styled from "styled-components";
import {TextField} from "@mui/material";
import {Dispatch, FC, forwardRef, SetStateAction, useEffect, useImperativeHandle} from "react";

import {IGenre} from "../types/genre";
import {useInput} from "../hooks/useInput";
import {useErrorMessage} from "../hooks/useErrorMessage";
import {useSuccessMessage} from "../hooks/useSuccessMessage";
import {useCreateGenreMutation} from "../store/api/genre.api";

interface AddGenreProps {
    setOpen?: Dispatch<SetStateAction<boolean>>;
    defaultValue?: string[];
    onUpdate?: (genres: IGenre) => void;
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 15px;
  height: 100%;
  width: 500px;
`;

/* eslint-disable react/display-name */
const AddGenreTemplate: FC<AddGenreProps> = forwardRef((props, ref) => {
    const { setOpen, defaultValue, onUpdate } = props;
    const name = useInput(defaultValue, "Genre...");

    const [createGenre, { isSuccess, error, data }] = useCreateGenreMutation();

    useSuccessMessage("Genre successfully added", isSuccess);
    useErrorMessage("Add genres error", error);

    useEffect(() => {
        if (isSuccess) {
            name.setValue("");
            setOpen && setOpen(false);
            if (data && onUpdate) {
                onUpdate(data);
            }
        }
    }, [isSuccess]);

    useImperativeHandle(ref, () => ({
        save: () => {
            const form = new FormData();
            form.append("name", name.componentProps.value);
            form.forEach((i,k)  => console.log(i, k));
            //form.append("temp", ['sdsd', 'sere', {id: 0, name: 'dsfsd'}].join(','));
            createGenre(form);
        }
    }));

    return (
            <Container>
                <TextField {...name.componentProps}/>
            </Container>
    );
});

export default AddGenreTemplate;