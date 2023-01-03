import React, {ChangeEvent, FC, useEffect} from 'react';
import {Pause, PlayArrow, VolumeUp} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import styled from "styled-components";
import {ITrack} from "../types/track";
import ProgressBar from "./ProgressBar";
import {useActions} from "../hooks/useActions";
import {useTypedSelector} from "../hooks/useTypedSelector";


interface PlayerProps {
    //active: boolean
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
  //justify-content: space-around;
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
  width: 15%;
`

let audio: HTMLAudioElement


const Player: FC<PlayerProps> = () => {
    const track: ITrack = {
        _id: '63ac369be5a74b86da15938d',
        name: "Maginificent",
        text: "123-456-789",
        listens: 4,
        comments: [],
        artistId: {_id: '63ac8ba333a49ff8b4e05aea', name: "U2"},
        audio: "http://localhost:5000/audio/ecec8d10-8820-11ed-9f3b-eb05f7cd6964.mp3",
        picture: "http://localhost:5000/image/ece56120-8820-11ed-9f3b-eb05f7cd6964.jpg",
        albumId: {_id: '63ad8d8c0c3370c1914a96e1'}
    }
    const {pause, duration, volume, active, currentTime} = useTypedSelector(state => state.player)
    const {pauseTrack, playTrack, setVolume, setActive, setDuration, setCurrentTime} = useActions()

    useEffect(() => {
        if (!audio) {
            audio = new Audio()
            audio.src = track.audio
            audio.volume = volume / 100
            audio.onloadedmetadata = () => {
                setDuration(Math.floor(audio.duration))
            }
            audio.ontimeupdate = () => {
                setCurrentTime(Math.floor(audio.currentTime))
            }
        }
    }, []);

    const play = () => {
        if (pause) {
            playTrack()
            audio.play()
        } else {
            pauseTrack()
            audio.pause()
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

    return (
        <Container>
            <IconButton onClick={play}>
                {pause
                    ? <PlayArrow/>
                    : <Pause/>
                }
            </IconButton>
            <InfoContainer>
                <Image src={track.picture}/>
                <Info>
                    <Title>
                        {track.name} - {track.artistId.name}
                    </Title>
                    {track.albumId?.name &&
						<SubTitle>
							({track.albumId.name})
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