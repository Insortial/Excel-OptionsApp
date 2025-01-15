import React, { useState } from 'react'
import InputSearch from './InputSearch'
import { JobMenuObject, OptionsCreatorObject, PackageObject } from '../types/ModalTypes'
import useFetch from '../hooks/useFetch'
import { ErrorObject, LotInfo } from '../types/LotTableInterface'
import InputError from './InputError'

type OptionsCreatorModal = {
    modalType: string, 
    modalInputValue: string,
    setModalType: React.Dispatch<React.SetStateAction<string>>,
    setModalInputValue: React.Dispatch<React.SetStateAction<string>>,
    onJobDetailsChange?: (value: string | boolean, key: string) => void,
    setIsLotCopy?: React.Dispatch<React.SetStateAction<boolean>>,
    optionsCreatorObject?: OptionsCreatorObject,
    jobMenuObject?: JobMenuObject,
    packageObject?: PackageObject,
}


const OptionsCreatorModal: React.FC<OptionsCreatorModal> = ({modalInputValue, setModalType, setModalInputValue, onJobDetailsChange, setIsLotCopy, modalType, optionsCreatorObject, jobMenuObject, packageObject}) => {
    const fetchHook = useFetch()
    const [errors, setErrors] = useState<ErrorObject>({})
    const [availableLots, setAvailableLots] = useState<LotInfo[]>([])
    const [modalProdReady, setModalProdReady] = useState<boolean>(false)

    const handleInputChange = (event: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) => {
        setModalInputValue(event.target.value)
    }

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        onJobDetailsChange?.(event.target.value, "date")
    }

    const turnOffModal = () => {
        setModalInputValue("")
        setErrors({})
        setModalType("none")
        
        if(setIsLotCopy)
            setIsLotCopy(false)
    }

    const deleteJobOption = () => {
        if(jobMenuObject?.jobDocument) {
            fetchHook(`/deleteJobOption/${jobMenuObject.jobDocument.jobOptionID}`, "DELETE")
            .then((response) =>{
                if(response.status === 200) {
                    jobMenuObject.refreshJobMenu()
                    jobMenuObject.setDeleteMode(false)
                    turnOffModal()
                } else {
                    turnOffModal()
                }
                
            })
            .catch((error) => console.error(error));
        } else {
            turnOffModal()
        }
    }

    const findAvailableLots = ():LotInfo[]|undefined => {
        return optionsCreatorObject?.jobDetails.lotNums.filter(
            lotNum => !optionsCreatorObject?.listOfLots.find(lot => lot.lot === lotNum.lotNum)
          );
    }

    const handleProdChoice = () => {
        if(modalProdReady) {
            setModalType("date")
            const lots = findAvailableLots()
            if(lots)
                setAvailableLots(lots)
        } else {
            optionsCreatorObject?.saveLotTablesSQL(modalProdReady)
        }
    }

    const deletePackage = () => {
        if(packageObject?.packageDetails) {
            fetchHook(`/deletePackage/${packageObject?.packageDetails.packageID}`, "DELETE")
            .then((response) =>{
                if(response.status === 200) {
                    packageObject.refreshPackages()
                    turnOffModal()
                } else {
                    turnOffModal()
                }  
            })
            .catch((error) => console.error(error));
        } else {
            turnOffModal()
        }
    }

    const submitJob = (bypass:boolean) => {
        if(availableLots.length > 0 && !bypass) {
            setModalType("availableLots")
        } else {
            optionsCreatorObject?.saveLotTablesSQL(true)
        }
    }

    const checkAddOptionRow = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(optionsCreatorObject && optionsCreatorObject.currentLot && validate()) {
            optionsCreatorObject.addOptionRow(modalInputValue)
        }
    }

    const validate = () => {
        const newErrors:ErrorObject = {}
        if(modalType === "partOfLot" && optionsCreatorObject?.currentLot) {
            if(optionsCreatorObject.currentLot.partsOfLot.find(lot => lot.roomID === modalInputValue))
                newErrors["roomID"] = "Room ID already exists"

            if(modalInputValue.toLowerCase() === "balance of house" || modalInputValue.toLowerCase() === "throughout")
                newErrors["roomID"] = "Cannot use reserved words"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0;
    }
    
    return (
        <div className='modalScreen' style={{display: modalType !== "none" ? "flex": "none"}}>
            <div className='modal'>
                {optionsCreatorObject && modalType === "inputValue" ? 
                <>
                    <h2>Enter {optionsCreatorObject.isOptionsMode ? "Lot Number" : "Plan Name"}:</h2>
                    <div className="modalRow">
                        {optionsCreatorObject.isOptionsMode ? (
                        <select value={modalInputValue} onChange={handleInputChange}>
                            {optionsCreatorObject.jobDetails.lotNums.map((lotInfo, index) => {
                                if(!optionsCreatorObject.listOfLots?.find((lot) => lot.lot === lotInfo.lotNum)) {
                                    return <option key={index} value={lotInfo.lotNum}>{lotInfo.lotNum}</option>
                                }
                            })}
                        </select> ) : (
                            <input value={modalInputValue} onChange={handleInputChange}></input>
                        )}
                        <button onClick={optionsCreatorObject.addLotTable}>Submit</button>
                    </div>
                    {optionsCreatorObject.hasPackage && <>
                        <div className="modalPlanRow">
                            <label>Package:</label>
                            <select value={optionsCreatorObject.packageDetails.packageName} onChange={e => optionsCreatorObject.handlePackageDetailsChange(e.target.value, "packageName")}>
                                <option value="None">None</option>
                                {optionsCreatorObject.packageDetails.packages.map((packageName, index) => {
                                    return <option key={index} value={packageName}>{packageName}</option>
                                })}
                            </select>
                        </div>
                        {!["", "None"].includes(optionsCreatorObject.packageDetails.packageName) &&
                        <div className="modalPlanRow">
                            <label>Plan Type:</label>
                            <select value={optionsCreatorObject.packageDetails.planName} onChange={e => optionsCreatorObject.handlePackageDetailsChange(e.target.value, "planName")}>
                                <option value="None">None</option>
                                {optionsCreatorObject.packageDetails.plans.filter(plan => plan.packageName === optionsCreatorObject.packageDetails.packageName).map((lotTable, index) => {
                                    return <option key={index} value={lotTable.plan}>{lotTable.plan}</option>
                                })}
                            </select>
                        </div>}
                    </>}
                </> : modalType === "prod" 
                ? optionsCreatorObject?.isOptionsMode ?
                    <>
                        <h2>Is This Production Schedule Final?</h2>
                        <div className="modalCheckboxRow">
                            <label>Yes:</label>
                            <input type="checkbox" checked={modalProdReady} onChange={() => setModalProdReady(true)}></input>
                            <label>No:</label>
                            <input type="checkbox" checked={!modalProdReady} onChange={() => setModalProdReady(false)}></input>
                            <button onClick={() => handleProdChoice()}>Submit</button>
                        </div>
                    </>
                    : <>
                        <h2>Select Projects</h2>
                        <div className="modalProjectDiv">
                            {optionsCreatorObject?.packageProjects.map((_, index:number) => {
                                return  <div className="modalInputRow" key={index}>
                                            <InputSearch inputName={"project"} formState={optionsCreatorObject.packageProjects} onFormChange={optionsCreatorObject.onProjectsChange} isDropDown={true} optionSectionNum={index} filterValue={optionsCreatorObject.jobDetails.builder}></InputSearch>
                                            <button onClick={() => optionsCreatorObject.setPackageProjects((prevState: string[]) => prevState.filter((_, idx) => idx !== index))}>Delete</button>
                                        </div>
                            })}
                            <button className="addProject" onClick={() => optionsCreatorObject?.setPackageProjects([...optionsCreatorObject.packageProjects, ""])}>Add Project</button>
                            <button className="modalSubmit" onClick={() => optionsCreatorObject?.saveLotTablesSQL(true)}>Submit</button>
                        </div>
                    </>
                 : modalType === "delete" ? 
                 <>
                    <h2>{jobMenuObject?.jobDocument ? "Are You Sure You Want To Delete Options?" : "Are You Sure You Want To Delete Package?"}</h2>
                    {jobMenuObject?.jobDocument ? <>
                        <h3>{jobMenuObject.jobDocument.customerName} - {jobMenuObject.jobDocument.projectName} Job ID: {jobMenuObject.jobDocument.jobID}</h3>
                        <div className="modalButtonRow">
                            <button onClick={() => deleteJobOption()}>YES</button>
                            <button onClick={() => turnOffModal()}>NO</button>
                        </div>
                    </> : packageObject ? <>
                        <h3>{packageObject.packageDetails?.packageName} - {packageObject.packageDetails?.projectName}</h3>
                        <div className="modalButtonRow">
                            <button onClick={() => deletePackage()}>YES</button>
                            <button onClick={() => turnOffModal()}>NO</button>
                        </div>
                    </> : <></>}
                 </>
                : modalType === "partOfLot" ? 
                <>
                    <h2>Enter Room ID:</h2>
                    <form className="modalRow" onSubmit={checkAddOptionRow}>
                        <input value={modalInputValue} onChange={handleInputChange}></input>
                        <button>Submit</button>
                    </form>
                    <InputError errorKey='roomID' errorState={errors}/>
                </>
                : modalType === "date" ? 
                <>
                    <h2>Enter Production Date:</h2>
                    <div className='modalRow'>
                        <input type="date" onChange={handleDateChange}></input>
                        <button onClick={() => submitJob(false)}>Submit</button>
                    </div>
                </>
                : modalType === "availableLots" ? 
                <>
                    <h2>Lots remain. Proceed anyway?</h2>
                    <h3>Lot(s): {availableLots.map(lots => lots.lotNum).join(", ")}</h3>
                    <div className="modalButtonRow">
                        <button onClick={() => submitJob(true)}>YES</button>
                        <button onClick={() => turnOffModal()}>NO</button>
                    </div>
                </>
                : <>
                    <h1>Waiting for Result</h1>
                </>
                }
                <span className="exitButton" onClick={() => turnOffModal()}></span>
            </div>
        </div>
    )
}

export default OptionsCreatorModal