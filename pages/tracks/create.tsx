import React, {useState} from 'react';
import MainLayout from "../../layouts/MainLayout";
import styled from "styled-components";
import StepWrapper from "../../components/StepWrapper";
import {Button, TextField} from "@mui/material";

const Step1 = styled.div`
  display: flex;
  flex-direction: column;
`

const Title = styled.h1``

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

const Create = () => {
    const [activeStep, setActiveStep] = useState<number>(0);
    const back = () => {
        setActiveStep(prevState => prevState - 1)
    }

    const next = () => {
        if (activeStep < 2) {
            setActiveStep(prevState => prevState + 1)
        }

    }

    return (
        <MainLayout>
            <StepWrapper activeStep={activeStep}>
                {activeStep === 0 &&
					<Step1>
						<TextField
							label={"Track title"}
							margin={"dense"}
						/>
                        {/*<TextField*/}
                        {/*	label={"Track title"}*/}
                        {/*	margin={"dense"}*/}
                        {/*/>*/}
						<TextField
							label={"Track lyrics"}
							margin={"dense"}
							multiline
							rows={3}
						/>
					</Step1>
                }
                {activeStep === 1 &&
					<Title>Step 2</Title>
                }
                {activeStep === 2 &&
					<Title>Step 3</Title>
                }
            </StepWrapper>
            <ButtonContainer>
                <Button disabled={activeStep === 0} onClick={back}>Back</Button>
                <Button onClick={next}>Next</Button>
            </ButtonContainer>

        </MainLayout>
    );
};

export default Create;