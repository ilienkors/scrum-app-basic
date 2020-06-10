import React from 'react'
import './index.css'

const MemberModalView = ({ setMemberInput, setModalShow, addMember }) => {
    return (
        <div className="left-panel__modal-background">
            <div className="left-panel__modal-body">
                <input type="text" className="left-panel__modal-input" placeholder="Введіть ім'я учасника" onChange={event => setMemberInput(event.target.value)} />
                <button className="left-panel__modal-submit" onClick={addMember}>Додати учасника</button>
                <button className="left-panel__modal-submit" onClick={() => setModalShow(false)}>Закрити</button>
            </div>
        </div>
    )
}

export default MemberModalView
