import React, { useState, useContext } from 'react'
import MemberModalView from './MemberModalView'
import { Context } from './../LeftSideContext'

const MemberModalController = () => {
    const [memberInput, setMemberInput] = useState('')
    const { setModalShow, members, setMembers, removeMember, memberCount, setMemberCount } = useContext(Context)

    const postMember = async (url = '', data = {}) => {
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

    const addMember = () => {
        postMember('http://localhost:5000/member', { name: memberInput, project_uuid: localStorage.getItem('project_uuid') })
            .then((data) => {
                console.log(data.member_id)
                setMemberCount(memberCount + 1)
                setMembers([
                    ...members,
                    <li className='member-list__member' key={data.member_id}>
                        {data.name}
                        <button className="member-list__remove-member" onClick={() => removeMember(data.member_id)}>-</button>
                    </li>
                ])
            });
    }

    return (
        <MemberModalView
            setMemberInput={setMemberInput}
            setModalShow={setModalShow}
            addMember={addMember}
        />
    )
}

export default MemberModalController
