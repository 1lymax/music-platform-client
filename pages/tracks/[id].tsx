import React, {FC} from 'react';
import {useRouter} from "next/router";
import styled from "styled-components";
import {Button, TextField} from "@mui/material";

import {wrapper} from "../../store";
import {ITrack} from "../../types/track";
import MainLayout from "../../layouts/MainLayout";
import {getTrackById} from "../../store/api/track.api";

interface PageProps {
    track: ITrack;
    status: string
}

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


const TrackPage: FC<PageProps> = ({track}) => {

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
                    <Image src={process.env.NEXT_PUBLIC_API_URL + track?.picture}/>
                    <Info>
                        <Title>{track?.name}</Title>
                        <SubTitle>Album - {track?.album?.name}</SubTitle>
                        <SubTitle>Artist - {track?.artist?.name}</SubTitle>
                        <SubTitle>Listens - {track?.listens}</SubTitle>
                    </Info>
                </Card>
                <Title>Lyrics</Title>
                <p>{track?.text}</p>
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
                    {track?.comments?.length && track.comments.map(comment =>
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

export const getServerSideProps = wrapper.getServerSideProps(store => async ({query}) => {
    let response
    if (typeof query.id === "string") {
        response = await store.dispatch(getTrackById.initiate(query?.id))
        //await Promise.all(store.dispatch(trackApi.util.getRunningQueriesThunk()))
    }

    return {
        props: {
            track: response?.data,
            status: response?.status
        }
    }
})