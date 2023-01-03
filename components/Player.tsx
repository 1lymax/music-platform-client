import React, {FC} from 'react';
import {Pause, PlayArrow, VolumeUp} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import styled from "styled-components";
import {ITrack} from "../types/track";
import ProgressBar from "./ProgressBar";

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

    return (
        <Container>
            <IconButton onClick={e => e.stopPropagation()}>
                {true
                    ? <Pause/>
                    : <PlayArrow/>
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
            <ProgressBar left={0} right={100} onChange={() => ({})} width={50}/>
            <VolumeContainer>
                <VolumeUp/>
                <ProgressBar left={0} right={100} onChange={() => ({})} width={90}/>
            </VolumeContainer>
        </Container>
    );
};

export default Player;