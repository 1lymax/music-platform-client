import {useDispatch} from "react-redux";
import {bindActionCreators} from "redux";
import {albumActionCreators} from "../../store/slices/albumSlice";

export const useAlbumActions = () => {
    const dispatch = useDispatch()
    return bindActionCreators(albumActionCreators, dispatch)
}
