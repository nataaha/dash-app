import { useReducer } from 'react';
import { css  } from '@emotion/react';
import { Button, TextField, Paper, Typography, Grid, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
    useLogin,
    useNotify,
    useSafeSetState,
    useConfig
} from '@alkuip/core';
import { Footer } from '../layout/toolbars';

const content= css({
    width: '96%',
    height: '96%',
    padding: '2%',
    opacity: 0.9
});
const root = css({
    margin: '1% 0% 0% 30%',
    width: '60%'
});

const loginCss =css({  
    maxWidth: '100%',
    padding: '32px 64px',
    opacity: 0.9,
    backgroundColor: '#f3f5f7'
});
const header =css({
  padding: '16px',
});
const signUpCss= css({
    padding: '16px'
});
const loginField =css({
    marginBottom: '16px',
    backgroundColor: '#ffffff'
});
const loginSection =css({
    width:'60%'
});
const copyright =css({
  padding: '16px',
  marginLeft: '-35%'
});
export const LoginPage =(props)=>{
    const { 
        standalone, 
        baseUrl,
        dataStore,
        integration,
        defaultPage,
        signup=true,
        footer=true, 
    } = useConfig();
    //Set redirectTo to default config page
    const { redirectTo } = props;
    const [loading, setLoading] = useSafeSetState(false);
    const login = useLogin();
    const notify = useNotify();
    const [formInput, setFormInput] = useReducer(
        (state, newState) => ({ ...state, ...newState }),
        {
            url: baseUrl,
            username: '',
            password: '',
            dsUrl: dataStore,
            api: integration,
            standalone: standalone,
            defaultPage: defaultPage
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
                notify("Invalid username or password");
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
                    { standalone?'Login to Platform':''}           
                    </Typography>
                </div>
            </Grid>
            <Grid item container>
                <form  css={ loginCss } autoComplete='off' noValidate >
                    {
                        standalone?(
                            <>
                                <Grid item>
                                    <TextField
                                        label='UserName'
                                        id='username'
                                        required
                                        name='username'
                                        helperText='Enter username'
                                        onChange={ handleInput }
                                        css = { loginField }
                                    />
                                </Grid>
                                <Grid item>
                                    <TextField
                                        label='Password'
                                        id='password'
                                        name='password'
                                        type='password'
                                        required
                                        helperText='Enter password'
                                        onChange={ handleInput }
                                        css = { loginField }
                                    />
                                </Grid>
                            </>
                        ):null
                    }
                    <Grid item>
                        <div css = { signUpCss }>
                        <Button
                            type='submit'
                            variant='contained'
                            color='primary'
                            disabled = { loading }
                            onClick={ submit }
                            
                        >
                            {
                            loading ? (
                                <CircularProgress
                                    
                                    size={19}
                                    thickness={3}
                                />
                            ) : (
                                <Typography>
                                    {
                                        standalone?'Sign In':'Authorize'
                                    }
                                </Typography>
                                 
                            )}                            
                        </Button>
                        </div>
                       
                    </Grid>
                </form>
            </Grid>
            {
                signup?(
                    <Grid item>
                        <div css = { signUpCss }>
                            <Link to="/signup">Create Account</Link>
                        </div>
                    </Grid>
                ):null
            }
            {
                footer?(
                    <Grid item container>
                        <div  css ={ copyright }>
                            <Footer 
                                sx={{ top: 'auto', bottom: 0 }}
                            />
                        </div>
                        
                    </Grid>
                ):null
            }
        </Grid>
        </Paper>
    );
}

LoginPage.propTypes = {
    redirectTo: PropTypes.string,
}
LoginPage.defaultProps = {
}