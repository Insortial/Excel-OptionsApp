import React from 'react'
import InputSearch from './InputSearch'
import { OptionsCreatorObject } from '../../../types/ModalTypes'

type OptionsCreatorModal = {
    modal: boolean, 
    modalInputValue: string,
    setModalInputValue: React.Dispatch<React.SetStateAction<string>>,
    optionsCreatorObject?: OptionsCreatorObject,
}


const OptionsCreatorModal: React.FC<OptionsCreatorModal> = ({modal, modalInputValue, setModalInputValue, optionsCreatorObject}) => {
    
    const handleInputChange = (event: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value)
        setModalInputValue(event.target.value)
    }

    const turnOffModal = () => {
        setModalInputValue("")
        optionsCreatorObject?.setModalType("none")
    }
    
    return (
        <div className='modalScreen' style={{display: modal ? "flex": "none"}}>
            <div className='modal'>
                {optionsCreatorObject?.modalType === "inputValue" ? 
                (<>
                    <h2>Enter {optionsCreatorObject.isOptionsMode ? "Lot Number" : "Plan Name"}:</h2>
                    <div className="modalRow">
                        {optionsCreatorObject.isOptionsMode ? (
                        <select value={modalInputValue} onChange={handleInputChange}>
                            {optionsCreatorObject.jobDetails.lotNums.map((lotNum, index) => {
                                if(!optionsCreatorObject.listOfLots?.find((lot) => lot.lot === lotNum)) {
                                    return <option key={index} value={lotNum}>{lotNum}</option>
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
                </>) : modalType === "prod" 
                ? (optionsCreatorObject?.isOptionsMode ?
                    <>
                        <h2>Is This Production Schedule Final?</h2>
                        <div className="modalCheckboxRow">
                            <label>Yes:</label>
                            <input type="checkbox" checked={optionsCreatorObject.jobDetails.prodReady} onChange={() => optionsCreatorObject.onJobDetailsChange(true, "prodReady")}></input>
                            <label>No:</label>
                            <input type="checkbox" checked={!optionsCreatorObject.jobDetails.prodReady} onChange={() => optionsCreatorObject.onJobDetailsChange(false, "prodReady")}></input>
                            <button onClick={() => optionsCreatorObject.saveLotTablesSQL()}>Submit</button>
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
                            <button className="modalSubmit" onClick={() => optionsCreatorObject?.saveLotTablesSQL()}>Submit</button>
                        </div>
                    </>
                ) : /* ["drawerBoxes", "drawerGuides", "doorHinges"].includes(modalType) 
                ? (<>
                        <h2>Modify {modalType === "drawerBoxes" ? "Drawer Box" : modalType === "drawerGuides" ? "Drawer Guides" : "Door Hinges"} Hardware</h2>
                        <div className="modalProjectDiv">
                                <select style={{marginBottom: "10px"}}value={hardwareIndex} onChange={handleHardwareInputChange}>
                                    <option value="-1">None</option>
                                    {currentLot?.partsOfLot.map((lot, index) => {
                                        return !["Throughout", "Balance of House"].includes(lot.roomID) && <option key={index} value={index}>{lot.roomID}</option>
                                    })}
                                </select>
                                <div className="modalInputRow">
                                    {(currentLot && hardwareIndex !== -1) && <InputSearch inputName={modalType} optionSectionNum={hardwareIndex} formState={currentLot} onFormChange={modifyPartOfLotHardware} isDropDown={true} postfix={currentLot.partsOfLot[hardwareIndex].roomID}></InputSearch>}
                                </div>
                            <button className="modalSubmit"onClick={() => turnOffModal()}>Submit</button>
                        </div>
                        
                </>): */
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