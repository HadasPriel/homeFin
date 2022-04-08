import { useState } from "react";
import { useDispatch } from 'react-redux'

import actions from '../store/actions';

import { userService } from "../services/user.service.js";

export const LoginSignup = () => {

    const [signupCred, setSignupCred] = useState({ username: '', password: '', fullname: '' });
    const [loginCred, setLoginCred] = useState({ username: '', password: '' });
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

    let loginSection =
        <form className="frm" onSubmit={doLogin}>
            <h2>Login</h2>
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
            <button>Login</button>
        </form>

    let signupSection =
        <form className="frm" onSubmit={doSignup}>
            <h2>Signup</h2>
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
            <button>Signup</button>
        </form>


    return (
        <section>
            {loginSection}
            {signupSection}
        </section>
    )
}