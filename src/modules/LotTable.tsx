import React from 'react'
import InputSearch from "./InputSearch"
import { LotTableInterface, PartOfLot, JobDetails } from '@excelcabinets/excel-types/LotTableInterface';
import ControlledTextArea from "./ControlledTextArea"
import { Control, UseFieldArrayUpdate, UseFormGetValues, UseFormSetValue } from 'react-hook-form';
import OptionsInfoTable from './OptionsInfoTable';
import OptionsLotInfo from './OptionsLotInfo';

type LotTable = {
    isOptionsMode: boolean;
    controlLotList: Control<{lots: LotTableInterface[]}>;
    currentIDX: number;
    setLotsUpdated: React.Dispatch<React.SetStateAction<{[key: string]: boolean}>>;
    setCurrentLotNum: (lotNum: string) => void; 
    convertToMixedOptions: (lot: LotTableInterface) => LotTableInterface;
    setModalType: React.Dispatch<React.SetStateAction<string>>;
    getJobValues: UseFormGetValues<JobDetails>;
    getLotListValues: UseFormGetValues<{lots: LotTableInterface[]}>;
    onFormJobChange: ((value: string, key: string) => void);
    setLotListValue: UseFormSetValue<{lots: LotTableInterface[]}>;
    updateLotList: UseFieldArrayUpdate<{lots: LotTableInterface[]}, "lots">
}

const LotTable: React.FC<LotTable> = ({isOptionsMode, controlLotList, currentIDX, setLotsUpdated, setLotListValue, getLotListValues, convertToMixedOptions, setCurrentLotNum, setModalType, getJobValues, onFormJobChange, updateLotList }) => {
    const editingPartsOfLot = getLotListValues(`lots.${currentIDX}.editingPartsOfLot`) as boolean
    const hasThroughoutLot = getLotListValues(`lots.${currentIDX}.hasThroughoutLot`) as boolean
    const partsOfLot = getLotListValues(`lots.${currentIDX}.partsOfLot`) as PartOfLot[]
    
    const deleteLotSection = (lotSectionIndex:number) => {
        let updatedTable:LotTableInterface = getLotListValues(`lots.${currentIDX}`) as LotTableInterface

        if(updatedTable.partsOfLot.length === 2) {
            const balanceOfHouseLot = updatedTable.partsOfLot[0]
            updatedTable.partsOfLot.splice(0, 1, {...balanceOfHouseLot, roomID: "Throughout"})
            updatedTable.hasThroughoutLot = true
            updatedTable.editingPartsOfLot = false
            updatedTable = setLotToThroughout(updatedTable)
        }
        updatedTable.partsOfLot.splice(lotSectionIndex, 1)
        updateLotList(currentIDX, updatedTable)
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
        let newLot = getLotListValues(`lots.${currentIDX}`) as LotTableInterface
        console.log(newLot)
        if(isEditing) {
            newLot = convertToMixedOptions(newLot)
        } else {
            newLot = setLotToThroughout(newLot)
        }

        updateLotList(currentIDX, {...newLot, editingPartsOfLot: isEditing})
    }

    const onFormChange = (key: string, value: string | boolean | number) => {
        setLotsUpdated(prev => ({...prev, [isOptionsMode ? getLotListValues(`lots.${currentIDX}.lot`) : getLotListValues(`lots.${currentIDX}.plan`)]: true}))
        setLotListValue(key as Parameters<typeof setLotListValue>[0], value)
        let updatedTable:LotTableInterface = getLotListValues(`lots.${currentIDX}`) as LotTableInterface;
        updatedTable = {...updatedTable, [key]: value}

        const keyParts = key.split(".")
        const optKey = keyParts.pop() || ""
        const hardware = ["boxStyle", "drawerFronts", "drawerHinges", "drawerGuides", "drawerBoxes", "doorHinges", "interiors"]
        const example = {[optKey]: value}

        if(optKey === "doors")
            example.fingerpull = findFingerpull(value as string)

        if(keyParts.length > 0) {
            updatedTable.partsOfLot = updatedTable.partsOfLot.map((partOfLot:PartOfLot, index:number) => (index === parseInt(keyParts[3]) ? { ...partOfLot, ...example } : partOfLot))
        }

        //TEMPORARY FIX FOR NEW LOT/COPY BUG
        if(hardware.includes(optKey) && !keyParts.includes("partsOfLot") && keyParts.includes("lots")) {
            updatedTable.partsOfLot = updatedTable.partsOfLot.map((partOfLot:PartOfLot) => { return {...partOfLot, [optKey]: value}})
        }

        if(updatedTable.editingPartsOfLot)
            updatedTable = convertToMixedOptions(updatedTable)

        if((optKey === "lot" || optKey === "plan") && typeof value === "string") 
            setCurrentLotNum(value)

        updateLotList(currentIDX, updatedTable)
    }

    const onNoneSelect = (optionSectionNum: number=-1) => {
        const updatedTable = getLotListValues(`lots.${currentIDX}`) as LotTableInterface
        updatedTable.partsOfLot = updatedTable.partsOfLot.map((partOfLot:PartOfLot, index:number) => (index === optionSectionNum ? { ...partOfLot, handleType: "none", pulls: "", knobs: "" } : partOfLot))
        updateLotList(currentIDX, updatedTable)
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
            <OptionsLotInfo isOptionsMode={isOptionsMode} currentIDX={currentIDX} editingPartsOfLot={editingPartsOfLot} onFormChange={onFormChange} onFormJobChange={onFormJobChange} getJobValues={getJobValues} getLotListValues={getLotListValues} />
            <OptionsInfoTable onFormChange={onFormChange} onNoneSelect={onNoneSelect} getLotListValues={getLotListValues} deleteLotSection={deleteLotSection} changeLotEditingMode={changeLotEditingMode} controlLotList={controlLotList}
                setModalType={setModalType} editingPartsOfLot={editingPartsOfLot} isOptionsMode={isOptionsMode} currentIDX={currentIDX} hasThroughoutLot={hasThroughoutLot} partsOfLot={partsOfLot} />
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
                        {isOptionsMode && <td><InputSearch inputName={`lots.${currentIDX}.lot`}  onFormChange={onFormChange} isDropDown={false} getFormValues={getLotListValues}/></td>}
                        <td><InputSearch inputName={`lots.${currentIDX}.kitchen`}  onFormChange={onFormChange} isDropDown={true} getFormValues={getLotListValues}/></td>
                        <td><InputSearch inputName={`lots.${currentIDX}.master`}  onFormChange={onFormChange} isDropDown={true} getFormValues={getLotListValues}/></td>
                        <td><InputSearch inputName={`lots.${currentIDX}.bath2`}  onFormChange={onFormChange} isDropDown={true} getFormValues={getLotListValues}/></td>
                        <td><InputSearch inputName={`lots.${currentIDX}.bath3`}  onFormChange={onFormChange} isDropDown={true} getFormValues={getLotListValues}/></td>
                        <td><InputSearch inputName={`lots.${currentIDX}.bath4`}  onFormChange={onFormChange} isDropDown={true} getFormValues={getLotListValues}/></td>
                        <td><InputSearch inputName={`lots.${currentIDX}.powder`}  onFormChange={onFormChange} isDropDown={true} getFormValues={getLotListValues}/></td>
                        <td><InputSearch inputName={`lots.${currentIDX}.laundry`}  onFormChange={onFormChange} isDropDown={true} getFormValues={getLotListValues}/></td>
                        <td style={{width: "25%"}}><ControlledTextArea inputName={`lots.${currentIDX}.footerNotes`} getFormValues={getLotListValues} onFormChange={onFormChange}/></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default LotTable