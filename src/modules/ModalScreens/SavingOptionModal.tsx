import React, { useState } from 'react'
import { OptionsCreatorObject } from '../../types/ModalTypes'
import { LotInfo } from '../../types/LotTableInterface'
import InputSearch from '../InputSearch'

interface SavingOptionModal {
    optionsCreatorObject: OptionsCreatorObject,
    setModalType: React.Dispatch<React.SetStateAction<string>>,
    setAvailableLots: React.Dispatch<React.SetStateAction<LotInfo[]>>
}

const SavingOptionModal:React.FC<SavingOptionModal> = ({optionsCreatorObject, setModalType, setAvailableLots}) => {
    const [modalProdReady, setModalProdReady] = useState<boolean>(false)
    const { getPackageProjects, resetPackageProjects, onProjectsChange, saveLotTablesSQL, isOptionsMode, listOfLots, jobDetails: {lotNums}} = optionsCreatorObject


    const findAvailableLots = ():LotInfo[]|undefined => {
        return lotNums.filter(
            lotNum => !listOfLots.find(lot => lot.lot === lotNum.lotNum)
        );
    }
    
    const handleProdChoice = () => {
        if(modalProdReady) {
            setModalType("date")
            const lots = findAvailableLots()
            if(lots)
                setAvailableLots(lots)
        } else {
            saveLotTablesSQL(modalProdReady)
        }
    }

    return (
        isOptionsMode ?
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
                {getPackageProjects("projects").map((_, index:number) => {
                    return <div className="modalInputRow" key={index}>
                                <InputSearch inputName={`projects.${index}`} getFormValues={getPackageProjects} onFormChange={(key: string, value: string) => onProjectsChange(key as "projects" | `projects.${number}`, value)} isDropDown={true} optionSectionNum={index} filterValue={optionsCreatorObject.jobDetails.builder}></InputSearch>
                                <button onClick={() => resetPackageProjects({projects: getPackageProjects("projects").filter((_, idx) => idx !== index)})}>Delete</button>
                           </div>
                })}
                <button className="addProject" onClick={() => resetPackageProjects({projects: [...getPackageProjects("projects"), ""]})}>Add Project</button>
                <button className="modalSubmit" onClick={() => saveLotTablesSQL(true)}>Submit</button>
            </div>
        </>
    )
}

export default SavingOptionModal