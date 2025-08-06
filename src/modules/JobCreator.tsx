import React, { useContext, useEffect, useState } from 'react'
import '../App.css'
import { Link, useNavigate } from "react-router-dom";
import InputSearch from '../modules/InputSearch.tsx';
import { ErrorObject, JobDetails, JobDocumentInterface, PackageDetails } from "@excelcabinets/excel-types/LotTableInterface";
import InputError from './InputError.tsx';
import { FormOptionsContext } from '../context/OptionsTemplateContext.tsx';
import { FormOptionsContextType } from '@excelcabinets/excel-types/FormOptions';
import useFetch from '../hooks/useFetch.ts';
import { AuthInfo } from '../context/AuthContext.tsx';
import { defaultJobDetails } from '../templates/initialValues.ts';
import { useForm } from 'react-hook-form';

type lotJobResponse = {
  isJobIDValid: boolean,
  invalidLots: string[],
  validLots: string[]
}

function JobCreator() {
  const { authState } = AuthInfo()
  const { userID } = authState
  const { getValues, setValue, watch, reset } = useForm<JobDetails>({defaultValues: {...defaultJobDetails, coordinatorIDFK: userID}})
  const [validJobID, setValidJobID] = useState<boolean>(false)
  const [errors, setErrors] = useState<ErrorObject>({})
  const { setIsCheckingError } = useContext(FormOptionsContext) as FormOptionsContextType
  const watchJobID = watch("jobID")
  const navigate = useNavigate();
  const fetchHook = useFetch()

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  useEffect(() => {
    setIsCheckingError(false)
  }, [])
  

  useEffect(() => {
    if (String(getValues("jobID")).length > 0) {
      fetchHook(`/getJobDetails/${getValues("jobID")}`, "GET")
      .then((response) => response.status === 200 ? response.json() : undefined)
      .then((result) => {
        console.log(result)
        if(result.isValidJobID) {
          setValidJobID(true)
          reset(prevJobDetails => ({
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
  }, [watchJobID])

  const onFormChange = ( key: string, value: string) => {
    setValue(key as keyof JobDetails, value)
  }

  const checkValidJobID = async(jobID:number):Promise<lotJobResponse> => {

    const response = await fetchHook(`/isValidJobID/${jobID}`, "GET")
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

  const checkIfAllLotsMade = async (jobID:number):Promise<boolean> => {
    const response = await fetchHook(`/${jobID}/allLotsMade`, "GET")
  
    if (!response.ok) {
        throw new Error(response.statusText);
    }

    const data = await response.json()

    return data.allLotsMade
  }


  const getPackageDetails = async () => {
    const response = await fetchHook(`/getPackageForJobID/${getValues("jobID")}`, "GET")
    if (!response.ok) {
      return null
    }

    const data = await response.text()
    const packages = JSON.parse(data)
    return packages
  }


  const validate = async () => {
    const requiredFields = ["builder", "project", "phase", "jobID"];
    const newErrors:ErrorObject = {};
    const jobID = Number(getValues("jobID"))
    const jobIDIsValid = (await checkValidJobID(jobID)).isJobIDValid
    const jobHasBeenMade = (await checkJobHasBeenMade(jobID))
    const allLotsMade = (await checkIfAllLotsMade(jobID))

    if(getValues("lotNums").length === 0)
      newErrors["jobID"] = "Lots have not been created at this jobID"

    if(jobHasBeenMade)
      newErrors["jobID"] = "Job Option has already been made"
    
    if(allLotsMade)
      newErrors["jobID"] = "All lots have been made for this Job in Access"

    if(!jobIDIsValid)
      newErrors["jobID"] = "Invalid Job ID"

    Object.keys(getValues()).forEach((key) => {
      if(requiredFields.includes(key) && !getValues(key as keyof JobDetails)) 
        newErrors[key] = "Field is required, please fill out"
    })
    

    return newErrors;
  }

  const goToOptionsCreator = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    let state = {}
    const validateValues = await validate()
    const packageDetails:PackageDetails = await getPackageDetails()

    state = {jobDetails: getValues(), packageDetails: packageDetails, hasPackage: packageDetails !== null}

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
        <Link to="/jobMenu" style={{marginTop: "auto"}}>Back to Job Menu</Link>
      </div>
      <section id="formSection">
        <form onSubmit={goToOptionsCreator}>
          <h2>Enter Job ID</h2>
          <div className="formRow">
            <label htmlFor={"jobID"}>Job ID: </label>
            <InputSearch inputName={"jobID"} getFormValues={getValues} onFormChange={onFormChange} isDropDown={false}></InputSearch>
            <InputError errorKey={"jobID"} errorState={errors}></InputError>
          </div>
          <div id="jobDisplay" className="creatorDisplay">
            {validJobID ? (
              <>
                <h4>Customer Name: {getValues("builder")}</h4>
                <h4>Project Name: {getValues("project")}</h4>
                <h4>Phase: {getValues("phase")}</h4>
                <h4>Area Foreman: {getValues("foreman")}</h4>
              </>
            ): (<h3 style={{color: "red"}}>Invalid Job ID</h3>)}
          </div>
          <button className="createButton">Create Form</button>
        </form>
      </section>
    </div>
  )
}

export default JobCreator
