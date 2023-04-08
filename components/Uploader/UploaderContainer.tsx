// @flow
import * as React from "react";
import styled from "styled-components";
import {useEffect, useState} from "react";
import {AddAPhoto, NoPhotography} from "@mui/icons-material";
import DragContainer from "./DragContainer";
import IconButton from "@mui/material/IconButton";
import {ImageThumbnail} from "../UI/Image/ImageThumbnail";

const Container = styled.div``;

interface Props {
    width?: string;
    height?: string;
    zoomButton: boolean;
    isPreviewVisible?: boolean;
    fileForPreview?: File | null;
    setFiles: (files: FileList | null) => void;
}

const ImageBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  box-shadow: 1px 1px 5px rgba(100, 100, 100, 0.3);

`;

export const UploaderContainer = (props: Props) => {
    const {
        fileForPreview,
        setFiles,
        width = "60px",
        height = "60px",
        zoomButton = true,
        isPreviewVisible = true
    } = props;
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const handleUploadedImage = (files: (FileList | null)) => {
        if (!files) return null;
        let reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onloadend = () => {
            if (reader.result) {
                setImagePreview(reader.result as string);
                setFiles(files);
            }
        };
    }

    useEffect(() => {
        if (fileForPreview) {
            let dataTransfer = new DataTransfer();
            dataTransfer.items.add(fileForPreview);
            handleUploadedImage(dataTransfer.files);
        }
    }, [fileForPreview]);

    return (
        <Container>
            <DragContainer setFiles={handleUploadedImage}
                           accept={"image"}
                           isVisible={!imagePreview || !isPreviewVisible}
                           styles={{ width: width, height: height, padding: "15px" }}
            >
                <AddAPhoto color={"primary"} sx={{ fontSize: (parseInt(width) / 3) }}/>
            </DragContainer>
            {imagePreview && isPreviewVisible &&
				<ImageBox>
					<ImageThumbnail source={imagePreview} width={width} height={height} zoomButton={zoomButton}/>
					<IconButton color={"primary"} size={"small"} onClick={() => setImagePreview(null)}>
						<NoPhotography/>
					</IconButton>

				</ImageBox>
            }
        </Container>
    );
}