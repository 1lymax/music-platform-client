// @flow
import {FC, useRef} from "react";
import * as React from "react";
import styled from "styled-components";
import {ZoomIn} from "@mui/icons-material";
import {Card, Popover} from "@mui/material";

const Container = styled.div`
  position: relative;
`;

const Magnifier = styled.div`
  //z-index: 2;
  position: absolute;
  display: none;
  top: 0;
  left: 0;
  margin: 0 3px; // important for posiotion relatively to dragcontainer
  width: 50px;
  height: 50px;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.7);

  &:hover {
    display: flex;
  }
`;

const Thumbnail = styled.div<{ source: string }>`
  width: 50px;
  height: 50px;
  min-width: 50px;
  margin: 0 3px; // important for posiotion relatively to dragcontainer
  color: grey;
  background-image: url("${props => props.source ? props.source : ""}");
  background-size: 50px;
  background-position: center;
  background-repeat: no-repeat;

  &:hover + ${Magnifier} {
    display: unset;
  }
`;

const Image = styled.div<{ source: string }>`
  width: 250px;
  height: 250px;
  min-width: 50px;
  color: grey;
  margin: 10px;
  background-image: url("${props => props.source ? props.source : ""}");
  background-size: 250px;
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
    const anchor = useRef<HTMLDivElement | null>(null);

    const [open, setOpen] = React.useState(false);

    const handleZoomInOut = () => {
        setOpen((prev) => !prev);
    };

    return (
        <Container>
            <Thumbnail source={source} ref={anchor} onClick={handleZoomInOut}/>
            <Magnifier onClick={handleZoomInOut}>
                <ZoomIn color={"action"} fontSize={"large"}/>
            </Magnifier>
            <Popover open={open}
                     onClose={handleZoomInOut}
                     anchorEl={anchor.current}
                     anchorOrigin={{
                         vertical: "bottom",
                         horizontal: "right"
                     }}>
                <Card variant={"elevation"} raised>
                    <Image source={source}/>
                </Card>
            </Popover>
        </Container>
    );
};