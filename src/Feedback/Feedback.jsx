import './Feedback.css'
import { useState, useEffect } from 'react'

const Notification = ({ message }) => {
    return (
        <>
            <p className='feedback-stars'>{message}</p>
        </>
    )
}

const Statistics = ({ good, neutral, bad, total, positivePercentage, }) => {
    return (
        <>
            <div className="feedback-statistics">
                <h1>Statistics</h1>
                <p className='feedback-stars'>Good {good}</p>
                <p className='feedback-stars'>Neurtal {neutral}</p>
                <p className='feedback-stars'>Bad {bad}</p>
                <p className='feedback-stars'>Total {total}</p>
                <p className='feedback-stars'>Positive {positivePercentage}%</p>
            </div></>
    )
}

const FeedbackOptions = ({ options}) => {
    return (
        <>
            <button onClick={() => {options.option()}} className="feedback-button">{options.name}</button>
        </>
    )
}


export function Feedback() {
    const [isGood, setGood] = useState(0)
    const [isNeutral, setNeutral] = useState(0)
    const [isTotalFeedback, setTotalFeedback] = useState(0)
    const [isBad, setBad] = useState(0)
    const [isPositivePercentage, setPositivePercentage] = useState(0)

    const goodFeedback = () => {
        setGood(isGood + 1)
    }

    const neurtalFeedback = () => {
        setNeutral(isNeutral + 1)
    }

    const badFeedback = () => {
        setBad(isBad + 1)
    }

    useEffect(() => {
        setTotalFeedback(isBad + isGood + isNeutral)
    }, [isGood, isBad, isNeutral])

    useEffect(() => {
        if (isTotalFeedback != 0) {
            setPositivePercentage(isGood / isTotalFeedback * 100)
        } else {
            setPositivePercentage(isTotalFeedback)
        }
    }, [isGood, isTotalFeedback])


    const optionsArr = [
        {name: 'Good', option: goodFeedback },
        {name: 'Neutral', option: neurtalFeedback },
        {name: 'Bad', option: badFeedback }
    ];


    return (
        <>
            <div className="feedback-button-box">
                {optionsArr.map((e, index) => (
                    <FeedbackOptions key={index} options={e}/>
                ))}
            </div>

            {isTotalFeedback === 0 ? <Notification message={"There is no feedback"} /> : <Statistics good={isBad} neutral={isNeutral} bad={isBad} total={isTotalFeedback} positivePercentage={isPositivePercentage} />}
        </>
    )
}

export const Section = ({ title, children }) => {
    return (
        <>
            <div className="feedback-console">
                <h1>{title}</h1>
                {children}
            </div>
        </>
    )
}