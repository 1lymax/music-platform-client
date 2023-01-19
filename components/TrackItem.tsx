import React, {FC} from 'react';
import styled from "styled-components";
import {ITrack} from "../types/track";
import IconButton from "@mui/material/IconButton";
import {AddCircleOutlined, Delete, Pause, PlayArrow} from '@mui/icons-material';
import {useRouter} from "next/router";
import {usePlayerActions} from "../hooks/actions/usePlayerActions";
import {useTypedSelector} from "../hooks/useTypedSelector";
import convertHMS from "../utils/convertHMS";
import {usePlaylistActions} from "../hooks/actions/usePlaylistActions";

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
  width: 60%;
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
    const {playPause, setActive} = usePlayerActions()
    const {addTrack, setActive: setPlaylistActive} = usePlaylistActions()
    const {active, pause, duration, currentTime} = useTypedSelector(state => state.player)


    const play = (e:any) => {
        e.stopPropagation()
        setPlaylistActive(false)
        if (active && active.track?._id !== track._id)
            playPause()
        setActive({ track, position: 0 })
        playPause()
    }

    const addToPlaylist = (e: React.MouseEvent) => {
        e.stopPropagation()
        addTrack(track)
    }

    return (
        <Container onClick={() => router.push('/tracks/' + track._id)} draggable>
            <IconButton onClick={play}>
                {!pause && active?.track?._id === track._id
                    ? <Pause/>
                    : <PlayArrow/>
                }
            </IconButton>
            <Image width={70} height={70} src={process.env.NEXT_PUBLIC_API_URL + track.picture}/>
            <TrackWrapper>
                <TrackName>{track.name}</TrackName>
                <Album>{track.albumId?.name}</Album>
                <Artist>{track.artistId?.name}</Artist>
            </TrackWrapper>
            {active?.track?._id === track._id && <div>{convertHMS(currentTime)} / {convertHMS(duration)}</div>
            }
            <IconButton style={{marginLeft: 'auto'}} onClick={(e) => addToPlaylist(e)}>
                <AddCircleOutlined/>
            </IconButton>
            <IconButton style={{marginLeft: 'auto'}}>
                <Delete/>
            </IconButton>

        </Container>
    );
};

export default TrackItem;