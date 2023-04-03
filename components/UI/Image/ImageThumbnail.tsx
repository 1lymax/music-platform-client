// @flow
import {FC} from "react";
import * as React from "react";
import styled from "styled-components";
import {ZoomIn} from "@mui/icons-material";

const Container = styled.div`
  position: relative;
`;

const Magnifier = styled.div`
  //z-index: 2;
  position: absolute;
  display: none;
  top: 0;
  left: 0;
  width: 50px;
  height: 50px;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.5);

  &:hover {
    display: flex;
  }
`;

const Thumbnail = styled.div<{ source: string }>`
  width: 50px;
  height: 50px;
  min-width: 50px;
  color: grey;
  margin: 0 10px 0 0;
  background-image: url("${props => props.source ? props.source : ""}");
  background-size: 50px;
  background-position: center;
  background-repeat: no-repeat;

  &:hover + ${Magnifier} {
    display: unset;
  }
`;

const Image = styled.div<{ source: string }>`
  width: 50px;
  height: 50px;
  min-width: 50px;
  color: grey;
  margin: 0 10px 0 0;
  background-image: url("${props => props.source ? props.source : ""}");
  background-size: 50px;
  background-position: center;
  background-repeat: no-repeat;

  &:hover + ${Magnifier} {
    display: unset;
  }
`;

interface IImageThumbnail {
    source: string;
}

export const ImageThumbnail: FC<IImageThumbnail> = ({ source }) => {

    return (
        <Container>
            <Thumbnail source={source}/>
            <Magnifier>
                <ZoomIn color={"action"} fontSize={"large"}/>
            </Magnifier>
        </Container>
    );
};