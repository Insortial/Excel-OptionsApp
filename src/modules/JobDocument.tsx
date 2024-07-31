import React from 'react'
import { JobDocumentInterface } from '../../../types/LotTableInterface'
import { useNavigate } from "react-router-dom";

type JobDocument = {
    JobDocumentDetails: JobDocumentInterface
}

const JobDocument: React.FC<JobDocument> = ({JobDocumentDetails}) => {
    const { customerName, jobOptionID, jobID, optionCoordinator, phase, projectName } = JobDocumentDetails
    const navigate = useNavigate();

    
    const getJobDocumentDetails = async () => {
        const requestOptions = {
            method: "GET",
        };
    
        const response = await fetch(import.meta.env.VITE_BACKEND_URL + `/getJobOption/${jobOptionID}`, requestOptions)
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        const data = await response.json()
        return data
    }

    const goToLotCreator = async () => {
        const jobDocumentDetails = await getJobDocumentDetails()
        navigate("/creatingOptions/", {state: jobDocumentDetails})
    }

    return (
        <div className='jobDocument' onClick={goToLotCreator}>
            <header>{customerName} - {projectName}<br />Job ID: {jobID}</header>
            <div className='jobDocumentBody'>
                <h4>Phase: {phase}</h4>
                <h4>Coordinator: {optionCoordinator}</h4>
            </div>
        </div>
    )
}

export default JobDocument