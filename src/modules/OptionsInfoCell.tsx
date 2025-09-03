import React from 'react'
import InputSearch from './InputSearch';
import { Control, useFieldArray, UseFormGetValues } from 'react-hook-form';
import { LotTableInterface, PartOfLot } from '@excelcabinets/excel-types/LotTableInterface';
import ControlledTextArea from './ControlledTextArea';

type OptionsInfoCell = {
    onFormChange: (key: string, value: string | boolean) => void;
    onNoneSelect: (index: number) => void;
    getLotListValues: UseFormGetValues<{lots: LotTableInterface[]}>;
    deleteLotSection: (index: number) => void;
    changeLotEditingMode: (editingPartsOfLot: boolean) => void;
    setModalType: React.Dispatch<React.SetStateAction<string>>;
    controlLotList: Control<{lots: LotTableInterface[]}>;
    editingPartsOfLot: boolean;
    currentIDX: number;
    hasThroughoutLot: boolean;
    partsOfLot: PartOfLot[];
    isOptionsMode: boolean;
    index: number;
    lotSection: PartOfLot;
}

const OptionsInfoCell:React.FC<OptionsInfoCell> = ({index, hasThroughoutLot, isOptionsMode, currentIDX, partsOfLot, lotSection, editingPartsOfLot, controlLotList, onFormChange, onNoneSelect, getLotListValues, deleteLotSection, changeLotEditingMode, setModalType}) => {
    const {fields, /* append, */ remove} = useFieldArray({control: controlLotList, name: `lots.${currentIDX}.partsOfLot.${index}.checklist`})
    const idNumber = index > 0 ? index : ""

    return (
        <tr key={index}>
            {isOptionsMode &&
                <td>
                    {(index === 0 || !hasThroughoutLot && index === 1) &&
                        <InputSearch inputName={`lots.${currentIDX}.lot`}  onFormChange={onFormChange} isDropDown={false} locked={true} getFormValues={getLotListValues}></InputSearch>
                    }
                    <button className="deleteButton" style={{display: index !== 0 ? "block" : "none"}} onClick={() => deleteLotSection(index)}>Delete Row</button>
                </td>
            }
            <td>
                {(index === 0 || !hasThroughoutLot && index === 1) &&
                    <InputSearch inputName={`lots.${currentIDX}.plan`}  onFormChange={onFormChange} isDropDown={false} locked={isOptionsMode} getFormValues={getLotListValues}></InputSearch>
                }
                {!isOptionsMode && <button className="deleteButton" style={{display: index !== 0 ? "block" : "none"}} onClick={() => deleteLotSection(index)}>Delete Row</button>}
            </td>
            <td>
                {(partsOfLot.length > 1 && (hasThroughoutLot && index === 0 || !hasThroughoutLot && index === 1)) && 
                    <>
                        <button className="editPartsOfLotButton" onClick={() => changeLotEditingMode(!editingPartsOfLot)}>{editingPartsOfLot ? `Set Options to Balance of House` : "Edit By Part of Lot"}</button>
                        <button onClick={() => {
                            onFormChange("hasThroughoutLot", !hasThroughoutLot)
                            }}>{hasThroughoutLot ? "Remove Balance of House" : "Reveal Balance of House"}
                        </button>
                    </>}
                <label htmlFor={`material${idNumber}`}>Material:</label>
                <InputSearch inputName={`lots.${currentIDX}.partsOfLot.${index}.material`} optionSectionNum={index} onFormChange={onFormChange} isDropDown={true} getFormValues={getLotListValues}></InputSearch>
                <label htmlFor={`color${idNumber}`}>Color:</label>
                <InputSearch inputName={`lots.${currentIDX}.partsOfLot.${index}.color`} optionSectionNum={index} onFormChange={onFormChange} isDropDown={true} getFormValues={getLotListValues}></InputSearch>
            </td>
            <td className="optionCell">
                <label htmlFor={`roomID${idNumber}`}>Room ID: </label>
                <InputSearch inputName={`lots.${currentIDX}.partsOfLot.${index}.roomID`} optionSectionNum={index} onFormChange={onFormChange} isDropDown={false} getFormValues={getLotListValues}></InputSearch>
                <section className='hardwareHeader'>
                    <div className='hardwareEditor'>
                        <h3>Hardware</h3>
                        <div className='hardwareCheckboxes'>
                            <label htmlFor={`pullsButton${idNumber}`}>Pulls</label>
                            <input id={`pullsButton${idNumber}`} type="checkbox" onChange={() => onFormChange(`lots.${currentIDX}.partsOfLot.${index}.handleType`, "pulls")} checked={lotSection.handleType == "pulls" ? true : false}/>
                            <label htmlFor={`knobsButton${idNumber}`}>Knobs</label>
                            <input id={`knobsButton${idNumber}`} type="checkbox" onChange={() => onFormChange(`lots.${currentIDX}.partsOfLot.${index}.handleType`, "knobs")} checked={lotSection.handleType == "knobs" ? true : false}/>
                            <label htmlFor={`bothButton${idNumber}`}>Both</label>
                            <input id={`bothButton${idNumber}`} type="checkbox" onChange={() => onFormChange(`lots.${currentIDX}.partsOfLot.${index}.handleType`, "both")} checked={lotSection.handleType == "both" ? true : false}/>
                            <label htmlFor={`noneButton${idNumber}`}>None</label>
                            <input id={`noneButton${idNumber}`} type="checkbox" onChange={() => onNoneSelect(index)} checked={lotSection.handleType == "none" ? true : false}/>
                        </div>    
                    </div>
                    <div className='glassSection'>
                        <div>
                            <h5>Glass Doors</h5>
                            <div className='hardwareCheckboxes'>
                                <label htmlFor={`doorsYes${idNumber}`}>Yes</label>
                                <input id={`doorsYes${idNumber}`} type="checkbox" onChange={() => onFormChange(`lots.${currentIDX}.partsOfLot.${index}.glassDoors`, true)} checked={lotSection.glassDoors}/>
                                <label htmlFor={`doorsNo${idNumber}`}>No</label>
                                <input id={`doorsNo${idNumber}`} type="checkbox" onChange={() => onFormChange(`lots.${currentIDX}.partsOfLot.${index}.glassDoors`, false)} checked={!lotSection.glassDoors}/>
                            </div>     
                        </div>
                        <div>
                            <h5>Glass Shelves</h5>
                            <div className='hardwareCheckboxes'>
                                <label htmlFor={`shelvesYes${idNumber}`}>Yes</label>
                                <input id={`shelvesYes${idNumber}`} type="checkbox" onChange={() => onFormChange(`lots.${currentIDX}.partsOfLot.${index}.glassShelves`, true)} checked={lotSection.glassShelves}/>
                                <label htmlFor={`shelvesNo${idNumber}`}>No</label>
                                <input id={`shelvesNo${idNumber}`} type="checkbox" onChange={() => onFormChange(`lots.${currentIDX}.partsOfLot.${index}.glassShelves`, false)} checked={!lotSection.glassShelves}/>
                            </div> 
                        </div>
                    </div>
                </section>
                <section className='modifierSection'>
                    <div className='hardwareModifier' style={{display: ["both", "pulls"].includes(lotSection.handleType ?? "") && lotSection.handleType !== "none" ? "block" : "none"}}>
                        <label>No. of Pulls:</label>
                        <select value={lotSection.numOfPulls} onChange={(e) => onFormChange(`lots.${currentIDX}.partsOfLot.${index}.numOfPulls`, e.target.value)}>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                        </select>
                    </div>
                    <div className='hardwareModifier' style={{display: ["both", "knobs"].includes(lotSection.handleType ?? "") && lotSection.handleType !== "none" ? "block" : "none"}}>
                        <label>No. of Knobs:</label>
                        <select value={lotSection.numOfKnobs} onChange={(e) => onFormChange(`lots.${currentIDX}.partsOfLot.${index}.numOfKnobs`, e.target.value)}>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                        </select>    
                    </div>
                </section>
                <section className="optionParts">
                    <div className={"doorList"}>
                        <label htmlFor={`doors${idNumber}`}>Door:</label>
                        <InputSearch inputName={`lots.${currentIDX}.partsOfLot.${index}.doors`} optionSectionNum={index}  onFormChange={onFormChange} isDropDown={true} getFormValues={getLotListValues}></InputSearch>
                    </div>
                    <div className={"fingerPullList"}>
                        <label htmlFor={`fingerpull${idNumber}`}>Fingerpull:</label>
                        <InputSearch inputName={`lots.${currentIDX}.partsOfLot.${index}.fingerpull`} optionSectionNum={index} onFormChange={onFormChange} isDropDown={true} locked={true} getFormValues={getLotListValues}></InputSearch>
                    </div>
                    {Array.from({length: lotSection.numOfPulls}, (_, i) => i + 1).map((i) => {
                        return <div key={i} className={"pullList"} style={{display: ["both", "pulls"].includes(lotSection.handleType ?? "") && lotSection.handleType !== "none" ? "block" : "none"}}>
                                    <label htmlFor={`pulls${idNumber}`}>{`Pull${i === 1 ? "" : " 2"}:`}</label>
                                    <InputSearch inputName={`lots.${currentIDX}.partsOfLot.${index}.pulls${i === 1 ? "" : "2"}`} optionSectionNum={index} onFormChange={onFormChange} isDropDown={true} getFormValues={getLotListValues}></InputSearch>
                                </div>
                    })}
                    {Array.from({length: lotSection.numOfKnobs}, (_, i) => i + 1).map((i) => {
                        return <div key={i} className={"knobList"} style={{display: ["both", "knobs"].includes(lotSection.handleType ?? "") && lotSection.handleType !== "none" ? "block" : "none"}}>
                                    <label htmlFor={`knobs${idNumber}`}>{`Knob${i === 1 ? "" : " 2"}:`}</label>
                                    <InputSearch inputName={`lots.${currentIDX}.partsOfLot.${index}.knobs${i === 1 ? "" : "2"}`} optionSectionNum={index} onFormChange={onFormChange} isDropDown={true} getFormValues={getLotListValues}></InputSearch>
                                </div>
                    })}
                </section>
                {editingPartsOfLot &&
                    <section id="additionalOptions" className="optionParts">
                        <div className={"boxStyleList"}>
                            <label htmlFor={`boxStyle${idNumber}`}>Box Style:</label>
                            <InputSearch inputName={`lots.${currentIDX}.partsOfLot.${index}.boxStyle`} optionSectionNum={index} onFormChange={onFormChange} isDropDown={true} getFormValues={getLotListValues}></InputSearch>
                        </div>
                        <div className={"drawerFrontList"}>
                            <label htmlFor={`drawerFronts${idNumber}`}>Drawer Front:</label>
                            <InputSearch inputName={`lots.${currentIDX}.partsOfLot.${index}.drawerFronts`} optionSectionNum={index} onFormChange={onFormChange} isDropDown={true} getFormValues={getLotListValues}></InputSearch>
                        </div>
                        <div className={"drawerBoxesList"}>
                            <label htmlFor={`drawerBoxes${idNumber}`}>Drawer Boxes:</label>
                            <InputSearch inputName={`lots.${currentIDX}.partsOfLot.${index}.drawerBoxes`} optionSectionNum={index} onFormChange={onFormChange} isDropDown={true} getFormValues={getLotListValues}></InputSearch>
                        </div>
                        <div className={"drawerGuidesList"}>
                            <label htmlFor={`drawerGuides${idNumber}`}>Drawer Guides:</label>
                            <InputSearch inputName={`lots.${currentIDX}.partsOfLot.${index}.drawerGuides`} optionSectionNum={index} onFormChange={onFormChange} isDropDown={true} getFormValues={getLotListValues}></InputSearch>
                        </div>
                        <div className={"doorHingesList"}>
                            <label htmlFor={`doorHinges${idNumber}`}>Door Hinges:</label>
                            <InputSearch inputName={`lots.${currentIDX}.partsOfLot.${index}.doorHinges`} optionSectionNum={index} onFormChange={onFormChange} isDropDown={true} getFormValues={getLotListValues}></InputSearch>
                        </div>
                        <div className={"interiorsList"}>
                            <label htmlFor={`interiors${idNumber}`}>Interiors:</label>
                            <InputSearch inputName={`lots.${currentIDX}.partsOfLot.${index}.interiors`} optionSectionNum={index} onFormChange={onFormChange} isDropDown={true} getFormValues={getLotListValues}></InputSearch>
                        </div>
                    </section>
                }
                <label>Details: </label>
                <ControlledTextArea inputName={`lots.${currentIDX}.partsOfLot.${index}.details`} getFormValues={getLotListValues} onFormChange={onFormChange}></ControlledTextArea>
                {(partsOfLot[index].checklist && partsOfLot[index].checklist.length) > 0 && <>
                    <h4 className='checkListTitle'>Checklist:</h4>
                    <div className='checklist'>
                        {fields.map((_, index:number) => {
                            return (
                                <div key={index} className='checkListItem'>
                                    <InputSearch inputName={`lots.${currentIDX}.partsOfLot.${index}.checklist.${index}.value`} key={index} onFormChange={onFormChange} isDropDown={false} getFormValues={getLotListValues}/>
                                    <button onClick={() => remove(index)}>X</button>
                                </div>
                            )
                        })}
                    </div>
                </>}
                {/* <button className='checklistButton' onClick={() => append({value: "", checked: false})}>Add Checklist</button> */}
                <button style={{display: index === (partsOfLot?.length - 1) ? "block" : "none"}} onClick={() => setModalType("partOfLot")} className='newPartOfLotButton'>Add Part Of Lot</button>
            </td>
        </tr>
    )
}

export default OptionsInfoCell