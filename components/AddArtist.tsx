import * as React from "react";
import styled from "styled-components";
import {TextField} from "@mui/material";
import {Dispatch, FC, forwardRef, SetStateAction, useEffect, useImperativeHandle, useState} from "react";

import {IArtist} from "../types/artist";
import {useInput} from "../hooks/useInput";
import {useErrorMessage} from "../hooks/useErrorMessage";
import {useSuccessMessage} from "../hooks/useSuccessMessage";
import {UploaderContainer} from "./Uploader/UploaderContainer";
import {useCreateArtistMutation} from "../store/api/artist.api";

interface AddArtistProps {
    setOpen?: Dispatch<SetStateAction<boolean>>;
    defaultValue?: string;
    onUpdate?: (artist: IArtist) => void;
}

const Step = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 15px;
  height: 100%;
  width: 500px;
`;

/* eslint-disable react/display-name */
const AddArtist: FC<AddArtistProps> = forwardRef((props, ref) => {
    const { setOpen, defaultValue, onUpdate } = props;
    const name = useInput(defaultValue);
    const [image, setImage] = useState<any>();

    const [createArtist, { isSuccess, error, data }] = useCreateArtistMutation();

    useSuccessMessage("Artist successfully added", isSuccess);
    useErrorMessage("Add artist error", error);


    useEffect(() => {
        if (isSuccess) {
            name.setValue("");
            setImage(null);
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
            form.append("picture", image);
            createArtist(form);
        }
    }));

    return (
        <div>
            <Step>
                <TextField
                    {...name.componentProps}
                    label={"Artist name"}
                />
                <UploaderContainer setFiles={setImage} zoomButton={false} width="200px" height="200px"/>
            </Step>
        </div>
    );
});

export default AddArtist;