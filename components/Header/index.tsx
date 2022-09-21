import React, { useState, MouseEvent } from 'react';

import { HeaderProps } from '../../types/component/Header';

import AccountCircle from '@mui/icons-material/AccountCircle';

import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';

import { useUser } from '@auth0/nextjs-auth0';

const Header: React.FC<HeaderProps> = ({ text = "", ...rest }) => {
    const { user } = useUser();
    const [anchorEl, setAnchorEl] = useState<Element | null >(null);

    const handleMenuClick = (event: MouseEvent) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
        setAnchorEl(null);
    };
    
    const didClickProfile = (e: React.ChangeEvent<EventTarget>) => {
        e.preventDefault();
        window.location.href = "/profile";
    };

    const handleLogout = (e: React.ChangeEvent<EventTarget>) => {
        e.preventDefault();
        window.location.href = "/api/auth/logout";
    }

    const handleLogin =(e: React.ChangeEvent<EventTarget>) => {
        e.preventDefault();
        window.location.href = "/api/auth/login";
    }
    
    return(
        <AppBar position="sticky" {...rest}>
            <Toolbar>
                <Button sx={{ flexGrow: 1, color: 'inherit' }} size="large" href="/">
                    {text}
                </Button>
                {
                    user ?
                        <>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenuClick}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={didClickProfile}>Profile</MenuItem>
                                <MenuItem onClick={handleLogout}>Log Out...</MenuItem>
                            </Menu>
                        </>
                        :
                        <Button color="inherit" onClick={handleLogin}>Login</Button>
                }
            </Toolbar>
        </AppBar>
    );
};

export default Header;