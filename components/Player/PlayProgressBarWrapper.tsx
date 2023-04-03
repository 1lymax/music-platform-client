// @flow
import * as React from "react";
import {ChangeEvent, FC, useEffect} from "react";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import ProgressBar from "../UI/ProgressBar";
import {usePlayerActions} from "../../hooks/dispatch";


interface IPlayProgressBarWrapper {
    audio: HTMLAudioElement;
    width: number;
    timeConvert?: boolean;
}

export const PlayProgressBarWrapper: FC<IPlayProgressBarWrapper> = ({ audio, timeConvert, width }) => {
    const { duration, currentTime } = useTypedSelector(state => state.player);
    const { setCurrentTime } = usePlayerActions();

    const changeCurrentTime = (e: ChangeEvent<HTMLInputElement>) => {
        audio.currentTime = (Number(e.target.value));
        setCurrentTime(Number(e.target.value));
    };

    useEffect(() => {
        if (audio)
            audio.currentTime = currentTime;
        audio.ontimeupdate = () => {
            setCurrentTime(Math.ceil(audio.currentTime));
        };
    }, [audio]);


    return (
        <ProgressBar left={currentTime} right={duration} onChange={changeCurrentTime} width={width} timeConvert={timeConvert}/>
    );
};