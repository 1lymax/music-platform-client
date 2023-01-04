import {combineReducers} from "redux";
import {playerSlice} from "./slices/playerSlice";
import {trackSlice} from "./slices/trackSlice";

const rootReducer = combineReducers({
    player: playerSlice.reducer,
    track: trackSlice.reducer,
})

export default rootReducer