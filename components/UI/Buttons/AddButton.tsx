import React, {FC} from "react";
import {Button} from "@mui/material";

interface AddButtonProps {
    onClick?: () => void;
    icon?: any;
    children?: JSX.Element | string
}

const AddButton: FC<AddButtonProps> = (props) => {
    return (
            <Button {...props}
                startIcon={props?.icon}
                sx={{marginLeft: '10px'}}
            >
                {props.children}
            </Button>
    );
};

export default AddButton;