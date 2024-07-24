import React from 'react'
import { JobDocumentInterface } from '../../../types/LotTableInterface'
import { useNavigate } from "react-router-dom";

type JobDocument = {
    JobDocumentDetails: JobDocumentInterface
}

const JobDocument: React.FC<JobDocument> = ({JobDocumentDetails}) => {
    const { customerName, jobDocumentID, jobID, optionCoordinator, phase, projectName } = JobDocumentDetails
    const navigate = useNavigate();
    const myHeaders = new Headers();

    
    const getJobDocumentDetails = async () => {
        const requestOptions = {
            method: "GET",
        };
    
        const response = await fetch(`http://localhost:3000/getJobDocument/${jobDocumentID}`, requestOptions)
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        const data = await response.json()
        return data
    }

    const goToLotCreator = async (e: React.FormEvent<HTMLFormElement>) => {
        const jobDocumentDetails = await getJobDocumentDetails()
        navigate("/creatingOptions/", {state: jobDocumentDetails})
    }

    return (
        <div className='jobDocument' onClick={() => goToLotCreator()}>
            <header>{customerName} - {projectName}<br />Job ID: {jobID}</header>
            <div className='jobDocumentBody'>
                <h4>Phase: {phase}</h4>
                <h4>Coordinator: {optionCoordinator}</h4>
            </div>
        </div>
    )
}

export default JobDocument