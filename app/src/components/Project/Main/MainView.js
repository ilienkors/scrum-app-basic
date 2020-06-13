import React from 'react'
import './index.css'
import { Backlog } from './Backlog'
import { ProjectActivity } from './ProjectActivity'
import { Sprint } from './Sprint'

const MainView = ({ choice, setChoice }) => {

    let page
    if (choice === 'backlog')
        page = <Backlog />
    if (choice === 'projectActivity')
        page = <ProjectActivity />
    if (choice === 'sprint')
        page = <Sprint />

    return (
        <main className="main">
            <div className="top-menu">
                <button className="top-menu__nav-button" id="backlog" onClick={() => setChoice('backlog')}>Список завдань</button>
                <button className="top-menu__nav-button" id="sprint" onClick={() => setChoice('sprint')}>Теперішні завдання</button>
                <button className="top-menu__nav-button" id="project-activity" onClick={() => setChoice('projectActivity')}>Історія змін</button>
            </div>
            {page}
        </main>
    )
}

export default MainView
