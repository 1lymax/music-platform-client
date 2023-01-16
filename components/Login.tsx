import React, {Dispatch, FC, forwardRef, SetStateAction, useEffect, useImperativeHandle} from 'react';
import styled from "styled-components";
import {useInput} from "../hooks/useInput";
import MainLayout from "../layouts/MainLayout";
import {Button, TextField} from "@mui/material";
import {useErrorMessage} from "../hooks/useErrorMessage";
import {useSuccessMessage} from "../hooks/useSuccessMessage";
import {useGoogleOauthMutation, useLoginMutation} from "../store/api/auth.api";

interface LoginProps {
    setOpen?: Dispatch<SetStateAction<boolean>>
}

const Container = styled.div``

const Login: FC<LoginProps> = forwardRef((props, ref) => {

    const email = useInput('', 'Email')
    const password = useInput('', 'Password')

    const [login, { isSuccess: isSuccessLogin, isLoading: isLoadingLogin, error: errorLogin }] = useLoginMutation()
    const [google, { isSuccess: isSuccessG, isLoading: isLoadingG, isError: isErrorG }] = useGoogleOauthMutation()

    useEffect(() => {
        if (isSuccessLogin) {
            email.setValue('')
            password.setValue('')
            props.setOpen && props.setOpen(false)
        }
    }, [isSuccessLogin]);

    useImperativeHandle(ref, () => ({
            save: () => {
                login({
                    email: email.componentProps.value,
                    password: password.componentProps.value

                })
            }
        }
    ))

    useSuccessMessage('Login successfully!', isSuccessLogin)
    useErrorMessage('Login error. Bad credentials!', errorLogin)

    return (
        <MainLayout>
            <Container>
                <TextField
                    {...email.componentProps}
                />
                <TextField
                    {...password.componentProps}
                    type={'password'}
                />
                <Button
                    href={`${process.env.NEXT_PUBLIC_API_URL}auth/google?back=${process.env.NEXT_PUBLIC_SITE_URL}`}>
                    Google
                </Button>
            </Container>
        </MainLayout>
    );
});

export default Login;