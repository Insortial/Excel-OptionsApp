import { useState } from 'react'
import './App.css'
import OptionsCreator from './modules/OptionsCreator.tsx'
import { Routes, Route, Outlet} from "react-router-dom";
import InputSearch from './modules/InputSearch.tsx';

function App() {
  const builderOptions : string[] = ["DR Horton", "Tri Pointe", "Richmond American", "Melia", "Dale", "Stella Pointe", "Lark"]
  
  return (
    <div id="mainScreen">
      <div id="titleCover">
        <h1>Start New<br></br>Job</h1>
      </div>
      <section id="formSection">
        <h2>Enter Job Details:</h2>
        <form>
          <div className="formRow">
            <label>Builder: </label>
            <InputSearch listOptions={builderOptions}></InputSearch>
          </div>
          <div className="formRow">
            <label>Project: </label>
            <input type="text"></input>
          </div>
          <div className="formRow">
            <label>Phase: </label>
            <input type="text"></input>
          </div>
          <div className="formRow">
            <label>Superintendent: </label>
            <input type="text"></input>
          </div>
          <div className="formRow">
            <label>Phone Number: </label>
            <input type="text"></input>
          </div>
          <div className="formRow">
            <label>Area Foreman: </label>
            <input type="text"></input>
          </div>
        </form>
      </section>
    </div>
  )
}

export default App
