import React, {FC} from "react";
import {Icon} from "@mui/material";
import {Add} from "@mui/icons-material";

interface AddButtonProps {
    onClick?: () => void;
    icon?: any;
    children?: JSX.Element | string
}


const AddButtonIcon: FC<AddButtonProps> = (props) => {
    return (
            <Icon {...props}
                color={"primary"}
                //size={"large"}
                sx={{cursor: "pointer"}}
            >
                <Add/>
            </Icon>
    );
};

export default AddButtonIcon;