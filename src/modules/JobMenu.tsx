/* eslint-disable react/react-in-jsx-scope */
import { useContext, useEffect, useState } from 'react'
import JobDocument from './JobDocument.tsx';
import { JobDocumentInterface, FilterObject } from '@excelcabinets/excel-types/LotTableInterface';
import { FormOptionsContext } from '../context/OptionsTemplateContext.tsx';
import { FormOptionsContextType } from '@excelcabinets/excel-types/FormOptions';
import useFetch from '../hooks/useFetch.ts';
import OptionsCreatorModal from './OptionsCreatorModal.tsx';
import { JobMenuObject } from '../types/ModalTypes.ts';
import InputSearch from './InputSearch.tsx';
import DeleteOptionModal from './ModalScreens/DeleteOptionModal.tsx';
import Header from './Header.tsx';
import { useForm } from 'react-hook-form';


const JobMenu = () => {
    const [jobDocuments, setJobDocuments] = useState<JobDocumentInterface[]>([])
    const [menuType/*, setMenuType*/] = useState<"job"|"project">("job")
    const [modalType, setModalType] = useState<string>("none")
    const [jobDocument, setJobDocument] = useState<JobDocumentInterface|null>(null)
    //const [filterObject, setFilterObject] = useState<FilterObject>({jobID: '', builder: '', project: '', user: ''})
    const { getValues, setValue, reset, watch } = useForm<FilterObject>({defaultValues: {jobID: '', builder: '', project: '', user: ''}})
    const [isDeleteMode, setDeleteMode] = useState<boolean>(false)
    const { setIsCheckingError, getFormIDs } = useContext(FormOptionsContext) as FormOptionsContextType
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
            const sortedJobDocuments = listOfJobDocuments.sort((a, b) => {
                if(!a.dateUpdated) return 1
                if(!b.dateUpdated) return -1
                return b.dateUpdated.localeCompare(a.dateUpdated)
            })

            setJobDocuments(sortedJobDocuments)
        })
        .catch((error) => console.error(error));
    }

    const turnOnDeleteModal = (jobDocDetails:JobDocumentInterface) => {
        setModalType("delete")
        setJobDocument(jobDocDetails)
    }

    const onFilterChange = (key: string, value: string) => {
        console.log(getFormIDs(value, "user"))
        setValue(key as keyof FilterObject, value)
    }

    const jobMenuObject:JobMenuObject = {
        jobDocument: jobDocument,
        refreshJobMenu: refreshJobMenu,
        setDeleteMode: setDeleteMode
    }

    const filterJobDocuments = (jobDocument:JobDocumentInterface):boolean =>{
        const jobID = jobDocument.jobID.toString()
        const filterObject = watch()
        return (jobDocument.customerName === filterObject.builder || filterObject.builder === "")
                && (jobDocument.projectName === filterObject.project || filterObject.project === "")
                && (jobID.includes(filterObject.jobID) || jobID === "")
                && (jobDocument.optionCoordinator === filterObject.user || filterObject.user === "")
    }

    const turnOffModal = () => {
        setModalType("none")
    }

    return (
        <>
            <OptionsCreatorModal modalType={modalType} turnOffModal={turnOffModal}>
                {modalType === "delete" ? 
                    <DeleteOptionModal jobMenuObject={jobMenuObject} turnOffModal={turnOffModal}/> : 
                <></>}
            </OptionsCreatorModal>
            <div id="jobMenuScreen">
                <Header currentPage='jobMenu'/>
                <div id="jobMenuBody">
                    <section className='jobMenuSection'>
                       {/*  <nav id="menuType">
                            <button id={menuType === "job" ? "selectedType" : ""} onClick={() => setMenuType("job")}>By Job</button>
                            <button id={menuType === "project" ? "selectedType" : ""} onClick={() => setMenuType("project")}>By Project</button>
                        </nav> */}
                        <div id="filterButtons">
                            <button className='deleteOption' onClick={() => setDeleteMode(!isDeleteMode)}>Delete Job</button>
                            <button className='resetFilters' onClick={() => reset({jobID: '', builder: '', project: '', user: ''})}>Reset Filters</button>
                        </div>
                        <div id="filterOptions">
                            <label>Job ID:</label>
                            <InputSearch isDropDown={false} getFormValues={getValues} onFormChange={onFilterChange} inputName={'jobID'} />
                            <label>Builder:</label>
                            <InputSearch isDropDown={true} getFormValues={getValues} onFormChange={onFilterChange} inputName={'builder'} />
                            <label>Project:</label>
                            <InputSearch isDropDown={true} getFormValues={getValues} onFormChange={onFilterChange} inputName={'project'} />
                            <label>User:</label>
                            <InputSearch isDropDown={true} getFormValues={getValues} onFormChange={onFilterChange} inputName={'user'} />
                        </div>
                    </section>
                    {menuType === "job" ? <>
                    <section className='jobMenuSection'>
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
                    </> : <></>}
                </div>
            </div>
        </>
    )
}

export default JobMenu