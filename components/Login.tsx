import styled from "styled-components";
import {Button, Chip, Divider, TextField} from "@mui/material";
import React, {Dispatch, FC, forwardRef, SetStateAction, useEffect, useImperativeHandle} from 'react';
import {useInput} from "../hooks/useInput";
import {useErrorMessage} from "../hooks/useErrorMessage";
import {useSuccessMessage} from "../hooks/useSuccessMessage";
import {useGoogleOauthMutation, useLoginMutation} from "../store/api/auth.api";

interface LoginProps {
    setOpen?: Dispatch<SetStateAction<boolean>>
}

const Container = styled.div`
  width: 400px;
  display: flex;

  flex-direction: column;
`

const InputContainer = styled.div`
  width: 100%;
  margin: 10px;
`

const SocialContainer = styled.div`
  width: 100%;
  margin-top: 20px;
`

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
            <Container>
                <TextField
                    margin={"normal"}
                    {...email.componentProps}
                />

                <TextField
                    margin={"normal"}
                    {...password.componentProps}
                    type={'password'}
                />
                <Divider sx={{marginTop: '50px'}}>
                    <Chip label="or use social networks" />
                </Divider>
                <SocialContainer>
                    <Button
                        href={`${process.env.NEXT_PUBLIC_API_URL}auth/google?back=${process.env.NEXT_PUBLIC_SITE_URL}`}>
                        Google
                    </Button>
                </SocialContainer>

            </Container>
    );
});

export default Login;