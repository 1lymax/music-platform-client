import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import React, {useEffect} from 'react';
import styled from "styled-components";
import {IUser} from "../types/user";
import {useIsAuth} from "../hooks/useIsAuth";
import Navbar from "../components/UI/Navbar";
import Player from "../components/Player/Player";
import PlayList from "../components/PlaylistWindow/PlayList";
import {useGetUserPlaylistsQuery} from "../store/api/playlist.api";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useUserActions} from "../hooks/dispatch";

const Container = styled.div`
  margin: 40px;
  height: calc(100vh - 150px);
  width: 94vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`

const MainLayout: React.FC<{ children: any }> = ({ children }) => {
    const token = Cookies.get('access_token')
    const { setUser } = useUserActions()
    const { user } = useTypedSelector(state => state.user)

    useGetUserPlaylistsQuery(user._id, { skip: !useIsAuth() })


    useEffect(() => {
        if (token) {
            setUser({ ...jwtDecode<IUser>(token) })
        }
    }, [token]);

    return (
        <>
            <Navbar/>
            <Container>
                {children}
            </Container>
            <Player/>
            <PlayList/>
        </>
    );
};

export default MainLayout;