import LotTable from "./LotTable";
import { useLocation, useNavigate, useLoaderData } from "react-router-dom";
import { ErrorObject, LotTableInterface, PartOfLot, JobDetails, PackageDetails, LotInfo } from '../types/LotTableInterface.ts';
import { useContext, useEffect, useState } from "react";
import { FormOptionsContext } from "../context/OptionsTemplateContext.tsx";
import { FormOptionsContextType } from '../types/FormOptions.ts'
import { JobOptionLoaderResponse } from "../loader/JobOptionLoader.ts";
import OptionsCreatorModal from "./OptionsCreatorModal.tsx";
import { OptionsCreatorObject } from "../types/ModalTypes.ts";
import OptionsCreatorNav from "./OptionsCreatorNav.tsx";
import validate from "../hooks/validate.tsx";
import useSQLJobDetailsPost from "../hooks/useSQLJobDetailsPost.tsx";
  
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

    const { setErrors, setIsCheckingError, isCheckingError } = useContext(FormOptionsContext) as FormOptionsContextType
    //Option States
    const [listOfLots, setListOfLots] = useState<LotTableInterface[]>([])
    const [jobDetails, setJobDetails] = useState<JobDetails>(initialJobDetails)
    const [hasPackage, setHasPackage] = useState<boolean>(false)
    const [packageDetails, setPackageDetails] = useState<PackageDetails>(initialPackageDetails)
    const [currentLotNum, setCurrentLotNum] = useState<string>("")
    const [currentLot, setCurrentLot] = useState<LotTableInterface>()
    const [modalType, setModalType] = useState<string>("none")
    const [isLotCopy, setIsLotCopy] = useState<boolean>(false)
    const [modalInputValue, setModalInputValue] = useState<string>("")

    //Package States
    const [packageProjects, setPackageProjects] = useState<string[]>([""])
    const [isOptionsMode, setIsOptionsMode] = useState<boolean>(true)

    const loaderData = useLoaderData() as JobOptionLoaderResponse;
    //const revalidator = useRevalidator();
    const location = useLocation();
    const postSQLDetails = useSQLJobDetailsPost();
    const navigate = useNavigate();
    const requestedJobDetails = location.state;

    const sortListOfLots = (listOfLots: LotTableInterface[], newLot?: LotTableInterface) => {
        let updatedListOfLots:LotTableInterface[] = []
        if(typeof newLot === "undefined")
            updatedListOfLots = listOfLots
        else
            updatedListOfLots = [...listOfLots, newLot]
        setListOfLots(updatedListOfLots.sort((a, b) => parseInt(a.lot ?? "0") - parseInt(b.lot ?? "0")))
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
            plan: !isOptionsMode ? lotInputValue : jobDetails.lotNums.find(lotInfo => lotInfo.lotNum === lotInputValue)?.plan ?? "",
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

    const onProjectsChange  = (value: string, _key: string, optSectionNum:number=-1) => {
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

    const changeLotTable = (lotInputValue: string) => {
        setCurrentLotNum(lotInputValue)
        const foundLot = listOfLots.find((lotDetails:LotTableInterface) => {return ((isOptionsMode && lotDetails.lot === lotInputValue) ||
            (!isOptionsMode && lotDetails.plan === lotInputValue))})
        setCurrentLot(foundLot)
    }

    const addLotTable = () => {
        let table:LotTableInterface;
        console.log(modalInputValue)
        if(modalInputValue !== "") {
            if(!isLotCopy) {
                if(["", "None"].includes(packageDetails.packageName))
                    table = createLotTable(modalInputValue)
                else {
                    //Runs if package option is selected
                    table = Object.assign({}, packageDetails.plans.find((lotDetails:LotTableInterface) => {return lotDetails.plan === packageDetails.planName}))
                    table.lot = modalInputValue
                    table.partsOfLot = Object.assign([], table.partsOfLot)
                    console.log(listOfLots)
                    console.log(table)
                }
            } else {
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

    const saveLotTablesSQL = async () => {
        console.log(jobDetails)
        console.log(listOfLots)

        if(jobDetails.prodReady) {
            const { errors, lotsHaveError } = getErrorState()
            setErrorState(errors, lotsHaveError)
            
            if(!lotsHaveError) 
                await postSQLDetails(listOfLots, jobDetails, isOptionsMode, packageProjects, requestedJobDetails, loaderData)
                //revalidator.revalidate()
        } else {
            postSQLDetails(listOfLots, jobDetails, isOptionsMode, packageProjects, requestedJobDetails, loaderData)
            setIsCheckingError(false)
        }
        setModalType("none")
    }

    const addOptionRow = (lotName:string) => {
        if(currentLot) {
            const lotSection:PartOfLot = {
                roomID: lotName,
                handleType: "none",
                drawerFronts: currentLot.partsOfLot[0].drawerFronts ?? "",
                drawerBoxes: currentLot.partsOfLot[0].drawerBoxes ?? "",
                drawerGuides: currentLot.partsOfLot[0].drawerGuides ?? "",
                doorHinges: currentLot.partsOfLot[0].doorHinges ?? "",
                material: "",
                color: "",
                doors: "",
                fingerpull: "",
                knobs: "",
                pulls: "",
                details: "",
                appliances: ""
            }

            const oldPartsOfLot = [...currentLot.partsOfLot]

            if(oldPartsOfLot.length === 1) {
                const throughoutLot = oldPartsOfLot[0]
                oldPartsOfLot.splice(0, 1, {...throughoutLot, roomID: "Balance of House"})
            }

            const newPartsOfLot = [...oldPartsOfLot, lotSection]
            const updatedLot = {...currentLot,
                partsOfLot: newPartsOfLot
            }
            saveLotTable(updatedLot, (optionsCreatorObject.isOptionsMode ? updatedLot.lot : updatedLot.plan))
            setModalType("none")
        }
    }

    const handlePackageDetailsChange = (value:string, propName:string) => {
        setPackageDetails({
            ...packageDetails,
            [propName]: value
        })
    }

    const findAvailableLots = ():LotInfo[] => {
        return jobDetails.lotNums.filter(
            lotNum => !listOfLots.find(lot => lot.lot === lotNum.lotNum)
          );
    }

    const getErrorState = ():{errors: ErrorObject, lotsHaveError: boolean} => {
        const availableLots = findAvailableLots()
        return validate(jobDetails, listOfLots, currentLotNum, availableLots);
    }

    const setErrorState = (errors: ErrorObject, lotsHaveError: boolean) => {
        console.log(lotsHaveError)
        setErrors(errors)
        setIsCheckingError(lotsHaveError)
    }

    useEffect(() => {
        const availableLots = findAvailableLots()
        if(availableLots.length > 0 && modalType !== "partOfLot")
            setModalInputValue(availableLots[0].lotNum);
        else 
            setModalInputValue("")
    }, [jobDetails, listOfLots, modalType]);

    useEffect(() => {
        if(isCheckingError) {
            const { errors, lotsHaveError } = getErrorState()
            setErrorState(errors, lotsHaveError)
        }
            
    }, [currentLotNum])


    useEffect(() => {
        setIsCheckingError(false)
        if (requestedJobDetails != null) {
            console.log(requestedJobDetails)
            //Creating new package 
            if (Object.prototype.hasOwnProperty.call(requestedJobDetails, 'packageName')) {
                setModalType("inputValue")
                setJobDetails(requestedJobDetails.packageDetails)
                setIsOptionsMode(false)
                setListOfLots([])
            //Making a new lot 
            } else if (listOfLots.length == 0 && requestedJobDetails != null) {
                console.log(requestedJobDetails)
                setModalType("inputValue")
                setJobDetails(requestedJobDetails.jobDetails)
                if(requestedJobDetails.hasPackage) {
                    setHasPackage(true)
                    setPackageDetails(requestedJobDetails.packageDetails)
                }
            } 
        } else if(loaderData != null && Object.keys(loaderData).length !== 0) {
            console.log(loaderData)
            const loadedData = loaderData.state
            //Accessing existing Job Document
            if(Object.prototype.hasOwnProperty.call(loadedData, 'jobDetails')) {
                setJobDetails(loadedData.jobDetails)
                sortListOfLots(loadedData.listOfLots)
                setCurrentLot(loadedData.listOfLots[0])
                setCurrentLotNum(loadedData.listOfLots[0].lot)
                if(loadedData.hasPackage) {
                    setHasPackage(true)
                    setPackageDetails(loadedData.packageDetails)
                }
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
                sortListOfLots(loadedData.listOfLots)
                setCurrentLot(loadedData.listOfLots[0])
                setCurrentLotNum(loadedData.listOfLots[0].plan)
                setPackageProjects(loadedData.packageDetails.projects)
            }
        } else {
            navigate("/")
        }
    }, [requestedJobDetails, loaderData])

    const optionsCreatorObject:OptionsCreatorObject = {
        isOptionsMode: isOptionsMode, 
        currentLot: currentLot,
        listOfLots: listOfLots, 
        jobDetails: jobDetails, 
        packageDetails: packageDetails, 
        hasPackage: hasPackage, 
        packageProjects: packageProjects,
        addLotTable: addLotTable, 
        saveLotTable: saveLotTable,
        handlePackageDetailsChange: handlePackageDetailsChange,  
        onJobDetailsChange: onJobDetailsChange, 
        setPackageProjects: setPackageProjects, 
        saveLotTablesSQL: saveLotTablesSQL,
        onProjectsChange: onProjectsChange,
        addOptionRow: addOptionRow
    }

    return (
        <>
            <OptionsCreatorModal modalInputValue={modalInputValue} setModalInputValue={setModalInputValue} setModalType={setModalType} modalType={modalType} optionsCreatorObject={optionsCreatorObject}/>
            <OptionsCreatorNav isOptionsMode={isOptionsMode} jobDetails={jobDetails} currentLotNum={currentLotNum} listOfLots={listOfLots} onJobDetailsChange={onJobDetailsChange} setModalType={setModalType}
                setIsLotCopy={setIsLotCopy} setCurrentLotNum={setCurrentLotNum} setCurrentLot={setCurrentLot} sortListOfLots={sortListOfLots} changeLotTable={changeLotTable}/>
            <div id="optionsEditor">
                {!currentLot ? (<div style={{height: "100vh"}}></div>): (<LotTable saveLotTable={saveLotTable} onJobDetailsChange={onJobDetailsChange} jobDetails={jobDetails} setModalType={setModalType}
                                                                            lotTableDetails={currentLot} setCurrentLotNum={changeLotNumFromTable} isOptionsMode={isOptionsMode} />)}
            </div>
        </>
    )
}

export default OptionsCreator