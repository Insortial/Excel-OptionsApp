/* eslint-disable react/react-in-jsx-scope */
import { NotificationInterface } from '../../../context/NotificationContext'

const Notification = () => {
    const { notificationState } = NotificationInterface()
    const { message, show, success } = notificationState

    return (
        <div className={`notification ${success ? "valid" : "invalid"}`} style={{display: show ? "flex" : "none"}}>{message}</div>
    )
}

export default Notification