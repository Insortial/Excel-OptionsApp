import React from 'react'
import { JobDocumentInterface } from '../types/LotTableInterface'
import { Link, } from "react-router-dom";

type JobDocument = {
    JobDocumentDetails: JobDocumentInterface,
    isDeleteMode: boolean,
    turnOnDeleteModal: (jobDocDetails:JobDocumentInterface) => void
}

const JobDocument: React.FC<JobDocument> = ({JobDocumentDetails, isDeleteMode, turnOnDeleteModal}) => {
    const { customerName, jobOptionID, jobID, optionCoordinator, phase, projectName } = JobDocumentDetails

    return (
        <div className="jobDocumentContainer">
            <span className="documentDeleteButton" style={{display: isDeleteMode ? "flex" : "none"}} onClick={() => turnOnDeleteModal(JobDocumentDetails)}>x</span>
            <Link className='jobDocument' to={"/optionCreator/jobOption/" + jobOptionID} >
                <header>{customerName} - {projectName}<br />Job ID: {jobID}</header>
                <div className='jobDocumentBody'>
                    <h4>Phase: {phase}</h4>
                    <h4>Coordinator: {optionCoordinator}</h4>
                </div>
            </Link>
        </div>
    )
}

export default JobDocument