import React, {useState} from 'react';
import styled from "styled-components";
import {AccountCircle} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import {Avatar, Box, Menu, MenuItem, Tooltip} from '@mui/material';
import Login from "../Login";
import AppDialog from "./AppDialog";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {initialState} from "../../store/slices/userSlice";
import Cookies from "js-cookie";
import {useRouter} from "next/router";
import {useIsAuth} from "../../hooks/useIsAuth";
import {useUserActions} from "../../hooks/dispatch";


const Container = styled.div``

const Item = styled.div`
  a {
    text-decoration: none;
    color: gray;
  }

`

const AccountMenu = () => {
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const [login, setLogin] = useState(false);
    const router = useRouter()
    const {setUser} = useUserActions()
    const isAuth = useIsAuth()

    const { user } = useTypedSelector(state => state.user)

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        if (isAuth) {
            setAnchorElUser(event.currentTarget);
        } else {
            setLogin(true)
        }
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleMenuClick = (link: string) => {
        if (link === '/logout') {
            handleLogout()
        } else {
            router.push(link)
        }
        handleCloseUserMenu()
    }


    const handleLogout = () => {
        Cookies.remove('access_token')
        setUser(initialState)

    }

    const settings = [
        //{ title: 'Profile', link: '/profile' },
        //{ title: 'Account', link: '/account' },
        //{ title: 'Dashboard', link: '/dashboard' },
        { title: 'Logout', link: '/logout' }
    ];

    return (
        <Container>
            <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        {user._id
                            ? <Avatar alt={user.name}
                                      src={user.picture ? `${process.env.NEXT_PUBLIC_API_URL}${user.picture}` : ''}/>
                            : <AccountCircle fontSize={"large"} sx={{ color: "white" }}/>
                        }

                    </IconButton>
                </Tooltip>
                <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                >
                    {settings.map((setting) => (
                        <MenuItem key={setting.title} onClick={() => handleMenuClick(setting.link)}>
                            <Item>{setting.title}</Item>
                        </MenuItem>
                    ))}
                </Menu>
            </Box>
            <AppDialog open={login} setOpen={setLogin} title={'Login'} buttonTitle={'Login'}>
                <Login setOpen={setLogin}/>
            </AppDialog>
        </Container>
    );
};

export default AccountMenu;