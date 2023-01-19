import {useDispatch} from "react-redux";
import {bindActionCreators} from "redux";
import {playlistActionCreators} from "../../store/slices/playlistSlice";

export const usePlaylistActions = () => {
    const dispatch = useDispatch()
    return bindActionCreators(playlistActionCreators, dispatch)
}
