import LotTable from "./LotTable";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { ErrorObject, LotTableInterface, PartOfLot, JobDetails, JobDetailsSQL, LotTableSQL, PartOfLotSQL } from '../../../types/LotTableInterface.ts';
import React, { useContext, useEffect, useState } from "react";
import docxConverter from "../hooks/docxConverter.tsx";
import { FormOptionsContext } from "./OptionsTemplateContext.tsx";
import { FormOptionsContextType } from '../../../types/FormOptions.ts'
import InputError from "./InputError.tsx";


function OptionsCreator() {
    const initialJobDetails: JobDetails = {
        builder: "",
        project: "",
        phase: "",
        superintendent: "",
        jobNotes: "",
        optionCoordinator: "",
        phone: "",
        foreman: "",
        date: "",
        jobID: -1,
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

    const lotNumRef = React.useRef<HTMLInputElement>(null);
    const { getFormIDs, errors, setErrors, setIsCheckingError, isCheckingError } = useContext(FormOptionsContext) as FormOptionsContextType
    const [listOfLots, setListOfLots] = useState<LotTableInterface[]>([])
    const [jobDetails, setJobDetails] = useState<JobDetails>(initialJobDetails)
    const [currentLotNum, setCurrentLotNum] = useState<string>("")
    const [currentLot, setCurrentLot] = useState<LotTableInterface>()
    const [modal, setModal] = useState<boolean>(false)
    const [modalType, setModalType] = useState<string>("lotID")
    const [isLotCopy, setIsLotCopy] = useState<boolean>(false)
    const location = useLocation();
    const navigate = useNavigate();
    const requestedJobDetails = location.state;
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const sortListOfLots = (listOfLots: LotTableInterface[], newLot?: LotTableInterface) => {
        let updatedListOfLots:LotTableInterface[] = []
        if(typeof newLot === "undefined")
            updatedListOfLots = listOfLots
        else
            updatedListOfLots = [...listOfLots, newLot]
        setListOfLots(updatedListOfLots.sort((a, b) => parseInt(a.lot ?? "0") - parseInt(b.lot ?? "0")))
    }

    const checkValidLotNumJobID = async(lotNum:string[], jobID:number):Promise<any> => {
        const raw = JSON.stringify({
            "lotNumber": lotNum,
            "jobID": jobID
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
        };
    
        const response = await fetch("http://localhost:3000/isValidLotNumAndJobID", requestOptions)
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        const data = await response.json()
        return data
    }

    const validate = async () => {
        const requiredFieldsJob = ["jobID"];
        const requiredFieldsLotTable = ["boxStyle", "interiors", "upperHeight", 
                                "islands", "crown", "lightRail", "baseShoe", 
                                "recyclingBins", "lotOptionsValue", "kitchen",
                                    "master","bath2","bath3",
                                    "bath4","powder","laundry"]
        const requiredFieldsLotPart = ["drawerFronts", "drawerBoxes", "drawerGuides", 
                                        "doorHinges", "doors", "fingerpull",
                                        "material", "color"]
        const newErrors:ErrorObject = {};
        let listOfLotsHasError = false
        
        listOfLots.forEach(lot => lot.hasError = false)

        Object.keys(jobDetails).forEach((key) => {
            if(requiredFieldsJob.includes(key) && !jobDetails[key as keyof JobDetails])
                newErrors[key] = "Field is required, please fill out"
        })

        let lotIDArray = listOfLots.map(lotTable => lotTable.lot)
        let lotJobValidation = await checkValidLotNumJobID(lotIDArray, jobDetails.jobID)
        let invalidLotArray = lotJobValidation.invalidLots
        console.log(lotJobValidation)
        if(!lotJobValidation.isJobIDValid)
            newErrors["jobID"] = "Job ID is not valid"

        /* Iterates through lists of lots checks if any 
        part has input error, only records it if it is current lot */
        listOfLots.map(async (lot: LotTableInterface) => {
            if(invalidLotArray.includes(lot.lot)) {
                console.log("REGISTERING INVALID LOT")
                listOfLotsHasError = true
                lot.hasError = true
                if(lot.lot === currentLotNum) {
                    newErrors["lot"] = "Lot ID is not valid"
                }
            }

            //Lot only has throughout part
            if(lot.partsOfLot.length === 1) {
                //Iterates through "Throughout" lot 
                Object.keys(lot.partsOfLot[0]).forEach((key) => {
                    //Checks if key has value, also checks if it is part of requiredFields list
                    if(requiredFieldsLotPart.includes(key) && !lot.partsOfLot[0][key as keyof PartOfLot]) {
                        listOfLotsHasError = true
                        lot.hasError = true
                        if(lot.lot === currentLotNum)
                            newErrors[key] = "Field is required, please fill out"
                    }
                })
            } else {
                //Write the code for more than one partsOfLot here
            }

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

    const switchModal = (value:boolean, type:string) => {
        setModal(value)
        setModalType(type)
    }

    const createLotTable = (lotNum: string): LotTableInterface => {
        let lotDetails:LotTableInterface = {
            lot: lotNum,
            boxStyle: "",
            interiors: "",
            upperHeight: "",
            islands: "",
            crown: "",
            lightRail: "",
            baseShoe: "",
            lotOptionsValue: 0.00,
            recyclingBins: "",
            hasError: false,
            plan: "",
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
        let updatedTable = {
            ...jobDetails,
            [key]: value
        }
        setJobDetails(updatedTable)
    }

    const saveLotTable = (lotTableData: LotTableInterface, lotNumber: string) => {
        let filteredTableList = listOfLots.filter((lotDetails:LotTableInterface) => lotDetails.lot !== lotNumber)
        sortListOfLots(filteredTableList, lotTableData)
    }
    
    const changeLotNumFromTable = (lotNum: string) => {
        setCurrentLotNum(lotNum)
    }

    const deleteLotTable = (lotNum: string) => {
        let filteredTableList = listOfLots.filter((lotDetails:LotTableInterface) => lotDetails.lot !== lotNum)
        sortListOfLots(filteredTableList)
        setCurrentLot(filteredTableList[0])
        setCurrentLotNum(filteredTableList[0].lot ?? "")
    }

    const changeLotTable = (lotNum: string) => {
        setCurrentLotNum(lotNum)
        let foundLot = listOfLots.find((lotDetails:LotTableInterface) => {return lotDetails.lot === lotNum})
        setCurrentLot(foundLot)

    }

    const addLotTable = () => {
        let table:LotTableInterface;
        if(lotNumRef.current) {
            if(!isLotCopy) 
                table = createLotTable(lotNumRef.current.value)
            else {
                table = Object.assign({},  listOfLots.find((lotDetails:LotTableInterface) => {return lotDetails.lot === currentLotNum}))
                table.partsOfLot = table.partsOfLot?.filter((partOfLot:PartOfLot) => partOfLot.roomID === "Throughout")
                table.lot = lotNumRef.current.value
                setIsLotCopy(false)
            }
            sortListOfLots(listOfLots, table)
            changeLotTable(lotNumRef.current.value)

            setCurrentLotNum(lotNumRef.current.value)
            setCurrentLot(table)
            switchModal(false, "lotID")
        }
    }

    const createNewLot = () => {
        switchModal(true, "lotID")
    }

    const createLotCopy = () => {
        switchModal(true, "lotID")
        setIsLotCopy(true)
    }

    const postJobDetailsSql = async () => {
        let listOfSQLLots:LotTableSQL[] = []
        for(let lotTable of listOfLots) {
            let listOfSQLPartsOfLot:PartOfLotSQL[] = []
            for(let lotSection of lotTable.partsOfLot) {
                let partOfLot:PartOfLotSQL = {
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
            let lotTableSQL:LotTableSQL = {
                lot: lotTable.lot,
                boxStyle: getFormIDs(lotTable.boxStyle, "boxStyle"),
                interiors: getFormIDs(lotTable.interiors, "interiors"),
                lotOptionsValue: lotTable.lotOptionsValue,
                jobNotes: lotTable.jobNotes,
                partsOfLot: listOfSQLPartsOfLot,
                //Start of LotDocument properties
                upperHeight: lotTable.upperHeight,
                islands: lotTable.islands,
                crown: lotTable.crown,
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
            foreman: jobDetails.foreman,
            superintendent: jobDetails.superintendent,
            phone: jobDetails.phone,
            prodReady: jobDetails.prodReady
        }

        console.log(jobDetailsSQL)

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(jobDetailsSQL),
        };
    
        const response = await fetch("http://localhost:3000/lotDetails", requestOptions)
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        const data = await response.json()
    }

    const testCreateDocument = async () => {
        let lotTablesAreValid = await validate()
        if(lotTablesAreValid) {
            console.log(lotTablesAreValid)
            docxConverter(jobDetails, listOfLots)
        }
    }

    const saveLotTablesSQL = async () => {
        console.log(jobDetails)
        console.log(listOfLots)
        let lotTablesAreValid = await validate()
        if(lotTablesAreValid) {
            setModalType("submit")
            await postJobDetailsSql()
            console.log("Returned")
            turnOffModal()
        } else {
            turnOffModal()
        }
    }

    const turnOffModal = () => {
        switchModal(false, "lotID")
    }

    useEffect(() => {
        //console.log("Checking Error: " + isCheckingError)
        if(isCheckingError)
            validate()
    }, [currentLotNum])

    useEffect(() => {
        lotNumRef.current?.focus()
    }, [lotNumRef])


    useEffect(() => {
        if (requestedJobDetails == null)
            navigate("/")

        if(requestedJobDetails.hasOwnProperty('jobDetails')) {
            setJobDetails(requestedJobDetails.jobDetails)
            setListOfLots(requestedJobDetails.listOfLots)
            setCurrentLot(requestedJobDetails.listOfLots[0])
            setCurrentLotNum(requestedJobDetails.listOfLots[0].lot)
        } else if (listOfLots.length == 0 && requestedJobDetails != null) {
            let newJobDetails = {...requestedJobDetails,
                kitchen: "",
                master: "",
                bath2: "",
                bath3: "",
                bath4: "",
                powder: "",
                laundry: "",
                footerNotes: ""
            }
            switchModal(true, "lotID")
            setJobDetails(newJobDetails)
        }
    }, [])

    return (
        <>
            <div className='modalScreen' style={{display: modal ? "flex": "none"}}>
                <div className='modal'>
                    {modalType === "lotID" ? 
                    (<>
                        <h2>Enter Lot Number:</h2>
                        <div className="modalRow">
                            <input ref={lotNumRef}></input>
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
                <h1>Options Creator</h1>
                <h2>Current Lot: {currentLotNum}</h2>
                <h2>Date: {jobDetails.date}</h2>
                <section className="optionsList" id="lotList">
                    <h3>List of Lots</h3>
                    {listOfLots.map((lotDetails:LotTableInterface, index:number) => {
                        return (
                        <section className="listOfLotsRow" key={index}>
                            <button className="lotDelete" onClick={() => deleteLotTable(lotDetails.lot ?? "")}>X</button>
                            <button className="lotButton" style={{backgroundColor: lotDetails.lot === currentLotNum ? "#d9d9d9" : "#f0f0f0", border: lotDetails.hasError ? "2px solid red": "none"}} onClick={() => changeLotTable(lotDetails.lot ?? "-1")}>LOT {lotDetails.lot}</button>
                        </section>
                        )
                    })}
                </section>
                <section id="newTableButtons">
                    <button onClick={() => createNewLot()}>New Lot Table</button>
                    <button onClick={() => createLotCopy()}>Copy Details</button>
                    <button onClick={() => testCreateDocument()}>Create Document</button>
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
                                                                            lotTableDetails={currentLot} setCurrentLotNum={changeLotNumFromTable}/>)}
            </div>
        </>
    )
}

export default OptionsCreator