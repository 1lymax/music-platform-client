// @flow
import * as React from "react";
import styled from "styled-components";
import {Link, Typography} from "@mui/material";
import {ActionCreatorWithPayload} from "@reduxjs/toolkit";

const Container = styled.div`
  margin: 0 10px
`;

interface Props {
    valuesToShow: string | undefined | null;
    callBackSetDialog: ActionCreatorWithPayload<any>;
}

export const SelectShowAddNewInfo = ({ valuesToShow, callBackSetDialog }: Props) => {

    return (
        <Container>
            {valuesToShow &&
				<Typography variant={"body2"} sx={{ textDecorationStyle: "dashed" }}>
						<span>Add <Link component={"button"}
										variant={"body2"}
										onClick={() => callBackSetDialog(true)}
										sx={{ textDecorationStyle: "dashed" }}
						>{valuesToShow}

						</Link></span>

				</Typography>
            }
        </Container>
    );
};
// <WarningCell>

// </WarningCell>
// }