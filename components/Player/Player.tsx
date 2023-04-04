import styled from "styled-components";
import IconButton from "@mui/material/IconButton";
import {Pause, PlayArrow, VolumeUp} from "@mui/icons-material";
import React, {ChangeEvent, FC, useEffect, useRef} from "react";

import {wrapper} from "../../store";
import ProgressBar from "../UI/ProgressBar";
import {playModes} from "../../types/playlist";
import {usePlayerActions, usePlaylistActions} from "../../hooks/dispatch";
import {useTypedSelector} from "../../hooks/useTypedSelector";


interface PlayerProps {
    //playList: PlaylistState,
    //player: PlayerState
}

const Container = styled.div`
  height: 60px;
  width: 100%;
  position: fixed;
  bottom: 0;
  display: flex;
  align-items: center;
  padding: 0 10px;
  background-color: lightgray;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

`;

const Info = styled.div`
  margin: 0 20px;
`;

const Image = styled.img`
  width: 40px;
  height: 40px;
  margin: 0 20px;
`;

const Title = styled.div`
`;

const SubTitle = styled.div`
  color: gray;
  font-size: 12px;
`;

const VolumeContainer = styled.div`
  display: flex;
  margin-left: auto;
  justify-content: space-between;
  align-items: center;
  width: 15%;
`;

const Player: FC<PlayerProps> = () => {
    let audio = useRef<HTMLAudioElement>(typeof Audio !== "undefined" && new Audio());
    //const { playlistActive, playMode } = playList;
    //const { pause, volume, active, duration, currentTime } = player;
    const { playlistActive, playMode } = useTypedSelector(state => state.playlist);
    const { pause, volume, active, duration, currentTime } = useTypedSelector(state => state.player);

    const { changeTrack } = usePlaylistActions();
    const { playPause, setVolume, setDuration, setCurrentTime } = usePlayerActions();

    useEffect(() => {
        if (!audio.current) {
            audio.current = new Audio();
        } else {
            setAudio();
        }
    }, [active]);

    useEffect(() => {
        if (pause) {
            audio.current.pause();
        } else {
            audio.current.play().then(() => {
            });
        }
    }, [pause, active]);


    const setAudio = () => {
        if (audio && active) {
            audio.current.src = process.env.NEXT_PUBLIC_API_URL + active.track.audio;
            audio.current.volume = volume / 100;
            audio.current.onloadedmetadata = () => {
                setDuration(Math.ceil(audio.current.duration));
            };
            audio.current.ontimeupdate = () => {
                setCurrentTime(Math.ceil(audio.current.currentTime));
                if (playlistActive && audio.current.ended) {
                    changeTrack();
                    if (playMode === playModes.single)
                        audio.current.currentTime = 0;
                    audio.current.play();
                }
            };
        }
    };

    const changeCurrentTime = (e: ChangeEvent<HTMLInputElement>) => {
        audio.current.currentTime = (Number(e.target.value));
        setCurrentTime(Number(e.target.value));
    };

    const changeVolume = (e: ChangeEvent<HTMLInputElement>) => {
        audio.current.volume = Number(e.target.value) / 100;
        setVolume(Number(e.target.value));
    };

    if (!active) return null;

    return (
        <Container>
            <IconButton onClick={() => playPause()}>
                {pause
                    ? <PlayArrow/>
                    : <Pause/>
                }
            </IconButton>
            <InfoContainer>
                <Image src={process.env.NEXT_PUBLIC_API_URL + active.track.picture}/>
                <Info>
                    <Title>
                        {active.track.name} - {active.track.artist?.name}
                    </Title>
                    {active?.track.album?.name &&
						<SubTitle>
							({active?.track.album?.name})
						</SubTitle>
                    }
                </Info>
            </InfoContainer>
            {/*<PlayProgressBarWrapper audio={audio.current} width={50} timeConvert/>*/}
            <ProgressBar left={currentTime} right={duration} onChange={changeCurrentTime} width={50} timeConvert/>
            <VolumeContainer>
                <VolumeUp/>
                <ProgressBar left={volume} right={100} onChange={changeVolume} width={90}/>
            </VolumeContainer>
        </Container>
    );
};

export default Player;

export const getInitialPageProps = wrapper.getInitialPageProps(store => async () => {
    const playlistState = store.getState().playlist;
    const playerState = store.getState().player;
    console.log(playlistState);
    return {
        props: {
            playlistState: playlistState,
            playerState: playerState
        }
    };
});
