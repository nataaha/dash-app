import React from 'react';
import { useLogout } from '@alkuip/core';
import { Button } from '@mui/material';
export const LogoutButton = () => {
    const logout = useLogout();
    const handleClick = () => logout();
    return (<Button onClick={handleClick}>Logout</Button>);
}