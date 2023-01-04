import {useDispatch} from "react-redux";
import {bindActionCreators} from "redux";
import {playerActionCreators} from "../store/slices/playerSlice";

export const usePlayerActions = () => {
    const dispatch = useDispatch()
    return bindActionCreators(playerActionCreators, dispatch)
}
