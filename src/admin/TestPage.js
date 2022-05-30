import { useAuthState } from '@alkuip/core';
import { LoginPage } from './auth/LoginPage';
import { SignUp } from '../views';
import { CircularProgress } from '@mui/material';

export const TestPage = (props) => {
    const { loading, authenticated } = useAuthState();
    console.log("loads:",loading,"xxx:",authenticated);
    if (loading) {
        
        return (<CircularProgress/>);
    }
    if (authenticated) {
        return(<SignUp {...props}/>);
    }
    console.log("Here")
    return (<LoginPage {...props} />);
};