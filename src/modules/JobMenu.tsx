/* eslint-disable react/react-in-jsx-scope */
import { useContext, useEffect, useState } from 'react'
import JobDocument from './JobDocument.tsx';
import { Link } from 'react-router-dom';
import { JobDocumentInterface } from '../../../types/LotTableInterface.ts';
import { FormOptionsContext } from '../context/OptionsTemplateContext.tsx';
import { FormOptionsContextType } from '../../../types/FormOptions.ts';
import useFetch from '../hooks/useFetch.ts';
import OptionsCreatorModal from './OptionsCreatorModal.tsx';
import { JobMenuObject } from '../../../types/ModalTypes.ts';


const JobMenu = () => {
    const [jobDocuments, setJobDocuments] = useState<JobDocumentInterface[]>([])
    const [modalType, setModalType] = useState<string>("none")
    const [jobDocument, setJobDocument] = useState<JobDocumentInterface|null>(null)
    const [modalInputValue, setModalInputValue] = useState<string>("")
    const [isDeleteMode, setDeleteMode] = useState<boolean>(false)
    const { setIsCheckingError } = useContext(FormOptionsContext) as FormOptionsContextType
    const fetchHook = useFetch()
    
    useEffect(() => {
        setIsCheckingError(false)
        refreshJobMenu()
    }, [])

    const refreshJobMenu = () => {
        fetchHook("/getListOfJobOptions", "GET")
        .then((response) => response.text())
        .then((result) => {
            const listOfJobDocuments:JobDocumentInterface[] = JSON.parse(result)
            setJobDocuments(listOfJobDocuments)
        })
        .catch((error) => console.error(error));
    }

    const turnOnDeleteModal = (jobDocDetails:JobDocumentInterface) => {
        setModalType("delete")
        setJobDocument(jobDocDetails)
    }

    const jobMenuObject:JobMenuObject = {
        jobDocument: jobDocument,
        refreshJobMenu: refreshJobMenu,
        setDeleteMode: setDeleteMode
    }

    return (
        <>
            <OptionsCreatorModal modalType={modalType} setModalType={setModalType} modalInputValue={modalInputValue} setModalInputValue={setModalInputValue} jobMenuObject={jobMenuObject}/>
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
                        <nav id="menuSettings">
                            <button onClick={() => setDeleteMode(!isDeleteMode)}>Delete Jobs</button>
                        </nav>
                        <h2>Draft Jobs</h2>
                        <section className="jobList">
                            {jobDocuments.map((jobDocument:JobDocumentInterface, index:number) => {
                                if(!jobDocument.prodReady)
                                    return <JobDocument key={index} JobDocumentDetails={jobDocument} isDeleteMode={isDeleteMode} turnOnDeleteModal={turnOnDeleteModal}/>
                            })}
                        </section>
                    </section>
                    <section className='jobMenuSection'>
                        <h2>Production Ready Jobs</h2>
                        <section className="jobList">
                            {jobDocuments.map((jobDocument:JobDocumentInterface, index:number) => {
                                if(jobDocument.prodReady)
                                return <JobDocument key={index} JobDocumentDetails={jobDocument} isDeleteMode={isDeleteMode} turnOnDeleteModal={turnOnDeleteModal}/>
                            })}
                        </section>
                    </section>
                </div>
            </div>
        </>
    )
}

export default JobMenu