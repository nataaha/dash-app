import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import { makeStyles } from '@mui/styles';
import {
  Grid,
  Button,
  IconButton,
  TextField,
  Link,
  FormHelperText,
  Checkbox,
  Typography
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {  useConfig } from '@alkuip/core';

const schema = {
  firstName: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 32
    }
  },
  surname: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 32
    }
  },
  email: {
    presence: { allowEmpty: false, message: 'is required' },
    email: true,
    length: {
      maximum: 64
    }
  },
  policy: {
    presence: { allowEmpty: false, message: 'is required' },
    inclusion: {
      within: [true],
      message: "^You must agree to terms and conditions"
    }
  }
};

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: '100%'
  },
  grid: {
    height: '100%'
  },
  login:{
    marginTop: '160px'
  },
  quoteContainer: {
    [theme.breakpoints.down('xl')]: {
      display: 'none'
    }
  },
  quote: {
    backgroundColor: theme.palette.neutral,
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: 'url(/images/auth.jpg)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  },
  quoteInner: {
    textAlign: 'center',
    flexBasis: '600px'
  },
  quoteText: {
    color: theme.palette.white,
    fontWeight: 300
  },
  name: {
    marginTop: theme.spacing(3),
    color: theme.palette.white
  },
  bio: {
    color: theme.palette.white
  },
  contentContainer: {},
  content: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  contentHeader: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: theme.spacing(5),
    paddingBototm: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  logoImage: {
    marginLeft: theme.spacing(4)
  },
  contentBody: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('xl')]: {
      justifyContent: 'center'
    }
  },
  form: {
    paddingLeft: 100,
    paddingRight: 100,
    paddingBottom: 125,
    flexBasis: 700,
    [theme.breakpoints.down('xl')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  },
  title: {
    marginTop: theme.spacing(3)
  },
  textField: {
    marginTop: theme.spacing(2)
  },
  policy: {
    marginTop: theme.spacing(1),
    display: 'flex',
    alignItems: 'center'
  },
  policyCheckbox: {
    marginLeft: '-14px'
  },
  signUpButton: {
    margin: theme.spacing(2, 0)
  }
}));

const SignUp = props => {
  const { title } = props;
  const { integration } = useConfig();
  const navigate = useNavigate();
  const [isSent,setIsSent] = useState(false);

  const classes = useStyles();
  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });

  useEffect(() => {
    const errors = validate(formState.values, schema);
    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);

  const handleChange = event => {
    event.persist();
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
  };

  const handleBack = () => {
    navigate.goBack();
  };

  const handleSignUp = async event => {
    event.preventDefault();
    const invite = await fetch(`${integration}/api/user/invite`,{
      method:'POST',
      mode:'no-cors',
      body: JSON.stringify(formState?.values)
    });
    setIsSent(true);
  };

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <div className={classes.root}>
      <Grid
        className={classes.grid}
        container
      >
        <Grid
          className={classes.content}
          item
          lg={7}
          xs={12}
        >
          <div className={classes.content}>
            <div className={classes.contentHeader}>
              <IconButton onClick={handleBack} size="large">
                <ArrowBackIcon />
              </IconButton>
            </div>
            <div className={classes.contentBody}> 
              {
                !isSent?
                  (
                  <form
                    className={classes.form}
                    onSubmit={handleSignUp}
                  >
                    <Typography
                      className={classes.title}
                      variant="h2"
                    >
                      Create new account
                    </Typography>
                    <Typography
                      color="textSecondary"
                      gutterBottom
                    >
                      Use your email to create new account
                    </Typography>
                    <TextField
                      className={classes.textField}
                      error={hasError('firstName')}
                      fullWidth
                      helperText={
                        hasError('firstName') ? formState.errors.firstName[0] : null
                      }
                      label="First name"
                      name="firstName"
                      onChange={handleChange}
                      type="text"
                      value={formState.values.firstName || ''}
                      variant="outlined"
                    />
                    <TextField
                      className={classes.textField}
                      error={hasError('surname')}
                      fullWidth
                      helperText={
                        hasError('surname') ? formState.errors.surname[0] : null
                      }
                      label="Surname"
                      name="surname"
                      onChange={handleChange}
                      type="text"
                      value={formState.values.surname || ''}
                      variant="outlined"
                    />
                    <TextField
                      className={classes.textField}
                      error={hasError('email')}
                      fullWidth
                      helperText={
                        hasError('email') ? formState.errors.email[0] : null
                      }
                      label="Email address"
                      name="email"
                      onChange={handleChange}
                      type="text"
                      value={formState.values.email || ''}
                      variant="outlined"
                    />
                    <div className={classes.policy}>
                      <Checkbox
                        checked={formState.values.policy || false}
                        className={classes.policyCheckbox}
                        color="primary"
                        name="policy"
                        onChange={handleChange}
                      />
                      <Typography
                        className={classes.policyText}
                        color="textSecondary"
                        variant="body1"
                      >
                        I have read the{' '}
                        <Link
                          color="primary"
                          component={RouterLink}
                          to="#"
                          underline="always"
                          variant="h6"
                        >
                          Terms and Conditions
                        </Link>
                      </Typography>
                    </div>
                    {hasError('policy') && (
                      <FormHelperText error>
                        {formState.errors.policy[0]}
                      </FormHelperText>
                    )}
                    <Button
                      className={classes.signUpButton}
                      color="primary"
                      disabled={!formState.isValid}
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                    >
                      Sign up now
                    </Button>
                  </form>
                  ):
                  (
                    <div>
                        <Typography
                          color="textSecondary"
                          variant="body1"
                        >
                        Email has been sent to your email. Please login to your email and verify your account.
                      </Typography>
                    </div>
                  )
                }
                  
              
            </div>
          </div>
        </Grid>
        <Grid 
          item 
          lg={3}
          xs={12}
          className = { classes.login }
        >
          <Typography
              color="textSecondary"
              variant="body1"
            >
            Have an account?{' '}
            <Link
              component={RouterLink}
              to="/login"
              variant="h6"
            >
              Sign in
            </Link>
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

SignUp.propTypes = {
  history: PropTypes.object
};

export default SignUp;
