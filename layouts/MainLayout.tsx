import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import React, {useEffect} from 'react';
import styled from "styled-components";
import {IUser} from "../types/user";
import Player from "../components/Player";
import Navbar from "../components/UI/Navbar";
import PlayList from "../components/Playlist/PlayList";
import {useUserActions} from "../hooks/actions/useUserActions";

const Container = styled.div`
  margin: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const MainLayout: React.FC<{ children: any }> = ({ children }) => {
    const token = Cookies.get('access_token')
    const { setUser } = useUserActions()

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