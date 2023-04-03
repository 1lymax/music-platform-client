import React, {FC} from 'react';
import IconButton from "@mui/material/IconButton";
import {MoreVert} from "@mui/icons-material";
import {Menu, MenuItem} from "@mui/material";
import AddTrackToPlaylist from "../UserActions/AddTrackToPlaylist";
import {ITrack} from "../../types/track";

interface TrackItemMenuProps {
    track: ITrack
}

const TrackItemMenu: FC<TrackItemMenuProps> = ({ track }) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation()
        e.preventDefault()
        setAnchorEl(e.currentTarget);
    };
    const handleClose = (e: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(null);
        e.stopPropagation()
        e.preventDefault()
    };

    return (
        <div>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVert/>
            </IconButton>
            <Menu
                id="long-menu"
                MenuListProps={{
                    'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}><AddTrackToPlaylist track={track}/></MenuItem>
            </Menu>
        </div>
    );
};

export default TrackItemMenu;