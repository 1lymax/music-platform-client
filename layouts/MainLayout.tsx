import React from 'react';
import Navbar from "../components/Navbar";
import styled from "styled-components";
import Player from "../components/Player";

const Container = styled.div`
margin: 40px;
`

const MainLayout: React.FC<{children: any}> = ({children}) => {
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