import styled from "styled-components";
import IconButton from "@mui/material/IconButton";
import React, {ChangeEvent, FC, useEffect} from 'react';
import {Pause, PlayArrow, VolumeUp} from "@mui/icons-material";

import ProgressBar from "./UI/ProgressBar";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {usePlayerActions} from "../hooks/actions/usePlayerActions";
import {usePlaylistActions} from "../hooks/actions/usePlaylistActions";
import {playModes} from "../types/playlist";


interface PlayerProps {

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
`

const InfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

`

const Info = styled.div`
  margin: 0 20px;
`

const Image = styled.img`
  width: 40px;
  height: 40px;
  margin: 0 20px;
`

const Title = styled.div`
`

const SubTitle = styled.div`
  color: gray;
  font-size: 12px;
`

const VolumeContainer = styled.div`
  display: flex;
  margin-left: auto;
  justify-content: space-between;
  align-items: center;
  width: 15%;
`

let audio: HTMLAudioElement


const Player: FC<PlayerProps> = () => {

    const { playlistActive, playMode } = useTypedSelector(state => state.playlist)
    const { pause, duration, volume, active, currentTime } = useTypedSelector(state => state.player)

    const { changeTrack } = usePlaylistActions()
    const { playPause, setVolume, setDuration, setCurrentTime} = usePlayerActions()

    useEffect(() => {
        if (!audio) {
            audio = new Audio()
        } else {
            setAudio()
        }
    }, [active]);

    useEffect(() => {
        if (pause) {
            audio.pause()
        } else {
            audio.play().then(() => {
            })
        }
    }, [pause, active]);

    const setAudio = () => {
        if (active) {
            audio.src = process.env.NEXT_PUBLIC_API_URL + active.track.audio
            audio.volume = volume / 100
            audio.onloadedmetadata = () => {
                setDuration(Math.ceil(audio.duration))
            }
            audio.currentTime = currentTime
            audio.ontimeupdate = () => {
                setCurrentTime(Math.ceil(audio.currentTime))
                if (playlistActive && audio.ended) {
                    changeTrack()
                    if (playMode === playModes.single)
                        audio.currentTime = 0
                        audio.play()
                }
            }
        }
    }

    const changeVolume = (e: ChangeEvent<HTMLInputElement>) => {
        audio.volume = Number(e.target.value) / 100
        setVolume(Number(e.target.value))
    }

    const changeCurrentTime = (e: ChangeEvent<HTMLInputElement>) => {
        audio.currentTime = (Number(e.target.value))
        setCurrentTime(Number(e.target.value))
    }

    if (!active) return null

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
                        {active.track.name} - {active.track.artistId?.name}
                    </Title>
                    {active?.track.albumId?.name &&
						<SubTitle>
							({active?.track.albumId?.name})
						</SubTitle>
                    }
                </Info>
            </InfoContainer>
            <ProgressBar left={currentTime} right={duration} onChange={changeCurrentTime} width={50} timeConvert/>
            <VolumeContainer>
                <VolumeUp/>
                <ProgressBar left={volume} right={100} onChange={changeVolume} width={90}/>
            </VolumeContainer>
        </Container>
    );
};

export default Player;