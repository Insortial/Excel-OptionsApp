import { useContext } from "react"
import { JobDetails, JobDetailsSQL, LotTableInterface, LotTableSQL, PackageDetailsSQL, PartOfLot, PartOfLotSQL } from "@excelcabinets/excel-types/LotTableInterface"
import { FormOptionsContext } from "../context/OptionsTemplateContext"
import { FormOptionsContextType } from "@excelcabinets/excel-types/FormOptions"
import useFetch from "./useFetch"
import { AuthInfo } from "../context/AuthContext"

const useSQLJobDetailsPost = () => {
    const fetchHook = useFetch()
    const { getFormIDs } = useContext(FormOptionsContext) as FormOptionsContextType
    const { authState } = AuthInfo()
    const { userID } = authState

    const decipherMixedOptions = (editingPartsOfLot:boolean, throughoutLot:PartOfLot|undefined, currentLot:PartOfLot, propName: string):number => {
        const currentLotProperty = currentLot[propName as keyof PartOfLot] as string
        const throughoutLotProperty = throughoutLot?.[propName as keyof PartOfLot] as string
        return editingPartsOfLot ? getFormIDs(currentLotProperty, propName) : getFormIDs(throughoutLotProperty, propName)
    }

    const handlePullsAndKnobs = (returnType: string, currentLot:PartOfLot, throughOutLot:PartOfLot|undefined) => {
        let partName:string|number|boolean = ""
        const handleType = returnType.replace(/\d+$/, "")
        const capitalizedHandle = handleType.charAt(0).toUpperCase() + handleType.slice(1)
        const endChar = parseInt(returnType[returnType.length - 1])
        if (currentLot.roomID !== "Throughout" && throughOutLot !== undefined && currentLot.handleType === "none") {
            const throughoutLotValue = throughOutLot[returnType as keyof PartOfLot]
            partName = (throughoutLotValue === "" || typeof throughoutLotValue !== "string") ? "1" : throughoutLotValue
        } else {
            const currentLotValue = currentLot[returnType as keyof PartOfLot]
            partName = (currentLotValue === "" || typeof currentLotValue !== "string") ? "1" : currentLotValue
        }

        if(handleType !== currentLot.handleType && currentLot.handleType !== "both" || !isNaN(endChar) && endChar > Number(currentLot[`numOf${capitalizedHandle}` as keyof PartOfLot]))
            partName = "1"

        return partName as string
    }

    const postSQLJobDetails = async (listOfLots:LotTableInterface[], jobDetails:JobDetails, isOptionsMode:boolean, packageProjects:string[], packageName: string, prodReady: boolean, lotsUpdated: {[key:string]: boolean}) => {
        const listOfSQLLots:LotTableSQL[] = []
        
        for(const lotTable of listOfLots) {
            const listOfSQLPartsOfLot:PartOfLotSQL[] = []
            const throughOutLot = lotTable.partsOfLot.find((partOfLot:PartOfLot) => partOfLot.roomID === "Throughout" || partOfLot.roomID === "Balance of House")
            if(throughOutLot) {
               for(const [index, lotSection] of lotTable.partsOfLot.entries()) {
                    const partOfLot:PartOfLotSQL = {
                        roomID: lotSection.roomID,
                        material: getFormIDs(lotSection.material, "material"), 
                        glassDoors: lotSection.glassDoors ? "YES" : "NO",
                        glassShelves: lotSection.glassShelves ? "YES" : "NO",
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
                        drawerFronts: getFormIDs(throughOutLot.drawerFronts, "drawerFronts"), 
                        knobs: handlePullsAndKnobs("knobs", lotSection, throughOutLot), 
                        drawerBoxes: decipherMixedOptions(lotTable.editingPartsOfLot, throughOutLot, lotSection, "drawerBoxes"), 
                        drawerGuides: decipherMixedOptions(lotTable.editingPartsOfLot, throughOutLot, lotSection, "drawerGuides"), 
                        doorHinges: decipherMixedOptions(lotTable.editingPartsOfLot, throughOutLot, lotSection, "doorHinges"), 
                        interiors: decipherMixedOptions(lotTable.editingPartsOfLot, throughOutLot, lotSection, "interiors"),
                        boxStyle: decipherMixedOptions(lotTable.editingPartsOfLot, throughOutLot, lotSection, "boxStyle"),
                        pulls: handlePullsAndKnobs("pulls", lotSection, throughOutLot),
                        knobs2: handlePullsAndKnobs("knobs2", lotSection, throughOutLot),
                        knobs2Qty: 0,
                        pulls2: handlePullsAndKnobs("pulls2", lotSection, throughOutLot),
                        pulls2Qty: 0,
                        handleType: lotSection.handleType,
                        details: lotSection.details,
                    }

                    if(index === 0 && !lotTable.hasThroughoutLot) 
                        Object.assign(partOfLot, {material: getFormIDs("N/A", "material"), color: getFormIDs("N/A", "color"), doors: "N/A", fingerpull: "",
                                                  pulls: "1", pulls2: "1", knobs: "1", knobs2: "1", glassDoors: "NO", glassShelves: "NO"})
                    listOfSQLPartsOfLot.push(partOfLot)
                } 
            }
            
            const lotTableSQL:LotTableSQL = {
                lot: lotTable.lot,
                lotOptionsValue: isNaN(parseInt(lotTable.lotOptionsValue)) ? 0 : parseInt(lotTable.lotOptionsValue),
                partsOfLot: listOfSQLPartsOfLot,
                plan: lotTable.plan,
                //Start of LotDocument properties
                lotPhaseDate: lotsUpdated[isOptionsMode ? lotTable.lot : lotTable.plan] ? jobDetails.date : lotTable.lotPhaseDate,
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

        const jobDetailsSQL:JobDetailsSQL|undefined = {
            jobID: parseInt(jobDetails.jobID),
            doorBuyOut: false,
            drawerBoxBuyOut: false,
            jobNotes: jobDetails.jobNotes,
            coordinatorIDFK: jobDetails.coordinatorIDFK,
            lots: listOfSQLLots,
            superintendent: jobDetails.superintendent,
            phone: jobDetails.phone,
            prodReady: prodReady,
            userID: userID
        }

        let packageDetailsSQL:PackageDetailsSQL
        let finalPackageDetails; 
        if(!isOptionsMode) {
            packageDetailsSQL = {
                builder: getFormIDs(jobDetails.builder, "builder"),
                projects: packageProjects.map((project:string) => getFormIDs(project, "project")),
                packageName: packageName,
                plans: listOfSQLLots
            }
            finalPackageDetails = JSON.stringify(packageDetailsSQL)
        }
    
        console.log(jobDetailsSQL)

        const finalJobDetails = JSON.stringify(jobDetailsSQL)
        const response = await fetchHook(isOptionsMode ? "/lotDetails" : "/packageDetails", "POST", isOptionsMode ? finalJobDetails : finalPackageDetails)
        return response
    }
    return postSQLJobDetails;
}

export default useSQLJobDetailsPost;