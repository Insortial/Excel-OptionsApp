import React, { useContext } from 'react'
import { JobDetails, LotTableInterface} from '@excelcabinets/excel-types/LotTableInterface'
import { Link } from 'react-router-dom'
import InputError from './InputError'
import { FormOptionsContext } from '../context/OptionsTemplateContext'
import { FormOptionsContextType } from '@excelcabinets/excel-types/FormOptions'
import { FieldArrayWithId, UseFieldArrayRemove, UseFormGetValues } from 'react-hook-form'

type OptionsCreatorNav = {
    isOptionsMode: boolean,
    currentLotNum: string,
    listOfLots: FieldArrayWithId<{lots: LotTableInterface[]}, "lots", "id">[],
    lotsUpdated: {[key: string]: boolean},
    getCurrentLot: (lotInputValue: string) => LotTableInterface | undefined,
    removeLotList: UseFieldArrayRemove,
    setModalType: React.Dispatch<React.SetStateAction<string>>,
    setIsLotCopy: React.Dispatch<React.SetStateAction<boolean>>,
    onFormJobChange: ((value: string, key: string) => void),
    setCurrentLotNum: React.Dispatch<React.SetStateAction<string>>,
    getJobValues: UseFormGetValues<JobDetails>
}

const OptionsCreatorNav: React.FC<OptionsCreatorNav> = ({ isOptionsMode, currentLotNum, listOfLots, lotsUpdated, getCurrentLot, removeLotList, getJobValues, setModalType, setIsLotCopy, setCurrentLotNum }) => {
    const { errors, isCheckingError } = useContext(FormOptionsContext) as FormOptionsContextType
    /* const [isChangingDate, setIsChangingDate] = useState<boolean>(false) */
    const jobDetails = getJobValues() 
    
    /* const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        onFormJobChange("date", event.target.value)
    }*/
   
    const deleteLotTable = (index: number) => {
        const removedListOfLots = listOfLots.filter((_, idx) => idx !== index)
        removeLotList(index)
        setCurrentLotNum(isOptionsMode ? removedListOfLots[0].lot : removedListOfLots[0].plan)
    }

    const createLotCopy = () => {
        setModalType("inputValue")
        setIsLotCopy(true)
    }

    return (
        <div id="optionsNav">
            <h1>{isOptionsMode ? "Options" : "Package" } Creator</h1>
            {isOptionsMode ? (
                <>
                    <h2 style={{display: jobDetails.prodReady ? "block" : "none", color: '#ffb96e'}}>PRODUCTION APPROVED</h2>
                    <h2>Current Lot: {currentLotNum}</h2>
                    {jobDetails.dateUpdated && <h2>Last Updated: {jobDetails.dateUpdated}</h2>}
                    {jobDetails.lastUpdatedBy && <h2>Updated By: {jobDetails.lastUpdatedBy}</h2>}
                    <h2>Lot Date: {getCurrentLot(currentLotNum)?.lotPhaseDate ?? "N/A"}</h2>
                    <section id="classRow">
                        {/* <input type="date" value={jobDetails.date} onChange={handleDateChange}></input> */}
                        <h2>Date: {jobDetails.date}</h2>
                        {/* {isChangingDate ? <button onClick={() => setIsChangingDate(false)}>Submit Change</button> : <button onClick={() => setIsChangingDate(true)}>Change Date</button>} */}
                    </section>
                </>) : <></>
            }
            <section className="optionsList" id="lotList">
                <h3>List of {isOptionsMode ? "Lots" : "Plans"}</h3>
                {listOfLots.map((lotDetails:LotTableInterface, index:number) => {
                    const rowIsDirty = lotsUpdated[isOptionsMode ? lotDetails.lot : lotDetails.plan]

                    return (
                        <section className="listOfLotsRow" key={index}>
                            <button className="lotDelete" onClick={() => deleteLotTable(index)}>X</button>
                            <button className="lotButton" style={{backgroundColor: (isOptionsMode ? lotDetails.lot : lotDetails.plan) === currentLotNum ? "#d9d9d9" : "#f0f0f0", border: lotDetails.hasError && isCheckingError ? "2px solid red": "none"}} onClick={() => setCurrentLotNum((isOptionsMode ? lotDetails.lot : lotDetails.plan) ?? "-1")}>{isOptionsMode ? "LOT " + lotDetails.lot : lotDetails.plan}<span>{rowIsDirty ? " (Edited)" : ""}</span></button>
                        </section>
                    )
                })}
            </section>
            <section id="newTableButtons">
                <button onClick={() => setModalType("inputValue")}>New {isOptionsMode ? "Lot" : "Plan"} Table</button>
                <button onClick={() => createLotCopy()}>Copy Details</button>
                {isOptionsMode && <button onClick={() => setModalType("document")}>Create Document</button>}
                <button onClick={() => setModalType("prod")}>Save to Database</button>
            </section>
            <section className="optionsList" id="errorList" style={{display: isCheckingError ? "flex" :"none"}}>
                <h3>Errors</h3>
                {Object.keys(errors).map((errorKey, index) => {
                    return (
                        <div key={index} className="errorRow">
                            <p>{errorKey}:</p>
                            <InputError errorKey={errorKey} errorState={errors}/>
                        </div>
                    )
                })}
            </section>
            <Link to="/jobMenu" style={{marginTop: "auto"}}>Back to Job Menu</Link>
        </div>
  )
}

export default OptionsCreatorNav;