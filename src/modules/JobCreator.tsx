import { useContext, useEffect, useState } from 'react'
import '../App.css'
import { Routes, Route, Outlet, Link, useNavigate} from "react-router-dom";
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
    jobID: ""
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
            <label>Builder: </label>
            <InputSearch inputName={"builder"} formState={jobForm} onFormChange={onFormChange} isDropDown={true}></InputSearch>
          </div>
          <div className="formRow">
            <label>Project: </label>
            <InputSearch inputName={"project"} formState={jobForm} onFormChange={onFormChange} isDropDown={true}></InputSearch>
          </div>
          <div className="formRow">
            <label>Phase: </label>
            <InputSearch inputName={"phase"} formState={jobForm} onFormChange={onFormChange} isDropDown={false}></InputSearch>
          </div>
          <div className="formRow">
            <label>Superintendent: </label>
            <InputSearch inputName={"superintendent"} formState={jobForm} onFormChange={onFormChange} isDropDown={false}></InputSearch>
          </div>
          <div className="formRow">
            <label>Phone Number: </label>
            <InputSearch inputName={"phone"} formState={jobForm} onFormChange={onFormChange} isDropDown={false}></InputSearch>
          </div>
          <div className="formRow">
            <label>Area Foreman: </label>
            <InputSearch inputName={"foreman"} formState={jobForm} onFormChange={onFormChange} isDropDown={false}></InputSearch>
          </div>
          <div className="formRow">
            <label>Job ID: </label>
            <InputSearch inputName={"jobID"} formState={jobForm} onFormChange={onFormChange} isDropDown={false}></InputSearch>
          </div>
          <button id="createJobButton">Create Form</button>
        </form>
      </section>
    </div>
  )
}

export default JobCreator
