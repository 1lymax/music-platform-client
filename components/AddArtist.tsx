import * as React from "react";
import {Dispatch, FC, forwardRef, SetStateAction, useEffect, useImperativeHandle, useState} from "react";
import styled from "styled-components";
import {TextField} from "@mui/material";

import FileUploader from "./FileUploader";
import {useInput} from "../hooks/useInput";
import ImagePreview from "./UI/ImagePreview";
import {useErrorMessage} from "../hooks/useErrorMessage";
import {useSuccessMessage} from "../hooks/useSuccessMessage";
import {useCreateArtistMutation} from "../store/api/artist.api";
import {IArtist} from "../types/artist";

interface AddArtistProps {
    setOpen?: Dispatch<SetStateAction<boolean>>;
    defaultValue?: string;
    onUpdate?: (artist: IArtist) => void;
}


const Step = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 500px;
`;
/* eslint-disable react/display-name */
const AddArtist: FC<AddArtistProps> = forwardRef((props, ref) => {
    const { setOpen, defaultValue, onUpdate } = props;
    const name = useInput(defaultValue);
    const [picture, setPicture] = useState<any>();

    const [createArtist, { isSuccess, error, data }] = useCreateArtistMutation();

    useSuccessMessage("Artist successfully added", isSuccess);
    useErrorMessage("Add artist error", error);


    useEffect(() => {
        if (isSuccess) {
            name.setValue("");
            setPicture(null);
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
            form.append("picture", picture);
            createArtist(form);
        }
    }));

    return (
        <div>
            <Step>
                <TextField
                    {...name.componentProps}
                    label={"Artist name"}
                    sx={{ margin: "15px 0" }}
                />
                <FileUploader setFile={setPicture} accept="image/*">
                    {picture &&
						<ImagePreview file={picture}/>
                    }
                </FileUploader>
            </Step>
        </div>
    );
});

export default AddArtist;