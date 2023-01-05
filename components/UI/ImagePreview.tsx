import React, {FC, useState} from 'react';
import styled from "styled-components";

interface ImagePreviewProps {
    file: File
}

const Container = styled.div``

const Image = styled.img`
height: 200px;
`

const ImagePreview: FC<ImagePreviewProps> = ({file}) => {
    const [image, setImage] = useState<any>();

    let reader = new FileReader();
    reader.readAsDataURL(file)

    reader.onloadend = () => {
        setImage(reader.result)
    }

    return (
        <Container>
            {image &&
				<Image src={image} alt={'image'}/>
            }
        </Container>
    );
};

export default ImagePreview;