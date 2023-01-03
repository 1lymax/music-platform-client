import React, {useState} from 'react';
import MainLayout from "../../layouts/MainLayout";
import styled from "styled-components";
import StepWrapper from "../../components/StepWrapper";
import {Button, TextField} from "@mui/material";
import FileUpload from "../../components/FileUpload";

const Step1 = styled.div`
  display: flex;
  flex-direction: column;
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

const Create = () => {
    const [activeStep, setActiveStep] = useState<number>(0);
    const [picture, setPicture] = useState(null);
    const [audio, setAudio] = useState(null);

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
					<FileUpload setFile={setPicture} accept="image/*">
                        Upload picture
                    </FileUpload>
                }
                {activeStep === 2 &&
					<FileUpload setFile={setAudio} accept="audio/*">
						Upload audio
					</FileUpload>
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