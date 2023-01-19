import {Box, Collapse, Divider, LinearProgress, LinearProgressProps, Typography} from "@mui/material";
import React, {FC, useEffect, useState} from 'react';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {ITrack} from "../../types/track";
import PlaylistItem from "./PlaylistItem";
import {usePlayerActions} from "../../hooks/actions/usePlayerActions";


export interface PlayListProps {
    playlist: ITrack[],
    currentTrack: number
}


const PlayList: FC <PlayListProps> = ({playlist, currentTrack}) => {
    const [show, setShow] = useState(false);
    const { setActive } = usePlayerActions()

    useEffect(() => {
        setActive(playlist[currentTrack])
    }, [currentTrack]);

    const LinearProgressWithLabel = (props: LinearProgressProps & { value: number }) => {
        return (
            <Box sx={{display: 'flex', alignItems: 'center'}}>
                <Box sx={{width: '100%', mr: 1}}>
                    <LinearProgress variant="determinate" {...props} />
                </Box>
                <Box sx={{minWidth: 35}}>
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
            <Box onClick={() => setShow(!show)}
                 sx={{
                     display: 'flex',
                     cursor: 'pointer'
                 }}>
                {show
                    ?
                    <KeyboardArrowDownIcon color="action"/>
                    :
                    <KeyboardArrowUpIcon color="action"/>
                }
                <Box sx={{mx: 1}}>
                    Playlist ({currentTrack+1}/{playlist.length})
                </Box>
            </Box>
            <Divider sx={{mb: 1, mt: 2}}/>

            <Collapse in={show}>
                <Box
                    sx={{
                        minHeight: '20px',
                        maxHeight: '300px',
                        overflowY: 'auto',
                        overflowX: 'hidden',
                        width: '100%'
                    }}>
                    {playlist.map((track, index) => (
                        <PlaylistItem key={track._id+index} track={track} index={index} active={currentTrack === index}/>
                    ))}
                </Box>
            </Collapse>

        </Box>
    );
};

export default PlayList;