import React from 'react';
import {ITrack} from "../../types/track";
import MainLayout from "../../layouts/MainLayout";
import {useRouter} from "next/router";
import styled from "styled-components";
import {Button, TextField} from "@mui/material";

const Container = styled.div`
  margin: 20px;
`

const Card = styled.div`
  margin: 20px 0;
  display: flex;
`

const Info = styled.div`
  margin: 0 20px;
`

const Image = styled.img`
  width: 200px;
  height: 200px;
`

const Title = styled.h1`
  margin-top: 0;
`

const SubTitle = styled.h2`
`

const InputArea = styled.div`
`

const CommentsContainer = styled.div`
`
const CommentBlock = styled.div`
`
const CommentTitle = styled.div`
`
const CommentText = styled.p`
`


const TrackPage = () => {
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
    const router = useRouter()


    return (
        <MainLayout>
            <Container>
                <Button
                    variant={"outlined"}
                    size={"large"}
                    onClick={() => router.back()}
                >Back to list</Button>
                <Card>
                    <Image src={track.picture}/>
                    <Info>
                        <Title>{track.name}</Title>
                        <SubTitle>Album - {track.albumId.name}</SubTitle>
                        <SubTitle>Artist - {track.artistId.name}</SubTitle>
                        <SubTitle>Listens - {track.listens}</SubTitle>
                    </Info>
                </Card>
                <Title>Lyrics</Title>
                <p>{track.text}</p>
                <Title>Comments</Title>
                <InputArea>
                    <TextField
                        label={'Your name'}
                        fullWidth
                    />
                    <TextField
                        label={'Comment'}
                        fullWidth
                        margin={"normal"}
                        multiline
                        rows={4}
                    />
                    <Button variant={"outlined"}>Send</Button>
                </InputArea>
                <CommentsContainer>
                    {track.comments.map(comment =>
                        <CommentBlock key={comment._id}>
                            <CommentTitle>Author - {comment.username}</CommentTitle>
                            <CommentText>Comment - {comment.text}</CommentText>
                        </CommentBlock>
                    )}
                </CommentsContainer>
            </Container>
        </MainLayout>
    );
};

export default TrackPage;