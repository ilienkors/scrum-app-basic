import React, { useState, useEffect } from 'react'
import { MainContext } from './MainContext'
import MainView from './MainView'

const MainController = () => {
    const [choice, setChoice] = useState('backlog')
    const [tasks, setTasks] = useState([])

    const getInfo = async (url = '') => {
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

    const refreshTasks = () => {
        getInfo(`http://localhost:5000/tasks/${localStorage.getItem('project_uuid')}`)
            .then((data) => {
                let tasksArray = []
                data.forEach(member => {
                    tasksArray.push(
                        member
                    )
                });
                setTasks(tasksArray)
            });
    }

    useEffect(() => {
        refreshTasks()
        // eslint-disable-next-line
    }, [])

    console.log(tasks)

    return (
        <MainContext.Provider value={{ tasks, setTasks, refreshTasks }}>
            <MainView
                choice={choice}
                setChoice={setChoice}
            />
        </MainContext.Provider>
    )
}

export default MainController
