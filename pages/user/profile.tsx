import React from 'react';
import MainLayout from "../../layouts/MainLayout";
import styled from "styled-components";
import {cookies} from "next/headers";

const Container = styled.div``

const Profile = () => {
    console.log(cookies().get('access_token'))

    return (
        <MainLayout>
            <Container>

            </Container>
        </MainLayout>
    );
};

export default Profile;