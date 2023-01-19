import {ITrack} from "./track";

export interface PlayerState {
    active: null | { track: ITrack, position: number };
    volume: number;
    duration: number;
    currentTime: number;
    pause: boolean;
}