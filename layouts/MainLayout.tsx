import React from 'react';
import Navbar from "../components/UI/Navbar";
import styled from "styled-components";
import Player from "../components/Player";

const Container = styled.div`
  margin: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const MainLayout: React.FC<{ children: any }> = ({children}) => {
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