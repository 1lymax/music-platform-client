import {useSnackbar} from "notistack";
import {useEffect} from "react";

export const useErrorMessage = (message: string) => {
    const {enqueueSnackbar} = useSnackbar()
    useEffect(() => {
        enqueueSnackbar(message, {variant: "error"})
    }, [message])
}