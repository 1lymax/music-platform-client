import React from 'react';
import styled from "styled-components";
import {Button} from "@mui/material";
import MainLayout from "../layouts/MainLayout";

const Container = styled.div`
  margin-top: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Title = styled.h1`
`
const SubTitle = styled.h3`
`

const Index = () => {
    return (
        <>
            <MainLayout>
                <Container>
                    <Title>Welcome to music platform!</Title>
                    <SubTitle>Here is the best music tracks.</SubTitle>
                    <Button>Buutonn</Button>
                </Container>
            </MainLayout>

        </>

    );
};

export default Index;