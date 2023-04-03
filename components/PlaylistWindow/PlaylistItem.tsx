import React, {FC} from 'react';
import styled from "styled-components";
import {ITrack} from "../../types/track";
import IconButton from "@mui/material/IconButton";
import {Pause, PlayArrow} from "@mui/icons-material";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {usePlayerActions, usePlaylistActions} from "../../hooks/dispatch";

interface PlaylistItemProps {
    track: ITrack,
    index: number,
    active: boolean
}

const Container = styled.div<{active:boolean}>`
  background-color: ${props => props.active ? 'lightgray': 'transparent'};
`

const PlaylistItem: FC<PlaylistItemProps> = ({track, index, active}) => {
    const {playlistActive} = useTypedSelector(state => state.playlist)
    const {pause} = useTypedSelector(state => state.player)
    const {setActive, playPause, playTrack} = usePlayerActions()
    const { setActive: setPlaylistActive, setCurrentTrack } = usePlaylistActions()


    const play = (e:any) => {
        e.stopPropagation()
        setPlaylistActive(true)
        setCurrentTrack(index)
        setActive({ track, position: index })
        if (active) {
            playPause()
        } else {
            playTrack()
        }

    }

    const playStatus = () => {
        if (active && playlistActive) {
            if (!pause) {
                return <Pause/>
            }else {
                return <PlayArrow/>
            }
        }else {
            return <PlayArrow/>
        }
    }

    return (
        <Container active={active}>
            <IconButton onClick={play}>
                {playStatus()}
            </IconButton>
            {track?.name}
        </Container>
    );
};

export default PlaylistItem;