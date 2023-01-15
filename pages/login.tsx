import React from 'react';
import styled from "styled-components";
import {useInput} from "../hooks/useInput";
import MainLayout from "../layouts/MainLayout";
import {Button, TextField} from "@mui/material";
import {useErrorMessage} from "../hooks/useErrorMessage";
import {useSuccessMessage} from "../hooks/useSuccessMessage";
import {useGoogleOauthMutation, useLoginMutation} from "../store/api/auth.api";

const Container = styled.div``

const Login = () => {

    const email = useInput('', 'Email')
    const password = useInput('', 'Password')

    const [login, { isSuccess: isSuccessLogin, isLoading: isLoadingLogin, error: errorLogin }] = useLoginMutation()
    const [google, { isSuccess: isSuccessG, isLoading: isLoadingG, isError: isErrorG }] = useGoogleOauthMutation()

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
                <Button type={'submit'}
                        onClick={() => login({
                            email: email.componentProps.value,
                            password: password.componentProps.value
                        })}>Login</Button>
                <Button type={'reset'}>Cancel</Button>

                <Button
                    href={`${process.env.NEXT_PUBLIC_API_URL}auth/google?back=${process.env.NEXT_PUBLIC_SITE_URL}`}>
                    Google
                </Button>
            </Container>
        </MainLayout>
    );
};

export default Login;