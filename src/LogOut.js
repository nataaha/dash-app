import React, { useCallback} from 'react';
import { useLogout } from '@alkuip/core';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
export const LogoutButton = (props) => {
    const { className, redirectTo="/login", icon, ...rest } = props;
    const nagivate = useNavigate();
    const logout = useLogout();
    const handleClick = logout();
    nagivate('/login');
    return (<Button onClick={handleClick}>Logout</Button>);
}