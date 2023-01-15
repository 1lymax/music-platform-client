import React, {useState} from 'react';
import styled from "styled-components";
import SelectBox from "./UI/SelectBox";
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
    useSearchAlbumQuery({artistId: artist?._id})

    const albumName = () => {
        if (artist)
            return "Album (" + albums.length + ")"
        else
            return 'Select artist first'
    }

    return (
        <Container>
            <SelectBox label={'Artist...'} setValue={setArtist} options={artists}/>
            <SelectBox label={albumName()} setValue={setAlbum} options={albums}/>
        </Container>
    );
};

export default FilterTracks;