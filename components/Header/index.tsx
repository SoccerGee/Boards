import React, { useState, FunctionComponent } from 'react';

import { HeaderProps } from '../../types/component/Header';

import AccountCircle from '@mui/icons-material/AccountCircle';

import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';


const Header: FunctionComponent<HeaderProps> = ({ text = "", ...rest }) => {
    const [anchorEl, setAnchorEl] = useState<EventTarget | null>(null);

    const handleMenu = (event: React.ChangeEvent<EventTarget>) => {
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
                <Button color="inherit" onClick={handleLogin}>Login</Button>
            </Toolbar>
        </AppBar>
    );
};

export default Header;