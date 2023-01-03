import React from 'react';
import MainLayout from "../../layouts/MainLayout";
import styled from "styled-components";
import {Button} from "@mui/material";
import {useRouter} from "next/router";
import {ITrack} from "../../types/track";
import TrackList from "../../components/TrackList";

const Container = styled.div`
  display: flex;
  justify-content: center;

`

const Card = styled.div`
  width: 900px;
  border: 1px solid lightgray;
  border-radius: 5px;
  box-shadow: 0 2px 2px lightgray;
`

const CardContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
`

const Title = styled.h1`
`

// const Button = styled.button`
// `

const Index = () => {
    const router = useRouter()
    const tracks: ITrack[] = [
        {
            _id: '63ac369be5a74b86da15938d',
            name: "Maginificent",
            text: "123-456-789",
            listens: 4,
            comments: [],
            artistId: {_id: '63ac8ba333a49ff8b4e05aea', name: 'U2'},
            audio: "http://localhost:5000/audio/ecec8d10-8820-11ed-9f3b-eb05f7cd6964.mp3",
            picture: "http://localhost:5000/image/ece56120-8820-11ed-9f3b-eb05f7cd6964.jpg",
            albumId: {}
        },
        {
            _id: '63ac369be5a74b86da10938d',
            name: "Mysterious ways",
            text: "123-456-789",
            listens: 4,
            comments: [],
            artistId: {_id: '63ac8ba333a49ff8b4e05aea'},
            audio: "http://localhost:5000/audio/ecec8d10-8820-11ed-9f3b-eb05f7cd6964.mp3",
            picture: "http://localhost:5000/image/ece56120-8820-11ed-9f3b-eb05f7cd6964.jpg",
            albumId: {_id: '63ad8d8c0c3370c1914a96e1'}
        },
        {
            _id: '63ac369be5a44b86da15938d',
            name: "360 degree",
            text: "123-456-789",
            listens: 4,
            comments: [],
            artistId: {_id: '63ac8ba333a49ff8b4e05aea'},
            audio: "http://localhost:5000/audio/ecec8d10-8820-11ed-9f3b-eb05f7cd6964.mp3",
            picture: "http://localhost:5000/image/ece56120-8820-11ed-9f3b-eb05f7cd6964.jpg",
            albumId: {_id: '63ad8d8c0c3370c1914a96e1'}
        },
    ]

    return (
        <MainLayout>
            <Container>
                <Card>
                    <CardContent>
                        <Title>Upload track</Title>
                        <Button onClick={() => router.push('/tracks/create')}>
                            Upload
                        </Button>
                    </CardContent>
                    <TrackList tracks={tracks}/>
                </Card>

            </Container>

        </MainLayout>
    );
};

export default Index;