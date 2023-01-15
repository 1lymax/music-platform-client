import {useDispatch} from "react-redux";
import {bindActionCreators} from "redux";
import {trackActionCreators} from "../../store/slices/trackSlice";

export const useTrackActions = () => {
    const dispatch = useDispatch()
    return bindActionCreators(trackActionCreators, dispatch)
}
