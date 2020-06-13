import React from 'react'
import './index.css'

const ProjectActivityView = ({ log }) => {
    log = log.map(singleLog => {
        return (
            <p key={singleLog.log_id}>{singleLog.task_name} changed state from "{singleLog.state_from}" to "{singleLog.state_to}" at {singleLog.date}</p>
        )
    })

    return (
        <div className="project-activity-page">
            <h3>Activity history</h3>
            {log}
        </div>
    )
}

export default ProjectActivityView
