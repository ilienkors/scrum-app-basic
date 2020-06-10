import React, { useState } from 'react'
import AuthorizationView from './AuthorizationView'

const AuthorizationController = () => {
    const [isRegister, setIsRegister] = useState(false)
    const [emailInput, setEmailInput] = useState('')
    const [projectNameInput, setProjectNameInput] = useState('')
    const [projectUuidInput, setProjectUuidInput] = useState('')

    const postProject = async (url = '', data = {}) => {
        const response = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(data)
        });
        return await response.json();
    }

    const getProject = async (url = '') => {
        const response = await fetch(url, {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
        });
        return await response.json();
    }

    const register = () => {
        postProject('http://localhost:5000/project', { name: projectNameInput })
            .then((data) => {
                console.log(`Email sent to ${emailInput}: ${data.project_uuid}`)
                setIsRegister(false)
            });
    }

    const login = () => {
        getProject(`http://localhost:5000/project/${projectUuidInput}`)
            .then((data) => {
                if (data.hasOwnProperty('name')) {
                    console.log(`Project name is ${data.name}`)
                    localStorage.setItem('project_uuid', projectUuidInput)
                    localStorage.setItem('name', data.name)
                    window.location = 'http://localhost:3000/project'
                } else
                    alert('Невірний uuid!')
            });
    }

    return (
        <AuthorizationView
            isRegister={isRegister}
            setIsRegister={setIsRegister}
            setEmailInput={setEmailInput}
            setProjectNameInput={setProjectNameInput}
            register={register}
            setProjectUuidInput={setProjectUuidInput}
            login={login}
        />
    )
}

export default AuthorizationController
