import React from 'react'
import './index.css'

const AddTaskModal = ({ setShowModal, membersSelect, setSelectedMember, setName, setDescription, setStoryPoints, setDeadline, addTask }) => {
    let membersSelectNew = membersSelect.map((member) => {
        return <option key={member.member_id} value={member.member_id}>{member.name}</option>
    })

    return (
        <div className="backlog__modal-background">
            <div className="backlog__modal-body">
                <h2>Додати завдання</h2>
                <input type="text" placeholder="Назва" className="modal__modal-input" onChange={event => setName(event.target.value)} />
                <input type="text" placeholder="Опис" className="modal__modal-input" onChange={event => setDescription(event.target.value)} />
                <select className="modal__modal-input" onChange={event => setSelectedMember(event.target.value)}>
                    {membersSelectNew}
                </select>
                <input type="number" className="modal__modal-input" min="1" max="20" onChange={event => setStoryPoints(event.target.value)} />
                <input type="date" className="modal__modal-input" onChange={event => setDeadline(event.target.value)} />
                <button className="modal__confirm" onClick={() => addTask()}>Надіслати</button>
                <button className="modal__close" onClick={() => setShowModal(false)}>Закрити</button>
            </div>
        </div>
    )
}

const BacklogView = ({ showModal, setShowModal, membersSelect, setSelectedMember, setName, setDescription, setStoryPoints, setDeadline, addTask, tasks, removeTask, setOver, updateTask }) => {
    let modal
    if (showModal)
        modal = <AddTaskModal
            setShowModal={setShowModal}
            membersSelect={membersSelect}
            setSelectedMember={setSelectedMember}
            setName={setName}
            setDescription={setDescription}
            setStoryPoints={setStoryPoints}
            setDeadline={setDeadline}
            addTask={addTask}
        />
    else
        modal = null

    let activeTasks = [], notActiveTasks = []

    tasks.forEach(task => {
        if (task.isActive) {
            activeTasks.push(
                <div className="task"
                    key={task.task_id}
                    draggable={true}
                    onDragEnd={() => updateTask(task.task_id)}
                >
                    <h4 className="task__name">{task.name}</h4>
                    <p className="task__description">{task.description}</p>
                    <p className="task__story-point">{task.story_points}</p>
                    <p className="task__deadline">{task.deadline}</p>
                    <p>{task.member_name}</p>
                    <button className="task__remove-task" onClick={() => removeTask(task.task_id)}>remove</button>
                </div>
            )
        } else {
            notActiveTasks.push(
                <div className="task"
                    key={task.task_id}
                    draggable={true}
                    onDragEnd={() => updateTask(task.task_id)}
                >
                    <h4 className="task__name">{task.name}</h4>
                    <p className="task__description">{task.description}</p>
                    <p className="task__story-point">{task.story_points}</p>
                    <p className="task__deadline">{task.deadline}</p>
                    <p>{task.member_name}</p>
                    <button className="task__remove-task" onClick={() => removeTask(task.task_id)}>remove</button>
                </div>
            )
        }
    });

    return (
        <div className="backlog-page">
            {modal}
            <div className="backlog-page__top">
                <button className="backlog-page__add-task" id="add-task" onClick={() => setShowModal(true)}>Додати завдання</button>
                <p className="backlog-page__info">Активні завдання: <span id="active-tasks">{activeTasks.length}</span></p>
                <p className="backlog-page__info">Планові завдання: <span id="future-tasks">{notActiveTasks.length}</span></p>
            </div>
            <hr />
            <div className="backlog-page__active">
                <h2 className="backlog-page__title-active">Список активних завдань</h2>
                <div className="task-title">
                    <h4>Назва</h4>
                    <p>Опис</p>
                    <p>Витрати часу</p>
                    <p>Кінцевий термін</p>
                    <p>Відповідальний</p>
                    <p>Дії</p>
                </div>
                <div className="tasks" id="backlog-active" onDragOver={() => setOver(true)}>
                    {activeTasks}
                </div>
            </div>
            <div className="backlog-page__plans">
                <h2 className="backlog-page__title-active">Список планових завдань</h2>
                <div className="task-title">
                    <h4>Назва</h4>
                    <p>Опис</p>
                    <p>Витрати часу</p>
                    <p>Кінцевий термін</p>
                    <p>Відповідальний</p>
                    <p>Дії</p>
                </div>
                <div className="tasks" id="backlog-plans" onDragOver={() => setOver(false)}>
                    {notActiveTasks}
                </div>
            </div>
        </div>
    )
}

export default BacklogView
