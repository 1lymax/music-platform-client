import React, {FC} from 'react';
import styled from "styled-components";
import {Step, StepLabel, Stepper} from "@mui/material";

interface StepWrapperProps {
    activeStep: number;
    children: React.ReactNode
}

const Container = styled.div`
`

const CardBlock = styled.div`
  display: flex;
  justify-content: center;
  margin: 70px 0;
  height: 270px;
`

const Card = styled.div`
  border-radius: 10px;
  border: 1px solid lightgray;
  margin: 20px;
  padding: 20px;
  width: 600px;
  box-shadow: 0 2px 3px lightgray;
`

const StepWrapper: FC<StepWrapperProps> = ({activeStep, children}) => {
    const steps = ['Track information', 'Upload picture', 'Upload audio track']

    return (
        <Container>
            <Stepper activeStep={activeStep}>
                {steps.map((step, index) =>
                    <Step
                        key={index}
                        completed={activeStep > index}
                    >
                        <StepLabel >{step}</StepLabel>
                    </Step>
                )}

            </Stepper>
            <CardBlock>
                <Card>
                    {children}
                </Card>
            </CardBlock>
        </Container>
    );
};

export default StepWrapper;