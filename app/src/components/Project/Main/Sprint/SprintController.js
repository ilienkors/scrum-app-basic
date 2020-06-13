import React, { useState, useContext } from 'react'
import SprintView from './SprintView'
import { MainContext } from './../MainContext'

const SprintController = () => {
    const { tasks, refreshTasks } = useContext(MainContext)
    const [over, setOver] = useState(0)

    const postData = async (url = '', data = {}) => {
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

    const changeTaskState = (takenTask) => {
        postData('http://localhost:5000/task/changeState', {
            state: over,
            task_id: takenTask.task_id
        })
            .then((data) => {
                refreshTasks()
            });

        postData('http://localhost:5000/history', {
            task_name: takenTask.name,
            state_from: takenTask.state,
            state_to: over,
            date: (new Date()).toDateString(),
            project_uuid: localStorage.getItem('project_uuid')
        })
            .then((data) => {
                
            });
    }

    return (
        <SprintView
            tasks={tasks}
            setOver={setOver}
            changeTaskState={changeTaskState}
        />
    )
}

export default SprintController
