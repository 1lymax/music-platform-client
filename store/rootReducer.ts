import {combineReducers} from "redux";
import {playerSlice} from "./slices/playerSlice";

const rootReducer = combineReducers({
    player: playerSlice.reducer
})

export default rootReducer