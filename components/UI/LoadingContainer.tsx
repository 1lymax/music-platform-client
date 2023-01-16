import React from 'react';
import styled from "styled-components";
import {CircularProgress} from "@mui/material";

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  color: gray;
  background: rgba(255,255,255, 0.6);
`

const LoadingContainer = () => {
    return (
        <Container>
            <CircularProgress color={"inherit"}/>
        </Container>
    );
};

export default LoadingContainer;