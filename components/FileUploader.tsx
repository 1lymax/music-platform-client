import {Box} from "@mui/material";
import React, {FC, useRef} from 'react';

interface FileUploaderProps {
    dragEnter: boolean;
    dragEnterHandler: (e: React.DragEvent) => void;
    dragLeaveHandler: (e: React.DragEvent) => void;
    setFile: (file: File) => void;
    accept: string
    children: React.ReactNode
}

const FileUploader: FC<FileUploaderProps> = ({
                                                 dragEnter,
                                                 dragEnterHandler,
                                                 dragLeaveHandler,
                                                 setFile,
                                                 children,
                                                 accept
                                             }) => {
    const ref = useRef<HTMLInputElement>(null)

    const uploadButtonHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        uploadFiles(e.target.files)
    }

    const dropHandler = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        uploadFiles(e.dataTransfer.files)
        dragLeaveHandler(e)
    }

    const uploadFiles = (files: FileList | null) => {
        if (files) setFile(files[0])
    }

    return (
        <Box sx={{
            width: '100%',
            height: '80%',
            minHeight: '200px',
            margin: '20px 0',
            padding: '20px',
            border: 'dashed 4px',
            borderRadius: '10px',
            borderColor: 'primary.main',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column'
        }}
             onDragEnter={(e) => dragEnterHandler(e)}
             onDragLeave={(e) => dragLeaveHandler(e)}
             onDragOver={(e) => dragEnterHandler(e)}
             onDrop={(e) => dropHandler(e)}
             onClick={() => ref.current?.click()}
        >
            <input ref={ref} hidden type="file" accept={accept} onChange={uploadButtonHandler}/>
            {children}
        </Box>
    );
};

export default FileUploader;