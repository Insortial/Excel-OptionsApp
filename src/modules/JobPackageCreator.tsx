import React, { useContext, useEffect, useRef, useState } from 'react'
import '../App.css'
import { Link, useNavigate } from "react-router-dom";
import InputSearch from '../modules/InputSearch.tsx';
import { ErrorObject, JobDetails, PackageInfo } from "@excelcabinets/excel-types/LotTableInterface";
import InputError from './InputError.tsx';
import { FormOptionsContext } from '../context/OptionsTemplateContext.tsx';
import { FormOptionsContextType } from '@excelcabinets/excel-types/FormOptions';
import useFetch from '../hooks/useFetch.ts';
import OptionsCreatorModal from './OptionsCreatorModal.tsx';
import { PackageObject } from '../types/ModalTypes.ts';
import DeleteOptionModal from './ModalScreens/DeleteOptionModal.tsx';
import { useForm } from 'react-hook-form';
import { defaultJobDetails, initialPackageDetails } from '../templates/initialValues.ts';

function JobPackageCreator() {
  const [packages, setPackages] = useState<PackageInfo[]>([])
  const { getValues, setValue, watch } = useForm<JobDetails>({defaultValues: defaultJobDetails})
  const { setValue: setPackageValue, getValues: getPackageValues, watch: watchPackage} = useForm({ defaultValues: { builder: "" } })
  const [modalType, setModalType] = useState<string>("none")
  const [deletePackage, setDeletePackage] = useState<boolean>(false)
  const [packageToDelete, setPackageToDelete] = useState<PackageInfo | null>(null)
  const [errors, setErrors] = useState<ErrorObject>({})
  const { setIsCheckingError } = useContext(FormOptionsContext) as FormOptionsContextType
  const navigate = useNavigate();
  const fetchHook = useFetch()
  const packageNameRef = useRef<HTMLInputElement>(null)
  const watchBuilder = watch("builder")

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  useEffect(() => {
    setIsCheckingError(false)
    refreshPackages()
  }, [])

  const refreshPackages = () => {
    fetchHook(`/getPackages/`, "GET")
    .then((response) => response.status === 200 ? response.json() : undefined)
    .then((result) => {
      setPackages(result)
    }).catch((error) => {
      console.error(error)
    });
  }

  useEffect(() => {
    fetchHook(`/getPackages/?project=${getValues("builder")}`, "GET")
    .then((response) => response.status === 200 ? response.json() : undefined)
    .then((result) => {
      console.log(result)
      if(result.length !== 0)
        setPackages(result)
      else
        refreshPackages()
    }).catch((error) => {
      console.error(error)
    });
  }, [watchBuilder])

  const onFormChange = (key: string, value: string) => {
    setValue(key as keyof JobDetails, value)
  }

  const validate = async () => {
    const newErrors:ErrorObject = {};
    if(packageNameRef.current?.value === "")
      newErrors["package"] = "Invalid package name"

    if(!getValues("builder")) 
      newErrors["builder"] = "Field is required, please fill out"
    
    setErrors(newErrors)

    return Object.keys(newErrors).length === 0;
  }

  const goToPackageCreator = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(await validate())
      navigate("/optionCreator/", {state: {jobDetails: getValues(), packageDetails: {...initialPackageDetails, packageName: packageNameRef.current?.value}}})
  }

  const deletePackageModal = (packageDetails:PackageInfo) => {
    setModalType("delete")
    setPackageToDelete(packageDetails)
  }

  const turnOffModal = () => {
    setModalType("none")
  }

  const packageObject:PackageObject = {
    packageDetails: packageToDelete,
    refreshPackages: refreshPackages,
  }

  return (
    <>
      <OptionsCreatorModal modalType={modalType} turnOffModal={turnOffModal}>
        {modalType === "delete" ? 
            <DeleteOptionModal turnOffModal={turnOffModal} packageObject={packageObject}/> : 
        <></>}
      </OptionsCreatorModal>
      <div id="mainScreen">
        <div id="titleCover">
          <h1>Job Package<br></br>Manager</h1>
          <Link to="/jobMenu" style={{marginTop: "auto"}}>Back to Job Menu</Link>
        </div>
        <section id="formSection">
          <form onSubmit={goToPackageCreator}>
              <h2>View Builder Packages</h2>
              <section id='packageOptions'>
                <label>Builder</label>
                <InputSearch inputName='builder' onFormChange={(key, value) => setPackageValue(key as "builder", value)} isDropDown={true} getFormValues={getPackageValues}></InputSearch>
                <button type='button' onClick={() => setPackageValue("builder", "")} id="packageReset">Reset</button>
                <button type='button' onClick={() => setDeletePackage(!deletePackage)} id="packageDelete">Delete</button>
              </section>
              <div id="packageDisplay" style={{display: packages?.length > 0 ? "block" : "none"}}>
                <div id="packageDisplayHeader">
                </div>
                <div id="packageDisplayBody">
                  {packages?.filter((selectedPackage) => watchPackage("builder")?.includes(selectedPackage.builderName) || watchPackage("builder") === "").map((item, index) => {
                      return <div key={index} className='packageCardContainer'>
                        <span className='documentDeleteButton' style={{display: deletePackage ? 'flex' : 'none'}} onClick={() => deletePackageModal(item)}>X</span>
                        <Link key={index} to={`/optionCreator/package/${item.packageID}`}>
                          <div key={index} className='packageCard'>
                              <section>
                                <h5>Name: {item.packageName}</h5>
                                <h5 className='projectBuilder'>Builder: {item.builderName}</h5>
                                <h6>Projects: {item.projectName.join(", ")}</h6> 
                              </section>
                          </div>
                        </Link> 
                      </div>
                  })}
                </div>
              </div>
              <h2>Create Builder Package</h2>
              <div className="formRow">
                  <label htmlFor={"builder"}>Builder Name</label>
                  <InputSearch inputName={"builder"} getFormValues={getValues} onFormChange={onFormChange} isDropDown={true}></InputSearch>
                  <InputError errorKey={"builder"} errorState={errors}></InputError>
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
    </>
  )
}

export default JobPackageCreator
