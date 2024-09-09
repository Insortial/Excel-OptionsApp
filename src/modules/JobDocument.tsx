import React from 'react'
import { JobDocumentInterface } from '../../../types/LotTableInterface'
import { Link, } from "react-router-dom";

type JobDocument = {
    JobDocumentDetails: JobDocumentInterface
}

const JobDocument: React.FC<JobDocument> = ({JobDocumentDetails}) => {
    const { customerName, jobOptionID, jobID, optionCoordinator, phase, projectName} = JobDocumentDetails

    return (
        <Link className='jobDocument' to={"/optionCreator/jobOption/" + jobOptionID} >
            <header>{customerName} - {projectName}<br />Job ID: {jobID}</header>
            <div className='jobDocumentBody'>
                <h4>Phase: {phase}</h4>
                <h4>Coordinator: {optionCoordinator}</h4>
            </div>
        </Link>
    )
}

export default JobDocument