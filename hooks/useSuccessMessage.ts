import {useSnackbar} from "notistack";
import {useEffect} from "react";

export const useSuccessMessage = (message: string, isSuccess: boolean) => {
    const {enqueueSnackbar} = useSnackbar()
    useEffect(() => {
        if (isSuccess)
            enqueueSnackbar(message, {variant: "success"})
    }, [isSuccess])
}