import { useState } from 'react'
import '../App.css'
import { useNavigate} from "react-router-dom";
import InputSearch from '../modules/InputSearch.tsx';
import { JobInterface } from '../types/LotTableInterface.ts';

function JobCreator({}) {
  let defaultJobForm:JobInterface = {
    builder: "",
    project: "",
    phase: "",
    superintendent: "",
    phone: "",
    foreman: "",
    jobID: "",
    date: ""
  }

  const [jobForm, setJobForm] = useState<JobInterface>(defaultJobForm);
  const navigate = useNavigate();

  const onFormChange = (value: string, key: string) => {
    setJobForm(prevForm => ({
        ...prevForm,
        [key]: value
    }));
  }

  const goToOptionsCreator = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate("/creatingOptions/", {state: jobForm})
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
            <InputSearch inputName={"builder"} formState={jobForm} onFormChange={onFormChange} isDropDown={true}></InputSearch>
          </div>
          <div className="formRow">
            <label htmlFor={"project"}>Project: </label>
            <InputSearch inputName={"project"} formState={jobForm} onFormChange={onFormChange} isDropDown={true}></InputSearch>
          </div>
          <div className="formRow">
            <label htmlFor={"phase"}>Phase: </label>
            <InputSearch inputName={"phase"} formState={jobForm} onFormChange={onFormChange} isDropDown={false}></InputSearch>
          </div>
          <div className="formRow">
            <label htmlFor={"superintendent"}>Superintendent: </label>
            <InputSearch inputName={"superintendent"} formState={jobForm} onFormChange={onFormChange} isDropDown={false}></InputSearch>
          </div>
          <div className="formRow">
            <label htmlFor={"phone"}>Phone Number: </label>
            <InputSearch inputName={"phone"} formState={jobForm} onFormChange={onFormChange} isDropDown={false}></InputSearch>
          </div>
          <div className="formRow">
            <label htmlFor={"foreman"}>Area Foreman: </label>
            <InputSearch inputName={"foreman"} formState={jobForm} onFormChange={onFormChange} isDropDown={true}></InputSearch>
          </div>
          <div className="formRow">
            <label htmlFor={"jobID"}>Job ID: </label>
            <InputSearch inputName={"jobID"} formState={jobForm} onFormChange={onFormChange} isDropDown={false}></InputSearch>
          </div>
          <div className="formRow">
            <label htmlFor={"date"}>Date: </label>
            <InputSearch inputName={"date"} formState={jobForm} onFormChange={onFormChange} isDropDown={false}></InputSearch>
          </div>
          <button id="createJobButton">Create Form</button>
        </form>
      </section>
    </div>
  )
}

export default JobCreator
