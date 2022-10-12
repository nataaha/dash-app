import { css  } from '@emotion/react';
import PropTypes from 'prop-types';
import {
   useConfig
} from '@alkuip/core';
import { Login3ColsPage } from './Login3ColsPage';
import { LoginPage } from './LoginPage';

const content= css`
  width: 100%;
  height: 100%;
  padding: 32px;
`;
const root = css`
 margin: 15% auto auto 30%;
`
const header =css({
  padding: '16px',
});
const footer =css({
  padding: '16px',
});
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