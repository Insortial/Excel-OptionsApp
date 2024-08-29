import React, { useContext, useEffect, useRef, useState } from 'react'
import '../App.css'
import { Link, useNavigate } from "react-router-dom";
import InputSearch from '../modules/InputSearch.tsx';
import { ErrorObject, JobDetails } from "../../../types/LotTableInterface";
import InputError from './InputError.tsx';
import { FormOptionsContext } from '../context/OptionsTemplateContext.tsx';
import { FormOptionsContextType } from '../../../types/FormOptions.ts';
import useFetch from '../hooks/useFetch.ts';

type PackageDetails = {
  packageID: number,
  packageName: string,
  projectName: string[]
}

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
  jobID: 0,
  date: "",
  prodReady: false
}


function JobPackageCreator() {
  const [packages, setPackages] = useState<PackageDetails[]>([]);
  const [jobDetails, setJobDetails] = useState<JobDetails>(defaultJobDetails);
  const [errors, setErrors] = useState<ErrorObject>({})
  const { setIsCheckingError } = useContext(FormOptionsContext) as FormOptionsContextType
  const navigate = useNavigate();
  const fetchHook = useFetch()
  const packageNameRef = useRef<HTMLInputElement>(null)

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  useEffect(() => {
    setIsCheckingError(false)
  }, [])
  

  useEffect(() => {
    fetchHook(`/getPackageByProject/${jobDetails.builder}`, "GET")
    .then((response) => response.status === 200 ? response.json() : undefined)
    .then((result) => {
      console.log(result)
      setPackages(result)
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

  /* const checkJobHasBeenMade = async(jobID:number):Promise<boolean> => {

    const response = await fetchHook("/getListOfJobOptions", "GET")
  
    if (!response.ok) {
        throw new Error(response.statusText);
    }

    const data = await response.text()
    const listOfJobDocuments:JobDocumentInterface[] = JSON.parse(data)

    const jobHasBeenMade = listOfJobDocuments.some(jobDoc => jobDoc.jobID === jobID)
    return jobHasBeenMade
  } */


  /* const validate = async () => {
    const requiredFields = ["builder", "project", "optionCoordinator", "phase", "date", "jobID"];
    const newErrors:ErrorObject = {};
    const jobIDIsValid = (await checkValidLotNumJobID([], Number(jobDetails["jobID"]))).isJobIDValid
    const jobHasBeenMade = (await checkJobHasBeenMade(Number(jobDetails["jobID"])))
    
    if(jobHasBeenMade)
      newErrors["jobID"] = "Job Options have already been created"
    
    if(!jobIDIsValid)
      newErrors["jobID"] = "Invalid Job ID"

    Object.keys(jobDetails).forEach((key) => {
      if(requiredFields.includes(key) && !jobDetails[key as keyof JobDetails]) 
        newErrors[key] = "Field is required, please fill out"
    })
    
    setErrors(newErrors)

    return Object.keys(newErrors).length === 0;
  } */

  const goToPackageCreator = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //if(await validate())
    navigate("/creatingOptions/", {state: {packageName: packageNameRef.current?.value, packageDetails: jobDetails}})
  }

  return (
    <div id="mainScreen">
      <div id="titleCover">
        <h1>Job Package<br></br>Manager</h1>
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
                              <Link className="editPackage"to={"/creatingOptions/package/" + item.packageID}>Edit</Link>
                            </section>
                        </div>
                })}
            </div>
            <div className="formRow">
                <label htmlFor={"jobID"}>Builder Name</label>
                <InputSearch inputName={"builder"} formState={jobDetails} onFormChange={onFormChange} isDropDown={true}></InputSearch>
                <InputError errorKey={"jobID"} errorState={errors}></InputError>
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
  )
}

export default JobPackageCreator
