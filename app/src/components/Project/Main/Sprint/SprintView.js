import React from 'react'
import './index.css'

const SprintView = ({ tasks, setOver, changeTaskState }) => {
    let toDo = [], doing = [], done = []

    tasks.forEach(task => {
        if (task.isActive === true) {
            let choosen
            if (task.state === 0)
                choosen = toDo
            if (task.state === 1)
                choosen = doing
            if (task.state === 2)
                choosen = done
            choosen.push(
                <div className="card"
                    key={task.task_id}
                    draggable={true}
                    onDragEnd={() => changeTaskState(task)}
                >
                    <div className="card__info">
                        <p className="card__date">{task.deadline}</p>
                        <p className="card__member">{task.member_name}</p>
                    </div>
                    <h3>{task.name}</h3>
                    <p className="card__description">{task.description}</p>
                </div>
            )
        }
    });

    return (
        <div className="sprint-page">
            <div className="card-block" onDragOver={() => setOver(0)}>
                <h3 className="sprint-page__title">Планові <span className="card-block__count" id="to-do-count">{toDo.length}</span></h3>
                {toDo}
            </div>
            <div className="card-block" onDragOver={() => setOver(1)}>
                <h3 className="sprint-page__title">В розробці <span className="card-block__count" id="doing-count">{doing.length}</span></h3>
                {doing}
            </div>
            <div className="card-block" onDragOver={() => setOver(2)}>
                <h3 className="sprint-page__title">Виконані <span className="card-block__count" id="done-count">{done.length}</span></h3>
                {done}
            </div>
        </div>
    )
}

export default SprintView
