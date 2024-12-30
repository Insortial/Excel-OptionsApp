import React, { useContext, useState } from 'react'
import { JobDetails, LotTableInterface} from '../types/LotTableInterface'
import { Link } from 'react-router-dom'
import InputError from './InputError'
import docxConverter from '../hooks/docxConverter'
import { AuthInfo } from '../context/AuthContext'
import { FormOptionsContext } from '../context/OptionsTemplateContext'
import { FormOptionsContextType } from '../types/FormOptions'

type OptionsCreatorNav = {
    isOptionsMode: boolean,
    jobDetails: JobDetails,
    currentLotNum: string,
    listOfLots: LotTableInterface[],
    onJobDetailsChange: (value: string | boolean, key: string) => void,
    setModalType: React.Dispatch<React.SetStateAction<string>>,
    setIsLotCopy: React.Dispatch<React.SetStateAction<boolean>>,
    setCurrentLotNum: React.Dispatch<React.SetStateAction<string>>,
    setCurrentLot: React.Dispatch<React.SetStateAction<LotTableInterface | undefined>>,
    sortListOfLots: (listOfLots: LotTableInterface[], newLot?: LotTableInterface) => void
    changeLotTable:(lotInputValue: string) => void
}

const OptionsCreatorNav: React.FC<OptionsCreatorNav> = ({ isOptionsMode, jobDetails, currentLotNum, listOfLots, onJobDetailsChange, setModalType, setIsLotCopy, setCurrentLotNum, setCurrentLot, sortListOfLots, changeLotTable}) => {
    const { errors, isCheckingError } = useContext(FormOptionsContext) as FormOptionsContextType
    const { name } = AuthInfo()
    
    const [isChangingDate, setIsChangingDate] = useState<boolean>(false)
    

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        onJobDetailsChange(event.target.value, "date")
    }

    const deleteLotTable = (lotInputValue: string) => {
        const filteredTableList = listOfLots.filter((lotDetails:LotTableInterface) => (isOptionsMode && lotDetails.lot !== lotInputValue) ||
                                                                                        (!isOptionsMode && lotDetails.plan !== lotInputValue))
        sortListOfLots(filteredTableList)
        setCurrentLot(filteredTableList[0])
        setCurrentLotNum(isOptionsMode ? filteredTableList[0]?.lot: filteredTableList[0]?.plan)
    }

    const createLotCopy = () => {
        setModalType("inputValue")
        setIsLotCopy(true)
    }

    const testCreateDocument = async () => {
        docxConverter(jobDetails, listOfLots, name)
    }


    return (
        <div id="optionsNav">
            <h1>{isOptionsMode ? "Options" : "Package" } Creator</h1>
            {isOptionsMode ? (
                <>
                    <h2 style={{display: jobDetails.prodReady ? "block" : "none"}}>PRODUCTION APPROVED</h2>
                    <h2>Current Lot: {currentLotNum}</h2>
                    <section id="classRow">
                        {isChangingDate ? <input type="date" value={jobDetails.date} onChange={handleDateChange}></input>: <h2>Date: {jobDetails.date}</h2>}
                        {isChangingDate ? <button onClick={() => setIsChangingDate(false)}>Submit Change</button> : <button onClick={() => setIsChangingDate(true)}>Change Date</button>}
                    </section>
                </>) : <></>
            }
            <section className="optionsList" id="lotList">
                <h3>List of {isOptionsMode ? "Lots" : "Plans"}</h3>
                {listOfLots.map((lotDetails:LotTableInterface, index:number) => {
                    return (
                    <section className="listOfLotsRow" key={index}>
                        <button className="lotDelete" onClick={() => deleteLotTable((isOptionsMode ? lotDetails.lot : lotDetails.plan) ?? "")}>X</button>
                        <button className="lotButton" style={{backgroundColor: (isOptionsMode ? lotDetails.lot : lotDetails.plan) === currentLotNum ? "#d9d9d9" : "#f0f0f0", border: lotDetails.hasError && isCheckingError ? "2px solid red": "none"}} onClick={() => changeLotTable((isOptionsMode ? lotDetails.lot : lotDetails.plan) ?? "-1")}>{isOptionsMode ? "LOT " + lotDetails.lot : lotDetails.plan}</button>
                    </section>
                    )
                })}
            </section>
            <section id="newTableButtons">
                <button onClick={() => setModalType("inputValue")}>New {isOptionsMode ? "Lot" : "Plan"} Table</button>
                <button onClick={() => createLotCopy()}>Copy Details</button>
                {isOptionsMode && <button onClick={() => testCreateDocument()}>Create Document</button>}
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