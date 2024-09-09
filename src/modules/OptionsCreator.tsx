import LotTable from "./LotTable";
import { useLocation, Link, useNavigate, useLoaderData, useRevalidator } from "react-router-dom";
import { ErrorObject, LotTableInterface, PartOfLot, JobDetails, JobDetailsSQL, LotTableSQL, PartOfLotSQL, PackageDetailsSQL, PackageDetails, ModifiedHardware } from '../../../types/LotTableInterface.ts';
import React, { useContext, useEffect, useState } from "react";
import docxConverter from "../hooks/docxConverter.tsx";
import { FormOptionsContext } from "../context/OptionsTemplateContext.tsx";
import { AuthInfo } from "../context/AuthContext.tsx"
import { FormOptionsContextType } from '../../../types/FormOptions.ts'
import InputError from "./InputError.tsx";
import useFetch from "../hooks/useFetch.ts";
import { PackageLoaderResponse } from "../loader/PackageLoader.ts";
import { JobOptionLoaderResponse } from "../loader/JobOptionLoader.ts";
import OptionsCreatorModal from "./OptionsCreatorModal.tsx";

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

    const initialPackageDetails:PackageDetails = {
        builder: "",
        packages: [],
        projects: [],
        plans: [],
        packageName: "",
        planName: "",
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
        handleType: "pulls",
        details: "",
        appliances: ""
    }
    
    const { getFormIDs, errors, setErrors, setIsCheckingError, isCheckingError } = useContext(FormOptionsContext) as FormOptionsContextType
    const { name, phone, email } = AuthInfo()
    //Option States
    const [isChangingDate, setIsChangingDate] = useState<boolean>(false)
    const [listOfLots, setListOfLots] = useState<LotTableInterface[]>([])
    const [jobDetails, setJobDetails] = useState<JobDetails>(initialJobDetails)
    const [hasPackage, setHasPackage] = useState<boolean>(false)
    const [packageDetails, setPackageDetails] = useState<PackageDetails>(initialPackageDetails)
    const [currentLotNum, setCurrentLotNum] = useState<string>("")
    const [currentLot, setCurrentLot] = useState<LotTableInterface>()
    const [modal, setModal] = useState<boolean>(false)
    const [modalType, setModalType] = useState<string>("none")
    const [isLotCopy, setIsLotCopy] = useState<boolean>(false)
    const [modalInputValue, setModalInputValue] = useState<string>("")

    //Package States
    const [packageProjects, setPackageProjects] = useState<string[]>([""])
    const [isOptionsMode, setIsOptionsMode] = useState<boolean>(true)

    const loaderData = useLoaderData() as PackageLoaderResponse | JobOptionLoaderResponse;
    const revalidator = useRevalidator();
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

    const isHandleValid = (handleType:string, key:string, value:string):boolean => {
        switch(handleType) {
            case "both":
                return ["pulls", "knobs"].includes(key) && value !== ""
            case "pulls":
                return key === "pulls" && value !== ""
            case "knobs":
                return key === "knobs" && value !== ""
            case "none":
            default:
                return true
        }
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
                    for(const key of Object.keys(partOfLot)) {
                        //Checks if key has value, also checks if it is part of requiredFields list
                        const selectedPartOfLot = lot.partsOfLot[index]
                        const selectedField = selectedPartOfLot[key as keyof PartOfLot]
                        if(requiredFieldsLotPart.includes(key) && !selectedField) {
                            if((selectedPartOfLot.roomID === 'Throughout' && !lot.hasThroughoutLot && ["material", "color", "doors", "fingerpull"].includes(key)) || 
                                (isHandleValid(selectedPartOfLot.handleType, key, selectedField))) {
                                continue
                            }

                            listOfLotsHasError = true
                            lot.hasError = true
                            if(lot.lot === currentLotNum)
                                newErrors[`${key}${(index === 0) ? "" : index}`] = `Field is required, please fill out`
                        }
                    }
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
            packageName: "",
            interiors: "",
            upperHeight: "",
            islands: "",
            supports: "",
            crown: "",
            lightRail: "",
            baseShoe: "",
            hasThroughoutLot: true,
            lotOptionsValue: 0.00,
            recyclingBins: "",
            hasError: false,
            plan: !isOptionsMode ? lotInputValue : "",
            partsOfLot: [throughoutLot],
            appliances: "",
            kitchen: "",
            master: "",
            bath2: "",
            bath3: "",
            bath4: "",
            powder: "",
            laundry: "",
            lotNotes: "",
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

    const onProjectsChange  = (value: string, key: string, optSectionNum:number=-1) => {
        const modifiedProjects = [...packageProjects]
        modifiedProjects[optSectionNum] = value
        setPackageProjects(modifiedProjects)
    }

    const saveLotTable = (lotTableData: LotTableInterface, lotInputValue: string) => {
        const filteredTableList = listOfLots.filter((lotDetails:LotTableInterface) => (isOptionsMode && lotDetails.lot !== lotInputValue) ||
                                                                                         (!isOptionsMode && lotDetails.plan !== lotInputValue))
        setCurrentLot(lotTableData)
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
        setCurrentLotNum(isOptionsMode ? filteredTableList[0]?.lot: filteredTableList[0]?.plan)
    }

    const changeLotTable = (lotInputValue: string) => {
        setCurrentLotNum(lotInputValue)
        const foundLot = listOfLots.find((lotDetails:LotTableInterface) => {return ((isOptionsMode && lotDetails.lot === lotInputValue) ||
            (!isOptionsMode && lotDetails.plan === lotInputValue))})
        setCurrentLot(foundLot)

    }

    const addLotTable = () => {
        let table:LotTableInterface;
        if(modalInputValue !== "") {
            if(!isLotCopy) 
                if(["", "None"].includes(packageDetails.packageName))
                    table = createLotTable(modalInputValue)
                else {
                    console.log("IN HERE")
                    table = Object.assign({}, packageDetails.plans.find((lotDetails:LotTableInterface) => {return lotDetails.plan === packageDetails.planName}))
                    table.lot = modalInputValue
                    table.partsOfLot = Object.assign([], table.partsOfLot)
                    console.log(listOfLots)
                    console.log(table)
                }
            else {
                table = Object.assign({}, listOfLots.find((lotDetails:LotTableInterface) => {return (isOptionsMode ? lotDetails.lot : lotDetails.plan) === currentLotNum}))
                table.partsOfLot = Object.assign([], table.partsOfLot)
                if(isOptionsMode)
                    table.lot = modalInputValue
                else
                    table.plan = modalInputValue
                setIsLotCopy(false)
                console.log(listOfLots)
                console.log(table)
            }
            sortListOfLots(listOfLots, table)
            changeLotTable(modalInputValue)

            setCurrentLotNum(modalInputValue)
            setCurrentLot(table)
            setModalType("none")
        }
    }

    const modifyHardwareModal = (hardwareName:string) => {
        setModalType(hardwareName)
    }

    /* const addModifiedHardware = (partOfLot:PartOfLot, lotID:string, hardware:string) => {
        const updatedTable = {
            ...formState,
            [key]: value
        }
        saveLotTable(updatedTable, lotID)
    } */

    const createLotCopy = () => {
        setModalType("inputValue")
        setIsLotCopy(true)
    }

    const handlePullsAndKnobs = (returnType: string, currentLot:PartOfLot, throughOutLot:PartOfLot|undefined) => {
        let partName = ""
        
        if(returnType === "pulls") {
            partName = ["pulls", "both"].includes(currentLot.handleType) ? currentLot.pulls : ""
        } else if (returnType === "knobs") {
            partName = ["knobs", "both"].includes(currentLot.handleType) ? currentLot.knobs : ""
        }

        if (currentLot.roomID !== "Throughout" && throughOutLot !== undefined && currentLot.handleType === "none") {
            partName = returnType === "pulls" ? throughOutLot.pulls : returnType === "knobs" ? throughOutLot.knobs : ""

            if(throughOutLot.handleType === "none")
                partName = ""
        }

        return partName
    }

    const postJobDetailsSql = async () => {
        const listOfSQLLots:LotTableSQL[] = []
        for(const lotTable of listOfLots) {
            const listOfSQLPartsOfLot:PartOfLotSQL[] = []
            console.log(lotTable.partsOfLot.find((partOfLot:PartOfLot) => partOfLot.roomID === "Throughout"))
            const throughOutLot = lotTable.partsOfLot.find((partOfLot:PartOfLot) => partOfLot.roomID === "Throughout")
            for(const [index, lotSection] of lotTable.partsOfLot.entries()) {
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
                    doors: lotSection.doors ?? "",
                    fingerpull: lotSection.fingerpull,
                    drawerFronts: getFormIDs(lotSection.drawerFronts, "drawerFronts"), 
                    knobs: handlePullsAndKnobs("knobs", lotSection, throughOutLot), 
                    drawerBoxes: getFormIDs(lotSection.drawerBoxes, "drawerBoxes"), 
                    drawerGuides: getFormIDs(lotSection.drawerGuides, "drawerGuides"), 
                    doorHinges: getFormIDs(lotSection.doorHinges, "doorHinges"), 
                    pulls: handlePullsAndKnobs("pulls", lotSection, throughOutLot),
                    knobs2: "",
                    knobs2Qty: 0,
                    pulls2: "",
                    pulls2Qty: 0,
                    handleType: lotSection.handleType,
                    details: lotSection.details,
                }

                if(index === 0 && !lotTable.hasThroughoutLot) 
                    Object.assign(partOfLot, {material: 0, color: 0, doors: "", fingerpull: ""})
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
                supports: lotTable.supports,
                hasThroughoutLot: lotTable.hasThroughoutLot,
                lightRail: lotTable.lightRail,
                lotNotes: lotTable.lotNotes,
                baseShoe: lotTable.baseShoe,
                recyclingBins: lotTable.recyclingBins,
                appliances: lotTable.appliances,
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

        let packageDetailsSQL:PackageDetailsSQL
        let finalPackageDetails; 
        if(!isOptionsMode) {
            packageDetailsSQL = {
                builder: getFormIDs(jobDetails.builder, "builder"),
                projects: packageProjects.map((project:string) => getFormIDs(project, "project")),
                packageName: requestedJobDetails?.packageName ?? loaderData?.state.packageDetails.packageName ?? "",
                plans: listOfSQLLots
            }
            finalPackageDetails = JSON.stringify(packageDetailsSQL)
        }
       
        console.log(jobDetailsSQL)

        const finalJobDetails = JSON.stringify(jobDetailsSQL)
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
        console.log(lotTablesAreValid)
        if(lotTablesAreValid) {
            await postJobDetailsSql()
            revalidator.revalidate()
        } 
        setModalType("none")
    }

    const handlePackageDetailsChange = (value:string, propName:string) => {
        setPackageDetails({
            ...packageDetails,
            [propName]: value
        })
    }

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        onJobDetailsChange(event.target.value, "date")
    }

    const findAvailableLots = ():string[] => {
        return jobDetails.lotNums.filter(
            lotNum => !listOfLots.find(lot => lot.lot === lotNum)
          );
    }

    useEffect(() => {
        const availableLots = findAvailableLots()
        if(availableLots.length > 0)
            setModalInputValue(availableLots[0]);
        else 
            setModalInputValue("")
    }, [jobDetails, listOfLots]);

    useEffect(() => {
        if(isCheckingError)
            validate()
    }, [currentLotNum])


    useEffect(() => {
        setIsCheckingError(false)
        console.log(requestedJobDetails)
        if (requestedJobDetails != null) {
            //Creating new package 
            if (Object.prototype.hasOwnProperty.call(requestedJobDetails, 'packageName')) {
                switchModal(true, "inputValue")
                setJobDetails(requestedJobDetails.packageDetails)
                setIsOptionsMode(false)
                setListOfLots([])
            //Making a new lot 
            } else if (listOfLots.length == 0 && requestedJobDetails != null) {
                console.log(requestedJobDetails)
                switchModal(true, "inputValue")
                setJobDetails(requestedJobDetails.jobDetails)
                if(Object.prototype.hasOwnProperty.call(requestedJobDetails, 'packageDetails')) {
                    setHasPackage(true)
                    setPackageDetails(requestedJobDetails.packageDetails)
                }
            } 
        } else if(loaderData != null) {
            const loadedData = loaderData.state
            //Accessing existing Job Document
            if(Object.prototype.hasOwnProperty.call(loadedData, 'jobDetails')) {
                setJobDetails(loadedData.jobDetails)
                setListOfLots(loadedData.listOfLots)
                setCurrentLot(loadedData.listOfLots[0])
                setCurrentLotNum(loadedData.listOfLots[0].lot)
            } else {
                setIsOptionsMode(false)
                setJobDetails({
                    builder: loadedData.packageDetails.builderName,
                    project: "",
                    superintendent: "",
                    optionCoordinator: "",
                    jobNotes: "",
                    phone: "",
                    lotNums: [],
                    foreman: "",
                    phase: "",
                    jobID: 0,
                    date: "",
                    prodReady: false
                })
                setListOfLots(loadedData.listOfLots)
                setCurrentLot(loadedData.listOfLots[0])
                setCurrentLotNum(loadedData.listOfLots[0].plan)
                setPackageProjects(loadedData.packageDetails.projects)
            }
        } else {
            navigate("/")
        }
            

        
    }, [requestedJobDetails, loaderData])

    return (
        <>
            <OptionsCreatorModal modal={modal} isOptionsMode={isOptionsMode} listOfLots={listOfLots} jobDetails={jobDetails} packageDetails={packageDetails} hasPackage={hasPackage} packageProjects={packageProjects} modalType={modalType} currentLotNum={currentLotNum}
                addLotTable={addLotTable} handlePackageDetailsChange={handlePackageDetailsChange} onJobDetailsChange={onJobDetailsChange} setPackageProjects={setPackageProjects} saveLotTablesSQL={saveLotTablesSQL} setModalType={setModalType} onProjectsChange={onProjectsChange}/>
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
                    <button onClick={() => setModalType("inputValue")}>New {isOptionsMode ? "Lot" : "Plan"} Table</button>
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
                                                                            lotTableDetails={currentLot} setCurrentLotNum={changeLotNumFromTable} isOptionsMode={isOptionsMode} modifyHardwareModal={modifyHardwareModal}/>)}
            </div>
        </>
    )
}

export default OptionsCreator