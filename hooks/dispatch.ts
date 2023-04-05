import {useDispatch} from "react-redux";
import {bindActionCreators} from "redux";
import {userActionCreators} from "../store/slices/userSlice";
import {trackActionCreators} from "../store/slices/trackSlice";
import {albumActionCreators} from "../store/slices/albumSlice";
import {artistActionCreators} from "../store/slices/artistSlice";
import {playerActionCreators} from "../store/slices/playerSlice";
import {playlistActionCreators} from "../store/slices/playlistSlice";
import {uploaderActionCreators} from "../store/slices/uploaderSlice";
import {genreActionCreators} from "../store/slices/genreSlice";


export const useArtistActions = () => {
    const dispatch = useDispatch();
    return bindActionCreators(artistActionCreators, dispatch);
};

export const useAlbumActions = () => {
    const dispatch = useDispatch();
    return bindActionCreators(albumActionCreators, dispatch);
};

export const usePlayerActions = () => {
    const dispatch = useDispatch();
    return bindActionCreators(playerActionCreators, dispatch);
};

export const usePlaylistActions = () => {
    const dispatch = useDispatch();
    return bindActionCreators(playlistActionCreators, dispatch);
};

export const useTrackActions = () => {
    const dispatch = useDispatch();
    return bindActionCreators(trackActionCreators, dispatch);
};

export const useUploaderActions = () => {
    const dispatch = useDispatch();
    return bindActionCreators(uploaderActionCreators, dispatch);
};

export const useUserActions = () => {
    const dispatch = useDispatch();
    return bindActionCreators(userActionCreators, dispatch);
};

export const useGenreActions = () => {
    const dispatch = useDispatch();
    return bindActionCreators(genreActionCreators, dispatch);
};