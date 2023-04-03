import React, {useState} from 'react';
import styled from "styled-components";
import SelectTemplate from "./UI/Selects/SelectTemplate";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useGetAllArtistsQuery} from "../store/api/artist.api";
import {useSearchAlbumQuery} from "../store/api/album.api";
import {IArtist} from "../types/artist";

const Container = styled.div`
  width: 100%;
  max-width: 350px;
`

const FilterTracks = () => {
    const [artist, setArtist] = useState<IArtist>();
    const [album, setAlbum] = useState();

    const {artists} = useTypedSelector(state => state.artist)
    const {albums} = useTypedSelector(state => state.album)

    useGetAllArtistsQuery()
    useSearchAlbumQuery({artist: artist?._id})

    const albumName = () => {
        if (artist)
            return "Album (" + albums.length + ")"
        else
            return 'Select artist first'
    }

    return (
        <Container>
            <SelectTemplate label={'Artist...'} onChange={setArtist} options={artists}/>
            <SelectTemplate label={albumName()} onChange={setAlbum} options={albums}/>
        </Container>
    );
};

export default FilterTracks;