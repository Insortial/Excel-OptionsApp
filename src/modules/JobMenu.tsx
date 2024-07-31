import { useContext, useEffect, useState } from 'react'
import JobDocument from './JobDocument.tsx';
import { Link } from 'react-router-dom';
import { JobDocumentInterface } from '../../../types/LotTableInterface.ts';
import { FormOptionsContext } from './OptionsTemplateContext.tsx';
import { FormOptionsContextType } from '../../../types/FormOptions.ts';


const JobMenu = () => {
    const [jobDocuments, setJobDocuments] = useState<JobDocumentInterface[]>([])
    const { setIsCheckingError } = useContext(FormOptionsContext) as FormOptionsContextType
    
    useEffect(() => {
        setIsCheckingError(false)
        fetch(import.meta.env.VITE_BACKEND_URL + "/getListOfJobOptions")
            .then((response) => response.text())
            .then((result) => {
                const listOfJobDocuments:JobDocumentInterface[] = JSON.parse(result)
                setJobDocuments(listOfJobDocuments)
            })
            .catch((error) => console.error(error));
    }, [])

    return (
        <div id="jobMenuScreen">
            <header id="jobMenuHeader">
                <h1>Job Menu</h1>
                <Link to="/creatingJob">Create New Job Document</Link>
            </header>
            <section id="jobList">
                {jobDocuments.map((jobDocument:JobDocumentInterface, index:number) => {
                    return <JobDocument key={index} JobDocumentDetails={jobDocument}/>
                })}
            </section>
        </div>
    )
}

export default JobMenu