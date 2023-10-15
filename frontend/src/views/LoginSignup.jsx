import { useState } from "react"
import { useDispatch } from 'react-redux'
import { useHistory } from "react-router-dom"
import { useSelector } from 'react-redux'
import { Uploader } from "../cmps/Uploader"
import { useToggle } from "../hooks/useToggle.js"
import { UserProfile } from "./UserProfile"

import actions from '../store/actions'


export const LoginSignup = () => {

    const [signupCred, setSignupCred] = useState({ username: '', password: '', fullname: '', imgUrl: '' })
    const [loginCred, setLoginCred] = useState({ username: '', password: '' })
    const [isLoginShow, setIsLoginShow] = useToggle(true)
    const loggedInUser = useSelector(state => state.userModule.loggedInUser)

    const dispatch = useDispatch()
    const history = useHistory()

    const doSignup = (ev) => {
        ev.preventDefault()
        console.log('doSignup!', signupCred)
        dispatch(actions.userActions.signup(signupCred))
        setSignupCred({ username: '', password: '', fullname: '', imgUrl: '' })
        history.push("/account")
    }

    const doLogin = (ev) => {
        ev.preventDefault()
        console.log('doLogin!', loginCred)
        dispatch(actions.userActions.login(loginCred))
        setSignupCred({ username: '', password: '' })
        history.push("/account")
    }

    const doLogout = () => {
        console.log('doLogout!')
        dispatch(actions.userActions.logout())
        history.push("/")
    }

    const signupHandleChange = (ev, url) => {
        const { name, value } = ev.target
        if (name === 'imgUrl') setSignupCred(prevState => { return { ...prevState, [name]: url } })
        else setSignupCred(prevState => { return { ...prevState, [name]: value } })
    }

    const loginHandleChange = (ev) => {
        const { name, value } = ev.target
        setLoginCred(prevState => { return { ...prevState, [name]: value } })
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
            <p>Don't have an account yet? <button className="link-like" type="button" onClick={setIsLoginShow}>Sign up</button></p>
        </form>

    let signupSection =
        <form onSubmit={doSignup}>
            <h2 className="title">Sign Up</h2>
            <div className="form-content">
                <Uploader onUpload={signupHandleChange} />
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
            <p>Already have an account? <button className="link-like" type="button" onClick={setIsLoginShow}>Sign in</button></p>
        </form>


    return (
        <section className="login-signup">
            {loggedInUser ?
                <UserProfile user={loggedInUser} doLogout={doLogout} />
                :
                isLoginShow ? loginSection : signupSection
            }
        </section>
    )
}