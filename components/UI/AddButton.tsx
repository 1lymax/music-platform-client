import React, {FC} from 'react';
import styled from "styled-components";
import {Button} from "@mui/material";

interface AddButtonProps {
    onClick?: () => void;
    icon?: any;
    children?: JSX.Element | string
}

const Container = styled.div`
height: 100%;
  display: flex;
  align-items: center;
`

const AddButton: FC<AddButtonProps> = (props) => {
    return (
        <Container>
            <Button {...props}
                //size={"large"}
                startIcon={props?.icon}
                sx={{marginLeft: '10px',
                }}
            >
                {props.children}
            </Button>

        </Container>
    );
};

export default AddButton;