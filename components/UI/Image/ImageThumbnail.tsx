// @flow
import {FC, useRef} from "react";
import * as React from "react";
import styled from "styled-components";
import {ZoomIn} from "@mui/icons-material";
import {Card, Popover} from "@mui/material";

const Container = styled.div`
  position: relative;
`;

const Magnifier = styled.div<{ width: string, height: string }>`
  position: absolute;
  display: none;
  top: 0;
  left: 0;
  margin: 0 3px; // important for position relatively to dragcontainer
  width: ${props => props.width};
  height: ${props => props.height};
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.7);

  &:hover {
    display: flex;
  }
`;

const Thumbnail = styled.div<{ source: string, width: string, height: string }>`
  width: ${props => props.width};
  height: ${props => props.height};
  min-width: ${props => props.width};
  padding: 5px;
  margin: 0 3px; // important for position relatively to dragcontainer
  color: grey;
  background-image: url("${props => props.source ? props.source : ""}");
  background-size: ${props => props.width};
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
    width?: string;
    height?: string;
    zoomButton?: boolean;
}

export const ImageThumbnail: FC<IImageThumbnail> = ({ source, width='60px', height='60px', zoomButton=true }) => {
    const anchor = useRef<HTMLDivElement | null>(null);

    const [open, setOpen] = React.useState(false);

    const handleZoomInOut = () => {
        setOpen((prev) => !prev);
    };

    return (
        <Container>
            <Thumbnail source={source} ref={anchor} onClick={handleZoomInOut} width={width} height={height}/>
            {zoomButton &&
				<>
					<Magnifier onClick={handleZoomInOut} width={width} height={height}>
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
				</>
            }
        </Container>
    );
};