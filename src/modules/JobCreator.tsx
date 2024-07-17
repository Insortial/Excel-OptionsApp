import { useState } from 'react'
import '../App.css'
import { useNavigate} from "react-router-dom";
import InputSearch from '../modules/InputSearch.tsx';
import { ErrorObject, JobDetails } from '../types/LotTableInterface.ts';
import InputError from './InputError.tsx';

function JobCreator({}) {
  let defaultJobDetails:JobDetails = {
    builder: "",
    project: "",
    phase: "",
    superintendent: "",
    phone: "",
    foreman: "",
    jobID: 0,
    date: "",
    lotFooter: "",
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
  const [errors, setErrors] = useState<ErrorObject>({})
  const navigate = useNavigate();

  const onFormChange = (value: string, key: string) => {
    setJobDetails(prevJobDetails => ({
        ...prevJobDetails,
        [key]: value
    }));
  }

  const validate = () => {
    const requiredFields = ["builder", "project", "foreman", "phase", "date", "jobID"];
    const newErrors:ErrorObject = {};
    Object.keys(jobDetails).forEach((key) => {
      if(requiredFields.includes(key) && !jobDetails[key as keyof JobDetails]) 
        newErrors[key] = "Field is required, please fill out"

      if(key === "jobID" && isNaN(Number(jobDetails[key as keyof JobDetails])))
        newErrors[key] = "Incorrect format, must be a number"
    })
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0;
  }

  const goToOptionsCreator = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(validate())
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
          <div className="formRow">
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
          </div>
          <div className="formRow">
            <label htmlFor={"jobID"}>Job ID: </label>
            <InputSearch inputName={"jobID"} formState={jobDetails} onFormChange={onFormChange} isDropDown={false}></InputSearch>
            <InputError errorKey={"jobID"} errorState={errors}></InputError>
          </div>
          <div className="formRow">
            <label htmlFor={"date"}>Date: </label>
            <InputSearch inputName={"date"} formState={jobDetails} onFormChange={onFormChange} isDropDown={false}></InputSearch>
            <InputError errorKey={"date"} errorState={errors}></InputError>
          </div>
          <button id="createJobButton">Create Form</button>
        </form>
      </section>
    </div>
  )
}

export default JobCreator
