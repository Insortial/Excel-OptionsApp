import { useEffect, useState } from 'react'
import '../App.css'
import { useNavigate } from "react-router-dom";
import InputSearch from '../modules/InputSearch.tsx';
import { ErrorObject, JobDetails } from "../../../types/LotTableInterface";
import InputError from './InputError.tsx';

function JobCreator({}) {
  let defaultJobDetails:JobDetails = {
    builder: "",
    project: "",
    phase: "",
    superintendent: "",
    optionCoordinator: "",
    jobNotes: "",
    phone: "",
    foreman: "",
    jobID: 0,
    date: "",
    kitchen: "",
    master: "",
    bath2: "",
    bath3: "",
    bath4: "",
    powder: "",
    laundry: "",
    footerNotes: ""
  }

  const [jobDetails, setJobDetails] = useState<JobDetails>(defaultJobDetails);
  const [validJobID, setValidJobID] = useState<boolean>(false)
  const [errors, setErrors] = useState<ErrorObject>({})
  const navigate = useNavigate();

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
    if (jobDetails.jobID.length > 0) {
      fetch(import.meta.env.VITE_BACKEND_URL + `/getJobDetails/${jobDetails.jobID}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if(result.isValidJobID) {
          setValidJobID(true)
          setJobDetails(prevJobDetails => ({
            ...prevJobDetails,
            builder: result.customerName,
            project: result.projectName,
            phase: result.phase,
            foreman: result.foreman
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

  const checkValidLotNumJobID = async(lotNum:string[], jobID:number):Promise<any> => {
    const raw = JSON.stringify({
        "lotNumber": lotNum,
        "jobID": jobID
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
    };

    const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/isValidLotNumAndJobID", requestOptions)
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    const data = await response.json()
    return data
  }

  const validate = async () => {
    const requiredFields = ["builder", "project", "optionCoordinator", "phase", "date", "jobID"];
    const newErrors:ErrorObject = {};
    let jobIDIsValid = (await checkValidLotNumJobID([], Number(jobDetails["jobID"]))).isJobIDValid
    if(!jobIDIsValid)
      newErrors["jobID"] = "Invalid Job ID"

    Object.keys(jobDetails).forEach((key) => {
      if(requiredFields.includes(key) && !jobDetails[key as keyof JobDetails]) 
        newErrors[key] = "Field is required, please fill out"
    })
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0;
  }

  const goToOptionsCreator = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(await validate())
      navigate("/creatingOptions/", {state: jobDetails})
  }

  return (
    <div id="mainScreen">
      <div id="titleCover">
        <h1>Start New<br></br>Job</h1>
      </div>
      <section id="formSection">
        <form onSubmit={goToOptionsCreator}>
          <h2>Enter Job Details:</h2>
          {/* <div className="formRow">
            <label htmlFor={"builder"}>Builder: </label>
            <InputSearch inputName={"builder"} formState={jobDetails} onFormChange={onFormChange} isDropDown={true}></InputSearch>
            <InputError errorKey={"builder"} errorState={errors}></InputError>
          </div>
          <div className="formRow">
            <label htmlFor={"project"}>Project: </label>
            <InputSearch inputName={"project"} formState={jobDetails} onFormChange={onFormChange} isDropDown={true}></InputSearch>
            <InputError errorKey={"project"} errorState={errors}></InputError>
          </div>
          <div className="formRow">
            <label htmlFor={"phase"}>Phase: </label>
            <InputSearch inputName={"phase"} formState={jobDetails} onFormChange={onFormChange} isDropDown={false}></InputSearch>
            <InputError errorKey={"phase"} errorState={errors}></InputError>
          </div>
          <div className="formRow">
            <label htmlFor={"superintendent"}>Superintendent: </label>
            <InputSearch inputName={"superintendent"} formState={jobDetails} onFormChange={onFormChange} isDropDown={false}></InputSearch>
            <InputError errorKey={"superintendent"} errorState={errors}></InputError>
          </div>
          <div className="formRow">
            <label htmlFor={"phone"}>Phone Number: </label>
            <InputSearch inputName={"phone"} formState={jobDetails} onFormChange={onFormChange} isDropDown={false}></InputSearch>
            <InputError errorKey={"phone"} errorState={errors}></InputError>
          </div>
          <div className="formRow">
            <label htmlFor={"foreman"}>Area Foreman: </label>
            <InputSearch inputName={"foreman"} formState={jobDetails} onFormChange={onFormChange} isDropDown={true}></InputSearch>
            <InputError errorKey={"foreman"} errorState={errors}></InputError>
          </div> */}
          <div className="formRow">
            <label htmlFor={"jobID"}>Job ID: </label>
            <InputSearch inputName={"jobID"} formState={jobDetails} onFormChange={onFormChange} isDropDown={false}></InputSearch>
            <InputError errorKey={"jobID"} errorState={errors}></InputError>
          </div>
          <div className="jobDisplay">
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
          <button id="createJobButton">Create Form</button>
        </form>
      </section>
    </div>
  )
}

export default JobCreator
