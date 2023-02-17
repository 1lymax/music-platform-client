import React, {FC} from 'react';
import styled from "styled-components";
import {ITrack} from "../../types/track";
import TrackItem from "./TrackItem";

interface TrackListProps {
    tracks: ITrack[]
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const Wrapper = styled.div`
    padding: 1rem;
`

const TrackList: FC<TrackListProps> = ({tracks}) => {
    return (
        <Container>
            <Wrapper>
                {tracks.map((track) =>
                    <TrackItem key={track._id} track={track}/>
                )}
            </Wrapper>
        </Container>
    );
};

export default TrackList;