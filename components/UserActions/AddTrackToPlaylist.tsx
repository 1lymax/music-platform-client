import React, {FC, useState} from 'react';
import {usePlaylistActions} from "../../hooks/actions/usePlaylistActions";
import {ITrack} from "../../types/track";
import {IPlaylist} from "../../types/playlist";
import IconButton from "@mui/material/IconButton";
import {MoreVert} from "@mui/icons-material";
import {Chip, Divider, Menu, MenuItem} from "@mui/material";
import {useAddTrackToPlaylistMutation} from "../../store/api/playlist.api";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useIsAuth} from "../../hooks/useIsAuth";
import {useSuccessMessage} from "../../hooks/useSuccessMessage";
import {useErrorMessage} from "../../hooks/useErrorMessage";


interface AddTrackToPlaylistProps {
    track: ITrack
}

const AddTrackToPlaylist: FC<AddTrackToPlaylistProps> = ({ track }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const { addTrack } = usePlaylistActions()
    const [addTrackMutation, { isSuccess, error, }] = useAddTrackToPlaylistMutation()
    const { playlists, _id: currentPlaylistId } = useTypedSelector(state => state.playlist)

    useSuccessMessage('Track added', isSuccess)
    useErrorMessage('Error adding track', error)

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        e.preventDefault()
        setAnchorEl(e.currentTarget);
    };

    const handleClose = (e: React.MouseEvent) => {
        e.stopPropagation()
        e.preventDefault()
        setAnchorEl(null);
    };

    const addToPlaylist = (e: React.MouseEvent, playlist: IPlaylist) => {
        addTrackMutation({ tracks: [track._id], playlistId: playlist._id })
        handleClose(e)
    }

    const addToCurrentPlaylist = (e: React.MouseEvent) => {
        if (useIsAuth()) {
            addTrackMutation({ tracks: [track._id], playlistId: currentPlaylistId })
        } else {
            addTrack(track)
        }
        handleClose(e)
    }

    return (
        <div>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVert/>
            </IconButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={addToCurrentPlaylist}>Current playlist</MenuItem>
                <Divider>
                    <Chip label="or My Playlists"/>
                </Divider>
                {playlists.map(item => (
                    <MenuItem onClick={(e) => addToPlaylist(e, item)} key={item._id}>{item.name}</MenuItem>
                ))}
            </Menu>
        </div>
    );
};

export default AddTrackToPlaylist;