import { useEffect, useState } from 'react'
import './App.css'
import OptionsCreator from './modules/OptionsCreator.tsx'
import { Routes, Route, Outlet, Link, useNavigate} from "react-router-dom";
import InputSearch from './modules/InputSearch.tsx';
import { JobInterface } from './modules/LotTableInterface.ts';

function App() {
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

  const builderOptions : string[] = ["DR Horton", "Tri Pointe", "Richmond American", "Melia", "Dale", "Stella Pointe", "Lark"]
  const foremanOptions : string[] = ["Adrian Gonzalez", "Eduardo Jimenez", "Rogelio", "Keith Kelley", "Leonard Schmidt"]
  const noOptions : string[] = []
  const jobIDOptions : string[] = ["11312", "101239", "213132", "22123"]

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
            <InputSearch inputName={"builder"} formState={jobForm} onFormChange={onFormChange} listOptions={builderOptions}></InputSearch>
          </div>
          <div className="formRow">
            <label>Project: </label>
            <InputSearch inputName={"project"} formState={jobForm} onFormChange={onFormChange} listOptions={noOptions}></InputSearch>
          </div>
          <div className="formRow">
            <label>Phase: </label>
            <InputSearch inputName={"phase"} formState={jobForm} onFormChange={onFormChange} listOptions={noOptions}></InputSearch>
          </div>
          <div className="formRow">
            <label>Superintendent: </label>
            <InputSearch inputName={"superintendent"} formState={jobForm} onFormChange={onFormChange} listOptions={noOptions}></InputSearch>
          </div>
          <div className="formRow">
            <label>Phone Number: </label>
            <InputSearch inputName={"phone"} formState={jobForm} onFormChange={onFormChange} listOptions={noOptions}></InputSearch>
          </div>
          <div className="formRow">
            <label>Area Foreman: </label>
            <InputSearch inputName={"foreman"} formState={jobForm} onFormChange={onFormChange} listOptions={foremanOptions}></InputSearch>
          </div>
          <div className="formRow">
            <label>Job ID: </label>
            <InputSearch inputName={"jobID"} formState={jobForm} onFormChange={onFormChange} listOptions={jobIDOptions}></InputSearch>
          </div>
          <button id="createJobButton">Create Form</button>
        </form>
      </section>
    </div>
  )
}

export default App
