import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import {Children, FC, useRef} from 'react';
import {useTheme} from '@mui/material/styles';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import useMediaQuery from '@mui/material/useMediaQuery';
import {Divider} from "@mui/material";



interface AddDialogProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    title: string;
    buttonTitle?: string;
    children: React.ReactNode
}


const AppDialog: FC<AddDialogProps> = ({open, setOpen, title, buttonTitle='Save', children}) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const childRef = useRef<any>()


    const clone = Children.only(children)
    const child = React.cloneElement(clone as React.ReactElement<any>, {ref: childRef})

    const handleSubmit = () => {
        // @ts-ignore
        childRef.current.save()
        //setOpen(false);

    }

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Dialog
                sx={{'& .MuiDialog-paper': {height: 550}}}
                fullScreen={fullScreen}
                open={open}
                scroll={"paper"}
                onClose={handleClose}
            >
                <DialogTitle>
                    {title}
                </DialogTitle>
                <Divider/>
                <DialogContent>
                    {child}
                </DialogContent>
                <Divider/>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button onClick={() => handleSubmit()} autoFocus>
                        {buttonTitle}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AppDialog