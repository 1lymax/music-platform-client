import React, {FC} from 'react';
import styled from "styled-components";
import {Button} from "@mui/material";
import {useRouter} from "next/router";
import {ITrack} from "../../types/track";
import MainLayout from "../../layouts/MainLayout";
import TrackList from "../../components/TrackList";
import {getAllTracks, trackApi} from "../../store/api/track";
import {wrapper} from "../../store";

interface IndexProps {
    tracks: ITrack[];
    status: string;
}

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

const Index: FC<IndexProps> = ({tracks}) => {
    const router = useRouter()
    //const {setTracks} = useTrackActions()
    //const {tracks} = useTypedSelector(state => state.track)
    //const {error, data} = useGetAllTracksQuery()

    // if (error) {
    //     console.log(error)
    //     return <MainLayout>
    //         <h1>Произошла ошибка</h1>
    //     </MainLayout>
    // }

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
    const response = await store.dispatch(getAllTracks.initiate())
    await Promise.all(store.dispatch(trackApi.util.getRunningQueriesThunk()))
    return {
        props: {
            tracks: response.data,
            status: response.status
        }
    }
})
