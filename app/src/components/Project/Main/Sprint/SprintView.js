import React from 'react'
import './index.css'

const SprintView = () => {
    return (
        <div className="sprint-page">
            <div className="card-block">
                <h3 className="sprint-page__title">To do <span className="card-block__count" id="to-do-count">3</span></h3>
                <div className="card">
                    <div className="card__info">
                        <p className="card__date">12 jun</p>
                        <p className="card__member">Roma</p>
                    </div>
                    <p className="card__description">description</p>
                </div>
            </div>
            <div className="card-block">
                <h3 className="sprint-page__title">Doing <span className="card-block__count" id="doing-count">3</span></h3>
            </div>
            <div className="card-block">
                <h3 className="sprint-page__title">Done <span className="card-block__count" id="done-count">3</span></h3>
            </div>
        </div>
    )
}

export default SprintView
