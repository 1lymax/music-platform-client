import {useSnackbar} from "notistack";
import {useEffect} from "react";

export const useSuccessMessage = (message: string) => {
    const {enqueueSnackbar} = useSnackbar()
    useEffect(() => {
        enqueueSnackbar(message, {variant: "success"})
    }, [message])
}