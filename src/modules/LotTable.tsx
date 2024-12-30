import React from 'react'
import InputSearch from "./InputSearch"
import { LotTableInterface, PartOfLot, JobDetails } from '../types/LotTableInterface';
import ControlledTextArea from "./ControlledTextArea"

type LotTable = {
    lotTableDetails: LotTableInterface;
    jobDetails: JobDetails;
    isOptionsMode: boolean;
    onJobDetailsChange: (value: string | boolean, key: string) => void;
    saveLotTable: (lotTableDetails: LotTableInterface, lotNumber: string) => void;
    setCurrentLotNum: (lotNum: string) => void; 
    setModalType: React.Dispatch<React.SetStateAction<string>>,
}

const LotTable: React.FC<LotTable> = ({isOptionsMode, jobDetails, lotTableDetails, saveLotTable, onJobDetailsChange, setCurrentLotNum, setModalType}) => {
    const deleteLotSection = (lotSectionIndex:number) => {
        const updatedTable:LotTableInterface = {...lotTableDetails}

        if(updatedTable.partsOfLot.length === 2) {
            const balanceOfHouseLot = updatedTable.partsOfLot[0]
            updatedTable.partsOfLot.splice(0, 1, {...balanceOfHouseLot, roomID: "Throughout"})
            updatedTable.hasThroughoutLot = true
        }
        updatedTable.partsOfLot.splice(lotSectionIndex, 1)
        saveLotTable(updatedTable, isOptionsMode ? lotTableDetails.lot : lotTableDetails.plan)
    }

    function findFingerpull(doorID:string):string {
        if(["1", "2", "6"].includes(doorID.charAt(4)) && doorID !== "ECI-605") {
            return "CF-14"
        } else if(doorID.charAt(4) === "3") {
            return "OD-6"
        } else if (doorID.charAt(4) === "4") {
            return doorID.charAt(5) === "0" ? "OD-1" : "OD-2" 
        } else {
            return "CF-2"
        }
    }

    const onFormChange = (value: string | boolean | number, key: string, optionSectionNum: number=-1) => {
        let updatedTable:LotTableInterface;
        const example = {[key]: value}

        if(key === "doors")
            example.fingerpull = findFingerpull(value as string)

        if(optionSectionNum === -1) {
            updatedTable = {
                ...lotTableDetails,
                ...example
            }
        } else {
            updatedTable = {...lotTableDetails}
            updatedTable.partsOfLot = updatedTable.partsOfLot.map((partOfLot:PartOfLot, index:number) => (index === optionSectionNum ? { ...partOfLot, ...example } : partOfLot))
        }

        if((key === "lot" || key === "plan") && typeof value === "string") 
            setCurrentLotNum(value)

        saveLotTable(updatedTable, (isOptionsMode ? lotTableDetails.lot : lotTableDetails.plan))
    }

    const onNoneSelect = (optionSectionNum: number=-1) => {
        const updatedTable = {...lotTableDetails}
        updatedTable.partsOfLot = updatedTable.partsOfLot.map((partOfLot:PartOfLot, index:number) => (index === optionSectionNum ? { ...partOfLot, handleType: "none", pulls: "", knobs: "" } : partOfLot))
        saveLotTable(updatedTable, (isOptionsMode ? lotTableDetails.lot : lotTableDetails.plan))
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
                        <td><InputSearch inputName={"builder"} formState={jobDetails} onFormChange={onJobDetailsChange} isDropDown={true}></InputSearch></td>
                        <td><InputSearch inputName={"project"} formState={jobDetails} onFormChange={onJobDetailsChange} isDropDown={true}></InputSearch></td>
                        <td><InputSearch inputName={"phase"} formState={jobDetails} onFormChange={onJobDetailsChange} isDropDown={false}></InputSearch></td>
                        <td><InputSearch inputName={"superintendent"} formState={jobDetails} onFormChange={onJobDetailsChange} isDropDown={false}></InputSearch></td>
                        <td><InputSearch inputName={"phone"} formState={jobDetails} onFormChange={onJobDetailsChange} isDropDown={false}></InputSearch></td>
                        <td><InputSearch inputName={"foreman"} formState={jobDetails} onFormChange={onJobDetailsChange} isDropDown={true} ></InputSearch></td>
                    </tr>
                </tbody>
            </table>) : <></>}
            <table className='lotInfo'>
                <tbody>
                    {isOptionsMode ? (
                        <tr>
                            <th>Job ID</th>
                            <td><InputSearch inputName={"jobID"} formState={jobDetails} onFormChange={onJobDetailsChange} isDropDown={false}></InputSearch></td>
                        </tr>
                    ) : <tr>
                            <th>Builder</th>
                            <td><InputSearch inputName={"builder"} formState={jobDetails} onFormChange={onJobDetailsChange} isDropDown={true}></InputSearch></td>
                        </tr>}
                    <tr>
                        <th>Box Style</th>
                        <td><InputSearch inputName={"boxStyle"} formState={lotTableDetails} onFormChange={onFormChange} isDropDown={true}></InputSearch></td>
                    </tr>
                    <tr>
                        <th>Drawer Fronts</th>
                        <td>
                            <InputSearch inputName={"drawerFronts"} optionSectionNum={0} formState={lotTableDetails} onFormChange={onFormChange} isDropDown={true}></InputSearch>
                        </td>
                    </tr>
                    <tr>
                        <th>Drawer Boxes</th>
                        {/* Look at changing this Input Search */}
                        <td>
                            <InputSearch inputName={"drawerBoxes"} optionSectionNum={0} formState={lotTableDetails} onFormChange={onFormChange} isDropDown={true}></InputSearch>
                        </td>
                    </tr>
                    <tr>
                        <th>Drawer Guides</th>
                        {/* Look at changing this Input Search */}
                        <td>
                            <InputSearch inputName={"drawerGuides"} optionSectionNum={0} formState={lotTableDetails} onFormChange={onFormChange} isDropDown={true}></InputSearch>
                        </td>
                    </tr>
                    <tr>
                        <th>Door Hinges</th>
                        {/* Look at changing this Input Search */}
                        <td>
                            <InputSearch inputName={"doorHinges"} optionSectionNum={0} formState={lotTableDetails} onFormChange={onFormChange} isDropDown={true}></InputSearch>
                        </td>
                    </tr>
                    <tr>
                        <th>Interiors</th>
                        {/* Look at changing this Input Search */}
                        <td><InputSearch inputName={"interiors"} formState={lotTableDetails} onFormChange={onFormChange} isDropDown={true}></InputSearch></td>
                    </tr>
                    <tr>
                        <th>Upper Height</th>
                        <td><InputSearch inputName={"upperHeight"} formState={lotTableDetails} onFormChange={onFormChange} isDropDown={false}></InputSearch></td>
                    </tr>
                    <tr>
                        <th>Islands</th>
                        <td><InputSearch inputName={"islands"} formState={lotTableDetails} onFormChange={onFormChange} isDropDown={true}></InputSearch></td>
                    </tr>
                    <tr>
                        <th>Supports</th>
                        <td><InputSearch inputName={"supports"} formState={lotTableDetails} onFormChange={onFormChange} isDropDown={true}></InputSearch></td>
                    </tr>
                    <tr>
                        <th>Crown</th>
                        <td><InputSearch inputName={"crown"} formState={lotTableDetails} onFormChange={onFormChange} isDropDown={true}></InputSearch></td>
                    </tr>
                    <tr>
                        <th>Light Rail</th>
                        <td><InputSearch inputName={"lightRail"} formState={lotTableDetails} onFormChange={onFormChange} isDropDown={true}></InputSearch></td>
                    </tr>
                    <tr>
                        <th>Base Shoe</th>
                        <td><InputSearch inputName={"baseShoe"} formState={lotTableDetails} onFormChange={onFormChange} isDropDown={true}></InputSearch></td>
                    </tr>
                    <tr>
                        <th>Recycling Bins</th>
                        <td><InputSearch inputName={"recyclingBins"} formState={lotTableDetails} onFormChange={onFormChange} isDropDown={true}></InputSearch></td>
                    </tr>
                    <tr>
                        <th>Job Specific Notes</th>
                        <td><ControlledTextArea inputName={"jobNotes"} formState={jobDetails} onFormChange={onJobDetailsChange}></ControlledTextArea></td>
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
                            <ControlledTextArea inputName={"lotNotes"} formState={lotTableDetails} onFormChange={onFormChange}></ControlledTextArea>
                        </td>
                        <td className='applianceColumn'>
                            <ControlledTextArea inputName={"appliances"} formState={lotTableDetails} onFormChange={onFormChange}></ControlledTextArea>
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
                                <InputSearch inputName={"lotOptionsValue"} formState={lotTableDetails} onFormChange={onFormChange} isDropDown={false}></InputSearch>
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
                                            <InputSearch inputName={"lot"} formState={lotTableDetails} onFormChange={onFormChange} isDropDown={false}></InputSearch>
                                        }
                                        <button className="deleteButton" style={{display: currentRow !== 0 ? "block" : "none"}} onClick={() => deleteLotSection(currentRow)}>Delete Row</button>
                                    </td>
                                }
                                <td>
                                    {(currentRow === 0 || !lotTableDetails.hasThroughoutLot && currentRow === 1) &&
                                        <InputSearch inputName={"plan"} formState={lotTableDetails} onFormChange={onFormChange} isDropDown={false}></InputSearch>
                                    }
                                    {!isOptionsMode && <button className="deleteButton" style={{display: currentRow !== 0 ? "block" : "none"}} onClick={() => deleteLotSection(currentRow)}>Delete Row</button>}
                                </td>
                                <td>
                                    {(lotTableDetails.partsOfLot.length > 1 && (lotTableDetails.hasThroughoutLot && currentRow === 0 || !lotTableDetails.hasThroughoutLot && currentRow === 1))&& <button onClick={() => {
                                        onFormChange(!lotTableDetails.hasThroughoutLot, "hasThroughoutLot")
                                        console.log(lotTableDetails)
                                        }}>{lotTableDetails.hasThroughoutLot ? "Remove Balance of House" : "Reveal Balance of House"}</button>}
                                    <label htmlFor={`material${idNumber}`}>Material:</label>
                                    <InputSearch inputName={`material`} optionSectionNum={currentRow} formState={lotTableDetails} onFormChange={onFormChange} isDropDown={true}></InputSearch>
                                    <label htmlFor={`color${idNumber}`}>Color:</label>
                                    <InputSearch inputName={`color`} optionSectionNum={currentRow} formState={lotTableDetails} onFormChange={onFormChange} isDropDown={true}></InputSearch>
                                </td>
                                <td className="optionCell">
                                    <label htmlFor={`roomID${idNumber}`}>Room ID: </label>
                                    <InputSearch inputName={`roomID`} optionSectionNum={currentRow} formState={lotTableDetails} onFormChange={onFormChange} isDropDown={false}></InputSearch>
                                    <section className='hardwareHeader'>
                                        <div className='hardwareEditor'>
                                            <h3>Hardware</h3>
                                            <div className='hardwareCheckboxes'>
                                                <label htmlFor={`pullsButton${idNumber}`}>Pulls</label>
                                                <input id={`pullsButton${idNumber}`} type="checkbox" onChange={() => onFormChange("pulls", "handleType", currentRow)} checked={lotSection.handleType == "pulls" ? true : false}/>
                                                <label htmlFor={`knobsButton${idNumber}`}>Knobs</label>
                                                <input id={`knobsButton${idNumber}`} type="checkbox" onChange={() => onFormChange("knobs", "handleType", currentRow)} checked={lotSection.handleType == "knobs" ? true : false}/>
                                                <label htmlFor={`bothButton${idNumber}`}>Both</label>
                                                <input id={`bothButton${idNumber}`} type="checkbox" onChange={() => onFormChange("both", "handleType", currentRow)} checked={lotSection.handleType == "both" ? true : false}/>
                                                <label htmlFor={`noneButton${idNumber}`}>None</label>
                                                <input id={`noneButton${idNumber}`} type="checkbox" onChange={() => onNoneSelect(currentRow)} checked={lotSection.handleType == "none" ? true : false}/>
                                            </div>    
                                        </div>
                                        <div className='glassSection'>
                                            <div>
                                                <h5>Glass Doors</h5>
                                                <div className='hardwareCheckboxes'>
                                                    <label htmlFor={`doorsYes${idNumber}`}>Yes</label>
                                                    <input id={`doorsYes${idNumber}`} type="checkbox" onChange={() => onFormChange(true, "glassDoors", currentRow)} checked={lotSection.glassDoors}/>
                                                    <label htmlFor={`doorsNo${idNumber}`}>No</label>
                                                    <input id={`doorsNo${idNumber}`} type="checkbox" onChange={() => onFormChange(false, "glassDoors", currentRow)} checked={!lotSection.glassDoors}/>
                                                </div>     
                                            </div>
                                            <div>
                                                <h5>Glass Shelves</h5>
                                                <div className='hardwareCheckboxes'>
                                                    <label htmlFor={`shelvesYes${idNumber}`}>Yes</label>
                                                    <input id={`shelvesYes${idNumber}`} type="checkbox" onChange={() => onFormChange(true, "glassShelves", currentRow)} checked={lotSection.glassShelves}/>
                                                    <label htmlFor={`shelvesNo${idNumber}`}>No</label>
                                                    <input id={`shelvesNo${idNumber}`} type="checkbox" onChange={() => onFormChange(false, "glassShelves", currentRow)} checked={!lotSection.glassShelves}/>
                                                </div> 
                                            </div>
                                        </div>
                                    </section>
                                    <section className='modifierSection'>
                                        <div className='hardwareModifier' style={{display: ["both", "pulls"].includes(lotSection.handleType ?? "") && lotSection.handleType !== "none" ? "block" : "none"}}>
                                            <label>No. of Pulls:</label>
                                            <select value={lotSection.numOfPulls} onChange={(e) => onFormChange(e.target.value, "numOfPulls", currentRow)}>
                                                <option value={1}>1</option>
                                                <option value={2}>2</option>
                                            </select>
                                        </div>
                                        <div className='hardwareModifier' style={{display: ["both", "knobs"].includes(lotSection.handleType ?? "") && lotSection.handleType !== "none" ? "block" : "none"}}>
                                            <label>No. of Knobs:</label>
                                            <select value={lotSection.numOfKnobs} onChange={(e) => onFormChange(e.target.value, "numOfKnobs", currentRow)}>
                                                <option value={1}>1</option>
                                                <option value={2}>2</option>
                                            </select>    
                                        </div>
                                    </section>
                                    <section className="optionParts">
                                        <div className={"doorList"}>
                                            <label htmlFor={`doors${idNumber}`}>Door:</label>
                                            <InputSearch inputName={`doors`} optionSectionNum={currentRow} formState={lotTableDetails} onFormChange={onFormChange} isDropDown={true}></InputSearch>
                                        </div>
                                        <div className={"fingerPullList"}>
                                            <label htmlFor={`fingerpull${idNumber}`}>Fingerpull:</label>
                                            <InputSearch inputName={`fingerpull`} optionSectionNum={currentRow} formState={lotTableDetails} onFormChange={onFormChange} isDropDown={true}></InputSearch>
                                        </div>
                                        {Array.from({length: lotSection.numOfPulls}, (_, i) => i + 1).map((i) => {
                                            return <div key={i} className={"pullList"} style={{display: ["both", "pulls"].includes(lotSection.handleType ?? "") && lotSection.handleType !== "none" ? "block" : "none"}}>
                                                        <label htmlFor={`pulls${idNumber}`}>{`Pull${i === 1 ? "" : " 2"}:`}</label>
                                                        <InputSearch inputName={`pulls${i === 1 ? "" : "2"}`} optionSectionNum={currentRow} formState={lotTableDetails} onFormChange={onFormChange} isDropDown={true}></InputSearch>
                                                    </div>
                                        })}
                                        {Array.from({length: lotSection.numOfKnobs}, (_, i) => i + 1).map((i) => {
                                            return <div key={i} className={"knobList"} style={{display: ["both", "knobs"].includes(lotSection.handleType ?? "") && lotSection.handleType !== "none" ? "block" : "none"}}>
                                                        <label htmlFor={`knobs${idNumber}`}>{`Knob${i === 1 ? "" : " 2"}:`}</label>
                                                        <InputSearch inputName={`knobs${i === 1 ? "" : "2"}`} optionSectionNum={currentRow} formState={lotTableDetails} onFormChange={onFormChange} isDropDown={true}></InputSearch>
                                                    </div>
                                        })}
                                    </section>
                                    <label>Details: </label>
                                    <ControlledTextArea inputName={"details"} optionSectionNum={currentRow} formState={lotTableDetails} onFormChange={onFormChange}></ControlledTextArea>
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
                        {isOptionsMode && <td><InputSearch inputName={"lot"} formState={lotTableDetails} onFormChange={onFormChange} isDropDown={false}/></td>}
                        <td><InputSearch inputName={"kitchen"} formState={lotTableDetails} onFormChange={onFormChange} isDropDown={true}/></td>
                        <td><InputSearch inputName={"master"} formState={lotTableDetails} onFormChange={onFormChange} isDropDown={true}/></td>
                        <td><InputSearch inputName={"bath2"} formState={lotTableDetails} onFormChange={onFormChange} isDropDown={true}/></td>
                        <td><InputSearch inputName={"bath3"} formState={lotTableDetails} onFormChange={onFormChange} isDropDown={true}/></td>
                        <td><InputSearch inputName={"bath4"} formState={lotTableDetails} onFormChange={onFormChange} isDropDown={true}/></td>
                        <td><InputSearch inputName={"powder"} formState={lotTableDetails} onFormChange={onFormChange} isDropDown={true}/></td>
                        <td><InputSearch inputName={"laundry"} formState={lotTableDetails} onFormChange={onFormChange} isDropDown={true}/></td>
                        <td style={{width: "25%"}}><ControlledTextArea inputName={"footerNotes"} formState={lotTableDetails} onFormChange={onFormChange}/></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default LotTable