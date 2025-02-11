/* eslint-disable react/react-in-jsx-scope */
import { useContext, useEffect, useState } from 'react'
import JobDocument from './JobDocument.tsx';
import { Link, useNavigate } from 'react-router-dom';
import { JobDocumentInterface, FilterObject } from '../types//LotTableInterface.ts';
import { FormOptionsContext } from '../context/OptionsTemplateContext.tsx';
import { FormOptionsContextType } from '../types/FormOptions.ts';
import useFetch from '../hooks/useFetch.ts';
import OptionsCreatorModal from './OptionsCreatorModal.tsx';
import { JobMenuObject } from '../types/ModalTypes.ts';
import { LoggedInUpdate } from '../context/AuthContext.tsx';
import InputSearch from './InputSearch.tsx';


const JobMenu = () => {
    const [jobDocuments, setJobDocuments] = useState<JobDocumentInterface[]>([])
    const [modalType, setModalType] = useState<string>("none")
    const [jobDocument, setJobDocument] = useState<JobDocumentInterface|null>(null)
    const [filterObject, setFilterObject] = useState<FilterObject>({jobID: '', builder: '', project: ''})
    const [modalInputValue, setModalInputValue] = useState<string>("")
    const [isDeleteMode, setDeleteMode] = useState<boolean>(false)
    const { setIsCheckingError } = useContext(FormOptionsContext) as FormOptionsContextType
    const { saveLogInState } = LoggedInUpdate()
    const fetchHook = useFetch()
    const navigate = useNavigate()
    
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

    const onFilterChange = (value: string, key: string) => {
        setFilterObject({...filterObject, [key]: value})
    }

    const jobMenuObject:JobMenuObject = {
        jobDocument: jobDocument,
        refreshJobMenu: refreshJobMenu,
        setDeleteMode: setDeleteMode
    }

    const logOut = async () => {
        const config:RequestInit = {
            method: 'DELETE',
            credentials: "include"
        }
        await fetch(`${import.meta.env.VITE_AUTH_URL}/logout`, config)
        saveLogInState(false)
        navigate("/login", { replace: true })
    }

    const filterJobDocuments = (jobDocument:JobDocumentInterface):boolean =>{
        const jobID = jobDocument.jobID.toString()
        return (jobDocument.customerName === filterObject.builder || filterObject.builder === "")
                && (jobDocument.projectName === filterObject.project || filterObject.project === "")
                && (jobID.includes(filterObject.jobID) || jobID === "")
    }

    return (
        <>
            <OptionsCreatorModal modalType={modalType} setModalType={setModalType} modalInputValue={modalInputValue} setModalInputValue={setModalInputValue} jobMenuObject={jobMenuObject}/>
            <div id="jobMenuScreen">
                <header id="jobMenuHeader">
                    <h1>Job Menu</h1>
                    <h4 id="logOutButton" onClick={logOut}>Logout</h4>
                    <nav>
                        <Link to="/creatingJob" className='jobMenuButtons'>Create Job Document</Link>
                        <Link to="/creatingJobPackage" className='jobMenuButtons'>Edit/Create Job Package</Link>
                        <Link to="/formOptions" className='jobMenuButtons'>Edit Form Options</Link>
                    </nav>
                </header>
                <div id="jobMenuBody">
                    <section className='jobMenuSection'>
                        <nav id="menuSettings">
                            <div id="filterOptions">
                                <label>Job ID:</label>
                                <InputSearch isDropDown={false} formState={filterObject} onFormChange={onFilterChange} inputName={'jobID'} />
                                <label>Builder:</label>
                                <InputSearch isDropDown={true} formState={filterObject} onFormChange={onFilterChange} inputName={'builder'} />
                                <label>Project:</label>
                                <InputSearch isDropDown={true} formState={filterObject} onFormChange={onFilterChange} inputName={'project'} />
                                <button onClick={() => setFilterObject({jobID: '', builder: '', project: ''})}>Reset Filters</button>
                            </div>

                            <button onClick={() => setDeleteMode(!isDeleteMode)}>Delete Jobs</button>
                        </nav>
                        <h2>Draft Jobs</h2>
                        <section className="jobList">
                            {jobDocuments.map((jobDocument:JobDocumentInterface, index:number) => {
                                if(!jobDocument.prodReady && filterJobDocuments(jobDocument))
                                    return <JobDocument key={index} JobDocumentDetails={jobDocument} isDeleteMode={isDeleteMode} turnOnDeleteModal={turnOnDeleteModal}/>
                            })}
                        </section>
                    </section>
                    <section className='jobMenuSection'>
                        <h2>Production Ready Jobs</h2>
                        <section className="jobList">
                            {jobDocuments.map((jobDocument:JobDocumentInterface, index:number) => {
                                if(jobDocument.prodReady && filterJobDocuments(jobDocument))
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