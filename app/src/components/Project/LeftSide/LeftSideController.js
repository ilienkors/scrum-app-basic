import React, { useState, useEffect } from 'react'
import LeftSideView from './LeftSideView'
import { Context } from './LeftSideContext'
import './index.css'

const LeftSideController = () => {
    const [title] = useState(localStorage.getItem('name'))
    const [members, setMembers] = useState([])
    const [memberCount, setMemberCount] = useState(0)
    const [modalShow, setModalShow] = useState(false)

    const deleteMember = async (url = '') => {
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

    const getMembers = async (url = '') => {
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

    const refreshMembers = () => {
        getMembers(`http://localhost:5000/members/${localStorage.getItem('project_uuid')}`)
            .then((data) => {
                let membersArray = []
                let membersArrayList = []
                data.forEach(member => {
                    membersArrayList.push({
                        member_id: member.member_id,
                        name: member.name
                    })
                    membersArray.push(
                        <li className='member-list__member' key={member.member_id}>
                            {member.name}
                            <button className="member-list__remove-member" onClick={() => removeMember(member.member_id)}>-</button>
                        </li>
                    )
                });
                setMembers(membersArray)
                setMemberCount(data.length)
            });
    }

    const removeMember = (member_id) => {
        deleteMember(`http://localhost:5000/member/${member_id}`)
            .then((data) => {
                refreshMembers()
            });
    }

    
    useEffect(() => {
        refreshMembers()
        // eslint-disable-next-line
    }, [])

    return (
        <Context.Provider value={{ setModalShow, members, setMembers, removeMember, memberCount, setMemberCount }}>
            <LeftSideView
                title={title}
                modalShow={modalShow}
                setModalShow={setModalShow}
                memberCount={memberCount}
                members={members}
            />
        </Context.Provider>
    )
}

export default LeftSideController
