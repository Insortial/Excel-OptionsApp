import React, { useContext, useEffect, useRef, useState } from 'react'
import '../App.css'
import { Link, useNavigate } from "react-router-dom";
import InputSearch from '../modules/InputSearch.tsx';
import { ErrorObject, JobDetails, PackageInfo } from "../types/LotTableInterface.ts";
import InputError from './InputError.tsx';
import { FormOptionsContext } from '../context/OptionsTemplateContext.tsx';
import { FormOptionsContextType } from '../types/FormOptions.ts';
import useFetch from '../hooks/useFetch.ts';
import OptionsCreatorModal from './OptionsCreatorModal.tsx';
import { PackageObject } from '../types/ModalTypes.ts';
import DeleteOptionModal from './ModalScreens/DeleteOptionModal.tsx';

const defaultJobDetails:JobDetails = {
  builder: "",
  project: "",
  superintendent: "",
  optionCoordinator: "",
  jobNotes: "",
  phone: "",
  lotNums: [],
  foreman: "",
  phase: "",
  jobID: "",
  date: "",
  dateUpdated: "",
  lastUpdatedBy: "",
  prodReady: false
}


function JobPackageCreator() {
  const [packages, setPackages] = useState<PackageInfo[]>([]);
  const [jobDetails, setJobDetails] = useState<JobDetails>(defaultJobDetails);
  const [modalType, setModalType] = useState<string>("none")
  const [packageToDelete, setPackageToDelete] = useState<PackageInfo | null>(null)
  const [errors, setErrors] = useState<ErrorObject>({})
  const { setIsCheckingError } = useContext(FormOptionsContext) as FormOptionsContextType
  const navigate = useNavigate();
  const fetchHook = useFetch()
  const packageNameRef = useRef<HTMLInputElement>(null)

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  useEffect(() => {
    setIsCheckingError(false)
    refreshPackages()
  }, [])

  const refreshPackages = () => {
    fetchHook(`/getPackages/`, "GET")
    .then((response) => response.status === 200 ? response.json() : undefined)
    .then((result) => {
      setPackages(result)
    }).catch((error) => {
      console.error(error)
    });
  }

  useEffect(() => {
    fetchHook(`/getPackages/?project=${jobDetails.builder}`, "GET")
    .then((response) => response.status === 200 ? response.json() : undefined)
    .then((result) => {
      console.log(result)
      if(result.length !== 0)
        setPackages(result)
      else
        refreshPackages()
    }).catch((error) => {
      console.error(error)
    });
  }, [jobDetails.builder])

  const onFormChange = (value: string, key: string) => {
    setJobDetails(prevJobDetails => ({
        ...prevJobDetails,
        [key]: value
    }));
  }

  const validate = async () => {
    const newErrors:ErrorObject = {};
    if(packageNameRef.current?.value === "")
      newErrors["package"] = "Invalid package name"

    if(!jobDetails.builder) 
      newErrors["builder"] = "Field is required, please fill out"
    
    setErrors(newErrors)

    return Object.keys(newErrors).length === 0;
  }

  const goToPackageCreator = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(await validate())
      navigate("/optionCreator/", {state: {packageName: packageNameRef.current?.value, packageDetails: jobDetails}})
  }

  const turnOnDeleteModal = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>, packageDetails:PackageInfo) => {
    e.preventDefault()
    setModalType("delete")
    setPackageToDelete(packageDetails)
  }

  const turnOffModal = () => {
    setModalType("none")
  }

  const packageObject:PackageObject = {
    packageDetails: packageToDelete,
    refreshPackages: refreshPackages,
  }

  return (
    <>
      <OptionsCreatorModal modalType={modalType} turnOffModal={turnOffModal}>
        {modalType === "delete" ? 
            <DeleteOptionModal turnOffModal={turnOffModal} packageObject={packageObject}/> : 
        <></>}
      </OptionsCreatorModal>
      <div id="mainScreen">
        <div id="titleCover">
          <h1>Job Package<br></br>Manager</h1>
          <Link to="/jobMenu" style={{marginTop: "auto"}}>Back to Job Menu</Link>
        </div>
        <section id="formSection">
          <form onSubmit={goToPackageCreator}>
              <h2>View Builder Packages</h2>
              <div id="packageDisplay" className="creatorDisplay" style={{display: packages?.length > 0 ? "block" : "none"}}>
                <div>
                  <h5>Packages</h5>
                  <h5>Names</h5>
                </div>
                {packages?.map((item, index) => {
                    return <div key={index}>
                              <h5>{item.packageName}</h5>
                              <section>
                                <h5>{item.projectName.join(", ")}</h5> 
                                <section className='packageButtons'>
                                  <Link className="editPackage" to={"/optionCreator/package/" + item.packageID}>Edit</Link>
                                  <button className='deletePackage' onClick={e => turnOnDeleteModal(e, item)}>Delete</button>
                                </section>
                                
                              </section>
                          </div>
                  })}
              </div>
              <div className="formRow">
                  <label htmlFor={"builder"}>Builder Name</label>
                  <InputSearch inputName={"builder"} formState={jobDetails} onFormChange={onFormChange} isDropDown={true}></InputSearch>
                  <InputError errorKey={"builder"} errorState={errors}></InputError>
              </div>
              <div className="formRow">
                  <label htmlFor={"packageName"}>Package Name</label>
                  <input id='packageName' ref={packageNameRef}></input>
                  <InputError errorKey={"package"} errorState={errors}></InputError>
              </div>
              <button className="createButton">Create Package</button>
          </form>
        </section>
      </div>
    </>
  )
}

export default JobPackageCreator
