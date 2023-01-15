import React, {FC, useRef, useState} from 'react';
import styled from "styled-components";

interface FileUploaderProps {
    setFile: (file: File) => void;
    accept: string
    children: React.ReactNode
}

const Container = styled.div<{ drag: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: ${props => props.drag ? '95%' : '70px'};
  margin: 20px 0;
  padding: 20px;
  border: dashed 4px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  flex-direction: column;
`

const DragContainer = styled.div`
  position: relative;
  top: 0;
  left: 0;
  z-index: 3;
  width: 50%;
  height: 100%;
`

const ChildrenContainer = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`

const Title = styled.div`
  height: 70px;
`

const FileUploader: FC<FileUploaderProps> = ({setFile, children, accept}) => {
    const ref = useRef<HTMLInputElement>(null)
    const [dragEnter, setDragEnter] = useState(false);

    const uploadButtonHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files)
            setFile(e.target.files[0])
    }

    const dropHandler = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        setFile(e.dataTransfer.files[0])
        setDragEnter(false)
    }

    return (
        <DragContainer onDragEnter={() => setDragEnter(true)}
                       onDragOver={(e) => {
                           e.stopPropagation()
                           e.preventDefault()
                           setDragEnter(true)
                       }}
                       onDrop={(e) => dropHandler(e)}>
            <Container drag={dragEnter}
                       onDragLeave={() => setDragEnter(false)}
                       onClick={() => ref.current?.click()}>
                <input ref={ref} hidden type="file" accept={accept} onChange={uploadButtonHandler}/>
                <Title>Drag&apos;n&apos;Drop here or browse...</Title>

            </Container>
            <ChildrenContainer>
                {children}
            </ChildrenContainer>
        </DragContainer>
    );
};

export default FileUploader;