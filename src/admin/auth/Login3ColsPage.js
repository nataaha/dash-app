import { useReducer } from 'react';
import { css  } from '@emotion/react';
import { 
    Button, 
    TextField, 
    Paper, 
    Typography, 
    Grid,
    CardContent, 
    CircularProgress, 
    useTheme, 
    Box,
    List,
    ListItem,
    ListItemText 
} from '@mui/material';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
    useLogin,
    useNotify,
    useSafeSetState,
    useConfig
} from '@alkuip/core';

const content= css({
  width: '100%',
  height: '100%',
  padding: '32px'
});
const banner= css({
    maxWidth: '100%',
    maxHeight: '100%',
    display: 'block',
    opacity: 1.0,
    objectFit: 'contain'
  });
const root = css`
 padding: 32px;
 margin-left: 8%;
`
const loginCss =css({  
    maxWidth: '100%',
    padding: '32px 64px',
    opacity: 0.9,
    backgroundColor: '#f3f5f7'
});
const loginHeader =css({
  padding: '16px 32px 32px 32px',
});
const loginField =css({
    marginBottom: '16px',
    backgroundColor: '#ffffff'
});
const topGrid = css({
    paddingRight: '32px'
})
const signUpCss= css({
    padding: '32px 0px 32px 32px'
})

const footer =css({
  padding: '16px',
});
const copyright = css({
    marginLeft: '30%'
})
export const Login3ColsPage =(props)=>{
    const { 
        standalone, 
        baseUrl,
        dataStore,
        integration,
        defaultPage, 
        loginFooter, 
        loginTitle 
    } = useConfig();
    //Set redirectTo to default config page
    const { redirectTo } = props;
    const [loading, setLoading] = useSafeSetState(false);
    const theme = useTheme();
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
            elevation  = { 0 }
        >
            <Grid 
                container 
                direction={ "column" } 
                alignItems={'stretch'} 
                alignContent={ 'flex-start'}
                css ={ topGrid }
                spacing={ 2 }
            >
                <Grid item>
                    <Box>
                        <img alt="Logo" css={banner } src="static/images/logos/header2.png"/>
                    </Box>                    
                </Grid>
                <Grid 
                    item 
                    container 
                    direction="row"
                    alignItems={'stretch'} 
                    alignContent={ 'flex-start'}
                    spacing ={ 4 }
                >
                    <Grid item xs>
                        <Box>
                            <Typography variant="h6" >
                                Uganda AIDS Commission under its mandate of coordinating the Multi-sectoral HIV response in Uganda is accrediting HIV and AIDS Service Organisations.
                            </Typography>
                            <Typography variant="h6" >The main objective of the exercise is to identify:
                            </Typography>
                            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                                <ListItem alignItems="flex-start">
                                    <ListItemText
                                    primary="Who"
                                    secondary={
                                        <>
                                            <Typography
                                                sx={{ display: 'inline' }}
                                                component="span"
                                                variant="body2"
                                                color="text.primary"
                                            >
                                                Which organizations (Government, private, faith based, community based, NGOs etc.) are working in each district?
                                            </Typography>
                                        </>
                                    }
                                    />
                                </ListItem>
                                <ListItem alignItems="flex-start">
                                    <ListItemText
                                    primary="What"
                                    secondary={
                                        <>
                                            <Typography
                                                sx={{ display: 'inline' }}
                                                component="span"
                                                variant="body2"
                                                color="text.primary"
                                            >
                                                What HIV and AIDS activities are being implemented or what services are being offered in the different parts of the country?
                                            </Typography>
                                        </>
                                    }
                                    />
                                </ListItem>
                                <ListItem alignItems="flex-start">
                                    <ListItemText
                                    primary="Where"
                                    secondary={
                                        <>
                                            <Typography
                                                sx={{ display: 'inline' }}
                                                component="span"
                                                variant="body2"
                                                color="text.primary"
                                            >
                                                What level (i.e. national, district or sub-county) are the organizations operating?
                                            </Typography>
                                        </>
                                    }
                                    />
                                </ListItem>
                            </List>
                            This information will be entered in an online system as part of the accreditation process necessary for any NGO to provide HIV and AIDS Services in the Country. Any organization that meets the set requirements will be issued with an Accreditation certificate which is a legal requirement to provide HIV and AIDS Services in the Country.<br></br><br></br>                           
                            For help filling the form please click <a href="/">here.</a>
                        </Box>
                    </Grid>
                    <Grid 
                        item 
                        xs={12} 
                        md={6} 
                        css={ root } 
                        container 
                        alignItems='center'
                    >
                        <Grid item>
                            <div css={ loginHeader }>
                                <Typography variant='h5' component='h3'>
                                { standalone?`${ loginTitle?? '' }`:''}           
                                </Typography>
                            </div>
                        </Grid>
                        <Grid item container spacing= { 2 }>
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
                                                    placeholder ='Enter username'
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
                                                    palceholder='Enter password'
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
                                            standalone?'Sign In':'Proceed' 
                                        )}
                                        
                                    </Button>
                                    </div>
                                
                                </Grid>
                            </form>
                        </Grid>
                        <Grid 
                            item 
                            container
                            spacing ={ 1 }
                        >
                            <Grid item>
                                <div css = { signUpCss }>
                                    <Link to="/signup">Create Account</Link>
                                </div>
                            </Grid> 
                            <Grid item>
                                <div css = { signUpCss }>
                                    <a href={`${ baseUrl }/dhis-web-commons/security/recovery.action`}>Forgot Password</a>
                                </div>
                            </Grid>
                        </Grid>
                        <Grid item container>
                            <div css={ footer }>
                                { loginFooter?? null }
                            </div>                        
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <Box css ={ copyright }>
                        Copyrights &copy; 2022 &nbsp;&nbsp; <a href="nataaha.com">Powered by ALKIP Platform</a>
                    </Box>
                </Grid>
            </Grid>
        
        </Paper>
    );
}

Login3ColsPage.propTypes = {
    redirectTo: PropTypes.string,
}