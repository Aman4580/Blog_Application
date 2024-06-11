import React, { useState, useContext } from 'react';
import { TextField, Box, Button, Typography, styled } from '@mui/material';
import { signUp, login } from '../../../src/service/operations/authAPI';
import { DataContext } from '../../context/DataProvider';
import { useNavigate } from 'react-router-dom';

const Component = styled(Box)`
    width: 400px;
    margin: auto;
    box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.6);
`;

const Image = styled('img')({
    width: 110,
    display: 'flex',
    margin: 'auto',
    padding: '50px 0 0'
});

const Wrapper = styled(Box)`
    padding: 25px 35px;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    & > div, & > button, & > p {
        margin-top: 20px;
    }
`;

const LoginButton = styled(Button)`
    text-transform: none;
    background: #FB641B;
    color: #fff;
    height: 48px;
    border-radius: 2px;
`;

const SignupButton = styled(Button)`
    text-transform: none;
    background: #fff;
    color: #2874f0;
    height: 48px;
    border-radius: 2px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
`;

const Text = styled(Typography)`
    color: #878787;
    font-size: 12px;
`;

const Login = ({setUserAuthenticate}) => {
    const signupInitialValues = {
        name: '',
        username: '',
        password: ''
    };

    const loginInitialValues = {
        username: '',
        password: ''
    };

    const { setAccount } = useContext(DataContext);
    const [account, toggleAccount] = useState('login');
    const [signup, setSignup] = useState(signupInitialValues);
    const [loginValues, setLogin] = useState(loginInitialValues);
    const navigate = useNavigate();

    const imageURL = 'https://images.freeimages.com/images/premium/previews/4520/45205588-blog-word.jpg';

    const toggleSignup = () => {
        account === 'signup' ? toggleAccount('login') : toggleAccount('signup');
    };

    const onInputChange = (e, setState) => {
        setState(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
    };

    const signupUser = async (e) => {
        e.preventDefault();
        const { name, username, password } = signup;
        try {
            const response = await signUp(name, username, password);
            console.log("Signup successful", response);
        } catch (error) {
            console.error("Signup failed", error);
        }
    };

    const loginUser = async (e) => {
        e.preventDefault();
        const { username, password } = loginValues;
        try {
            const response = await login(username, password);
            setAccount({ name: response.data.name, username: response.data.username });
            console.log("Login successful", response);
            setUserAuthenticate(true);
            navigate('/');
        } catch (error) {
            console.error("Login failed", error);
        }
    };

    return (
        <Component>
            <Box>
                <Image src={imageURL} alt="blog" />
                {
                    account === 'login' ?
                        <Wrapper>
                            <TextField variant="standard" name='username' label='Enter Username' onChange={(e) => onInputChange(e, setLogin)} />
                            <TextField variant="standard" name='password' label='Enter Password' onChange={(e) => onInputChange(e, setLogin)} />

                            <LoginButton onClick={loginUser}>Login</LoginButton>
                            <Text style={{ textAlign: 'center' }}>OR</Text>
                            <SignupButton onClick={toggleSignup} style={{ marginBottom: 50 }}>Create an account</SignupButton>
                        </Wrapper> :
                        <Wrapper>
                            <TextField variant="standard" onChange={(e) => onInputChange(e, setSignup)} name='name' label='Enter Name' />
                            <TextField variant="standard" onChange={(e) => onInputChange(e, setSignup)} name='username' label='Enter Username' />
                            <TextField variant="standard" onChange={(e) => onInputChange(e, setSignup)} name='password' label='Enter Password' />

                            <SignupButton onClick={signupUser}>Signup</SignupButton>
                            <Text style={{ textAlign: 'center' }}>OR</Text>
                            <LoginButton onClick={toggleSignup}>Already have an account</LoginButton>
                        </Wrapper>
                }
            </Box>
        </Component>
    );
};

export default Login;
