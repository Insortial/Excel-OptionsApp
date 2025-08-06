/* eslint-disable react/react-in-jsx-scope */
import LotTable from "./LotTable";
import { useLocation, useNavigate, useLoaderData } from "react-router-dom";
import { ErrorObject, LotTableInterface, PartOfLot, JobDetails, PackageDetails, LotInfo, CheckListItem } from '@excelcabinets/excel-types/LotTableInterface';
import { useContext, useEffect, useState } from "react";
import { FormOptionsContext } from "../context/OptionsTemplateContext.tsx";
import { FormOptionsContextType } from '@excelcabinets/excel-types/FormOptions'
import { JobOptionLoaderResponse } from "../loader/JobOptionLoader.ts";
import OptionsCreatorModal from "./OptionsCreatorModal.tsx";
import { OptionsCreatorObject } from "../types/ModalTypes.ts";
import OptionsCreatorNav from "./OptionsCreatorNav.tsx";
import validate from "../hooks/validate.tsx";
import useSQLJobDetailsPost from "../hooks/useSQLJobDetailsPost.tsx";
import Notification from "./Notification.tsx";
import OptionsCreatorModalScreens from "./ModalScreens/OptionsCreatorModalScreens.tsx";
import { useFieldArray, useForm } from "react-hook-form";
import { initialJobDetails, initialLotDetails, initialPackageDetails, throughoutLot } from "../templates/initialValues.ts";
  
function OptionsCreator() {
    const { setErrors, setIsCheckingError, isCheckingError } = useContext(FormOptionsContext) as FormOptionsContextType
    //Option States
    const { getValues: getLotListValues, control: controlLotList, reset: resetLotList, setValue: setLotListValue } = useForm<{lots: LotTableInterface[]}>({defaultValues: {lots: []}})
    const { fields: listOfLots, remove: removeLotList, update: updateLotList } = useFieldArray({control: controlLotList, name: "lots"})
    const { reset: resetJob, getValues: getJobValues, setValue: setJobValue } = useForm<JobDetails>({defaultValues: initialJobDetails})
    const [hasPackage, setHasPackage] = useState<boolean>(false)
    const [packageDetails, setPackageDetails] = useState<PackageDetails>(initialPackageDetails)
    const [currentLotNum, setCurrentLotNum] = useState<string>("")
    const [modalType, setModalType] = useState<string>("none")
    const [isLotCopy, setIsLotCopy] = useState<boolean>(false)
    const [modalInputValue, setModalInputValue] = useState<string>("")
    const [submissionValid, setSubmissionValid] = useState<boolean|null>(null)

    //Package States
    /* const [packageProjects, setPackageProjects] = useState<string[]>([""]) */
    const { getValues: getPackageProjects, setValue: setPackageProjects, reset: resetPackageProjects } = useForm<{projects: string[]}>({defaultValues: {projects: [""]}})
    const [isOptionsMode, setIsOptionsMode] = useState<boolean>(true)
    const loaderData = useLoaderData() as JobOptionLoaderResponse;
    const location = useLocation();
    const postSQLDetails = useSQLJobDetailsPost();
    const navigate = useNavigate();
    const requestedJobDetails = location.state;

    const getCurrentLot = (lotInputValue: string) => {
        return getLotListValues("lots").find((lotDetails:LotTableInterface) => {return ((isOptionsMode && lotDetails.lot === lotInputValue) ||
            (!isOptionsMode && lotDetails.plan === lotInputValue))})
    }

    const currentLot = getCurrentLot(currentLotNum)

    const onFormJobChange = (key: string, value: string) => {
        resetJob({...getJobValues(), [key]: value});
    }

    const sortListOfLots = (listOfLots: LotTableInterface[], newLot?: LotTableInterface, jobLotList?:LotInfo[]) => {
        let updatedListOfLots:LotTableInterface[] = []
        let lotNums;

        if(typeof newLot === "undefined")
            updatedListOfLots = listOfLots
        else
            updatedListOfLots = [...listOfLots, newLot]

        if(typeof jobLotList === "undefined")
            lotNums = getJobValues("lotNums")
        else
            lotNums = jobLotList

        updatedListOfLots.forEach((lot, index, listOfLots) => {
            listOfLots[index] = convertToMixedOptions(lot)
        })

        resetLotList({lots: updatedListOfLots.sort((a, b) => lotNums.findIndex(lot => lot.lotNum === a.lot) - lotNums.findIndex(lot => lot.lotNum === b.lot))})
    }

    const convertToMixedOptions = (lot:LotTableInterface) => {
        //Find better solution to handle return types
        type mixedOptionsType = {
            drawerFronts: Array<[string, string|number|boolean|CheckListItem[]|undefined]>;
            drawerBoxes: Array<[string, string|number|boolean|CheckListItem[]|undefined]>;
            drawerGuides: Array<[string, string|number|boolean|CheckListItem[]|undefined]>;
            doorHinges: Array<[string, string|number|boolean|CheckListItem[]|undefined]>;
            boxStyle: Array<[string, string|number|boolean|CheckListItem[]|undefined]>;
            interiors: Array<[string, string|number|boolean|CheckListItem[]|undefined]>;
        }

        const mixedOptions:mixedOptionsType = {drawerFronts: [], drawerBoxes: [], drawerGuides: [], doorHinges: [], boxStyle: [], interiors: []};
        const obj: Record<string, string> = {};
        lot.partsOfLot.forEach((partOfLot) => {
            Object.keys(mixedOptions).forEach((key:string) => mixedOptions[key as keyof typeof mixedOptions].push([partOfLot.roomID, partOfLot[key as keyof PartOfLot]]))
        })

        Object.keys(mixedOptions).forEach((key:string) => {
            let optionArray = mixedOptions[key as keyof typeof mixedOptions]

            if(!lot.hasThroughoutLot)
                optionArray = optionArray.slice(1)

            const filteredOptionArray = optionArray.filter((array) => array[1] !== optionArray[0][1] || optionArray[0][0] === array[0])
            obj[key] = filteredOptionArray.length === 1 ? String(filteredOptionArray[0][1]) : filteredOptionArray.map(pair => `${pair[0]} - ${pair[1]}`).join(", ");
        })

        const newObj = {...lot, ...obj}
        return newObj
    }

    const createLotTable = (lotInputValue: string): LotTableInterface => {
        const lotDetails:LotTableInterface = {
            ...initialLotDetails,
            jobID: parseInt(getJobValues("jobID")),
            lot: isOptionsMode ? lotInputValue : "",
            plan: !isOptionsMode ? lotInputValue : getJobValues("lotNums").find(lotInfo => lotInfo.lotNum === lotInputValue)?.plan ?? "",
        }

        return lotDetails;
    }

    const onProjectsChange  = (key: "projects" | `projects.${number}`, value: string) => {
        setPackageProjects(key, value)
    }

    const saveLotTable = (lotTableData: LotTableInterface, lotInputValue: string) => {
        const filteredTableList = getLotListValues("lots").filter((lotDetails:LotTableInterface) => (isOptionsMode && lotDetails.lot !== lotInputValue) ||
                                                                                         (!isOptionsMode && lotDetails.plan !== lotInputValue))
        sortListOfLots(filteredTableList, lotTableData)
    }

    const addLotTable = () => {
        console.log(getLotListValues("lots"))
        let table:LotTableInterface;
        console.log(packageDetails)
        if(modalInputValue !== "") {
            if(!isLotCopy) {
                if(["", "None"].includes(packageDetails.packageName) || packageDetails.planName === "None")
                    table = createLotTable(modalInputValue)
                else {
                    //Runs if package option is selected
                    table = Object.assign({}, packageDetails.plans.find((lotDetails:LotTableInterface) => {return lotDetails.plan === packageDetails.planName}))
                    table.lot = modalInputValue
                    table.partsOfLot = Object.assign([], table.partsOfLot)
                }
            } else {
                table = Object.assign({}, getLotListValues("lots").find((lotDetails:LotTableInterface) => {return (isOptionsMode ? lotDetails.lot : lotDetails.plan) === currentLotNum}))
                table.plan = getJobValues("lotNums").find(lotInfo => lotInfo.lotNum === modalInputValue)?.plan ?? ""
                table.partsOfLot = Object.assign([], table.partsOfLot)
                if(isOptionsMode)
                    table.lot = modalInputValue
                else
                    table.plan = modalInputValue
                setIsLotCopy(false)
            }
            sortListOfLots(getLotListValues("lots"), table)

            setCurrentLotNum(modalInputValue)
            setModalType("none")
        }
    }

    const setNotification = (submissionState:boolean) => {
        setSubmissionValid(submissionState)

        setTimeout(() => {
            setSubmissionValid(null)
        }, 3000)
    }

    const saveLotTablesSQL = async (prodReady:boolean) => {
        let hasError = false

        if(prodReady) {
            const { errors, lotsHaveError } = getErrorState()
            setErrorState(errors, lotsHaveError)
            hasError = lotsHaveError    
        } else {
            setIsCheckingError(false)
        }

        if(!hasError) {
            const validJob = await postSQLDetails(getLotListValues("lots"), getJobValues(), isOptionsMode, getPackageProjects("projects"), requestedJobDetails, loaderData, prodReady)
            const responseBody = await validJob.json()
            if(validJob.ok && location.pathname === '/optionCreator/')
                navigate(`/optionCreator/jobOption/${responseBody.jobDocumentID}`)
            setNotification(validJob.ok)

            if(validJob.ok)
                setJobValue("prodReady", prodReady)
        }
        setModalType("none")
    }

    const addOptionRow = (lotName:string) => {
        const currentIDX = getLotListValues("lots").findIndex((lotDetails:LotTableInterface) => (isOptionsMode ? lotDetails.lot === currentLotNum : lotDetails.plan === currentLotNum))
        if(currentLot) {
            const lotSection:PartOfLot = {
                ...throughoutLot,
                roomID: lotName,
                handleType: "none",
                drawerFronts: currentLot.partsOfLot[0].drawerFronts ?? "",
                drawerBoxes: currentLot.partsOfLot[0].drawerBoxes ?? "",
                drawerGuides: currentLot.partsOfLot[0].drawerGuides ?? "",
                doorHinges: currentLot.partsOfLot[0].doorHinges ?? "",
                boxStyle: currentLot.partsOfLot[0].boxStyle ?? "",
                interiors: currentLot.partsOfLot[0].interiors ?? "",
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
            
            updateLotList(currentIDX, updatedLot)
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
        return getJobValues("lotNums").filter(
            lotNum => !getLotListValues("lots").find(lot => lot.lot === lotNum.lotNum)
          );
    }

    const getErrorState = ():{errors: ErrorObject, lotsHaveError: boolean} => {
        return validate(getJobValues(), getLotListValues("lots"), currentLotNum);
    }

    const setErrorState = (errors: ErrorObject, lotsHaveError: boolean) => {
        console.log(lotsHaveError)
        setErrors(errors)
        setIsCheckingError(lotsHaveError)
    }

    useEffect(() => {
        const beforeUnloadListener = (event:BeforeUnloadEvent) => {
            event.preventDefault();
            console.log()
        };

        window.addEventListener("beforeunload", beforeUnloadListener);

        return () => {
            window.removeEventListener("beforeunload", beforeUnloadListener)
        }
    }, []);

    useEffect(() => {
        const throughoutLot = currentLot?.partsOfLot[0]
        const hasSplitLot = throughoutLot?.drawerBoxes.includes(",") || throughoutLot?.drawerGuides.includes(",") || throughoutLot?.doorHinges.includes(",")
        const hasKitchen = currentLot?.partsOfLot.find((partOfLot) => partOfLot.roomID.toLowerCase() === "kitchen only") !== undefined

        if(!hasKitchen && hasSplitLot) {
            addOptionRow("Kitchen Only")
        } 
    }, [currentLot?.partsOfLot[0].drawerBoxes, currentLot?.partsOfLot[0].drawerGuides, currentLot?.partsOfLot[0].doorHinges])

    useEffect(() => {
        const availableLots = findAvailableLots()
        if(availableLots.length > 0 && modalType !== "partOfLot")
            setModalInputValue(availableLots[0].lotNum);
        else 
            setModalInputValue("")
    }, [listOfLots, modalType]);

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
                resetJob(requestedJobDetails.packageDetails)
                setIsOptionsMode(false)
                resetLotList({lots: []})
            //Making a new lot 
            } else if (getLotListValues("lots").length == 0 && requestedJobDetails != null) {
                console.log(requestedJobDetails)
                resetJob(requestedJobDetails.jobDetails)
                if(requestedJobDetails.hasPackage) {
                    setHasPackage(true)
                    setPackageDetails(requestedJobDetails.packageDetails)
                }
                setModalType("inputValue")
            } 
        } else if(loaderData != null && Object.keys(loaderData).length !== 0) {
            console.log(loaderData)
            const loadedData = loaderData.state
            //Accessing existing Job Document
            if(Object.prototype.hasOwnProperty.call(loadedData, 'jobDetails')) {
                resetJob(loadedData.jobDetails)
                sortListOfLots(loadedData.listOfLots, undefined, loadedData.jobDetails.lotNums)
                setCurrentLotNum(loadedData.listOfLots[0]?.lot ?? "")
                if(loadedData.hasPackage) {
                    setHasPackage(true)
                    setPackageDetails(loadedData.packageDetails)
                }
            //Accessing existing Package
            } else {
                setIsOptionsMode(false)
                resetJob({
                    builder: loadedData.packageDetails.builderName,
                    project: "",
                    superintendent: "",
                    optionCoordinator: "",
                    jobNotes: "",
                    phone: "",
                    lotNums: [],
                    foreman: "",
                    phase: "",
                    jobID: "",
                    date: "",
                    lastUpdatedBy: "",
                    dateUpdated: "",
                    prodReady: false
                })
                resetLotList({lots: loadedData.listOfLots})
                setCurrentLotNum(loadedData.listOfLots[0].plan)
                resetPackageProjects({projects: loadedData.packageDetails.projects})
            }
        } else {
            navigate("/jobMenu")
        }
    }, [requestedJobDetails, loaderData])

    //Modal object and functions
    const optionsCreatorObject:OptionsCreatorObject = {
        isOptionsMode: isOptionsMode, 
        isLotCopy: isLotCopy,
        currentLot: currentLot,
        listOfLots: getLotListValues("lots"), 
        jobDetails: getJobValues(), 
        packageDetails: packageDetails, 
        hasPackage: hasPackage, 
        getPackageProjects: getPackageProjects,
        addLotTable: addLotTable, 
        saveLotTable: saveLotTable,
        handlePackageDetailsChange: handlePackageDetailsChange,  
        setJobValue: setJobValue, 
        resetPackageProjects: resetPackageProjects, 
        saveLotTablesSQL: saveLotTablesSQL,
        onProjectsChange: onProjectsChange,
        addOptionRow: addOptionRow
    }
    
    const turnOffModal = () => {
        setModalInputValue("")
        setErrors({})
        setModalType("none")
        setIsLotCopy(false)
    } 

    return (
        <>
            <OptionsCreatorModal modalType={modalType} turnOffModal={turnOffModal}>
                <OptionsCreatorModalScreens optionsCreatorObject={optionsCreatorObject} modalType={modalType} setModalType={setModalType} modalInputValue={modalInputValue} setModalInputValue={setModalInputValue} turnOffModal={turnOffModal}/>
            </OptionsCreatorModal>
            <OptionsCreatorNav isOptionsMode={isOptionsMode} currentLotNum={currentLotNum} getJobValues={getJobValues} onFormJobChange={onFormJobChange} setModalType={setModalType}
                setIsLotCopy={setIsLotCopy} setCurrentLotNum={setCurrentLotNum} listOfLots={listOfLots} removeLotList={removeLotList}/>
            <div id="optionsEditor">
                {!currentLotNum ? (<div style={{height: "100vh"}}></div>): (<LotTable onFormJobChange={onFormJobChange} setModalType={setModalType} convertToMixedOptions={convertToMixedOptions} setLotListValue={setLotListValue} currentLotNum={currentLotNum} 
                                                                                getLotListValues={getLotListValues} setCurrentLotNum={setCurrentLotNum} isOptionsMode={isOptionsMode} getJobValues={getJobValues} updateLotList={updateLotList} controlLotList={controlLotList}/>)}
            </div>
            <Notification submissionValid={submissionValid}/>
        </>
    )
}

export default OptionsCreator