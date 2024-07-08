import React, { useEffect, useState } from 'react'
import InputSearch from "./InputSearch"
import { LotTableInterface, JobInterface, PartOfLot } from './LotTableInterface';

type BoxStyleType = [string, number];
type DrawerFrontsType = [string, number];
type DrawerBoxesType = [string, number];
type DrawerGuidesType = [string, number];
type DoorHingesType = [string, number];
type InteriorsType = [string, number];
type MaterialStainType = [string, number];

type LotTable = {
    lotTableDetails: LotTableInterface;
    saveLotTable: (lotTableDetails: LotTableInterface) => void;
}

const LotTable: React.FC<LotTable> = ({lotTableDetails, saveLotTable}) => {
    let throughoutLot:PartOfLot = {
        roomID: "Throughout",
        material: "",
        stain: "",
        doors: "",
        fingerpull: "",
        drawerFronts: "",
        knob: "",
        drawerBoxes: "",
        drawerGuides: "",
        doorHinges: "",
        pulls: "",
    }

    let initialLotTableInterface:LotTableInterface = {
        builder: "",
        project: "",
        phase: "",
        superintendent: "",
        phone: "",
        foreman: "",
        jobID: -1,
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


    const builderOptions : string[] = ["DR Horton", "Tri Pointe", "Richmond American", "Melia", "Dale", "Stella Pointe", "Lark"]
    const projectOptions : string[] = ["DR Horton", "Tri Pointe", "Richmond American", "Melia"]
    const foremanOptions : string[] = ["Adrian Gonzalez", "Eduardo Jimenez", "Rogelio", "Keith Kelley", "Leonard Schmidt"]
    const jobIDOptions : string[] = ["10167", "10152", "10102", "10023"]
    const boxStyleOptions : string[] = ["Euro", "FaceFrame"]
    const frontOptions : string[] = ["Solid", "Routed MDF", "Flat/MDF", "Routed Thermofoil", "Flat/Thermofoil", "Five Piece"]
    const boxOptions : string[] = ["Standard", "Dovetail", "Meta box", "APA Dovetail"]
    const guideOptions : string[] = ["Standard", "Full Extension", "Soft Closing", "Meta box", "Undermount", "APA Soft Closing Salice"]
    const hingeOptions : string[] = ["Standard", "Soft Closing", "APA Soft Closing", "1-3/8"]
    const interiorOptions : string[] = ["White Melamine", "Maple Melamine"]

    const noOptions : string[] = []

    const deleteLotSection = (lotSectionIndex:number) => {
        console.log(lotSectionIndex)
        let updatedTable:LotTableInterface = {...formState}
        updatedTable.partsOfLot.splice(lotSectionIndex, 1)
        setFormState(updatedTable)
        saveLotTable(updatedTable)
    }

    const onFormChange = (value: string, key: string, optionSectionNum: number=-1) => {
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

    const addOptionRow = () => {
        let lotSection:PartOfLot = {
            roomID: "",
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
                        <td><InputSearch inputName={"builder"} formState={formState} onFormChange={onFormChange} listOptions={builderOptions}></InputSearch></td>
                        <td><InputSearch inputName={"project"} formState={formState} onFormChange={onFormChange} listOptions={projectOptions}></InputSearch></td>
                        <td><InputSearch inputName={"phase"} formState={formState} onFormChange={onFormChange} listOptions={noOptions}></InputSearch></td>
                        <td><InputSearch inputName={"superintendent"} formState={formState} onFormChange={onFormChange} listOptions={noOptions}></InputSearch></td>
                        <td><InputSearch inputName={"phone"} formState={formState} onFormChange={onFormChange} listOptions={noOptions}></InputSearch></td>
                        <td><InputSearch inputName={"foreman"} formState={formState} onFormChange={onFormChange} listOptions={foremanOptions}></InputSearch></td>
                    </tr>
                </tbody>
            </table>
            <table className='lotInfo'>
                <tbody>
                    <tr>
                        <th>Job ID</th>
                        <td><InputSearch inputName={"jobID"} formState={formState} onFormChange={onFormChange} listOptions={jobIDOptions}></InputSearch></td>
                    </tr>
                    <tr>
                        <th>Box Style</th>
                        <td><InputSearch inputName={"boxStyle"} formState={formState} onFormChange={onFormChange} listOptions={boxStyleOptions}></InputSearch></td>
                    </tr>
                    <tr>
                        <th>Drawer Fronts</th>
                        <td><InputSearch inputName={"drawerFronts"} optionSectionNum={0} formState={formState} onFormChange={onFormChange} listOptions={frontOptions}></InputSearch></td>
                    </tr>
                    <tr>
                        <th>Drawer Boxes</th>
                        {/* Look at changing this Input Search */}
                        <td><InputSearch inputName={"drawerBoxes"} optionSectionNum={0} formState={formState} onFormChange={onFormChange} listOptions={boxOptions}></InputSearch></td>
                    </tr>
                    <tr>
                        <th>Drawer Guides</th>
                        {/* Look at changing this Input Search */}
                        <td><InputSearch inputName={"drawerGuides"} optionSectionNum={0} formState={formState} onFormChange={onFormChange} listOptions={guideOptions}></InputSearch></td>
                    </tr>
                    <tr>
                        <th>Door Hinges</th>
                        {/* Look at changing this Input Search */}
                        <td><InputSearch inputName={"doorHinges"} optionSectionNum={0} formState={formState} onFormChange={onFormChange} listOptions={hingeOptions}></InputSearch></td>
                    </tr>
                    <tr>
                        <th>Interiors</th>
                        {/* Look at changing this Input Search */}
                        <td><InputSearch inputName={"interiors"} formState={formState} onFormChange={onFormChange} listOptions={interiorOptions}></InputSearch></td>
                    </tr>
                    <tr>
                        <th>Upper Height</th>
                        <td><InputSearch inputName={"upperHeight"} formState={formState} onFormChange={onFormChange} listOptions={noOptions}></InputSearch></td>
                    </tr>
                    <tr>
                        <th>Islands</th>
                        <td><InputSearch inputName={"islands"} formState={formState} onFormChange={onFormChange} listOptions={noOptions}></InputSearch></td>
                    </tr>
                    <tr>
                        <th>Crown</th>
                        <td><InputSearch inputName={"crown"} formState={formState} onFormChange={onFormChange} listOptions={noOptions}></InputSearch></td>
                    </tr>
                    <tr>
                        <th>Light Rail</th>
                        <td><InputSearch inputName={"lightRail"} formState={formState} onFormChange={onFormChange} listOptions={noOptions}></InputSearch></td>
                    </tr>
                    <tr>
                        <th>Base Shoe</th>
                        <td><InputSearch inputName={"baseShoe"} formState={formState} onFormChange={onFormChange} listOptions={noOptions}></InputSearch></td>
                    </tr>
                    <tr>
                        <th>Recycling Bins</th>
                        <td><InputSearch inputName={"recyclingBins"} formState={formState} onFormChange={onFormChange} listOptions={noOptions}></InputSearch></td>
                    </tr>
                    <tr>
                        <th>Job Specific Notes</th>
                        <td><textarea></textarea></td>
                    </tr>
                </tbody>
            </table>
            <table className='optionsInfo'>
                <tbody>
                    <tr>
                        <th>LOT</th>
                        <th>PLAN</th>
                        <th>Material/Stain</th>
                        <th>Option</th>
                        <th>Option PO</th>
                        <th>Notes:</th>
                    </tr>
                    {formState.partsOfLot?.map((lotSection:PartOfLot, currentRow:number) => {
                        return <tr key={currentRow}>
                                    <td>
                                        {currentRow == 0 &&
                                            <InputSearch inputName={"lot"} formState={formState} onFormChange={onFormChange} listOptions={noOptions}></InputSearch>
                                        }
                                        <button className="deleteButton" style={{display: currentRow !== 0 ? "block" : "none"}} onClick={() => deleteLotSection(currentRow)}>Delete Row</button>
                                    </td>
                                    <td>
                                        {currentRow == 0 &&
                                            <InputSearch inputName={"plan"} formState={formState} onFormChange={onFormChange} listOptions={noOptions}></InputSearch>
                                        }
                                    </td>
                                    <td>
                                        <label>Material:</label>
                                        <InputSearch inputName={`material`} optionSectionNum={currentRow} formState={formState} onFormChange={onFormChange} listOptions={noOptions}></InputSearch>
                                        <label>Stain:</label>
                                        <InputSearch inputName={`stain`} optionSectionNum={currentRow} formState={formState} onFormChange={onFormChange} listOptions={noOptions}></InputSearch>
                                        <button style={{display: currentRow === (formState.partsOfLot?.length - 1) ? "block" : "none"}} onClick={addOptionRow}>Add Material</button>
                                    </td>
                                    <td className="optionCell">
                                    <label>Room ID: </label>
                                    <InputSearch inputName={"roomID"} optionSectionNum={currentRow} formState={formState} onFormChange={onFormChange} listOptions={noOptions}></InputSearch>
                                        <section className="optionParts">
                                            <label>Door:</label>
                                            <InputSearch inputName={"doors"} optionSectionNum={currentRow} formState={formState} onFormChange={onFormChange} listOptions={noOptions}></InputSearch>
                                            <label>Fingerpull:</label>
                                            <InputSearch inputName={"fingerpull"} optionSectionNum={currentRow} formState={formState} onFormChange={onFormChange} listOptions={noOptions}></InputSearch>
                                            <label>Pulls:</label>
                                            <InputSearch inputName={"pulls"} optionSectionNum={currentRow} formState={formState} onFormChange={onFormChange} listOptions={noOptions}></InputSearch>
                                        </section>
                                        {currentRow !== 0 &&
                                            <section className="optionParts">
                                                <label>Guide:</label>
                                                <InputSearch inputName={"drawerGuides"} optionSectionNum={currentRow} formState={formState} onFormChange={onFormChange} listOptions={noOptions}></InputSearch>
                                                <label>Hinge:</label>
                                                <InputSearch inputName={"doorHinges"} optionSectionNum={currentRow} formState={formState} onFormChange={onFormChange} listOptions={noOptions}></InputSearch>
                                                <label>Drawer Box:</label>
                                                <InputSearch inputName={"drawerBoxes"} optionSectionNum={currentRow} formState={formState} onFormChange={onFormChange} listOptions={noOptions}></InputSearch>
                                            </section>
                                        }
                                        <label>Details: </label>
                                        <textarea></textarea>
                                        {currentRow == 0 &&
                                            <>
                                                <label>Appliances: </label>
                                                <textarea></textarea>
                                            </>
                                        }
                                    </td>
                                    <td><textarea></textarea></td>
                                    <td><textarea></textarea></td>
                               </tr>
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default LotTable