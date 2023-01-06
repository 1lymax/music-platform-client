import React, {FC} from 'react';
import styled from "styled-components";
import {Button} from "@mui/material";

interface AddButtonProps {
    onClick?: () => void;
    children?: JSX.Element | string
}

const Container = styled.div``

const AddButton: FC<AddButtonProps> = (props) => {
    return (
        <Container>
            <Button {...props}
                sx={{marginLeft: '10px',
                    width: '100%',
                    height: '100%',
                }}
            >
                {props.children}
            </Button>

        </Container>
    );
};

export default AddButton;