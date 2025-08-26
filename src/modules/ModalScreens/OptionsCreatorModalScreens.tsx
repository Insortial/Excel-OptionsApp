import React, { useEffect, useState } from 'react'
import { OptionsCreatorObject } from '../../types/ModalTypes'
import AddingLotModal from './AddingLotModal'
import SavingOptionModal from './SavingOptionModal'
import InputError from '../InputError'
import { ErrorObject, LotInfo } from '@excelcabinets/excel-types/LotTableInterface'
import { useForm } from 'react-hook-form'
import docxConverter from '../../hooks/docxConverter'

interface OptionsCreatorModalScreens {
    optionsCreatorObject: OptionsCreatorObject,
    modalType: string,
    modalInputValue: string,
    setModalType: React.Dispatch<React.SetStateAction<string>>,
    setModalInputValue: React.Dispatch<React.SetStateAction<string>>,
    turnOffModal: () => void
}

const OptionsCreatorModalScreens:React.FC<OptionsCreatorModalScreens> = ({optionsCreatorObject, modalType, modalInputValue, setModalType, setModalInputValue, turnOffModal}) => {
    const { isOptionsMode, currentLot, addOptionRow, jobDetails: {lotNums}, listOfLots, lotsUpdated, registerJobValues } = optionsCreatorObject
    const { register, reset, getValues } = useForm({defaultValues: lotsUpdated})
    const [errors, setErrors] = useState<ErrorObject>({})
    const [selectAllState, setSelectAllState] = useState<boolean>(false)
    const [availableLots, setAvailableLots] = useState<LotInfo[]>([])
    
    const findAvailableLots = ():LotInfo[]|undefined => {
        return lotNums.filter(
            lotNum => !listOfLots.find(lot => lot.lot === lotNum.lotNum)
        );
    }

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
        console.log(availableLots)
        const lotsFound = findAvailableLots() ?? []
        setAvailableLots(lotsFound)
        if(lotsFound?.length > 0 && !bypass) {
            setModalType("availableLots")
        } else {
            optionsCreatorObject?.saveLotTablesSQL(true, getValues())
        }
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) => {
        setModalInputValue(event.target.value)
    }

    const selectAll = () => {
        const currentDirtyLots = getValues() 

        Object.keys(currentDirtyLots).forEach(k => {
            currentDirtyLots[k] = !selectAllState
        })

        reset(currentDirtyLots)
        setSelectAllState(!selectAllState)
    }

    const createDocument = async () => {
        const filteredLots = listOfLots.filter(lot => getValues(isOptionsMode ? lot.lot : lot.plan))
        docxConverter(optionsCreatorObject.jobDetails, filteredLots)
    }

    useEffect(() => {
        reset(lotsUpdated)
    }, [lotsUpdated, modalType])
  
    return (
        <>
            {(() => {
                switch(modalType) {
                    case "inputValue":
                        return <AddingLotModal optionsCreatorObject={optionsCreatorObject} modalInputValue={modalInputValue} handleInputChange={handleInputChange} />
                    case "prod":
                        return <SavingOptionModal optionsCreatorObject={optionsCreatorObject} setModalType={setModalType} submitJob={submitJob} setAvailableLots={setAvailableLots}/>
                    case "partOfLot":
                        return (
                            <>
                                <h2>Enter Room ID:</h2>
                                <form className="modalRow" onSubmit={checkAddOptionRow}>
                                    <input value={modalInputValue} onChange={handleInputChange}></input>
                                    <button>Submit</button>
                                </form>
                                <InputError errorKey='roomID' errorState={errors}/>
                            </>
                        )
                    case "availableLots":
                        return (
                            <>
                                <h2>Lot Selection</h2>
                                <div className='modalRow'>
                                    <h3>Enter Production Date: </h3>
                                    <input type="date" id="prodDateInput" {...registerJobValues("date")}></input>
                                </div>
                                <div id="lotSelectionHeader">
                                    <h3>Select Lots For This Production Date</h3>
                                    <button id="selectAllButton" onClick={() => selectAll()}>Select All</button>
                                </div>
                                <div id="lotSelection">
                                    {Object.keys(lotsUpdated).map((lotKey, index) => {
                                        return <div key={index} className='lotCheckboxDiv'>
                                            <input type="checkbox" {...register(lotKey)} />
                                            <label>{lotKey} {lotsUpdated[lotKey] && <span>(E)</span>}</label>
                                        </div>
                                    })}
                                </div>
                                {availableLots.length > 0 ? <>
                                    <h4>Lot(s): {availableLots.map(lots => lots.lotNum).join(", ")} remain. Proceed anyway?</h4>
                                    <div className="modalButtonRow">
                                        <button onClick={() => submitJob(true)}>YES</button>
                                        <button onClick={() => turnOffModal()}>NO</button>
                                    </div>
                                </> : <button id="modalSubmit" onClick={() => submitJob(true)} style={{width: '85%', marginTop: '40px'}}>Submit</button>}
                            </>
                        )
                    case "document":
                        return (
                            <>
                                <h2>Select Lots to Print</h2>
                                <div id="documentModal">
                                    <div id="documentCheckbox">
                                        <button id="selectAllButton" onClick={() => selectAll()}>Select All</button>
                                    </div>
                                    <div id="lotSelection">
                                        {Object.keys(lotsUpdated).map((lotKey, index) => {
                                            return <div key={index} className='lotCheckboxDiv'>
                                                <input type="checkbox" {...register(lotKey)} />
                                                <label>{lotKey}</label>
                                            </div>
                                        })}
                                    </div>
                                    <button id="modalSubmit" onClick={() => createDocument()}>Print Selected Lot(s)</button>
                                </div>
                            </>
                        )
                    default:
                        return <></>
                }
            })()}
        </>
    )
}

export default OptionsCreatorModalScreens