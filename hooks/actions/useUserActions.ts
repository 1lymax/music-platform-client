import {useDispatch} from "react-redux";
import {bindActionCreators} from "redux";
import {userActionCreators} from "../../store/slices/userSlice";

export const useUserActions = () => {
    const dispatch = useDispatch()
    return bindActionCreators(userActionCreators, dispatch)
}
