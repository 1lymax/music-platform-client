import React, {FC} from 'react';
import styled from "styled-components";
import {ITrack} from "../types/track";
import IconButton from "@mui/material/IconButton";
import {Delete, Pause, PlayArrow} from '@mui/icons-material';
import {useRouter} from "next/router";
import {useActions} from "../hooks/useActions";
import {useTypedSelector} from "../hooks/useTypedSelector";
import convertHMS from "../utils/convertHMS";

interface TrackItemProps {
    track: ITrack;
}

const Container = styled.div`
  margin: 10px;
  padding: 10px;
  display: flex;
  align-items: center;
  border: 1px solid lightgray;
  border-radius: 5px;
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

const TrackItem: FC<TrackItemProps> = ({track }) => {
    const router = useRouter()
    const {playTrack, pauseTrack, setActive} = useActions()
    const {active, pause, duration, currentTime} = useTypedSelector(state => state.player)


    const play = (e:any) => {
        e.stopPropagation()
        setActive(track)
        if (pause) {
            playTrack()
        }else {
            pauseTrack()
        }

    }

    return (
        <Container onClick={() => router.push('/tracks/' + track._id)}>
            <IconButton onClick={play}>
                {!pause && active?._id === track._id
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
            {active?._id === track._id && <div>{convertHMS(currentTime)} / {convertHMS(duration)}</div>
            }
            <IconButton style={{marginLeft: 'auto'}}>
                <Delete/>
            </IconButton>

        </Container>
    );
};

export default TrackItem;