import styled from "styled-components";
import React, {FC, useEffect, useState} from 'react';
import {PlaylistPlay, Repeat, RepeatOne, Shuffle} from "@mui/icons-material";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {Box, Collapse, Divider, LinearProgress, LinearProgressProps, Typography} from "@mui/material";
import PlaylistItem from "./PlaylistItem";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {usePlayerActions} from "../../hooks/actions/usePlayerActions";
import {usePlaylistActions} from "../../hooks/actions/usePlaylistActions";
import {playModes} from "../../types/playlist";


export interface PlayListProps {

}

const Title = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`


const TitleButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`


const PlayList: FC<PlayListProps> = () => {
    const [show, setShow] = useState(false);
    const { setActive, playTrack } = usePlayerActions()
    const { setActive: setPlaylistActive, changePlayMode,setCurrentTrack } = usePlaylistActions()

    const { playlist, currentTrack, playlistActive, playMode } = useTypedSelector(state => state.playlist)
    const { pause } = useTypedSelector(state => state.player)

    useEffect(() => {
        setActive(playlist[currentTrack])
    }, [currentTrack]);

    const play = () => {
        if (!playlistActive) {
            setPlaylistActive(true)
            setCurrentTrack(0)
            setActive(playlist[0])
            playTrack()
        } else {
            if (pause) playTrack()
        }

    }

    const LinearProgressWithLabel = (props: LinearProgressProps & { value: number }) => {
        return (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ width: '100%', mr: 1 }}>
                    <LinearProgress variant="determinate" {...props} />
                </Box>
                <Box sx={{ minWidth: 35 }}>
                    <Typography variant="body2" color="text.secondary">{`${Math.round(
                        props.value,
                    )}%`}</Typography>
                </Box>
            </Box>
        );
    }

    return (
        <Box sx={{
            border: '1px solid',
            borderColor: theme => theme.palette.grey[400],
            backgroundColor: 'white',
            borderRadius: '15px 15px 0px 0px',
            //boxShadow: theme => theme.shadows[4],
            width: '400px',
            minHeight: '30px',
            maxWidth: '400px',
            position: 'fixed',
            bottom: 60,
            p: 1,
            right: 10,
            zIndex: 1
        }}
        >
            <Title>
                {show
                    ?
                    <KeyboardArrowDownIcon color="action" onClick={() => setShow(!show)}/>
                    :
                    <KeyboardArrowUpIcon color="action" onClick={() => setShow(!show)}/>
                }
                Playlist ({currentTrack + 1}/{playlist.length})
                <TitleButtons>
                    <PlaylistPlay color="action" onClick={() => play()}/>
                    {playMode === playModes.all && <Repeat color="action" onClick={() => changePlayMode(playModes.shuffle)}/>}
                    {playMode === playModes.shuffle && <Shuffle color="action" onClick={() => changePlayMode(playModes.single)}/>}
                    {playMode === playModes.single && <RepeatOne color="action" onClick={() => changePlayMode(playModes.all)}/>}
                </TitleButtons>
            </Title>
            <Divider sx={{ mb: 1, mt: 2 }}/>

            <Collapse in={show}>
                <Box
                    sx={{
                        minHeight: '20px',
                        maxHeight: '300px',
                        overflowY: 'auto',
                        overflowX: 'hidden',
                        width: '100%'
                    }}>
                    {playlist.map((item, index) => (
                        <PlaylistItem key={item.track?._id + index} track={item.track} index={index}
                                      active={currentTrack === index}/>
                    ))}
                </Box>
            </Collapse>

        </Box>
    );
};

export default PlayList;