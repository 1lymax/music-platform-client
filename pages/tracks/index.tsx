import React from "react";
import {Button} from "@mui/material";
import {useRouter} from "next/router";
import styled from "styled-components";

import {wrapper} from "../../store";
import {ITrack} from "../../types/track";
import MainLayout from "../../layouts/MainLayout";
import TrackList from "../../components/Track/TrackList";
import {getAllTracks, trackApi} from "../../store/api/track.api";

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
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

interface Props {
    tracks: ITrack[];
    status: string;
}

const Index = ({tracks}: Props) => {
    const router = useRouter()

    return (
        <MainLayout>
            <Container>
                {/*<FilterTracks/>*/}
                <Card>
                    <CardContent>
                        <Title>Upload track</Title>
                        <Button onClick={() => router.push('/tracks/create')}>
                            Upload
                        </Button>
                    </CardContent>
                    {tracks &&
						<TrackList tracks={tracks}/>
                    }
                </Card>

            </Container>

        </MainLayout>
    );
};

export default Index;

export const getServerSideProps = wrapper.getServerSideProps(store => async () => {
    const tracks = await store.dispatch(getAllTracks.initiate())
    //const artists = await store.dispatch(getAllArtists.initiate())
    await Promise.all(store.dispatch(trackApi.util.getRunningQueriesThunk()))

    return {
        props: {
            tracks: tracks.data,
            status: tracks.status,
        }
    }
})
