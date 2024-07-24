import React, { useEffect, useState } from 'react'
import JobDocument from './JobDocument.tsx';
import { Link } from 'react-router-dom';
import { JobDocumentInterface } from '../../../types/LotTableInterface.ts';

type Props = {}

const JobMenu = (props: Props) => {
    const [jobDocuments, setJobDocuments] = useState<JobDocumentInterface[]>([])
    useEffect(() => {
        fetch("http://localhost:3000/getListOfJobDocuments")
                .then((response) => response.text())
                .then((result) => {
                    let listOfJobDocuments:JobDocumentInterface[] = JSON.parse(result)
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