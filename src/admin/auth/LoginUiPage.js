import { useReducer } from 'react';
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
export const LoginUiPage =(props)=>{
    const { 
        handleClick,
        handleInput,
        standaloneApp
    } = props;
    const [loading, setLoading] = useSafeSetState(false);
    const theme = useTheme(); 
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
                            onClick={ handleClick }
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