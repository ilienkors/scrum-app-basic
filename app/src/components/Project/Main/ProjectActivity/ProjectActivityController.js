import React, { useState, useEffect } from 'react'
import ProjectActivityView from './ProjectActivityView'

const ProjectActivityController = () => {
    const [log, setLog] = useState([])

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

    useEffect(() => {
        getInfo(`http://localhost:5000/history/${localStorage.getItem('project_uuid')}`)
            .then((data) => {
                let historyArray = []
                data.forEach(history => {
                    if (history.state_from === 0)
                        history.state_from = 'to do'
                    if (history.state_from === 1)
                        history.state_from = 'doing'
                    if (history.state_from === 2)
                        history.state_from = 'done'
                    if (history.state_to === 0)
                        history.state_to = 'to do'
                    if (history.state_to === 1)
                        history.state_to = 'doing'
                    if (history.state_to === 2)
                        history.state_to = 'done'
                    console.log(history)
                    historyArray.push(
                        history
                    )
                });
                setLog(historyArray)
            });
    }, [])

    return (
        <ProjectActivityView
            log={log}
        />
    )
}

export default ProjectActivityController
