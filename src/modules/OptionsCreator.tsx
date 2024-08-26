import LotTable from "./LotTable";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { ErrorObject, LotTableInterface, PartOfLot, JobDetails, JobDetailsSQL, LotTableSQL, PartOfLotSQL, PackageDetailsSQL } from '../../../types/LotTableInterface.ts';
import React, { useContext, useEffect, useState } from "react";
import docxConverter from "../hooks/docxConverter.tsx";
import { FormOptionsContext } from "./OptionsTemplateContext.tsx";
import { AuthInfo } from "./AuthContext.tsx"
import { FormOptionsContextType } from '../../../types/FormOptions.ts'
import InputError from "./InputError.tsx";
import useFetch from "../hooks/useFetch.ts";

type lotJobResponse = {
    isJobIDValid: boolean,
    invalidLots: string[],
    validLots: string[]
  }
  
function OptionsCreator() {
    const initialJobDetails:JobDetails = {
        builder: "",
        project: "",
        phase: "",
        superintendent: "",
        jobNotes: "",
        optionCoordinator: "",
        phone: "",
        foreman: "",
        date: "",
        lotNums: [],
        jobID: -1,
        prodReady: false
    }

    const throughoutLot:PartOfLot = {
        roomID: "Throughout",
        material: "",
        color: "",
        doors: "",
        fingerpull: "",
        drawerFronts: "",
        knobs: "",
        drawerBoxes: "",
        drawerGuides: "",
        doorHinges: "",
        pulls: "",
        handleType: "pull",
        details: "",
        appliances: ""
    }
    
    const { getFormIDs, errors, setErrors, setIsCheckingError, isCheckingError } = useContext(FormOptionsContext) as FormOptionsContextType
    const { name, phone, email } = AuthInfo()
    const [lotInputValue, setLotInputValue] = useState<string>("")
    const [isChangingDate, setIsChangingDate] = useState<boolean>(false)
    const [listOfLots, setListOfLots] = useState<LotTableInterface[]>([])
    const [jobDetails, setJobDetails] = useState<JobDetails>(initialJobDetails)
    const [currentLotNum, setCurrentLotNum] = useState<string>("")
    const [currentLot, setCurrentLot] = useState<LotTableInterface>()
    const [modal, setModal] = useState<boolean>(false)
    const [modalType, setModalType] = useState<string>("inputValue")
    const [isLotCopy, setIsLotCopy] = useState<boolean>(false)
    const [isOptionsMode, setIsOptionsMode] = useState<boolean>(true)
    const location = useLocation();
    const navigate = useNavigate();
    const requestedJobDetails = location.state;
    const myHeaders = new Headers();
    const fetchHook = useFetch()
    myHeaders.append("Content-Type", "application/json");

    const sortListOfLots = (listOfLots: LotTableInterface[], newLot?: LotTableInterface) => {
        let updatedListOfLots:LotTableInterface[] = []
        if(typeof newLot === "undefined")
            updatedListOfLots = listOfLots
        else
            updatedListOfLots = [...listOfLots, newLot]
        setListOfLots(updatedListOfLots.sort((a, b) => parseInt(a.lot ?? "0") - parseInt(b.lot ?? "0")))
    }

    const checkValidLotNumJobID = async(lotNum:string[], jobID:number):Promise<lotJobResponse> => {
        const raw = JSON.stringify({
            "lotNumber": lotNum,
            "jobID": jobID
        });
    
        const response = await fetchHook("/isValidLotNumAndJobID", "POST", raw)
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        const data = await response.json()
        return data
    }

    const validate = async () => {
        if(jobDetails.prodReady) {
            const requiredFieldsJob = ["jobID"];
            const requiredFieldsLotTable = ["boxStyle", "interiors", "upperHeight", 
                                    "islands", "crown", "lightRail", "baseShoe", 
                                    "recyclingBins", "lotOptionsValue", "kitchen",
                                        "master","bath2","bath3",
                                        "bath4","powder","laundry"]
            const requiredFieldsLotPart = ["drawerFronts", "drawerBoxes", "drawerGuides", 
                                            "doorHinges", "doors", "fingerpull",
                                            "material", "color", "pulls", "roomID"]
            const newErrors:ErrorObject = {};
            let listOfLotsHasError = false
            
            listOfLots.forEach(lot => lot.hasError = false)
    
            Object.keys(jobDetails).forEach((key) => {
                if(requiredFieldsJob.includes(key) && !jobDetails[key as keyof JobDetails])
                    newErrors[key] = "Field is required, please fill out"
            })
    
            const lotIDArray = listOfLots.map(lotTable => lotTable.lot)
            const lotJobValidation = await checkValidLotNumJobID(lotIDArray, jobDetails.jobID)
            const invalidLotArray = lotJobValidation.invalidLots
            const availableLots = findAvailableLots()
        
            if(availableLots.length !== 0) {
                newErrors["Lots Not Created"] = `Must make lot(s): ${availableLots.join(", ")}`
            }
    
            if(!lotJobValidation.isJobIDValid)
                newErrors["jobID"] = "Job ID is not valid"
    
            /* Iterates through lists of lots checks if any 
            part has input error, only records it if it is current lot */
            listOfLots.map(async (lot: LotTableInterface) => {
                if(invalidLotArray.includes(lot.lot)) {
                    listOfLotsHasError = true
                    lot.hasError = true
                    if(lot.lot === currentLotNum) {
                        newErrors["lot"] = "Lot ID is not valid"
                    }
                }
    
                lot.partsOfLot.map((partOfLot:PartOfLot, index:number) => {
                    //Iterates through each Part of Lot
                    Object.keys(partOfLot).forEach((key) => {
                        //Checks if key has value, also checks if it is part of requiredFields list
                        if(requiredFieldsLotPart.includes(key) && !lot.partsOfLot[index][key as keyof PartOfLot]) {
                            listOfLotsHasError = true
                            lot.hasError = true
                            if(lot.lot === currentLotNum)
                                newErrors[`${key}${(index === 0) ? "" : index}`] = `Field is required, please fill out`
                        }
                    })
                })
                
    
                Object.keys(lot).forEach((key) => {
                    if(requiredFieldsLotTable.includes(key) && !lot[key as keyof LotTableInterface]) {
                        listOfLotsHasError = true
                        lot.hasError = true
                        if(lot.lot === currentLotNum)
                            newErrors[key] = "Field is required, please fill out"
                    }
    
                    if(key === "lotOptionsValue" && isNaN(Number(lot[key as keyof LotTableInterface])))
                        newErrors[key] = "Incorrect format, must be a number"
                        
                })
            })
    
            console.log(newErrors)
            console.log(listOfLotsHasError)
            setErrors(newErrors)
            setIsCheckingError(!(Object.keys(newErrors).length === 0 && !listOfLotsHasError))
            return Object.keys(newErrors).length === 0 && !listOfLotsHasError;
        }
        return true
    }

    const switchModal = (value:boolean, type:string) => {
        setModal(value)
        setModalType(type)
    }

    const createLotTable = (lotInputValue: string): LotTableInterface => {
        const lotDetails:LotTableInterface = {
            jobID: jobDetails.jobID,
            lot: isOptionsMode ? lotInputValue : "",
            boxStyle: "",
            interiors: "",
            upperHeight: "",
            islands: "",
            crown: "",
            lightRail: "",
            baseShoe: "",
            throughoutIsLot: false,
            lotOptionsValue: 0.00,
            recyclingBins: "",
            hasError: false,
            plan: !isOptionsMode ? lotInputValue : "",
            partsOfLot: [throughoutLot],
            kitchen: "",
            master: "",
            bath2: "",
            bath3: "",
            bath4: "",
            powder: "",
            laundry: "",
            footerNotes: ""
        }

        return lotDetails;
    }

    const onJobDetailsChange = (value: string | boolean, key: string) => {
        const updatedTable = {
            ...jobDetails,
            [key]: value
        }
        setJobDetails(updatedTable)
    }

    const saveLotTable = (lotTableData: LotTableInterface, lotInputValue: string) => {
        const filteredTableList = listOfLots.filter((lotDetails:LotTableInterface) => (isOptionsMode && lotDetails.lot !== lotInputValue) ||
                                                                                         (!isOptionsMode && lotDetails.plan !== lotInputValue))
        console.log(filteredTableList)
        sortListOfLots(filteredTableList, lotTableData)
    }
    
    const changeLotNumFromTable = (lotNum: string) => {
        setCurrentLotNum(lotNum)
    }

    const deleteLotTable = (lotInputValue: string) => {
        const filteredTableList = listOfLots.filter((lotDetails:LotTableInterface) => (isOptionsMode && lotDetails.lot !== lotInputValue) ||
                                                                                        (!isOptionsMode && lotDetails.plan !== lotInputValue))
        sortListOfLots(filteredTableList)
        setCurrentLot(filteredTableList[0])
        setCurrentLotNum(filteredTableList[0]?.lot ?? "")
    }

    const changeLotTable = (lotInputValue: string) => {
        setCurrentLotNum(lotInputValue)
        const foundLot = listOfLots.find((lotDetails:LotTableInterface) => {return ((isOptionsMode && lotDetails.lot === lotInputValue) ||
            (!isOptionsMode && lotDetails.plan === lotInputValue))})
        setCurrentLot(foundLot)

    }

    const addLotTable = () => {
        console.log(lotInputValue)
        let table:LotTableInterface;
        if(lotInputValue !== "") {
            if(!isLotCopy) 
                table = createLotTable(lotInputValue)
            else {
                table = Object.assign({}, listOfLots.find((lotDetails:LotTableInterface) => {return (isOptionsMode ? lotDetails.lot : lotDetails.plan) === currentLotNum}))
                table.partsOfLot = Object.assign([], table.partsOfLot)
                if(isOptionsMode)
                    table.lot = lotInputValue
                else
                    table.plan = lotInputValue
                setIsLotCopy(false)
                console.log(table)
            }
            sortListOfLots(listOfLots, table)
            changeLotTable(lotInputValue)

            setCurrentLotNum(lotInputValue)
            setCurrentLot(table)
            switchModal(false, "inputValue")
        }
    }

    const createNewLot = () => {
        switchModal(true, "inputValue")
    }

    const createLotCopy = () => {
        switchModal(true, "inputValue")
        setIsLotCopy(true)
    }

    const postJobDetailsSql = async () => {
        const listOfSQLLots:LotTableSQL[] = []
        for(const lotTable of listOfLots) {
            const listOfSQLPartsOfLot:PartOfLotSQL[] = []
            for(const lotSection of lotTable.partsOfLot) {
                const partOfLot:PartOfLotSQL = {
                    roomID: lotSection.roomID,
                    material: getFormIDs(lotSection.material, "material"), 
                    glassDoors: "NO",
                    glassShelves: "NO",
                    cabinetQty: 0,
                    doorQty: 0,
                    hingeQty: 0,
                    knobQty: 0,
                    drawerBoxQty: 0,
                    drawerGuideQty: 0,
                    pullQty: 0,
                    color: getFormIDs(lotSection.color, "color"), 
                    doors: lotSection.doors ?? "ECI-000",
                    fingerpull: lotSection.fingerpull,
                    drawerFronts: getFormIDs(lotSection.drawerFronts, "drawerFronts"), 
                    knobs: getFormIDs(lotSection.knobs, "knobs"), 
                    drawerBoxes: getFormIDs(lotSection.drawerBoxes, "drawerBoxes"), 
                    drawerGuides: getFormIDs(lotSection.drawerGuides, "drawerGuides"), 
                    doorHinges: getFormIDs(lotSection.doorHinges, "doorHinges"), 
                    pulls: lotSection.pulls,
                    knobs2: "",
                    knobs2Qty: 0,
                    pulls2: "",
                    pulls2Qty: 0,
                    handleType: lotSection.handleType,
                    details: lotSection.details,
                    appliances: lotSection.appliances,
                }
                listOfSQLPartsOfLot.push(partOfLot)
            }
            const lotTableSQL:LotTableSQL = {
                lot: lotTable.lot,
                boxStyle: getFormIDs(lotTable.boxStyle, "boxStyle"),
                interiors: getFormIDs(lotTable.interiors, "interiors"),
                lotOptionsValue: lotTable.lotOptionsValue,
                partsOfLot: listOfSQLPartsOfLot,
                plan: lotTable.plan,
                //Start of LotDocument properties
                upperHeight: lotTable.upperHeight,
                islands: lotTable.islands,
                crown: lotTable.crown,
                throughoutIsLot: lotTable.throughoutIsLot,
                lightRail: lotTable.lightRail,
                baseShoe: lotTable.baseShoe,
                recyclingBins: lotTable.recyclingBins,
                kitchen: lotTable.kitchen,
                masterBath: lotTable.master,
                bath2: lotTable.bath2,
                bath3: lotTable.bath3,
                bath4: lotTable.bath4,
                powder: lotTable.powder,
                laundry: lotTable.laundry,
                footerNotes: lotTable.footerNotes,
            }
            listOfSQLLots.push(lotTableSQL)
        }
        console.log(jobDetails.optionCoordinator)
        const jobDetailsSQL:JobDetailsSQL = {
            jobID: jobDetails.jobID,
            doorBuyOut: false,
            drawerBoxBuyOut: false,
            hardwareComments: "",
            jobNotes: jobDetails.jobNotes,
            optionCoordinator: jobDetails.optionCoordinator,
            lots: listOfSQLLots,
            date: jobDetails.date,
            superintendent: jobDetails.superintendent,
            phone: jobDetails.phone,
            prodReady: jobDetails.prodReady
        }

        const packageDetailsSQL:PackageDetailsSQL = {
            builder: jobDetails.builder,
            projects: [100, 600],
            packageName: "PACKAGE NAME",
            plans: listOfSQLLots
        }

        const finalJobDetails = JSON.stringify(jobDetailsSQL)
        const finalPackageDetails = JSON.stringify(packageDetailsSQL)
        console.log(packageDetailsSQL)
    
        const response = await fetchHook(isOptionsMode ? "/lotDetails" : "/packageDetails", "POST", isOptionsMode ? finalJobDetails : finalPackageDetails)
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        const data = await response.json()
        return data
    }

    const testCreateDocument = async () => {
        const lotTablesAreValid = await validate()
        if(lotTablesAreValid) {
            console.log(lotTablesAreValid)
            docxConverter(jobDetails, listOfLots, name, phone, email)
        }
    }

    const saveLotTablesSQL = async () => {
        console.log(jobDetails)
        console.log(listOfLots)
        const lotTablesAreValid = await validate()
        if(lotTablesAreValid) {
            await postJobDetailsSql()
            turnOffModal()
        } else {
            turnOffModal()
        }
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        setLotInputValue(event.target.value)
    }

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        onJobDetailsChange(event.target.value, "date")
    }

    const turnOffModal = () => {
        switchModal(false, "inputValue")
    }

    const findAvailableLots = ():string[] => {
        return jobDetails.lotNums.filter(
            lotNum => !listOfLots.find(lot => lot.lot === lotNum)
          );
    }

    useEffect(() => {
        const availableLots = findAvailableLots()
        if(availableLots.length > 0)
            setLotInputValue(availableLots[0]);
        else 
            setLotInputValue("")
      }, [jobDetails, listOfLots]);

    useEffect(() => {
        //console.log("Checking Error: " + isCheckingError)
        if(isCheckingError)
            validate()
    }, [currentLotNum])


    useEffect(() => {
        setIsCheckingError(false)
        if (requestedJobDetails == null)
            navigate("/")

        if(Object.prototype.hasOwnProperty.call(requestedJobDetails, 'jobDetails')) {
            setJobDetails(requestedJobDetails.jobDetails)
            setListOfLots(requestedJobDetails.listOfLots)
            setCurrentLot(requestedJobDetails.listOfLots[0])
            setCurrentLotNum(requestedJobDetails.listOfLots[0].lot)
        } else if (Object.prototype.hasOwnProperty.call(requestedJobDetails, 'packageName')) {
            switchModal(true, "inputValue")
            setJobDetails(requestedJobDetails.packageDetails)
            setIsOptionsMode(false)
            setListOfLots([])
        } else if (listOfLots.length == 0 && requestedJobDetails != null) {
            console.log(requestedJobDetails)
            switchModal(true, "inputValue")
            setJobDetails(requestedJobDetails)
        } 
    }, [])

    return (
        <>
            <div className='modalScreen' style={{display: modal ? "flex": "none"}}>
                <div className='modal'>
                    {modalType === "inputValue" ? 
                    (<>
                        <h2>Enter {isOptionsMode ? "Lot Number" : "Plan Name"}:</h2>
                        <div className="modalRow">
                            {isOptionsMode ? (
                            <select value={lotInputValue} onChange={handleInputChange}>
                                {jobDetails.lotNums.map((lotNum, index) => {
                                    if(!listOfLots.find((lot) => lot.lot === lotNum)) {
                                        return <option key={index} value={lotNum}>{lotNum}</option>
                                    }
                                })}
                            </select> ) : (
                                <input onChange={handleInputChange}></input>
                            )}
                            <button onClick={addLotTable}>Submit</button>
                        </div>
                    </>) : modalType === "prod" 
                    ? (
                        <>
                            <h2>Is This Production Schedule Final?</h2>
                            <div className="modalCheckboxRow">
                                <label>Yes:</label>
                                <input type="checkbox" checked={jobDetails.prodReady} onChange={() => onJobDetailsChange(true, "prodReady")}></input>
                                <label>No:</label>
                                <input type="checkbox" checked={!jobDetails.prodReady} onChange={() => onJobDetailsChange(false, "prodReady")}></input>
                                <button onClick={() => saveLotTablesSQL()}>Submit</button>
                            </div>
                        </>
                    ) : (
                        <>
                            <h1>Waiting for Result</h1>
                        </>
                    )}
                    <span className="exitButton" onClick={() => turnOffModal()}></span>
                </div>
            </div>
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
                            <button className="lotButton" style={{backgroundColor: (isOptionsMode ? lotDetails.lot : lotDetails.plan) === currentLotNum ? "#d9d9d9" : "#f0f0f0", border: lotDetails.hasError ? "2px solid red": "none"}} onClick={() => changeLotTable((isOptionsMode ? lotDetails.lot : lotDetails.plan) ?? "-1")}>{isOptionsMode ? "LOT " + lotDetails.lot : lotDetails.plan}</button>
                        </section>
                        )
                    })}
                </section>
                <section id="newTableButtons">
                    <button onClick={() => createNewLot()}>New {isOptionsMode ? "Lot" : "Plan"} Table</button>
                    <button onClick={() => createLotCopy()}>Copy Details</button>
                    {isOptionsMode && <button onClick={() => testCreateDocument()}>Create Document</button>}
                    <button onClick={() => switchModal(true, "prod")}>Save to Database</button>
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
            <div id="optionsEditor">
                {!currentLot ? (<div style={{height: "100vh"}}></div>): (<LotTable saveLotTable={saveLotTable} onJobDetailsChange={onJobDetailsChange} jobDetails={jobDetails} 
                                                                            lotTableDetails={currentLot} setCurrentLotNum={changeLotNumFromTable} isOptionsMode={isOptionsMode}/>)}
            </div>
        </>
    )
}

export default OptionsCreator