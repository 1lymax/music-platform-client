import React, {ChangeEvent, FC} from 'react';
import styled from "styled-components";

interface ProgressBarProps {
    left: number;
    right: number;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    width: number
}

const Container = styled.div<{width: number}>`
  display: flex;
  width: ${props => props.width}%;
`

const Label = styled.div`
  width: 30%;
`

const Input = styled.input`
  width: 70%;
`

const ProgressBar: FC<ProgressBarProps> = ({left, right, onChange, width}) => {
    return (
        <Container width={width}>
            <Input
                type="range"
                min={0}
                value={left}
                max={right}
                onChange={onChange}
            />
            <Label>{left} / {right}</Label>
        </Container>
    );
};

export default ProgressBar;