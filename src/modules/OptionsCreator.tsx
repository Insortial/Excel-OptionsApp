import LotTable from "./LotTable";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { ErrorObject, LotTableInterface, PartOfLot, ProductionSchedule } from '../types/LotTableInterface.ts';
import React, { useContext, useEffect, useState } from "react";
import docxConverter from "../hooks/docxConverter.tsx";
import { FormOptionsContext } from "./OptionsTemplateContext.tsx";
import { FormOptionsContextType } from '../types/FormOptions'
import InputError from "./InputError.tsx";


function OptionsCreator() {
    const initialProdSchedule: ProductionSchedule = {
        builder: "",
        project: "",
        phase: "",
        superintendent: "",
        phone: "",
        foreman: "",
        date: "",
        jobID: -1,
    }

    const lotNumRef = React.useRef<HTMLInputElement>(null);
    const { errors, setErrors, setIsCheckingError, isCheckingError } = useContext(FormOptionsContext) as FormOptionsContextType
    //const [errors, setErrors] = useState<ErrorObject>({})
    const [listOfLots, setListOfLots] = useState<LotTableInterface[]>([])
    const [prodSchedule, setProdSchedule] = useState<ProductionSchedule>(initialProdSchedule)
    const [currentLotNum, setCurrentLotNum] = useState<string>("")
    const [currentLot, setCurrentLot] = useState<LotTableInterface>()
    const [needLotID, setNeedLotID] = useState<boolean>(false)
    const [isLotCopy, setIsLotCopy] = useState<boolean>(false)
    const location = useLocation();
    const navigate = useNavigate();
    const jobDetails = location.state;

    const sortListOfLots = (listOfLots: LotTableInterface[], newLot?: LotTableInterface) => {
        let updatedListOfLots:LotTableInterface[] = []
        if(typeof newLot === "undefined")
            updatedListOfLots = listOfLots
        else
            updatedListOfLots = [...listOfLots, newLot]
        setListOfLots(updatedListOfLots.sort((a, b) => parseInt(a.lot ?? "0") - parseInt(b.lot ?? "0")))
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
    }

    const validate = () => {
        const requiredFieldsProd = ["jobID", "lotFooter", "kitchen",
                                    "master","bath2","bath3",
                                    "bath4","powder","laundry",];
        const requiredFieldsLotTable = ["boxStyle", "interiors", "upperHeight", 
                                "islands", "crown", "lightRail", "baseShoe", 
                                "recyclingBins", "lotOptionsValue"]
        const requiredFieldsLotPart = ["drawerFronts", "drawerBoxes", "drawerGuides", 
                                        "doorHinges", "doors", "fingerpull",
                                        "material", "color"]
        const newErrors:ErrorObject = {};
        let listOfLotsHasError = false
        
        Object.keys(prodSchedule).forEach((key) => {
            if(requiredFieldsProd.includes(key) && !prodSchedule[key as keyof ProductionSchedule])
                newErrors[key] = "Field is required, please fill out"
        })

        /* Iterates through lists of lots checks if any 
        part has input error, only records it if it is current lot */
        listOfLots.map((lot: LotTableInterface) => {
            lot.hasError = false
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
        setErrors(newErrors)
        setIsCheckingError(!(Object.keys(newErrors).length === 0 && !listOfLotsHasError))
        return Object.keys(newErrors).length === 0 && !listOfLotsHasError;
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
            jobNotes: "",
            plan: "",
            partsOfLot: [throughoutLot]
        }

        return lotDetails;
    }

    const saveLotTable = (lotTableData: LotTableInterface) => {
        let filteredTableList = listOfLots.filter((lotDetails:LotTableInterface) => lotDetails.lot !== lotTableData.lot)
        sortListOfLots(filteredTableList, lotTableData)
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
            setNeedLotID(false)
        }
    }

    const createNewLot = () => {
        setNeedLotID(true)
    }

    const createLotCopy = () => {
        setNeedLotID(true)
        setIsLotCopy(true)
    }

    const testCreateDocument = () => {
        if(validate())
            docxConverter(prodSchedule, listOfLots)
    }

    const turnOffModal = () => {
        setNeedLotID(false)
    }

    useEffect(() => {
        console.log(isCheckingError)
        if(isCheckingError)
            validate()
    }, [currentLotNum])

    useEffect(() => {
        lotNumRef.current?.focus()
    }, [lotNumRef])


    useEffect(() => {
        if (jobDetails == null)
            navigate("/")

        if(listOfLots.length == 0 && jobDetails != null) {
            let newProdSchedule = {...jobDetails,
                lotFooter: "",
                kitchen: "",
                master: "",
                bath2: "",
                bath3: "",
                bath4: "",
                powder: "",
                laundry: "",
                footerNotes: ""
            }
            setNeedLotID(true)
            setProdSchedule(newProdSchedule)
        }
    }, [])

    return (
        <>
            <div className='modalScreen' style={{display: needLotID ? "flex": "none"}}>
                <div className='modal'>
                    <h2>Enter Lot Number:</h2>
                    <div className="modalRow">
                        <input ref={lotNumRef}></input>
                        <button onClick={addLotTable}>Submit</button>
                    </div>
                    <span className="exitButton" onClick={() => turnOffModal()}></span>
                </div>
            </div>
            <div id="optionsNav">
                <h1>Options Creator</h1>
                <h2>Current Lot: {currentLotNum}</h2>
                <h2>Date: {prodSchedule.date}</h2>
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
                    <button onClick={() => testCreateDocument()}>Test Create Document</button>
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
                <Link to="/creatingJob" style={{marginTop: "auto"}}>Back to Job Creation</Link>
            </div>
            <div id="optionsEditor">
                {!currentLot ? (<div style={{height: "100vh"}}></div>): (<LotTable saveLotTable={saveLotTable} setProdSchedule={setProdSchedule} prodSchedule={prodSchedule} lotTableDetails={currentLot}/>)}
            </div>
        </>
    )
}

export default OptionsCreator