import React, { useState } from 'react'
import { OptionsCreatorObject } from '../../types/ModalTypes'
import AddingLotModal from './AddingLotModal'
import SavingOptionModal from './SavingOptionModal'
import InputError from '../InputError'
import { ErrorObject, LotInfo } from '../../types/LotTableInterface'

interface OptionsCreatorModalScreens {
    optionsCreatorObject: OptionsCreatorObject,
    modalType: string,
    modalInputValue: string,
    setModalType: React.Dispatch<React.SetStateAction<string>>,
    setModalInputValue: React.Dispatch<React.SetStateAction<string>>,
    turnOffModal: () => void
}

const OptionsCreatorModalScreens:React.FC<OptionsCreatorModalScreens> = ({optionsCreatorObject, modalType, modalInputValue, setModalType, setModalInputValue, turnOffModal}) => {
    const { currentLot, addOptionRow, setJobValue } = optionsCreatorObject
    const [errors, setErrors] = useState<ErrorObject>({})
    const [availableLots, setAvailableLots] = useState<LotInfo[]>([])
    
    const validate = () => {
        const newErrors:ErrorObject = {}
        if(modalType === "partOfLot" && currentLot) {
            if(currentLot.partsOfLot.find(lot => lot.roomID === modalInputValue))
                newErrors["roomID"] = "Room ID already exists"

            if(modalInputValue.toLowerCase() === "balance of house" || modalInputValue.toLowerCase() === "throughout")
                newErrors["roomID"] = "Cannot use reserved words"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0;
    }

    const checkAddOptionRow = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(currentLot && validate()) {
            addOptionRow(modalInputValue)
        }
    }

    const submitJob = (bypass:boolean) => {
        if(availableLots.length > 0 && !bypass) {
            setModalType("availableLots")
        } else {
            optionsCreatorObject?.saveLotTablesSQL(true)
        }
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) => {
        setModalInputValue(event.target.value)
    }
    
    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        setJobValue("date", event.target.value)
    }
  
    return <>
        {modalType === "inputValue" ? 
            <AddingLotModal optionsCreatorObject={optionsCreatorObject} modalInputValue={modalInputValue} handleInputChange={handleInputChange} />
        : modalType === "prod" ? 
            <SavingOptionModal optionsCreatorObject={optionsCreatorObject} setModalType={setModalType} setAvailableLots={setAvailableLots}/>
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
        </> : <></>}
  </>
}

export default OptionsCreatorModalScreens