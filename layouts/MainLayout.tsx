import React, {useEffect} from 'react';
import Navbar from "../components/UI/Navbar";
import styled from "styled-components";
import Player from "../components/Player";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import {IUser} from "../types/user";
import {useUserActions} from "../hooks/actions/useUserActions";

const Container = styled.div`
  margin: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const MainLayout: React.FC<{ children: any }> = ({ children }) => {
    const token = Cookies.get('access_token')
    console.log('token', token)
    const { setUser } = useUserActions()

    useEffect(() => {
        if (token) {
            console.log('useEffect', jwtDecode(token))
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
        </>
    );
};

export default MainLayout;