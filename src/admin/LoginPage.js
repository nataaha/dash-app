/** @jsxImportSource @emotion/react */

import React from 'react';
import { css  } from '@emotion/react';
import { Button, TextField, Paper, Typography, Grid } from '@mui/material';

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
        handleClick,
        handleInput 
    } = props;

    return (
        <Paper 
        css={ content }
        >
        <Grid css={ root } container alignItems='center'>
            <Grid item>
            <div css={ header }>

                <Typography variant='h5' component='h3'>
                Login to ALKUIP Platform             
                </Typography>
            </div>
            
            </Grid>
            <Grid item container>
            <form  autoComplete='off' noValidate >
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
                <Grid item>
                <Button
                    type='submit'
                    variant='contained'
                    color='primary'
                    onClick={ handleClick}
                >
                    Sign In
                </Button>
                </Grid>
            </form>
            </Grid>
            <Grid item container>
            <div css={ footer }>
            Powered by ALKUIP Platform
            </div>                        
            </Grid>
        </Grid>
        </Paper>
    );
}