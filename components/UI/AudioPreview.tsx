import React, {FC} from 'react';
import styled from "styled-components";
import sizeFormat from "../../utils/sizeFormat";

interface AudioPreviewProps {
    file: File
}

const Container = styled.div`
  width: 400px;
  justify-content: center;
  margin-bottom: 30px;
`

const Row = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`

const Left = styled.div`
  width: 50%;
`

const Right = styled.div`
  width: 50%;
`

const AudioPreview: FC<AudioPreviewProps> = ({file}) => {

    console.log(file)
    return (
        <Container>
            <Row>File information:</Row>
            <Row>
                <Left>Name:</Left>
                <Right>{file.name}</Right>
            </Row>
            <Row>
                <Left>Size:</Left>
                <Right>{sizeFormat(file.size)}</Right>
            </Row>
        </Container>
    );
};

export default AudioPreview;