import {useTypedSelector} from "./useTypedSelector";

export const useIsAuth = () => {
    const { user } = useTypedSelector(state => state.user)
    return !!user._id
}