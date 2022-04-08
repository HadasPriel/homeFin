import { useState } from "react";
import { useDispatch } from 'react-redux'

import actions from '../store/actions';


export const LoginSignup = () => {

    const [signupCred, setSignupCred] = useState({ username: '', password: '', fullname: '' });
    const [loginCred, setLoginCred] = useState({ username: '', password: '' });
    const [isLoginShow, setIsLoginShow] = useState(true);
    const dispatch = useDispatch();

    const doSignup = (ev) => {
        ev.preventDefault()
        console.log('doSignup!');
        console.log(signupCred);
        dispatch(actions.userActions.signup(signupCred))
        setSignupCred({ username: '', password: '', fullname: '' })
    }

    const doLogin = (ev) => {
        ev.preventDefault()
        console.log('doLogin!');
        console.log(loginCred);
        dispatch(actions.userActions.login(loginCred))
        setSignupCred({ username: '', password: '' })
    }

    const signupHandleChange = (ev) => {
        const { name, value } = ev.target
        setSignupCred(prevState => { return { ...prevState, [name]: value } })
    }

    const loginHandleChange = (ev) => {
        const { name, value } = ev.target
        setLoginCred(prevState => { return { ...prevState, [name]: value } })
    }

    const toggleIsLoginShow = () => {
        setIsLoginShow(prevState => !prevState)
    }


    let loginSection =
        <form onSubmit={doLogin}>
            <h2 className="title">Log in to your account</h2>
            <div className="form-content">
                <input
                    type="text"
                    name="username"
                    value={loginCred.username}
                    onChange={loginHandleChange}
                    placeholder="Username"
                    autoComplete="username"
                />
                <input
                    name="password"
                    type="password"
                    value={loginCred.password}
                    onChange={loginHandleChange}
                    placeholder="Password"
                    autoComplete="current-password"
                />
                <button className="login-btn btn suc">Log in</button>
            </div>
            <p>Don't have an account yet? <button className="link-like" type="button" onClick={toggleIsLoginShow}>Sign up</button></p>
        </form>

    let signupSection =
        <form onSubmit={doSignup}>
            <h2 className="title">Sign Up</h2>
            <div className="form-content">
                <input
                    type="text"
                    name="fullname"
                    value={signupCred.fullname}
                    onChange={signupHandleChange}
                    placeholder="Full name"
                    autoComplete="fullname"
                />
                <input
                    name="password"
                    type="password"
                    value={signupCred.password}
                    onChange={signupHandleChange}
                    placeholder="Password"
                    autoComplete="current-password"
                />
                <input
                    type="text"
                    name="username"
                    value={signupCred.username}
                    onChange={signupHandleChange}
                    placeholder="Username"
                    autoComplete="username"
                />
                <br />
                <button className="login-btn btn suc">Sign up</button>
            </div>
            <p>Already have an account? <button className="link-like" type="button" onClick={toggleIsLoginShow}>Sign in</button></p>
        </form>


    return (
        <section className="login-signup">
            {isLoginShow ? loginSection : signupSection}
        </section>
    )
}