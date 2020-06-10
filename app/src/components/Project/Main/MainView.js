import React from 'react'
import './index.css'

const MainView = ({ currentPage, changeCurrentPage }) => {
    return (
        <main className="main">
            <div className="top-menu">
                <button className="top-menu__nav-button" id="backlog" onClick={() => changeCurrentPage('backlog')}>Список завдань</button>
                <button className="top-menu__nav-button" id="sprint" onClick={() => changeCurrentPage('sprint')}>Теперішні завдання</button>
                <button className="top-menu__nav-button" id="project-activity" onClick={() => changeCurrentPage('projectActivity')}>Історія змін</button>
            </div>
            {currentPage}
        </main>
    )
}

export default MainView
