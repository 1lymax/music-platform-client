import React, {FC} from 'react';
import styled from "styled-components";
import {ITrack} from "../types/track";
import IconButton from "@mui/material/IconButton";
import {Delete, Pause, PlayArrow} from '@mui/icons-material';
import {useRouter} from "next/router";

interface TrackItemProps {
    track: ITrack;
    active?: boolean
}

const Container = styled.div`
  margin: 10px;
  padding: 10px;
  display: flex;
  align-items: center;
  border: 1px solid lightgray;
  border-radius: 10px;
`

const Image = styled.img``

const TrackWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  margin: 0 20px;
`

const TrackName = styled.div``
const Album = styled.div`
  font-size: 12px;
  color: gray;
`
const Artist = styled.div`
  color: gray;
  font-size: 12px;
  font-style: italic;
`

const TrackItem: FC<TrackItemProps> = ({track, active = false}) => {
    const router = useRouter()

    return (
        <Container onClick={() => router.push('/tracks/' + track._id)}>
            <IconButton>
                {active
                    ? <Pause/>
                    : <PlayArrow/>
                }
            </IconButton>
            <Image width={70} height={70} src={track.picture}/>
            <TrackWrapper>
                <TrackName>{track.name}</TrackName>
                <Album>{track.albumId?.name}</Album>
                <Artist>{track.artistId?.name}</Artist>
            </TrackWrapper>
            {active && <div>02:42 / 03:45</div>
            }
            <IconButton style={{marginLeft: 'auto'}}>
                <Delete/>
            </IconButton>

        </Container>
    );
};

export default TrackItem;