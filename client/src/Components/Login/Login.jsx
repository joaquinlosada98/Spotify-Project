import React from 'react';
// import env from 'react-dotenv';
import './login.css';

const AUTH_URL =
  `https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&response_type=code&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&scope=streaming%20playlist-modify-private%20playlist-modify-public%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`


const Login = () => {
    return (
        <div className="login-section" data-test="LoginComponent">
            <div className="login-text">
                <h2>Hi!</h2>
                <h4>Welcome to my Spotify Project</h4>
            </div>
            <a className="btn-login" href={AUTH_URL}>
                Login With Spotify
            </a>
        </div>
    );
}
 
export default Login;