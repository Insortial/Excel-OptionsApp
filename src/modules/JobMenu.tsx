/* eslint-disable react/react-in-jsx-scope */
import { useContext, useEffect, useState } from 'react'
import JobDocument from './JobDocument.tsx';
import { Link } from 'react-router-dom';
import { JobDocumentInterface } from '../../../types/LotTableInterface.ts';
import { FormOptionsContext } from './OptionsTemplateContext.tsx';
import { FormOptionsContextType } from '../../../types/FormOptions.ts';
import useFetch from '../hooks/useFetch.ts';


const JobMenu = () => {
    const [jobDocuments, setJobDocuments] = useState<JobDocumentInterface[]>([])
    const { setIsCheckingError } = useContext(FormOptionsContext) as FormOptionsContextType
    const fetchHook = useFetch()
    
    useEffect(() => {
        setIsCheckingError(false)
        fetchHook("/getListOfJobOptions", "GET")
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
                <nav>
                    <Link to="/creatingJob" className='jobMenuButtons'>Create Job Document</Link>
                    <Link to="/creatingJobPackage" className='jobMenuButtons'>Edit/Create Job Package</Link>
                </nav>
            </header>
            <div id="jobMenuBody">
                <section className='jobMenuSection'>
                    <h2>Production Ready Jobs</h2>
                    <section className="jobList">
                        {jobDocuments.map((jobDocument:JobDocumentInterface, index:number) => {
                            if(jobDocument.prodReady)
                            return <JobDocument key={index} JobDocumentDetails={jobDocument}/>
                        })}
                    </section>
                </section>
                <section className='jobMenuSection'>
                    <h2>Draft Jobs</h2>
                    <section className="jobList">
                        {jobDocuments.map((jobDocument:JobDocumentInterface, index:number) => {
                            if(!jobDocument.prodReady)
                                return <JobDocument key={index} JobDocumentDetails={jobDocument}/>
                        })}
                    </section>
                </section>
            </div>
        </div>
    )
}

export default JobMenu