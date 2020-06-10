import React from 'react'
import { MemberModal } from './MemberModal'

const LeftSideView = ({ title, modalShow, setModalShow, memberCount, members }) => {
    let modal
    if (modalShow) {
        modal = <MemberModal />
    } else {
        modal = null
    }

    return (
        <aside className="left-panel">
            {modal}
            <h1 className="left-panel__project-title" id="project-title">{title}</h1>
            <div className="left-panel__members">
                <h3 className="left-panel__members-title">Учасники ({memberCount})</h3>
                <button className="left-panel__add-member" id="add-member" onClick={() => setModalShow(true)}>+</button>
            </div>
            <hr />
            <ul className="member-list" id="member-list">
                {members}
            </ul>
        </aside>
    )
}

export default LeftSideView
