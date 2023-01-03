import React, {ChangeEvent, FC} from 'react';
import styled from "styled-components";
import convertHMS from '../utils/convertHMS'

interface ProgressBarProps {
    left: number;
    right: number;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    width: number;
    timeConvert?: boolean
}

const Container = styled.div<{width: number}>`
  display: flex;
  width: ${props => props.width}%;
`

const Label = styled.div`
  margin-left: 10px;
  width: 35%;
`

const Input = styled.input`
  width: 65%;
`

const ProgressBar: FC<ProgressBarProps> = ({left, right, onChange, width, timeConvert}) => {
    return (
        <Container width={width}>
            <Input
                type="range"
                min={0}
                value={left}
                max={right}
                onChange={onChange}
            />
            <Label>{timeConvert ? convertHMS(left) : left} / {timeConvert ? convertHMS(right) : right}</Label>
        </Container>
    );
};

export default ProgressBar;