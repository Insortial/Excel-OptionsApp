import React, { useEffect, useState } from 'react'
import InputSearch from './InputSearch'
import { JobDetails, LotTableInterface, PackageDetails } from '../../../types/LotTableInterface'

type OptionsCreatorModal = {
    modal: boolean, 
    isOptionsMode: boolean, 
    currentLotNum: string,
    listOfLots: LotTableInterface[], 
    jobDetails: JobDetails, 
    packageDetails: PackageDetails, 
    hasPackage: boolean, 
    packageProjects: string[],
    modalType: string,
    addLotTable: () => void, 
    handlePackageDetailsChange: (value:string, propName:string) => void,  
    onJobDetailsChange: (value: string | boolean, key: string) => void, 
    setPackageProjects: React.Dispatch<React.SetStateAction<string[]>>, 
    saveLotTablesSQL: () => void,
    setModalType: React.Dispatch<React.SetStateAction<string>>,
    onProjectsChange: (value: string, key: string, optSectionNum?:number) => void,
}

const OptionsCreatorModal: React.FC<OptionsCreatorModal> = ({modalType, isOptionsMode, listOfLots, jobDetails, packageDetails, hasPackage, packageProjects, currentLotNum,
                                                             addLotTable, handlePackageDetailsChange, onJobDetailsChange, setPackageProjects, saveLotTablesSQL, 
                                                             setModalType, onProjectsChange}) => {

    const [modalInputValue, setModalInputValue] = useState<string>("")
    
    const handleInputChange = (event: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        setModalInputValue(event.target.value)
    }

    const findAvailableLots = ():string[] => {
        return jobDetails.lotNums.filter(
            lotNum => !listOfLots.find(lot => lot.lot === lotNum)
          );
    }

    const turnOffModal = () => {
        setModalInputValue("")
        setModalType("none")
    }

    useEffect(() => {
        const availableLots = findAvailableLots()
        if(availableLots.length > 0)
            setModalInputValue(availableLots[0]);
        else 
            setModalInputValue("")
    }, [jobDetails, listOfLots]);
    
    return (
        <div className='modalScreen' style={{display: modalType !== "none" ? "flex": "none"}}>
            <div className='modal'>
                {modalType === "inputValue" ? 
                (<>
                    <h2>Enter {isOptionsMode ? "Lot Number" : "Plan Name"}:</h2>
                    <div className="modalRow">
                        {isOptionsMode ? (
                        <select value={modalInputValue} onChange={handleInputChange}>
                            {jobDetails.lotNums.map((lotNum, index) => {
                                if(!listOfLots.find((lot) => lot.lot === lotNum)) {
                                    return <option key={index} value={lotNum}>{lotNum}</option>
                                }
                            })}
                        </select> ) : (
                            <input value={modalInputValue} onChange={handleInputChange}></input>
                        )}
                        <button onClick={addLotTable}>Submit</button>
                    </div>
                    {hasPackage && <>
                        <div className="modalPlanRow">
                            <label>Package:</label>
                            <select value={packageDetails.packageName} onChange={e => handlePackageDetailsChange(e.target.value, "packageName")}>
                                <option value="None">None</option>
                                {packageDetails.packages.map((packageName, index) => {
                                    return <option key={index} value={packageName}>{packageName}</option>
                                })}
                            </select>
                        </div>
                        {!["", "None"].includes(packageDetails.packageName) &&
                        <div className="modalPlanRow">
                            <label>Plan Type:</label>
                            <select value={packageDetails.planName} onChange={e => handlePackageDetailsChange(e.target.value, "planName")}>
                                <option value="None">None</option>
                                {packageDetails.plans.filter(plan => plan.packageName === packageDetails.packageName).map((lotTable, index) => {
                                    return <option key={index} value={lotTable.plan}>{lotTable.plan}</option>
                                })}
                            </select>
                        </div>}
                    </>}
                </>) : modalType === "prod" 
                ? (isOptionsMode ?
                    <>
                        <h2>Is This Production Schedule Final?</h2>
                        <div className="modalCheckboxRow">
                            <label>Yes:</label>
                            <input type="checkbox" checked={jobDetails.prodReady} onChange={() => onJobDetailsChange(true, "prodReady")}></input>
                            <label>No:</label>
                            <input type="checkbox" checked={!jobDetails.prodReady} onChange={() => onJobDetailsChange(false, "prodReady")}></input>
                            <button onClick={() => saveLotTablesSQL()}>Submit</button>
                        </div>
                    </>
                    : <>
                        <h2>Select Projects</h2>
                        <div className="modalProjectDiv">
                            {packageProjects.map((_, index:number) => {
                                return  <div className="modalInputRow" key={index}>
                                            <InputSearch inputName={"project"} formState={packageProjects} onFormChange={onProjectsChange} isDropDown={true} optionSectionNum={index} filterValue={jobDetails.builder}></InputSearch>
                                            <button onClick={() => setPackageProjects((prevState: string[]) => prevState.filter((_, idx) => idx !== index))}>Delete</button>
                                        </div>
                            })}
                            <button className="addProject" onClick={() => setPackageProjects([...packageProjects, ""])}>Add Project</button>
                            <button className="modalSubmit" onClick={() => saveLotTablesSQL()}>Submit</button>
                        </div>
                    </>
                ) : ["drawerBoxes", "drawerGuides", "doorHinges"].includes(modalType) 
                ? (<>
                        <h2>Modify {modalType === "drawerBoxes" ? "Drawer Box" : modalType === "drawerGuides" ? "Drawer Guides" : "Door Hinges"} Hardware</h2>
                        <div className="modalRow">
                            <select value={packageDetails.packageName} onChange={e => handlePackageDetailsChange(e.target.value, "packageName")}>
                                <option value="None">None</option>
                                {listOfLots.find((lotDetails:LotTableInterface) => (isOptionsMode && lotDetails.lot === currentLotNum) ||
                                                                                        (!isOptionsMode && lotDetails.plan === currentLotNum))?.partsOfLot.map((lot, index) => {
                                        return <option key={index} value={lot.roomID}>{lot.roomID}</option>
                                    })}
                            </select>
                            <button onClick={() => saveLotTablesSQL()}>Submit</button>
                        </div>
                </>):
                (
                    <>
                        <h1>Waiting for Result</h1>
                    </>
                )}
                <span className="exitButton" onClick={() => turnOffModal()}></span>
            </div>
        </div>
    )
}

export default OptionsCreatorModal