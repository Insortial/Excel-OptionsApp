import React, { useContext, useEffect, useState } from 'react'
import '../App.css'
import { useNavigate } from "react-router-dom";
import InputSearch from '../modules/InputSearch.tsx';
import { ErrorObject, JobDetails, JobDocumentInterface, PackageDetails } from "../types/LotTableInterface";
import InputError from './InputError.tsx';
import { FormOptionsContext } from '../context/OptionsTemplateContext.tsx';
import { FormOptionsContextType } from '../types/FormOptions.ts';
import useFetch from '../hooks/useFetch.ts';

type lotJobResponse = {
  isJobIDValid: boolean,
  invalidLots: string[],
  validLots: string[]
}

function JobCreator() {
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
    prodReady: false
  }

  const [jobDetails, setJobDetails] = useState<JobDetails>(defaultJobDetails);
  const [validJobID, setValidJobID] = useState<boolean>(false)
  const [errors, setErrors] = useState<ErrorObject>({})
  const { setIsCheckingError } = useContext(FormOptionsContext) as FormOptionsContextType
  const navigate = useNavigate();
  const fetchHook = useFetch()

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  useEffect(() => {
    setIsCheckingError(false)
  }, [])
  

  useEffect(() => {
    if (String(jobDetails.jobID).length > 0) {
      fetchHook(`/getJobDetails/${jobDetails.jobID}`, "GET")
      .then((response) => response.status === 200 ? response.json() : undefined)
      .then((result) => {
        console.log(result)
        if(result.isValidJobID) {
          setValidJobID(true)
          setJobDetails(prevJobDetails => ({
            ...prevJobDetails,
            builder: result.customerName,
            project: result.projectName,
            phase: result.phase,
            foreman: result.foreman,
            lotNums: result.lotNums
          }));
        } else {
          setValidJobID(false)
        }
      }).catch((error) => console.error(error));
    }
  }, [jobDetails.jobID])

  const onFormChange = (value: string, key: string) => {
    setJobDetails(prevJobDetails => ({
        ...prevJobDetails,
        [key]: value
    }));
  }

  const checkValidLotNumJobID = async(lotNum:string[], jobID:number):Promise<lotJobResponse> => {
    const raw = JSON.stringify({
        "lotNumber": lotNum,
        "jobID": jobID
    });

    const response = await fetchHook("/isValidLotNumAndJobID", "POST", raw)
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    const data = await response.json()
    return data
  }

  const checkJobHasBeenMade = async(jobID:number):Promise<boolean> => {

    const response = await fetchHook("/getListOfJobOptions", "GET")
  
    if (!response.ok) {
        throw new Error(response.statusText);
    }

    const data = await response.text()
    const listOfJobDocuments:JobDocumentInterface[] = JSON.parse(data)

    const jobHasBeenMade = listOfJobDocuments.some(jobDoc => jobDoc.jobID === jobID)
    return jobHasBeenMade
  }

  const checkJobMadeInAccess = async (jobID:number):Promise<boolean> => {
    const response = await fetchHook(`/isJobMadeInAccess/${jobID}`, "GET")
  
    if (!response.ok) {
        throw new Error(response.statusText);
    }

    const data = await response.text()
    const jobMadeInAccess:boolean = JSON.parse(data)?.isValidJobID 

    return jobMadeInAccess === undefined ? false : jobMadeInAccess
  }

  const getPackageDetails = async () => {
    const response = await fetchHook(`/getPackageForJobID/${jobDetails.jobID}`, "GET")
    if (!response.ok) {
      return null
    }

    const data = await response.text()
    const packages = JSON.parse(data)
    return packages
  }


  const validate = async () => {
    const requiredFields = ["builder", "project", "optionCoordinator", "phase", "date", "jobID"];
    const newErrors:ErrorObject = {};
    const jobIDIsValid = (await checkValidLotNumJobID([], Number(jobDetails["jobID"]))).isJobIDValid
    const jobHasBeenMade = (await checkJobHasBeenMade(Number(jobDetails["jobID"])))
    const jobNotMadeInAccess = (await checkJobMadeInAccess(Number(jobDetails["jobID"])))
    if(jobHasBeenMade)
      newErrors["jobID"] = "Job Options have already been created"
    
    if(!jobIDIsValid)
      newErrors["jobID"] = "Invalid Job ID"

    if(!jobNotMadeInAccess)
      newErrors["jobID"] = "Job already made in Access"

    Object.keys(jobDetails).forEach((key) => {
      if(requiredFields.includes(key) && !jobDetails[key as keyof JobDetails]) 
        newErrors[key] = "Field is required, please fill out"
    })
    

    return newErrors;
  }

  const goToOptionsCreator = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    let state = {}
    const validateValues = await validate()
    const packageDetails:PackageDetails = await getPackageDetails()
    state = {jobDetails: jobDetails, packageDetails: packageDetails, hasPackage: packageDetails !== null}

    console.log(state)
    if(Object.keys(validateValues).length === 0) {
      navigate("/optionCreator/", {state: state})
      navigate(0)
    } else {
      setErrors(validateValues)
    }
      

  }

  return (
    <div id="mainScreen">
      <div id="titleCover">
        <h1>Start New<br></br>Job</h1>
      </div>
      <section id="formSection">
        <form onSubmit={goToOptionsCreator}>
          <h2>Enter Job Details:</h2>
          <div className="formRow">
            <label htmlFor={"jobID"}>Job ID: </label>
            <InputSearch inputName={"jobID"} formState={jobDetails} onFormChange={onFormChange} isDropDown={false}></InputSearch>
            <InputError errorKey={"jobID"} errorState={errors}></InputError>
          </div>
          <div id="jobDisplay" className="creatorDisplay">
            {validJobID ? (
              <>
                <h4>Customer Name: {jobDetails.builder}</h4>
                <h4>Project Name: {jobDetails.project}</h4>
                <h4>Phase: {jobDetails.phase}</h4>
                <h4>Area Foreman: {jobDetails.foreman}</h4>
              </>
            ): (<h3 style={{color: "red"}}>Invalid Job ID</h3>)}
          </div>
          <div className="formRow">
            <label htmlFor={"date"}>Date: </label>
            <InputSearch inputName={"date"} formState={jobDetails} onFormChange={onFormChange} isDropDown={false}></InputSearch>
            <InputError errorKey={"date"} errorState={errors}></InputError>
          </div>
          <div className="formRow">
            <label htmlFor={"optionCoordinator"}>Options Coordinator: </label>
            <InputSearch inputName={"optionCoordinator"} formState={jobDetails} onFormChange={onFormChange} isDropDown={false}></InputSearch>
            <InputError errorKey={"optionCoordinator"} errorState={errors}></InputError>
          </div>
          <button className="createButton">Create Form</button>
        </form>
      </section>
    </div>
  )
}

export default JobCreator
