import React, { useState } from 'react'
import { FormOptionsObject, JobMenuObject, OptionsCreatorObject, PackageObject } from '../types/ModalTypes'
import { ErrorObject, LotInfo } from '../types/LotTableInterface'
import InputError from './InputError'
import AddingLotModal from './ModalScreens/AddingLotModal'
import SavingOptionModal from './ModalScreens/SavingOptionModal'
import DeleteOptionModal from './ModalScreens/DeleteOptionModal'
import { createPortal } from 'react-dom'

type OptionsCreatorModal = {
    modalType: string, 
    modalInputValue: string,
    setModalType: React.Dispatch<React.SetStateAction<string>>,
    setModalInputValue: React.Dispatch<React.SetStateAction<string>>,
    onJobDetailsChange?: (value: string | boolean, key: string) => void,
    setIsLotCopy?: React.Dispatch<React.SetStateAction<boolean>>,
    optionsCreatorObject?: OptionsCreatorObject,
    jobMenuObject?: JobMenuObject,
    packageObject?: PackageObject,
    formOptionsObject?: FormOptionsObject
}


const OptionsCreatorModal: React.FC<OptionsCreatorModal> = ({modalInputValue, setModalType, setModalInputValue, onJobDetailsChange, setIsLotCopy, modalType, optionsCreatorObject, jobMenuObject, packageObject, formOptionsObject}) => {
    const [errors, setErrors] = useState<ErrorObject>({})
    const [availableLots, setAvailableLots] = useState<LotInfo[]>([])

    const handleInputChange = (event: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) => {
        setModalInputValue(event.target.value)
    }

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        onJobDetailsChange?.(event.target.value, "date")
    }

    const turnOffModal = () => {
        setModalInputValue("")
        setErrors({})
        setModalType("none")
        
        if(setIsLotCopy)
            setIsLotCopy(false)
    }

    const deleteFormOption = () => {
        if(formOptionsObject) {
            formOptionsObject.submitDeleteRow()
        }
    }

    const submitJob = (bypass:boolean) => {
        if(availableLots.length > 0 && !bypass) {
            setModalType("availableLots")
        } else {
            optionsCreatorObject?.saveLotTablesSQL(true)
        }
    }

    const checkAddOptionRow = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(optionsCreatorObject && optionsCreatorObject.currentLot && validate()) {
            optionsCreatorObject.addOptionRow(modalInputValue)
        }
    }

    const validate = () => {
        const newErrors:ErrorObject = {}
        if(modalType === "partOfLot" && optionsCreatorObject?.currentLot) {
            if(optionsCreatorObject.currentLot.partsOfLot.find(lot => lot.roomID === modalInputValue))
                newErrors["roomID"] = "Room ID already exists"

            if(modalInputValue.toLowerCase() === "balance of house" || modalInputValue.toLowerCase() === "throughout")
                newErrors["roomID"] = "Cannot use reserved words"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0;
    }
    
    return createPortal(
        <div className='modalScreen' style={{display: modalType !== "none" ? "flex": "none"}}>
            <div className='modal'>
                {optionsCreatorObject && modalType === "inputValue" ? 
                    <AddingLotModal optionsCreatorObject={optionsCreatorObject} modalInputValue={modalInputValue} handleInputChange={handleInputChange} />
                : optionsCreatorObject && modalType === "prod" ? 
                    <SavingOptionModal optionsCreatorObject={optionsCreatorObject} setModalType={setModalType} setAvailableLots={setAvailableLots}/>
                : modalType === "delete" ? 
                    <DeleteOptionModal jobMenuObject={jobMenuObject} packageObject={packageObject} turnOffModal={turnOffModal}/>
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
                </>
                : modalType === "deleteFormOption" ? 
                <>
                    <h2>Are You Sure You Want To Delete Form Option?</h2>
                    <h3>{modalInputValue}</h3>
                    <div className="modalButtonRow">
                        <button onClick={() => deleteFormOption()}>YES</button>
                        <button onClick={() => turnOffModal()}>NO</button>
                    </div>
                </>
                : <>
                    <h1>Waiting for Result</h1>
                </>
                }
                <span className="exitButton" onClick={() => turnOffModal()}></span>
            </div>
        </div>, document.body)
}

export default OptionsCreatorModal