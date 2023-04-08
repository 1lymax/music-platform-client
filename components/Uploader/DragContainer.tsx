import styled from "styled-components";
import React, {ReactNode, useRef, useState} from "react";

interface StyledContainerProps {
    // true when starting to drag a product card
    isDragActive: boolean;
    isVisible: boolean;
    styles?: {
        width?: string,
        height?: string
        padding?: string,
        margin?: string
    };
}

const Container = styled.div<StyledContainerProps>`
  cursor: pointer;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  width: ${props => props.styles?.width ? props.styles.width : "100%"};
  height: ${props => props.styles?.height ? props.styles.height : ""};
  padding: ${props => props.styles?.padding ? props.styles.padding : "40px"};
  margin: ${props => props.styles?.margin ? props.styles.margin : "10px 0"};
  border: ${props => props.isDragActive ? "3px dashed dodgerblue" : "3px dashed lightgray"};
  display: ${props => props.isVisible ? "flex" : "none"};
`;

interface Props {
    setFiles: (files: FileList | null) => void;
    accept: "audio" | "image";
    isVisible?: boolean;
    children?: ReactNode;
    styles?: StyledContainerProps["styles"];
}

const DragContainer =(props: Props) => {
    const { accept, setFiles, isVisible = true, styles } = props;
    const ref = useRef<HTMLInputElement>(null);
    const [isDragActive, setIsDragActive] = useState(false);

    const uploadButtonHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files)
            setFiles(e.target.files);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        setIsDragActive(true);
        e.preventDefault();
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        setIsDragActive(false);
        e.preventDefault();
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setFiles(e.dataTransfer.files);
        setIsDragActive(false);
    }

    return (
        <Container onDrop={handleDrop}
                   styles={styles}
                   isVisible={isVisible}
                   isDragActive={isDragActive}
                   onDragOver={handleDragOver}
                   onDragLeave={handleDragLeave}
                   onClick={() => ref.current?.click()}
                   {...props}
        >
            <input ref={ref}
                   accept={accept}
                   hidden type="file"
                   onChange={uploadButtonHandler}/>
            {props.children}
        </Container>
    );
}

export default DragContainer;