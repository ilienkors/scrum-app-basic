import React from 'react'
import './index.css'

const BacklogView = () => {
    return (
        <div className="backlog-page">
            <div className="backlog-page__top">
                <button className="backlog-page__add-task" id="add-task">Додати завдання</button>
                <p className="backlog-page__info">Активні завдання: <span id="active-tasks">3</span></p>
                <p className="backlog-page__info">Планові завдання: <span id="future-tasks">3</span></p>
            </div>
            <hr />
            <div className="backlog-page__active">
                <h2 className="backlog-page__title-active">Список активних завдань</h2>
                <div className="task-title">
                    <h4>Назва</h4>
                    <p>Опис</p>
                    <p>Витрати часу</p>
                    <p>Кінцевий термін</p>
                    <p>Дії</p>
                </div>
                <div className="tasks" id="backlog-active"></div>
            </div>
            <div className="backlog-page__plans">
                <h2 className="backlog-page__title-active">Список планових завдань</h2>
                <div className="task-title">
                    <h4>Назва</h4>
                    <p>Опис</p>
                    <p>Витрати часу</p>
                    <p>Кінцевий термін</p>
                    <p>Дії</p>
                </div>
                <div className="tasks" id="backlog-plans"></div>
            </div>
        </div>
    )
}

export default BacklogView
