import { useEffect, useState } from 'react'
import './App.css'
import OptionsCreator from './modules/OptionsCreator.tsx'
import { Routes, Route, Outlet, Link, useNavigate} from "react-router-dom";
import InputSearch from './modules/InputSearch.tsx';
import { JobInterface } from './modules/LotTableInterface.ts';

function App() {
  const [builder, setBuilder] = useState<string>("");
  const [project, setProject] = useState<string>("");
  const [phase, setPhase] = useState<string>("");
  const [superIntendent, setSuperIntendent] = useState<string>("");
  const [phoneNo, setPhoneNo] = useState<string>("");
  const [foreman, setForeman] = useState<string>("");
  const [jobID, setJobID] = useState<string>("");

  const navigate = useNavigate();
  
  const builderOptions : string[] = ["DR Horton", "Tri Pointe", "Richmond American", "Melia", "Dale", "Stella Pointe", "Lark"]
  const foremanOptions : string[] = ["Adrian Gonzalez", "Eduardo Jimenez", "Rogelio", "Keith Kelley", "Leonard Schmidt"]
  const noOptions : string[] = []
  const jobIDOptions : string[] = ["11312", "101239", "213132", "22123"]

  const goToOptionsCreator = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let jobOptions:JobInterface = {
      builder: builder,
      project: project,
      phase: phase,
      superintendent: superIntendent,
      phone: phoneNo,
      foreman: foreman,
      jobID: parseInt(jobID),
    }

    navigate("/creatingOptions/", {state: jobOptions})
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
            <InputSearch inputValue={builder} onInputChange={setBuilder} listOptions={builderOptions}></InputSearch>
          </div>
          <div className="formRow">
            <label>Project: </label>
            <InputSearch inputValue={project} onInputChange={setProject} listOptions={noOptions}></InputSearch>
          </div>
          <div className="formRow">
            <label>Phase: </label>
            <InputSearch inputValue={phase} onInputChange={setPhase} listOptions={noOptions}></InputSearch>
          </div>
          <div className="formRow">
            <label>Superintendent: </label>
            <InputSearch inputValue={superIntendent} onInputChange={setSuperIntendent} listOptions={noOptions}></InputSearch>
          </div>
          <div className="formRow">
            <label>Phone Number: </label>
            <InputSearch inputValue={phoneNo} onInputChange={setPhoneNo} listOptions={noOptions}></InputSearch>
          </div>
          <div className="formRow">
            <label>Area Foreman: </label>
            <InputSearch inputValue={foreman} onInputChange={setForeman} listOptions={foremanOptions}></InputSearch>
          </div>
          <div className="formRow">
            <label>Job ID: </label>
            <InputSearch inputValue={jobID} onInputChange={setJobID} listOptions={jobIDOptions}></InputSearch>
          </div>
          <button id="createJobButton">Create Form</button>
        </form>
      </section>
    </div>
  )
}

export default App
