import React from 'react'
import './index.css'

const AuthorizationView = ({
    isRegister,
    setIsRegister,
    setEmailInput,
    setProjectNameInput,
    register,
    setProjectUuidInput,
    login
}) => {
    let inputSection
    if (isRegister) {
        inputSection = (
            <div className="register">
                <input type="text" placeholder="Enter email" onChange={event => setEmailInput(event.target.value)} />
                <input type="text" placeholder="Enter project name" onChange={event => setProjectNameInput(event.target.value)} />
                <button className="get-uuid" onClick={() => register()}>Get uuid!</button>
            </div>
        )
    } else {
        inputSection = (
            <div className="login" id="login">
                <input type="text" placeholder="Enter uuid" onChange={event => setProjectUuidInput(event.target.value)} />
                <button className="login-button" onClick={() => login()}>Enter</button>
            </div>
        )
    }

    return (
        <div className="body">
            <main className="main-auth">
                <div className="top-menu">
                    <button onClick={() => setIsRegister(false)}>Login</button>
                    <button onClick={() => setIsRegister(true)}>Register</button>
                </div>
                {inputSection}
            </main>
        </div>
    )
}

export default AuthorizationView
