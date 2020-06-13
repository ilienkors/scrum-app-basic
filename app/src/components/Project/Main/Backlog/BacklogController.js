import React, { useState, useEffect, useContext } from 'react'
import { MainContext } from './../MainContext'
import BacklogView from './BacklogView'

const BacklogController = () => {
    const { tasks, refreshTasks } = useContext(MainContext)

    const [showModal, setShowModal] = useState(false)
    const [membersSelect, setMembersSelect] = useState([])
    const [selectedMember, setSelectedMember] = useState()
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [storyPoints, setStoryPoints] = useState('')
    const [deadline, setDeadline] = useState('')
    const [over, setOver] = useState(false)

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
        getInfo(`http://localhost:5000/members/${localStorage.getItem('project_uuid')}`)
            .then((data) => {
                let membersArray = []
                data.forEach(member => {
                    membersArray.push(
                        {
                            member_id: member.member_id,
                            name: member.name
                        }
                    )
                });
                setMembersSelect(membersArray)
            });
    }, [])

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

    const addTask = () => {
        postData('http://localhost:5000/task', {
            project_uuid: localStorage.getItem('project_uuid'),
            member_id: selectedMember,
            name: name,
            description: description,
            story_points: storyPoints,
            deadline: deadline,
            isActive: false,
            state: 0
        })
            .then((data) => {
                refreshTasks()
            });
    }

    const deleteTask = async (url = '') => {
        const response = await fetch(url, {
            method: 'DELETE',
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

    const removeTask = (task_id) => {
        deleteTask(`http://localhost:5000/task/${task_id}`)
            .then((data) => {
                refreshTasks()
            });
    }

    const updateTask = (takenTask) => {
        postData('http://localhost:5000/task/update', {
            isActive: over,
            task_id: takenTask
        })
            .then((data) => {
                refreshTasks()
            });
    }

    return (
        <BacklogView
            showModal={showModal}
            setShowModal={setShowModal}
            membersSelect={membersSelect}
            setSelectedMember={setSelectedMember}
            setName={setName}
            setDescription={setDescription}
            setStoryPoints={setStoryPoints}
            setDeadline={setDeadline}
            addTask={addTask}
            tasks={tasks}
            removeTask={removeTask}
            setOver={setOver}
            updateTask={updateTask}
        />
    )
}

export default BacklogController
