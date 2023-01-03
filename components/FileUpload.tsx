import React, {FC, useRef} from 'react';

interface FileUploadProps {
    setFile: Function,
    accept: string,
    children: React.ReactNode
}


const FileUpload: FC<FileUploadProps> = ({setFile, accept, children}) => {
    const ref = useRef<HTMLInputElement>(null);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFile(e.target.files?.length && e.target.files[0])
    }
    return (
        <div onClick={() => ref.current?.click()}>
            <input
                type="file"
                accept={accept}
                hidden
                ref={ref}
                onChange={(e) => onChange(e)}
            />
            {children}
        </div>
    );
};

export default FileUpload;