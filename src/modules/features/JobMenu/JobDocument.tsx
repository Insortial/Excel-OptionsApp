import React from 'react'
import { JobDocumentInterface } from '@excelcabinets/excel-types/LotTableInterface'
import { Link, } from "react-router-dom";

type JobDocument = {
    JobDocumentDetails: JobDocumentInterface,
    isDeleteMode: boolean,
    turnOnDeleteModal: (jobDocDetails:JobDocumentInterface) => void
}

const JobDocument: React.FC<JobDocument> = ({JobDocumentDetails, isDeleteMode, turnOnDeleteModal}) => {
    const { customerName, jobOptionID, jobID, optionCoordinator, phase, projectName, dateUpdated } = JobDocumentDetails

    return (
        <div className="jobDocumentContainer">
            <span className="documentDeleteButton" style={{display: isDeleteMode ? "flex" : "none"}} onClick={() => turnOnDeleteModal(JobDocumentDetails)}>x</span>
            <Link className='jobDocument' to={"/optionCreator/jobOption/" + jobOptionID} >
                <header>{customerName} - {projectName}<br />Job ID: {jobID}</header>
                <div className='jobDocumentBody'>
                    <h4><span>Phase:</span> {phase}</h4>
                    <h4><span>Coordinator:</span> {optionCoordinator}</h4>
                    {dateUpdated && <h4><span>Last Updated:</span> {dateUpdated}</h4>}
                </div>
            </Link>
        </div>
    )
}

export default JobDocument