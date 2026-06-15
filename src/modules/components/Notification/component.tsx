import React from 'react'

type Notification = {
    submissionValid: boolean|null
}

const Notification: React.FC<Notification> = ({submissionValid}) => {
    return (
        <div className={`notification ${submissionValid ? "valid" : "invalid"}`} style={{display: submissionValid !== null ? "flex" : "none"}}>{submissionValid ? "Job was submitted successfully" : "Job was not submitted"}</div>
    )
}

export default Notification