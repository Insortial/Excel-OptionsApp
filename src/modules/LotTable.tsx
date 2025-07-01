import React, { useEffect } from 'react'
import InputSearch from "./InputSearch"
import { LotTableInterface, PartOfLot, JobDetails } from '../types/LotTableInterface';
import ControlledTextArea from "./ControlledTextArea"
import { useForm, UseFormGetValues } from 'react-hook-form';

type LotTable = {
    lotTableDetails: LotTableInterface;
    isOptionsMode: boolean;
    saveLotTable: (lotTableDetails: LotTableInterface, lotNumber: string) => void;
    setCurrentLotNum: (lotNum: string) => void; 
    convertToMixedOptions: (lot: LotTableInterface) => LotTableInterface;
    setModalType: React.Dispatch<React.SetStateAction<string>>;
    getJobValues: UseFormGetValues<JobDetails>;
    onFormJobChange: ((value: string, key: string) => void);
}

const LotTable: React.FC<LotTable> = ({isOptionsMode, lotTableDetails, convertToMixedOptions, saveLotTable, setCurrentLotNum, setModalType, getJobValues, onFormJobChange }) => {
    const { reset: resetLot, getValues: getLotValues, setValue: setLotValue } = useForm<LotTableInterface>()
    
    useEffect(() => {
        resetLot(lotTableDetails)
    }, [lotTableDetails])

    const deleteLotSection = (lotSectionIndex:number) => {
        let updatedTable:LotTableInterface = getLotValues() as LotTableInterface

        if(updatedTable.partsOfLot.length === 2) {
            const balanceOfHouseLot = updatedTable.partsOfLot[0]
            updatedTable.partsOfLot.splice(0, 1, {...balanceOfHouseLot, roomID: "Throughout"})
            updatedTable.hasThroughoutLot = true
            updatedTable.editingPartsOfLot = false
            updatedTable = setLotToThroughout(updatedTable)
        }
        updatedTable.partsOfLot.splice(lotSectionIndex, 1)
        saveLotTable(updatedTable, isOptionsMode ? updatedTable.lot : updatedTable.plan)
    }

    function findFingerpull(doorID:string):string {
        if(["1", "2", "6"].includes(doorID.charAt(4)) && doorID !== "ECI-605") {
            return "CF-14"
        } else if(doorID.charAt(4) === "3") {
            return "OD-6"
        } else if (doorID.charAt(4) === "4") {
            return doorID.charAt(5) === "0" ? "OD-1" : "OD-2" 
        } else if (doorID === "ECI-000") {
            return "N/A"
        } else {
            return "CF-2"
        }
    }

    const setLotToThroughout = (lot:LotTableInterface) => {
        return {...lot,
            drawerFronts: lot.partsOfLot[0].drawerFronts ?? "",
            drawerBoxes: lot.partsOfLot[0].drawerBoxes ?? "",
            drawerGuides: lot.partsOfLot[0].drawerGuides ?? "",
            doorHinges: lot.partsOfLot[0].doorHinges ?? "",
            boxStyle: lot.partsOfLot[0].boxStyle ?? "",
            interiors: lot.partsOfLot[0].interiors ?? "",
        }
    }

    const changeLotEditingMode = (isEditing:boolean) => {
        let newLot = getLotValues() as LotTableInterface
        console.log(newLot)
        if(isEditing) {
            newLot = convertToMixedOptions(newLot)
        } else {
            newLot = setLotToThroughout(newLot)
        }

        saveLotTable({...newLot, editingPartsOfLot: isEditing}, (isOptionsMode ? newLot.lot : newLot.plan))
    }

    const onFormChange = (key: string, value: string | boolean | number) => {
        setLotValue(key as keyof LotTableInterface, value)
        let updatedTable:LotTableInterface = getLotValues() as LotTableInterface;

        const keyParts = key.split(".")
        const optKey = keyParts.pop() || ""
        const hardware = ["boxStyle", "drawerFronts", "drawerHinges", "drawerGuides", "drawerBoxes", "doorHinges", "interiors"]
        const example = {[optKey]: value}

        if(optKey === "doors")
            example.fingerpull = findFingerpull(value as string)

        if(keyParts.length > 0) {
            updatedTable.partsOfLot = updatedTable.partsOfLot.map((partOfLot:PartOfLot, index:number) => (index === parseInt(keyParts[1]) ? { ...partOfLot, ...example } : partOfLot))
        }

        //TEMPORARY FIX FOR NEW LOT/COPY BUG
        if(hardware.includes(optKey) && keyParts.length === 0) {
            updatedTable.partsOfLot = updatedTable.partsOfLot.map((partOfLot:PartOfLot) => { return {...partOfLot, [optKey]: value}})
        }

        if(updatedTable.editingPartsOfLot)
            updatedTable = convertToMixedOptions(updatedTable)

        if((key === "lot" || key === "plan") && typeof value === "string") 
            setCurrentLotNum(value)

        saveLotTable(updatedTable, (isOptionsMode ? updatedTable.lot : updatedTable.plan))
    }

    const addCheckListItem = (index: number, checkListIndex: number, addedString: string) => {
        const currentLot = getLotValues() as LotTableInterface
        const oldPartsOfLot = [...currentLot.partsOfLot]
        const modifiedPartOfLot = oldPartsOfLot.splice(index, 1)[0]

        const lotCheckList = modifiedPartOfLot.checklist || [];
        lotCheckList[checkListIndex] = addedString;

        const updatedPartOfLot = {
            ...modifiedPartOfLot,
            checklist: lotCheckList
        }

        oldPartsOfLot.splice(index, 0, updatedPartOfLot)

        const updatedLot = {...currentLot,
            partsOfLot: oldPartsOfLot
        }

        saveLotTable(updatedLot, (isOptionsMode ? updatedLot.lot : updatedLot.plan))
    }

    /* const deleteCheckListItem = (index: number, checkListIndex: number) => {
        const currentLot = getLotValues() as LotTableInterface
        const oldPartsOfLot = [...currentLot.partsOfLot]
    
        const modifiedPartOfLot = oldPartsOfLot.splice(index, 1)[0]
    
    } */

    const onNoneSelect = (optionSectionNum: number=-1) => {
        const updatedTable = getLotValues() as LotTableInterface
        updatedTable.partsOfLot = updatedTable.partsOfLot.map((partOfLot:PartOfLot, index:number) => (index === optionSectionNum ? { ...partOfLot, handleType: "none", pulls: "", knobs: "" } : partOfLot))
        saveLotTable(updatedTable, (isOptionsMode ? updatedTable.lot : updatedTable.plan))
    }

    return (
        <div className='exampleSection'>
            {isOptionsMode ? (<table className='projectInfo'>
                <tbody>
                    <tr>
                        <th>Builder</th>
                        <th>Project</th>
                        <th>Phase</th>
                        <th>Superintendent</th>
                        <th>Phone</th>
                        <th>Area Foreman</th>
                    </tr>
                    <tr>
                        <td><InputSearch inputName={"builder"} onFormChange={onFormJobChange} isDropDown={true} getFormValues={getJobValues}></InputSearch></td>
                        <td><InputSearch inputName={"project"} onFormChange={onFormJobChange} isDropDown={true} getFormValues={getJobValues}></InputSearch></td>
                        <td><InputSearch inputName={"phase"} onFormChange={onFormJobChange} isDropDown={false} getFormValues={getJobValues}></InputSearch></td>
                        <td><InputSearch inputName={"superintendent"} onFormChange={onFormJobChange} isDropDown={false} getFormValues={getJobValues}></InputSearch></td>
                        <td><InputSearch inputName={"phone"} onFormChange={onFormJobChange} isDropDown={false} getFormValues={getJobValues}></InputSearch></td>
                        <td><InputSearch inputName={"foreman"} onFormChange={onFormJobChange} isDropDown={true} getFormValues={getJobValues}></InputSearch></td>
                    </tr>
                </tbody>
            </table>) : <></>}
            <table className='lotInfo'>
                <tbody>
                    {isOptionsMode ? (
                        <tr>
                            <th>Job ID</th>
                            <td><InputSearch inputName={"jobID"} onFormChange={onFormJobChange} isDropDown={false} locked={true} getFormValues={getJobValues}></InputSearch></td>
                        </tr>
                    ) : <tr>
                            <th>Builder</th>
                            <td><InputSearch inputName={"builder"} onFormChange={onFormJobChange} isDropDown={true} getFormValues={getJobValues}></InputSearch></td>
                        </tr>}
                    <tr>
                        <th>Box Style</th>
                        <td><InputSearch inputName={"boxStyle"}  onFormChange={onFormChange} isDropDown={true} locked={lotTableDetails.editingPartsOfLot} getFormValues={getLotValues}></InputSearch></td>
                    </tr>
                    <tr>
                        <th>Drawer Fronts</th>
                        <td>
                            <InputSearch inputName={"drawerFronts"}  onFormChange={onFormChange} isDropDown={true} locked={lotTableDetails.editingPartsOfLot} getFormValues={getLotValues}></InputSearch>
                        </td>
                    </tr>
                    <tr>
                        <th>Drawer Boxes</th>
                        {/* Look at changing this Input Search */}
                        <td>
                            <InputSearch inputName={"drawerBoxes"}  onFormChange={onFormChange} isDropDown={true} locked={lotTableDetails.editingPartsOfLot} getFormValues={getLotValues}></InputSearch>
                        </td>
                    </tr>
                    <tr>
                        <th>Drawer Guides</th>
                        {/* Look at changing this Input Search */}
                        <td>
                            <InputSearch inputName={"drawerGuides"} onFormChange={onFormChange} isDropDown={true} locked={lotTableDetails.editingPartsOfLot} getFormValues={getLotValues}></InputSearch>
                        </td>
                    </tr>
                    <tr>
                        <th>Door Hinges</th>
                        {/* Look at changing this Input Search */}
                        <td>
                            <InputSearch inputName={"doorHinges"}  onFormChange={onFormChange} isDropDown={true} locked={lotTableDetails.editingPartsOfLot} getFormValues={getLotValues}></InputSearch>
                        </td>
                    </tr>
                    <tr>
                        <th>Interiors</th>
                        {/* Look at changing this Input Search */}
                        <td><InputSearch inputName={"interiors"}  onFormChange={onFormChange} isDropDown={true} locked={lotTableDetails.editingPartsOfLot} getFormValues={getLotValues}></InputSearch></td>
                    </tr>
                    <tr>
                        <th>Upper Height</th>
                        <td><InputSearch inputName={"upperHeight"}  onFormChange={onFormChange} isDropDown={false} getFormValues={getLotValues}></InputSearch></td>
                    </tr>
                    <tr>
                        <th>Islands</th>
                        <td><InputSearch inputName={"islands"}  onFormChange={onFormChange} isDropDown={false} getFormValues={getLotValues}></InputSearch></td>
                    </tr>
                    <tr>
                        <th>Supports</th>
                        <td><InputSearch inputName={"supports"}  onFormChange={onFormChange} isDropDown={false} getFormValues={getLotValues}></InputSearch></td>
                    </tr>
                    <tr>
                        <th>Crown</th>
                        <td><InputSearch inputName={"crown"}  onFormChange={onFormChange} isDropDown={false} getFormValues={getLotValues}></InputSearch></td>
                    </tr>
                    <tr>
                        <th>Light Rail</th>
                        <td><InputSearch inputName={"lightRail"}  onFormChange={onFormChange} isDropDown={false} getFormValues={getLotValues}></InputSearch></td>
                    </tr>
                    <tr>
                        <th>Base Shoe</th>
                        <td><InputSearch inputName={"baseShoe"}  onFormChange={onFormChange} isDropDown={false} getFormValues={getLotValues}></InputSearch></td>
                    </tr>
                    <tr>
                        <th>Recycling Bins</th>
                        <td><InputSearch inputName={"recyclingBins"}  onFormChange={onFormChange} isDropDown={false} getFormValues={getLotValues}></InputSearch></td>
                    </tr>
                    <tr>
                        <th>Job Specific Notes</th>
                        <td><ControlledTextArea inputName={"jobNotes"} formState={getJobValues()} onFormChange={onFormJobChange}></ControlledTextArea></td>
                    </tr>
                </tbody>
            </table>
            <table className='additionalLotInfo'>
                <tbody>
                    <tr>
                        <th className='noteColumn'>Lot Notes:</th>
                        <th className='applianceColumn'>Appliances:</th>
                    </tr>
                    <tr>
                        <td className='noteColumn'>
                            <ControlledTextArea inputName={"lotNotes"} formState={getLotValues()} onFormChange={onFormChange}></ControlledTextArea>
                        </td>
                        <td className='applianceColumn'>
                            <ControlledTextArea inputName={"appliances"} formState={getLotValues()} onFormChange={onFormChange}></ControlledTextArea>
                        </td>
                    </tr>
                </tbody>
            </table>
            <table className='optionsInfo'>
                <tbody>
                    <tr>
                        <th colSpan={2}>Lot Option Contract Value</th>
                        <td colSpan={3}>
                            <section id="optionsValueCell">
                                <span className="valueDiv">$</span>
                                <InputSearch inputName={"lotOptionsValue"}  onFormChange={onFormChange} isDropDown={false} getFormValues={getLotValues}></InputSearch>
                                <span id="centsDiv" className="valueDiv">.00</span>
                            </section>
                        </td>
                    </tr>
                    <tr>
                        {isOptionsMode ? <th>LOT</th> : <></>}
                        <th>PLAN</th>
                        <th>Material/Color</th>
                        <th>Option</th>
                    </tr>
                    {lotTableDetails.partsOfLot.slice(lotTableDetails.hasThroughoutLot ? 0 : 1).map((lotSection:PartOfLot, index:number) => {
                        const idNumber = index > 0 ? index : ""
                        const currentRow = lotTableDetails.hasThroughoutLot ? index : index + 1
                        return <tr key={currentRow}>
                                {isOptionsMode &&
                                    <td>
                                        {(currentRow === 0 || !lotTableDetails.hasThroughoutLot && currentRow === 1) &&
                                            <InputSearch inputName={"lot"}  onFormChange={onFormChange} isDropDown={false} locked={true} getFormValues={getLotValues}></InputSearch>
                                        }
                                        <button className="deleteButton" style={{display: currentRow !== 0 ? "block" : "none"}} onClick={() => deleteLotSection(currentRow)}>Delete Row</button>
                                    </td>
                                }
                                <td>
                                    {(currentRow === 0 || !lotTableDetails.hasThroughoutLot && currentRow === 1) &&
                                        <InputSearch inputName={"plan"}  onFormChange={onFormChange} isDropDown={false} locked={true} getFormValues={getLotValues}></InputSearch>
                                    }
                                    {!isOptionsMode && <button className="deleteButton" style={{display: currentRow !== 0 ? "block" : "none"}} onClick={() => deleteLotSection(currentRow)}>Delete Row</button>}
                                </td>
                                <td>
                                    {(lotTableDetails.partsOfLot.length > 1 && (lotTableDetails.hasThroughoutLot && currentRow === 0 || !lotTableDetails.hasThroughoutLot && currentRow === 1)) && 
                                        <>
                                            <button className="editPartsOfLotButton" onClick={() => changeLotEditingMode(!lotTableDetails.editingPartsOfLot)}>{lotTableDetails.editingPartsOfLot ? `Set Options to Balance of House` : "Edit By Part of Lot"}</button>
                                            <button onClick={() => {
                                                onFormChange("hasThroughoutLot", !lotTableDetails.hasThroughoutLot)
                                                console.log(lotTableDetails)
                                                }}>{lotTableDetails.hasThroughoutLot ? "Remove Balance of House" : "Reveal Balance of House"}
                                            </button>
                                        </>}
                                    <label htmlFor={`material${idNumber}`}>Material:</label>
                                    <InputSearch inputName={`partsOfLot.${index}.material`} onFormChange={onFormChange} isDropDown={true} getFormValues={getLotValues}></InputSearch>
                                    <label htmlFor={`color${idNumber}`}>Color:</label>
                                    <InputSearch inputName={`partsOfLot.${index}.color`} onFormChange={onFormChange} isDropDown={true} getFormValues={getLotValues}></InputSearch>
                                </td>
                                <td className="optionCell">
                                    <label htmlFor={`roomID${idNumber}`}>Room ID: </label>
                                    <InputSearch inputName={`partsOfLot.${index}.roomID`} onFormChange={onFormChange} isDropDown={false} getFormValues={getLotValues}></InputSearch>
                                    <section className='hardwareHeader'>
                                        <div className='hardwareEditor'>
                                            <h3>Hardware</h3>
                                            <div className='hardwareCheckboxes'>
                                                <label htmlFor={`pullsButton${idNumber}`}>Pulls</label>
                                                <input id={`pullsButton${idNumber}`} type="checkbox" onChange={() => onFormChange(`partsOfLot.${index}.handleType`, "pulls")} checked={lotSection.handleType == "pulls" ? true : false}/>
                                                <label htmlFor={`knobsButton${idNumber}`}>Knobs</label>
                                                <input id={`knobsButton${idNumber}`} type="checkbox" onChange={() => onFormChange(`partsOfLot.${index}.handleType`, "knobs")} checked={lotSection.handleType == "knobs" ? true : false}/>
                                                <label htmlFor={`bothButton${idNumber}`}>Both</label>
                                                <input id={`bothButton${idNumber}`} type="checkbox" onChange={() => onFormChange(`partsOfLot.${index}.handleType`, "both")} checked={lotSection.handleType == "both" ? true : false}/>
                                                <label htmlFor={`noneButton${idNumber}`}>None</label>
                                                <input id={`noneButton${idNumber}`} type="checkbox" onChange={() => onNoneSelect(currentRow)} checked={lotSection.handleType == "none" ? true : false}/>
                                            </div>    
                                        </div>
                                        <div className='glassSection'>
                                            <div>
                                                <h5>Glass Doors</h5>
                                                <div className='hardwareCheckboxes'>
                                                    <label htmlFor={`doorsYes${idNumber}`}>Yes</label>
                                                    <input id={`doorsYes${idNumber}`} type="checkbox" onChange={() => onFormChange(`partsOfLot.${index}.glassDoors`, true)} checked={lotSection.glassDoors}/>
                                                    <label htmlFor={`doorsNo${idNumber}`}>No</label>
                                                    <input id={`doorsNo${idNumber}`} type="checkbox" onChange={() => onFormChange(`partsOfLot.${index}.glassDoors`, false)} checked={!lotSection.glassDoors}/>
                                                </div>     
                                            </div>
                                            <div>
                                                <h5>Glass Shelves</h5>
                                                <div className='hardwareCheckboxes'>
                                                    <label htmlFor={`shelvesYes${idNumber}`}>Yes</label>
                                                    <input id={`shelvesYes${idNumber}`} type="checkbox" onChange={() => onFormChange(`partsOfLot.${index}.glassShelves`, true)} checked={lotSection.glassShelves}/>
                                                    <label htmlFor={`shelvesNo${idNumber}`}>No</label>
                                                    <input id={`shelvesNo${idNumber}`} type="checkbox" onChange={() => onFormChange(`partsOfLot.${index}.glassShelves`, false)} checked={!lotSection.glassShelves}/>
                                                </div> 
                                            </div>
                                        </div>
                                    </section>
                                    <section className='modifierSection'>
                                        <div className='hardwareModifier' style={{display: ["both", "pulls"].includes(lotSection.handleType ?? "") && lotSection.handleType !== "none" ? "block" : "none"}}>
                                            <label>No. of Pulls:</label>
                                            <select value={lotSection.numOfPulls} onChange={(e) => onFormChange(`partsOfLot.${index}.numOfPulls`, e.target.value)}>
                                                <option value={1}>1</option>
                                                <option value={2}>2</option>
                                            </select>
                                        </div>
                                        <div className='hardwareModifier' style={{display: ["both", "knobs"].includes(lotSection.handleType ?? "") && lotSection.handleType !== "none" ? "block" : "none"}}>
                                            <label>No. of Knobs:</label>
                                            <select value={lotSection.numOfKnobs} onChange={(e) => onFormChange(`partsOfLot.${index}.numOfKnobs`, e.target.value)}>
                                                <option value={1}>1</option>
                                                <option value={2}>2</option>
                                            </select>    
                                        </div>
                                    </section>
                                    <section className="optionParts">
                                        <div className={"doorList"}>
                                            <label htmlFor={`doors${idNumber}`}>Door:</label>
                                            <InputSearch inputName={`partsOfLot.${index}.doors`}   onFormChange={onFormChange} isDropDown={true} getFormValues={getLotValues}></InputSearch>
                                        </div>
                                        <div className={"fingerPullList"}>
                                            <label htmlFor={`fingerpull${idNumber}`}>Fingerpull:</label>
                                            <InputSearch inputName={`partsOfLot.${index}.fingerpull`}   onFormChange={onFormChange} isDropDown={true} locked={true} getFormValues={getLotValues}></InputSearch>
                                        </div>
                                        {Array.from({length: lotSection.numOfPulls}, (_, i) => i + 1).map((i) => {
                                            return <div key={i} className={"pullList"} style={{display: ["both", "pulls"].includes(lotSection.handleType ?? "") && lotSection.handleType !== "none" ? "block" : "none"}}>
                                                        <label htmlFor={`pulls${idNumber}`}>{`Pull${i === 1 ? "" : " 2"}:`}</label>
                                                        <InputSearch inputName={`partsOfLot.${index}.pulls${i === 1 ? "" : "2"}`}   onFormChange={onFormChange} isDropDown={true} getFormValues={getLotValues}></InputSearch>
                                                    </div>
                                        })}
                                        {Array.from({length: lotSection.numOfKnobs}, (_, i) => i + 1).map((i) => {
                                            return <div key={i} className={"knobList"} style={{display: ["both", "knobs"].includes(lotSection.handleType ?? "") && lotSection.handleType !== "none" ? "block" : "none"}}>
                                                        <label htmlFor={`knobs${idNumber}`}>{`Knob${i === 1 ? "" : " 2"}:`}</label>
                                                        <InputSearch inputName={`partsOfLot.${index}.knobs${i === 1 ? "" : "2"}`}   onFormChange={onFormChange} isDropDown={true} getFormValues={getLotValues}></InputSearch>
                                                    </div>
                                        })}
                                    </section>
                                    {lotTableDetails.editingPartsOfLot &&
                                        <section id="additionalOptions" className="optionParts">
                                            <div className={"boxStyleList"}>
                                                <label htmlFor={`boxStyle${idNumber}`}>Box Style:</label>
                                                <InputSearch inputName={`partsOfLot.${index}.boxStyle`}   onFormChange={onFormChange} isDropDown={true} getFormValues={getLotValues}></InputSearch>
                                            </div>
                                            <div className={"drawerFrontList"}>
                                                <label htmlFor={`drawerFronts${idNumber}`}>Drawer Front:</label>
                                                <InputSearch inputName={`partsOfLot.${index}.drawerFronts`}   onFormChange={onFormChange} isDropDown={true} getFormValues={getLotValues}></InputSearch>
                                            </div>
                                            <div className={"drawerBoxesList"}>
                                                <label htmlFor={`drawerBoxes${idNumber}`}>Drawer Boxes:</label>
                                                <InputSearch inputName={`partsOfLot.${index}.drawerBoxes`}   onFormChange={onFormChange} isDropDown={true} getFormValues={getLotValues}></InputSearch>
                                            </div>
                                            <div className={"drawerGuidesList"}>
                                                <label htmlFor={`drawerGuides${idNumber}`}>Drawer Guides:</label>
                                                <InputSearch inputName={`partsOfLot.${index}.drawerGuides`}   onFormChange={onFormChange} isDropDown={true} getFormValues={getLotValues}></InputSearch>
                                            </div>
                                            <div className={"doorHingesList"}>
                                                <label htmlFor={`doorHinges${idNumber}`}>Door Hinges:</label>
                                                <InputSearch inputName={`partsOfLot.${index}.doorHinges`}   onFormChange={onFormChange} isDropDown={true} getFormValues={getLotValues}></InputSearch>
                                            </div>
                                            <div className={"interiorsList"}>
                                                <label htmlFor={`interiors${idNumber}`}>Interiors:</label>
                                                <InputSearch inputName={`partsOfLot.${index}.interiors`}   onFormChange={onFormChange} isDropDown={true} getFormValues={getLotValues}></InputSearch>
                                            </div>
                                        </section>
                                    }
                                    <label>Details: </label>
                                    <ControlledTextArea inputName={"details"} formState={getLotValues()}  onFormChange={onFormChange}></ControlledTextArea>
                                    {lotTableDetails.partsOfLot[currentRow].checklist && <>
                                        <h4 className='checkListTitle'>Checklist:</h4>
                                        <div className='checklist'>
                                            {lotTableDetails.partsOfLot[currentRow].checklist.map((_, index:number) => {
                                                return (
                                                    <div key={index} className='checkListItem'>
                                                        <InputSearch inputName={`partsOfLot.${currentRow}.checklist.${index}`} key={index} onFormChange={onFormChange} isDropDown={false} getFormValues={getLotValues}/>
                                                        <button>X</button>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </>}
                                    <button className='checklistButton' onClick={() => addCheckListItem(currentRow, lotTableDetails.partsOfLot[currentRow].checklist ? lotTableDetails.partsOfLot[currentRow].checklist.length : 0, "Hello")}>Add Checklist</button>
                                    <button style={{display: currentRow === (lotTableDetails.partsOfLot?.length - 1) ? "block" : "none"}} onClick={() => setModalType("partOfLot")} className='newPartOfLotButton'>Add Part Of Lot</button>
                                </td>
                            </tr>
                    })}
                </tbody>
            </table>
            <table className="lotFooter">
                <tbody>
                    <tr>
                        {isOptionsMode && <th>Lot</th>}
                        <th>Kitchen</th>
                        <th>Master</th>
                        <th>Bath 2</th>
                        <th>Bath 3</th>
                        <th>Bath 4</th>
                        <th>Powder</th>
                        <th>Laundry</th>
                        <th>Notes</th>
                    </tr>
                    <tr>
                        {isOptionsMode && <td><InputSearch inputName={"lot"}  onFormChange={onFormChange} isDropDown={false} getFormValues={getLotValues}/></td>}
                        <td><InputSearch inputName={"kitchen"}  onFormChange={onFormChange} isDropDown={true} getFormValues={getLotValues}/></td>
                        <td><InputSearch inputName={"master"}  onFormChange={onFormChange} isDropDown={true} getFormValues={getLotValues}/></td>
                        <td><InputSearch inputName={"bath2"}  onFormChange={onFormChange} isDropDown={true} getFormValues={getLotValues}/></td>
                        <td><InputSearch inputName={"bath3"}  onFormChange={onFormChange} isDropDown={true} getFormValues={getLotValues}/></td>
                        <td><InputSearch inputName={"bath4"}  onFormChange={onFormChange} isDropDown={true} getFormValues={getLotValues}/></td>
                        <td><InputSearch inputName={"powder"}  onFormChange={onFormChange} isDropDown={true} getFormValues={getLotValues}/></td>
                        <td><InputSearch inputName={"laundry"}  onFormChange={onFormChange} isDropDown={true} getFormValues={getLotValues}/></td>
                        <td style={{width: "25%"}}><ControlledTextArea inputName={"footerNotes"} formState={getLotValues()} onFormChange={onFormChange}/></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default LotTable