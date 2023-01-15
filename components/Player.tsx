import React, {ChangeEvent, FC, useEffect} from 'react';
import {Pause, PlayArrow, VolumeUp} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import styled from "styled-components";
import ProgressBar from "./UI/ProgressBar";
import {usePlayerActions} from "../hooks/actions/usePlayerActions";
import {useTypedSelector} from "../hooks/useTypedSelector";


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

    const {pause, duration, volume, active, currentTime} = useTypedSelector(state => state.player)
    const {pauseTrack, playTrack, setVolume, setDuration, setCurrentTime} = usePlayerActions()

    useEffect(() => {
        if (!audio) {
            audio = new Audio()
        }else{
            setAudio()
            play()
        }
    }, [active]);

    const setAudio = () => {
        if (active) {
            audio.src = process.env.NEXT_PUBLIC_API_URL + active.audio
            audio.volume = volume / 100
            audio.onloadedmetadata = () => {
                setDuration(Math.ceil(audio.duration))
            }
            audio.ontimeupdate = () => {
                setCurrentTime(Math.ceil(audio.currentTime))
            }
        }
    }

    useEffect(() => {
        if (pause) {
            audio.pause()
        } else {
            audio.play()
        }
    }, [pause]);

    const play = async () => {
        if (pause) {
            playTrack()
        } else {
            pauseTrack()
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
            <IconButton onClick={play}>
                {pause
                    ? <PlayArrow/>
                    : <Pause/>
                }
            </IconButton>
            <InfoContainer>
                <Image src={process.env.NEXT_PUBLIC_API_URL + active?.picture}/>
                <Info>
                    <Title>
                        {active?.name} - {active?.artistId?.name}
                    </Title>
                    {active?.albumId?.name &&
						<SubTitle>
							({active?.albumId?.name})
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