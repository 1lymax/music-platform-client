import {useDispatch} from "react-redux";
import {bindActionCreators} from "redux";
import {artistActionCreators} from "../../store/slices/artistSlice";

export const useArtistActions = () => {
    const dispatch = useDispatch()
    return bindActionCreators(artistActionCreators, dispatch)
}
