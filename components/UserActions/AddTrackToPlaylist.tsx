import React, {FC, useState} from "react";
import {ITrack} from "../../types/track";
import {IPlaylist} from "../../types/playlist";
import {Divider, Menu, MenuItem, Typography} from "@mui/material";
import {useAddTrackToPlaylistMutation} from "../../store/api/playlist.api";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useSuccessMessage} from "../../hooks/useSuccessMessage";
import {useErrorMessage} from "../../hooks/useErrorMessage";
import {usePlaylistActions} from "../../hooks/dispatch";


interface AddTrackToPlaylistProps {
    track: ITrack
}

const AddTrackToPlaylist: FC<AddTrackToPlaylistProps> = ({ track }) => {
    const [menuPosition, setMenuPosition] = useState<any>(null);
    const [menuMouseOver, setMenuMouseOver] = useState(false);
    const open = Boolean(menuPosition);

    const { addTrack } = usePlaylistActions()
    const [addTrackMutation, { isSuccess, error, }] = useAddTrackToPlaylistMutation()
    const { playlists, _id: currentPlaylistId } = useTypedSelector(state => state.playlist)

    useSuccessMessage('Track added', isSuccess)
    useErrorMessage('Error adding track', error)

    const handleOpen = (e: React.MouseEvent<HTMLElement>) => {
        setMenuPosition({
            top: e.pageY,
            left: e.pageX
        });
        e.stopPropagation()
        e.preventDefault()
    };

    const handleClose = async (e: React.MouseEvent) => {
        //console.log('menuOpen1', menuMouseOver)
        await setTimeout(() => {
            //console.log('menuOpen 2', menuMouseOver)
            if (!menuMouseOver)
                setMenuPosition(null);
            e.stopPropagation()
            e.preventDefault()
        }, 1000)

    };

    const addToPlaylist = (e: React.MouseEvent, playlist: IPlaylist) => {
        addTrackMutation({ tracks: [track._id], playlistId: playlist._id })
        handleClose(e)
    }

    const addToCurrentPlaylist = (e: React.MouseEvent) => {
       // if (useIsAuth()) {
      //      addTrackMutation({ tracks: [track._id], playlistId: currentPlaylistId })
        //} else {
            addTrack(track)
       // }
        handleClose(e)
    }

    return (
        <div>
            <Typography
                aria-owns={open ? 'mouse-over-popover' : undefined}
                aria-haspopup="true"
                onMouseEnter={handleOpen}
                onMouseLeave={handleClose}
            >
                Add track to playlist
            </Typography>
            {/*<Popover*/}
            {/*    id="mouse-over-popover"*/}
            {/*    sx={{*/}
            {/*        pointerEvents: 'none',*/}
            {/*    }}*/}
            {/*    open={open}*/}
            {/*    anchorEl={anchorEl}*/}
            {/*    anchorOrigin={{*/}
            {/*        vertical: 'top',*/}
            {/*        horizontal: 'right',*/}
            {/*    }}*/}
            {/*    transformOrigin={{*/}
            {/*        vertical: 'top',*/}
            {/*        horizontal: 'left',*/}
            {/*    }}*/}
            {/*    disableRestoreFocus*/}

            {/*>*/}

                <Menu open={open}
                      anchorReference="anchorPosition"
                      anchorPosition={menuPosition}
                      onMouseEnter={(e) => {
                          console.log('mouseenter')
                          setMenuMouseOver(true)
                          handleOpen(e)
                      }}
                      onMouseLeave={(e) => {
                          setMenuMouseOver(false)
                          handleClose(e)
                      }}
                >
                    <MenuItem
                        onClick={addToCurrentPlaylist}
                    >
                        Current playlist
                    </MenuItem>
                    <Divider variant={"middle"}/>
                    {playlists.map(item => (
                        <MenuItem onClick={(e) => addToPlaylist(e, item)}
                                  key={item._id}>{item.name}</MenuItem>
                    ))}
                </Menu>
            {/*</Popover>*/}
        </div>
    );
};

export default AddTrackToPlaylist;