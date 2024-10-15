import { useContext } from "react"
import { JobDetails, JobDetailsSQL, LotTableInterface, LotTableSQL, PackageDetailsSQL, PartOfLot, PartOfLotSQL } from "../types/LotTableInterface"
import { FormOptionsContext } from "../context/OptionsTemplateContext"
import { FormOptionsContextType } from "../types/FormOptions"
import useFetch from "./useFetch"
import { JobOptionLoaderResponse } from "../loader/JobOptionLoader"

const useSQLJobDetailsPost = () => {
    const fetchHook = useFetch()
    const { getFormIDs } = useContext(FormOptionsContext) as FormOptionsContextType
    
    const decipherMixedOptions = (throughoutLot:PartOfLot|undefined, currentLot:PartOfLot, propName: string):number => {
        const {roomID} = currentLot
        const mixedOptionKey: {[key:string]:string} = {
            "Dovetail - Kitchen Only, STD - Balance of House": "Dovetail", 
            "APA Dovetail - Kitchen Only, STD - Balance of House": "APA Dovetail",
            "Soft Closing - Kitchen Only, STD - Balance of House": "Soft Closing", 
            "APA Soft Closing - Kitchen Only, STD - Balance of House": "APA Soft Closing"
        }
    
        const value = throughoutLot ? throughoutLot[propName as keyof PartOfLot] : ""
        
        if(Object.prototype.hasOwnProperty.call(mixedOptionKey, value)) {
            const lowerRoomID = roomID.toLowerCase()
            if(lowerRoomID.includes("balance of house") || lowerRoomID.includes("throughout")) {
                return getFormIDs("Standard", propName)
            } else if(lowerRoomID.includes("kitchen")) {
                return getFormIDs(mixedOptionKey[value], propName)
            } else {
                return getFormIDs("Standard", propName)
            }
        } else {
            console.log(roomID + " DO")
            return getFormIDs(value, propName)
        }
    }


    const handlePullsAndKnobs = (returnType: string, currentLot:PartOfLot, throughOutLot:PartOfLot|undefined) => {
        let partName = ""

        if(returnType === "pulls") {
            partName = ["pulls", "both"].includes(currentLot.handleType) ? currentLot.pulls === "" ? "1" : currentLot.pulls : "1"
        } else if (returnType === "knobs") {
            partName = ["knobs", "both"].includes(currentLot.handleType) ? currentLot.knobs === "" ? "1" : currentLot.knobs : "1"
        }

        if (currentLot.roomID !== "Throughout" && throughOutLot !== undefined && currentLot.handleType === "none") {
            if(returnType === "pulls") {
                partName = throughOutLot.pulls !== "" ? throughOutLot.pulls : "1"
            } else if (returnType === "knobs") {
                partName =throughOutLot.knobs !== "" ? throughOutLot.knobs : "1"
            }

            if(throughOutLot.handleType === "none")
                partName = "1"
        }

        return partName
    }

    const postSQLJobDetails = async (listOfLots:LotTableInterface[], jobDetails:JobDetails, isOptionsMode:boolean, packageProjects:string[], requestedJobDetails:any, loaderData:JobOptionLoaderResponse) => {
        const listOfSQLLots:LotTableSQL[] = []
        for(const lotTable of listOfLots) {
            const listOfSQLPartsOfLot:PartOfLotSQL[] = []
            const throughOutLot = lotTable.partsOfLot.find((partOfLot:PartOfLot) => partOfLot.roomID === "Throughout" || partOfLot.roomID === "Balance of House")
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
                    doors: lotSection.doors == "" ? "N/A" : lotSection.doors,
                    fingerpull: lotSection.fingerpull,
                    drawerFronts: getFormIDs(lotSection.drawerFronts, "drawerFronts"), 
                    knobs: handlePullsAndKnobs("knobs", lotSection, throughOutLot), 
                    drawerBoxes: decipherMixedOptions(throughOutLot, lotSection, "drawerBoxes"), 
                    drawerGuides: getFormIDs(lotSection.drawerGuides, "drawerGuides"), 
                    doorHinges: decipherMixedOptions(throughOutLot, lotSection, "doorHinges"), 
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
    return postSQLJobDetails;
}

export default useSQLJobDetailsPost;