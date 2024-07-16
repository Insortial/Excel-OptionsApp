import React, { useEffect, useState } from 'react'
import InputSearch from "./InputSearch"
import { LotTableInterface, PartOfLot, ProductionSchedule } from '../types/LotTableInterface';
import ControlledTextArea from "./ControlledTextArea"

type LotTable = {
    lotTableDetails: LotTableInterface;
    prodSchedule: ProductionSchedule;
    setProdSchedule: (prodSchedule: ProductionSchedule) => void;
    saveLotTable: (lotTableDetails: LotTableInterface) => void;
}

const LotTable: React.FC<LotTable> = ({prodSchedule, lotTableDetails, saveLotTable, setProdSchedule}) => {
    let throughoutLot:PartOfLot = {
        roomID: "Throughout",
        material: "",
        stain: "",
        doors: "",
        fingerpull: "",
        drawerFronts: "",
        knobs: "",
        drawerBoxes: "",
        drawerGuides: "",
        doorHinges: "",
        pulls: "",
    }

    let initialLotTableInterface:LotTableInterface = {
        boxStyle: "",
        interiors: "",
        upperHeight: "",
        islands: "",
        crown: "",
        lightRail: "",
        baseShoe: "",
        recyclingBins: "",
        jobNotes: "",
        lot: "",
        plan: "",
        partsOfLot: [throughoutLot],
    }

    const[formState, setFormState] = useState<LotTableInterface>(initialLotTableInterface)

    const deleteLotSection = (lotSectionIndex:number) => {
        console.log(lotSectionIndex)
        let updatedTable:LotTableInterface = {...formState}
        updatedTable.partsOfLot.splice(lotSectionIndex, 1)
        setFormState(updatedTable)
        saveLotTable(updatedTable)
    }

    const onFormChange = (value: string | boolean, key: string, optionSectionNum: number=-1) => {
        let updatedTable:LotTableInterface;
        if(optionSectionNum === -1) {
            updatedTable = {
                ...formState,
                [key]: value
            }
        } else {
            updatedTable = {...formState}
            updatedTable.partsOfLot = updatedTable.partsOfLot.map((partOfLot:PartOfLot, index:number) => (index === optionSectionNum ? { ...partOfLot, [key]: value } : partOfLot))
        }
        setFormState(updatedTable)
        saveLotTable(updatedTable)
    }

    const onProdScheduleChange = (value: string | boolean, key: string) => {
        let updatedTable = {
            ...prodSchedule,
            [key]: value
        }
        setProdSchedule(updatedTable)
    }

    const addOptionRow = () => {
        let lotSection:PartOfLot = {
            roomID: "",
            handleType: "pull",
            drawerFronts: formState.partsOfLot[0].drawerFronts ?? "",
            drawerBoxes: formState.partsOfLot[0].drawerBoxes ?? "",
            drawerGuides: formState.partsOfLot[0].drawerGuides ?? "",
            doorHinges: formState.partsOfLot[0].doorHinges ?? "",
        }

        let newPartsOfLot = [...formState.partsOfLot, lotSection]

        setFormState({...formState,
            partsOfLot: newPartsOfLot
        })
    }
    
    useEffect(() => {
        setFormState(lotTableDetails)
    }, [lotTableDetails])
    

    return (
        <div className='exampleSection'>
            <table className='projectInfo'>
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
                        <td><InputSearch inputName={"builder"} formState={prodSchedule} onFormChange={onProdScheduleChange} isDropDown={true}></InputSearch></td>
                        <td><InputSearch inputName={"project"} formState={prodSchedule} onFormChange={onProdScheduleChange} isDropDown={true}></InputSearch></td>
                        <td><InputSearch inputName={"phase"} formState={prodSchedule} onFormChange={onProdScheduleChange} isDropDown={false}></InputSearch></td>
                        <td><InputSearch inputName={"superintendent"} formState={prodSchedule} onFormChange={onProdScheduleChange} isDropDown={false}></InputSearch></td>
                        <td><InputSearch inputName={"phone"} formState={prodSchedule} onFormChange={onProdScheduleChange} isDropDown={false}></InputSearch></td>
                        <td><InputSearch inputName={"foreman"} formState={prodSchedule} onFormChange={onProdScheduleChange} isDropDown={true} ></InputSearch></td>
                    </tr>
                </tbody>
            </table>
            <table className='lotInfo'>
                <tbody>
                    <tr>
                        <th>Job ID</th>
                        <td><InputSearch inputName={"jobID"} formState={prodSchedule} onFormChange={onProdScheduleChange} isDropDown={false}></InputSearch></td>
                    </tr>
                    <tr>
                        <th>Box Style</th>
                        <td><InputSearch inputName={"boxStyle"} formState={formState} onFormChange={onFormChange} isDropDown={true}></InputSearch></td>
                    </tr>
                    <tr>
                        <th>Drawer Fronts</th>
                        <td><InputSearch inputName={"drawerFronts"} optionSectionNum={0} formState={formState} onFormChange={onFormChange} isDropDown={true}></InputSearch></td>
                    </tr>
                    <tr>
                        <th>Drawer Boxes</th>
                        {/* Look at changing this Input Search */}
                        <td><InputSearch inputName={"drawerBoxes"} optionSectionNum={0} formState={formState} onFormChange={onFormChange} isDropDown={true}></InputSearch></td>
                    </tr>
                    <tr>
                        <th>Drawer Guides</th>
                        {/* Look at changing this Input Search */}
                        <td><InputSearch inputName={"drawerGuides"} optionSectionNum={0} formState={formState} onFormChange={onFormChange} isDropDown={true}></InputSearch></td>
                    </tr>
                    <tr>
                        <th>Door Hinges</th>
                        {/* Look at changing this Input Search */}
                        <td><InputSearch inputName={"doorHinges"} optionSectionNum={0} formState={formState} onFormChange={onFormChange} isDropDown={true}></InputSearch></td>
                    </tr>
                    <tr>
                        <th>Interiors</th>
                        {/* Look at changing this Input Search */}
                        <td><InputSearch inputName={"interiors"} formState={formState} onFormChange={onFormChange} isDropDown={true}></InputSearch></td>
                    </tr>
                    <tr>
                        <th>Upper Height</th>
                        <td><InputSearch inputName={"upperHeight"} formState={formState} onFormChange={onFormChange} isDropDown={false}></InputSearch></td>
                    </tr>
                    <tr>
                        <th>Islands</th>
                        <td><InputSearch inputName={"islands"} formState={formState} onFormChange={onFormChange} isDropDown={false}></InputSearch></td>
                    </tr>
                    <tr>
                        <th>Crown</th>
                        <td><InputSearch inputName={"crown"} formState={formState} onFormChange={onFormChange} isDropDown={false}></InputSearch></td>
                    </tr>
                    <tr>
                        <th>Light Rail</th>
                        <td><InputSearch inputName={"lightRail"} formState={formState} onFormChange={onFormChange} isDropDown={false}></InputSearch></td>
                    </tr>
                    <tr>
                        <th>Base Shoe</th>
                        <td><InputSearch inputName={"baseShoe"} formState={formState} onFormChange={onFormChange} isDropDown={false}></InputSearch></td>
                    </tr>
                    <tr>
                        <th>Recycling Bins</th>
                        <td><InputSearch inputName={"recyclingBins"} formState={formState} onFormChange={onFormChange} isDropDown={false}></InputSearch></td>
                    </tr>
                    <tr>
                        <th>Job Specific Notes</th>
                        <td><ControlledTextArea inputName={"jobNotes"} formState={formState} onFormChange={onFormChange}></ControlledTextArea></td>
                    </tr>
                </tbody>
            </table>
            <table className='optionsInfo'>
                <tbody>
                    <tr>
                        <th colSpan={2}>Lot Option Contract Value</th>
                        <td colSpan={3}><InputSearch inputName={"optionValue"} formState={formState} onFormChange={onFormChange} isDropDown={false}></InputSearch></td>
                    </tr>
                    <tr>
                        <th>LOT</th>
                        <th>PLAN</th>
                        <th>Material/Stain</th>
                        <th>Option</th>
                        {/* <th>Notes:</th> */}
                    </tr>
                    {formState.partsOfLot?.map((lotSection:PartOfLot, currentRow:number) => {
                        let idNumber = currentRow > 0 ? currentRow : ""
                        return <tr key={currentRow}>
                                    <td>
                                        {currentRow == 0 &&
                                            <InputSearch inputName={"lot"} formState={formState} onFormChange={onFormChange} isDropDown={false}></InputSearch>
                                        }
                                        <button className="deleteButton" style={{display: currentRow !== 0 ? "block" : "none"}} onClick={() => deleteLotSection(currentRow)}>Delete Row</button>
                                    </td>
                                    <td>
                                        {currentRow == 0 &&
                                            <InputSearch inputName={"plan"} formState={formState} onFormChange={onFormChange} isDropDown={false}></InputSearch>
                                        }
                                    </td>
                                    <td>
                                        <label htmlFor={`material${idNumber}`}>Material:</label>
                                        <InputSearch inputName={`material`} optionSectionNum={currentRow} formState={formState} onFormChange={onFormChange} isDropDown={true}></InputSearch>
                                        <label htmlFor={`stain${idNumber}`}>Color:</label>
                                        <InputSearch inputName={`stain`} optionSectionNum={currentRow} formState={formState} onFormChange={onFormChange} isDropDown={true}></InputSearch>
                                        <button style={{display: currentRow === (formState.partsOfLot?.length - 1) ? "block" : "none"}} onClick={addOptionRow}>Add Material</button>
                                    </td>
                                    <td className="optionCell">
                                    <label htmlFor={`roomID${idNumber}`}>Room ID: </label>
                                    <InputSearch inputName={`roomID`} optionSectionNum={currentRow} formState={formState} onFormChange={onFormChange} isDropDown={false}></InputSearch>
                                    <section className='hardwareHeader'>
                                        <h3>Hardware</h3>
                                        <label htmlFor={`pullsButton${idNumber}`}>Pulls</label>
                                        <input id={`pullsButton${idNumber}`} type="checkbox" onChange={() => onFormChange("pull", "handleType", currentRow)} checked={lotSection.handleType == "pull" ? true : false}/>
                                        <label htmlFor={`knobsButton${idNumber}`}>Knobs</label>
                                        <input id={`knobsButton${idNumber}`} type="checkbox" onChange={() => onFormChange("knob", "handleType", currentRow)} checked={lotSection.handleType == "knob" ? true : false}/>
                                        <label htmlFor={`bothButton${idNumber}`}>Both</label>
                                        <input id={`bothButton${idNumber}`} type="checkbox" onChange={() => onFormChange("both", "handleType", currentRow)} checked={lotSection.handleType == "both" ? true : false}/>
                                    </section>
                                    <section className="optionParts">
                                        <div className={"doorList"}>
                                            <label htmlFor={`doors${idNumber}`}>Door:</label>
                                            <InputSearch inputName={`doors`} optionSectionNum={currentRow} formState={formState} onFormChange={onFormChange} isDropDown={true}></InputSearch>
                                        </div>
                                        <div className={"fingerPullList"}>
                                            <label htmlFor={`fingerpull${idNumber}`}>Fingerpull:</label>
                                            <InputSearch inputName={`fingerpull`} optionSectionNum={currentRow} formState={formState} onFormChange={onFormChange} isDropDown={false}></InputSearch>
                                        </div>
                                        <div className={"pullList"} style={{display: ["both", "pull"].includes(lotSection.handleType ?? "") ? "block" : "none"}}>
                                            <label htmlFor={`pulls${idNumber}`}>{"Pulls:"}</label>
                                            <InputSearch inputName={`pulls`} optionSectionNum={currentRow} formState={formState} onFormChange={onFormChange} isDropDown={true}></InputSearch>
                                        </div>
                                        <div className={"knobList"} style={{display: ["both", "knob"].includes(lotSection.handleType ?? "") ? "block" : "none"}}>
                                            <label htmlFor={`knobs${idNumber}`}>{"Knobs:"}</label>
                                            <InputSearch inputName={`knobs`} optionSectionNum={currentRow} formState={formState} onFormChange={onFormChange} isDropDown={true}></InputSearch>
                                        </div>
                                        {currentRow !== 0 &&
                                            <>
                                                <div className={"guideList"}>
                                                    <label htmlFor={`drawerGuides${idNumber}`}>Guide:</label>
                                                    <InputSearch inputName={`drawerGuides`} optionSectionNum={currentRow} formState={formState} onFormChange={onFormChange} isDropDown={true}></InputSearch>
                                                </div>
                                                <div className={"hingeList"}>
                                                    <label htmlFor={`doorHinges${idNumber}`}>Hinge:</label>
                                                    <InputSearch inputName={"doorHinges"} optionSectionNum={currentRow} formState={formState} onFormChange={onFormChange} isDropDown={true}></InputSearch>
                                                </div>
                                                <div className={"drawerBoxList"}>
                                                    <label htmlFor={`drawerBoxes${idNumber}`}>Drawer Box:</label>
                                                    <InputSearch inputName={"drawerBoxes"} optionSectionNum={currentRow} formState={formState} onFormChange={onFormChange} isDropDown={true}></InputSearch>
                                                </div>
                                            </>
                                        }
                                    </section>
                                    <label>Details: </label>
                                    <ControlledTextArea inputName={"details"} optionSectionNum={currentRow} formState={formState} onFormChange={onFormChange}></ControlledTextArea>
                                    {currentRow == 0 &&
                                        <>
                                            <label htmlFor={`appliances${idNumber}`}>Appliances: </label>
                                            <ControlledTextArea inputName={"appliances"} optionSectionNum={currentRow} formState={formState} onFormChange={onFormChange}></ControlledTextArea>
                                        </>
                                    }
                                </td>
                            </tr>
                    })}
                </tbody>
            </table>
            <table className="lotFooter">
                <tbody>
                    <tr>
                        <th>Lot</th>
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
                        <td><InputSearch inputName={"lotFooter"} formState={prodSchedule} onFormChange={onProdScheduleChange} isDropDown={false}/></td>
                        <td><InputSearch inputName={"kitchen"} formState={prodSchedule} onFormChange={onProdScheduleChange} isDropDown={true}/></td>
                        <td><InputSearch inputName={"master"} formState={prodSchedule} onFormChange={onProdScheduleChange} isDropDown={true}/></td>
                        <td><InputSearch inputName={"bath2"} formState={prodSchedule} onFormChange={onProdScheduleChange} isDropDown={true}/></td>
                        <td><InputSearch inputName={"bath3"} formState={prodSchedule} onFormChange={onProdScheduleChange} isDropDown={true}/></td>
                        <td><InputSearch inputName={"bath4"} formState={prodSchedule} onFormChange={onProdScheduleChange} isDropDown={true}/></td>
                        <td><InputSearch inputName={"powder"} formState={prodSchedule} onFormChange={onProdScheduleChange} isDropDown={true}/></td>
                        <td><InputSearch inputName={"laundry"} formState={prodSchedule} onFormChange={onProdScheduleChange} isDropDown={true}/></td>
                        <td style={{width: "25%"}}><ControlledTextArea inputName={"footerNotes"} formState={prodSchedule} onFormChange={onProdScheduleChange}/></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default LotTable