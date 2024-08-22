import React from 'react'
import { JobDocumentInterface, LotTableInterface, PartOfLot } from '../../../types/LotTableInterface'
import { useNavigate } from "react-router-dom";
import useFetch from '../hooks/useFetch';

type JobDocument = {
    JobDocumentDetails: JobDocumentInterface
}

const JobDocument: React.FC<JobDocument> = ({JobDocumentDetails}) => {
    const { customerName, jobOptionID, jobID, optionCoordinator, phase, projectName } = JobDocumentDetails
    const fetchHook = useFetch()
    const navigate = useNavigate();

    
    const getJobDocumentDetails = async () => {
        const response = await fetchHook(`/getJobOption/${jobOptionID}`, "GET")
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        const data = await response.json()
        return data
    }

    const goToLotCreator = async () => {
        const jobDocumentDetails = await getJobDocumentDetails()
        jobDocumentDetails.listOfLots.map((lot:LotTableInterface) => {
            const throughoutLotIdx = lot.partsOfLot.findIndex((partOfLot:PartOfLot) => partOfLot.roomID === "Throughout")
            const throughoutLot = lot.partsOfLot.splice(throughoutLotIdx, 1)
            lot.partsOfLot.unshift(throughoutLot[0])
        })
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