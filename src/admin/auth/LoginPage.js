import React,{ useReducer} from 'react';
import { css  } from '@emotion/react';
import { Button, TextField, Paper, Typography, Grid,CardContent, CircularProgress, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
    useLogin,
    useNotify,
    useSafeSetState,
} from '@alkuip/core';

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
export const LoginPage =(props)=>{
    const { 
        //handleClick,
        //handleInput,
        standaloneApp
    } = props;
    const { redirectTo, className } = props;
    const [loading, setLoading] = useSafeSetState(false);
    const theme = useTheme();
    const login = useLogin();
    const notify = useNotify();
    const [formInput, setFormInput] = useReducer(
        (state, newState) => ({ ...state, ...newState }),
        {
          j_username: '',
          j_password: ''
        }
    );
    const handleInput = evt => {
        const name = evt.target.name;
        const newValue = evt.target.value;
        setFormInput({ [name]: newValue });
    };
    const submit = (_event) => {
        _event.preventDefault();
        setLoading(true);
        login(formInput, redirectTo)
            .then(() => {
                setLoading(false);
            })
            .catch(error => {
                setLoading(false);
                notify(
                    typeof error === 'string'
                        ? error
                        : typeof error === 'undefined' || !error.message
                        ? 'Failed login'
                        : error.message,
                    {
                        type: 'warning',
                        messageArgs: {
                            _:
                                typeof error === 'string'
                                    ? error
                                    : error && error.message
                                    ? error.message
                                    : undefined,
                        },
                    }
                );
            });
    };
    return (
        <Paper 
        css={ content }
        >
        <Grid css={ root } container alignItems='center'>
            <Grid item>
                <div css={ header }>
                    <Typography variant='h5' component='h3'>
                    { standaloneApp?'Login to ALKIP Platform':''}           
                    </Typography>
                </div>
            </Grid>
            <Grid item container>
                <form  autoComplete='off' noValidate >
                    {
                        standaloneApp?(
                            <>
                                <Grid item>
                                    <TextField
                                        label='UserName'
                                        id='username'
                                        name='j_username'
                                        helperText='Enter username'
                                        onChange={ handleInput }
                                    />
                                </Grid>
                                <Grid item>
                                    <TextField
                                        label='Password'
                                        id='password'
                                        name='j_password'
                                        type='password'
                                        helperText='Enter password'
                                        onChange={ handleInput }
                                    />
                                </Grid>
                            </>
                        ):null
                    }
                    <Grid item>
                        <Button
                            type='submit'
                            variant='contained'
                            color='primary'
                            onClick={ submit }
                        >
                            { standaloneApp?'Sign In':'Proceed' }
                        </Button>
                    </Grid>
                </form>
            </Grid>
            <Grid item>
                <div>
                    <Link to="/signup">Create Account</Link>
                </div>
            </Grid>
            <Grid item container>
                <div css={ footer }>
                Powered by ALKIP Platform
                </div>                        
            </Grid>
        </Grid>
        </Paper>
    );
}