import React from 'react';
import Navbar from "../components/Navbar";
import styled from "styled-components";

const Container = styled.div`
margin: 40px;
`

const MainLayout: React.FC<{children: JSX.Element}> = ({children}) => {
    return (
        <>
            <Navbar/>
            <Container>
                {children}
            </Container>

        </>
    );
};

export default MainLayout;