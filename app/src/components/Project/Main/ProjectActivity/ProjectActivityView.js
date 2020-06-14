import React from 'react'
import './index.css'

const ProjectActivityView = ({ log }) => {
    log = log.map(singleLog => {
        return (
            <p key={singleLog.log_id}>Завдання "{singleLog.task_name}" змінило стан з "{singleLog.state_from}" на "{singleLog.state_to}" о {singleLog.date}</p>
        )
    })

    return (
        <div className="project-activity-page">
            <h3>Історія змін</h3>
            {log}
        </div>
    )
}

export default ProjectActivityView
