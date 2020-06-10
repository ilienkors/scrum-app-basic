import React, { useState } from 'react'
import MainView from './MainView'
import { Backlog } from './Backlog'
import { ProjectActivity } from './ProjectActivity'
import { Sprint } from './Sprint'

const MainController = () => {
    const [currentPage, setCurrentPage] = useState(Backlog)

    const changeCurrentPage = (choice) => {
        if (choice === 'backlog')
            setCurrentPage(Backlog)
        if (choice === 'projectActivity')
            setCurrentPage(ProjectActivity)
        if (choice === 'sprint')
            setCurrentPage(Sprint)
    }

    return (
        <MainView
            currentPage={currentPage}
            changeCurrentPage={changeCurrentPage}
        />
    )
}

export default MainController
