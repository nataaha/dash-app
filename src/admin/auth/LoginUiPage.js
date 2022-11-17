import { css  } from '@emotion/react';
import PropTypes from 'prop-types';
import {
   useConfig
} from '@alkuip/core';
import { Login3ColsPage } from './Login3ColsPage';
import { LoginPage } from './LoginPage';

export const LoginUiPage =(props)=>{
    const { 
        landingPage
    } = useConfig();
    if(landingPage === 'THREE_COLUMNS'){
        return(
            <Login3ColsPage {...props }/>
        );
    }
    else{
        return(
            <LoginPage {...props }/>
        );
    }
   
}