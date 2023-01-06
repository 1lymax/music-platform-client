import {useSnackbar} from "notistack";
import {FetchBaseQueryError} from "@reduxjs/toolkit/query";
import {SerializedError} from "@reduxjs/toolkit";
import {useEffect} from "react";


export const useErrorMessage = (message: string, error: FetchBaseQueryError | SerializedError | undefined) => {
    const {enqueueSnackbar} = useSnackbar()
    useEffect(() => {
        if (error) {
            enqueueSnackbar(message, {variant: "error"})
        }
    }, [error])

}