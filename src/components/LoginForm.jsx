import React, { useState } from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {Account, Client} from 'appwrite';
// now we will create a uuid for assigning the user ID's
import { v4 as uuidv4 } from 'uuid';
const client = new Client();


client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('65d1937adfa127da1a15');

const account = new Account(client);

const LoginForm = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState(false);

    const handleLoginSubmit = (event) => {
        event.preventDefault();

        const promise = account.createEmailSession(email, password);

        promise.then(function (response) {
            console.log(response); // Success
            navigate('/products');
        }, function (error) {
            // for failure we prompt the user to enter the correct credentials
            setError(true);
            // we will set the error to false after 3 seconds
            setTimeout(() => {
                setError(false);
            }, 2500);
        });

        // fetch('https://dummyjson.com/auth/login', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({
        //
        //         username: 'kminchelle',
        //         password: '0lelplR',
        //     })
        // })
        //     .then(res => res.json())
        //     .then(
        //         (result) => {
        //             console.log('Success:', result);
        //             navigate('/products');
        //         }
        //     );

        // axios.post("https://dummyjson.com/auth/login", { username, password })
        //     .then((res) => {
        //         console.log(res);
        //         navigate('/products')
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     });
    };
    const handleSignupSubmit = (event) => {
        event.preventDefault();
        let userId = uuidv4();
        const promise = account.create(userId, email, password);
        promise.then(function (response) {
            console.log(response); // Success
            prompt("please signin now to create the session")
        }, function (error) {
            setError(true);
            // we will set the error to false after 3 seconds
            setTimeout(() => {
                setError(false);
            }, 2500);
        });

        // console.log('Signup submitted with:', { username, password });
        // axios.post("https://dummyjson.com/users/add", { username, password })
        //     .then((res) => {
        //         navigate('/products')
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     });
    };

    return (
        <div>
            <div className={"mt-20 text-6xl font-bold"} style={{textAlign: 'center', padding: '10px'}}>
                Hello World
            </div>
            <div className={"mt-16"} style={{textAlign: 'center', padding: '50px', fontFamily: 'Arial, sans-serif'}}>
                <h2 className={"text-xl"} style={{
                    marginBottom: '20px',
                    color: '#000'
                }}>{isLogin ? 'Login to Your Account' : 'Create Your Account'}</h2>
                {/*{error && <p className={"text-red-600 mb-2"}>Invalid credentials</p>}*/}
                {isLogin && error ? <p className={"text-red-500 mb-2 text-lg"}>Invalid credentials. please Signup to
                    continue</p> : null}
                {!isLogin && error ? <p className={"text-red-500 mb-2 text-lg"}>Enter valid email and password must be 8
                    letters</p> : null}
                <form onSubmit={isLogin ? handleLoginSubmit : handleSignupSubmit}
                      style={{maxWidth: '400px', margin: '0 auto'}}>
                    <div style={{marginBottom: '15px'}}>
                        <input
                            type="text"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{width: '100%', padding: '15px', borderRadius: '5px', border: '1px solid #ccc'}}
                        />
                    </div>
                    <div style={{marginBottom: '15px'}}>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{width: '100%', padding: '15px', borderRadius: '5px', border: '1px solid #ccc'}}
                        />
                    </div>
                    <button type="submit" style={{
                        width: '100%',
                        padding: '15px 20px',
                        borderRadius: '5px',
                        border: 'none',
                        background: '#000',
                        color: '#fff',
                        cursor: 'pointer'
                    }}>
                        {isLogin ? 'Login' : 'Sign Up'}
                    </button>
                </form>
                <p style={{marginTop: '30px', color: '#555'}}>
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <span
                        onClick={() => setIsLogin(!isLogin)}
                        style={{color: '#0070f3', textDecoration: 'underline', cursor: 'pointer'}}
                    >
          {isLogin ? 'Sign Up' : 'Login'}
        </span>
                </p>
            </div>

            {/*    <div className={"mt-16"} style={{textAlign: 'center', padding: '20px', fontFamily: 'Arial, sans-serif'}}>*/}
            {/*        <h2 className={"text-xl"} style={{*/}
            {/*            marginBottom: '20px',*/}
            {/*            color: '#000'*/}
            {/*        }}>{isLogin ? 'Login to Your Account' : 'Create Your Account'}</h2>*/}
            {/*        /!*{error && <p className={"text-red-600 mb-2"}>Invalid credentials</p>}*!/*/}
            {/*        {isLogin && error ? <p className={"text-red-500 mb-2 text-lg"}>Invalid credentials. please Signup to*/}
            {/*            continue</p> : null}*/}
            {/*        {!isLogin && error ? <p className={"text-red-500 mb-2 text-lg"}>Enter valid email and password must be 8*/}
            {/*            letters</p> : null}*/}
            {/*        <form onSubmit={isLogin ? handleLoginSubmit : handleSignupSubmit}*/}
            {/*              style={{maxWidth: '300px', margin: '0 auto'}}>*/}
            {/*            <div style={{marginBottom: '15px'}}>*/}
            {/*                <input*/}
            {/*                    type="text"*/}
            {/*                    placeholder="Email"*/}
            {/*                    value={email}*/}
            {/*                    onChange={(e) => setEmail(e.target.value)}*/}
            {/*                    style={{width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc'}}*/}
            {/*                />*/}
            {/*            </div>*/}
            {/*            <div style={{marginBottom: '15px'}}>*/}
            {/*                <input*/}
            {/*                    type="password"*/}
            {/*                    placeholder="Password"*/}
            {/*                    value={password}*/}
            {/*                    onChange={(e) => setPassword(e.target.value)}*/}
            {/*                    style={{width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc'}}*/}
            {/*                />*/}
            {/*            </div>*/}
            {/*            <button type="submit" style={{*/}
            {/*                width: '100%',*/}
            {/*                padding: '10px 20px',*/}
            {/*                borderRadius: '5px',*/}
            {/*                border: 'none',*/}
            {/*                background: '#000',*/}
            {/*                color: '#fff',*/}
            {/*                cursor: 'pointer'*/}
            {/*            }}>*/}
            {/*                {isLogin ? 'Login' : 'Sign Up'}*/}
            {/*            </button>*/}
            {/*        </form>*/}
            {/*        <p style={{marginTop: '20px', color: '#555'}}>*/}
            {/*            {isLogin ? "Don't have an account? " : "Already have an account? "}*/}
            {/*            <span*/}
            {/*                onClick={() => setIsLogin(!isLogin)}*/}
            {/*                style={{color: '#0070f3', textDecoration: 'underline', cursor: 'pointer'}}*/}
            {/*            >*/}
            {/*  {isLogin ? 'Sign Up' : 'Login'}*/}
            {/*</span>*/}
            {/*        </p>*/}
            {/*    </div>*/}
        </div>
    );
};

export default LoginForm;

