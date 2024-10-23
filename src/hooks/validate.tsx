import { ErrorObject, JobDetails, LotInfo, LotTableInterface, PartOfLot } from "../types/LotTableInterface";

const validate = (jobDetails:JobDetails, listOfLots:LotTableInterface[], currentLotNum:string, availableLots:LotInfo[]) => {
    const isHandleValid = (handleType:string, key:string, value:string, numOfKnobs:number, numOfPulls:number):boolean => {
        let partNum = 0
        const endChar = Number(key[key.length - 1])

        if(handleType !== key.replace(/\d+$/, "") && handleType !== "both")
            return true

        if(!isNaN(endChar)) {
            partNum = endChar
            key = key.slice(0, -1)
        }
        
        switch(handleType) {
            case "both":
                return (key === "knobs" && (value !== "" || partNum > numOfKnobs)) || (key === "pulls" && (value !== "" || partNum > numOfPulls))
            case "pulls":
                return key === "pulls" && (value !== "" || partNum > numOfPulls)
            case "knobs":
                return key === "knobs" && (value !== "" || partNum > numOfKnobs)
            case "none":
            default:
                return true
        }
    }

    const requiredFieldsJob = ["jobID"];
    const requiredFieldsLotTable = ["boxStyle", "interiors", "upperHeight", 
                            "islands", "crown", "lightRail", "baseShoe", 
                            "recyclingBins", "lotOptionsValue", "kitchen",
                                "master","bath2","bath3",
                                "bath4","powder","laundry"]
    const requiredFieldsLotPart = ["drawerFronts", "drawerBoxes", "drawerGuides", 
                                    "doorHinges", "doors", "fingerpull",
                                    "material", "color", "pulls", "pulls2", "roomID", "knobs", "knobs2"]
    const newErrors:ErrorObject = {};
    let listOfLotsHasError = false
    
    listOfLots.forEach(lot => lot.hasError = false)

    Object.keys(jobDetails).forEach((key) => {
        if(requiredFieldsJob.includes(key) && !jobDetails[key as keyof JobDetails])
            newErrors[key] = "Field is required, please fill out"
    })

    if(availableLots.length !== 0) {
        newErrors["Lots Not Created"] = `Must make lot(s): ${availableLots.map(lots => lots.lotNum).join(", ")}`
    }

    /* Iterates through lists of lots checks if any 
    part has input error, only records it if it is current lot */
    listOfLots.map((lot: LotTableInterface) => {
        lot.partsOfLot.map((partOfLot:PartOfLot, index:number) => {
            //Iterates through each Part of Lot
            for(const key of Object.keys(partOfLot)) {

                //Checks if key has value, also checks if it is part of requiredFields list
                const selectedPartOfLot = lot.partsOfLot[index]
                const selectedField = selectedPartOfLot[key as keyof PartOfLot]
                //const handleField = selectedPartOfLot[selectedPartOfLot.handleType as keyof PartOfLot]
                if(requiredFieldsLotPart.includes(key) && !selectedField) {
                    if((selectedPartOfLot.roomID === 'Throughout' && !lot.hasThroughoutLot && ["material", "color", "doors", "fingerpull"].includes(key)) || 
                        (isHandleValid(selectedPartOfLot.handleType, key, selectedField as string, selectedPartOfLot.numOfKnobs, selectedPartOfLot.numOfPulls))) {
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
            if(requiredFieldsLotTable.includes(key) && (lot[key as keyof LotTableInterface] === undefined || lot[key as keyof LotTableInterface] === "")) {
                listOfLotsHasError = true
                lot.hasError = true
                if(lot.lot === currentLotNum)
                    newErrors[key] = "Field is required, please fill out"
            }

            if(key === "lotOptionsValue" && isNaN(Number(lot.lotOptionsValue)))
                newErrors[key] = "Incorrect format, must be a number"
                
        })
    })

    console.log(newErrors)
    console.log(listOfLotsHasError)
    return {errors: newErrors, lotsHaveError: Object.keys(newErrors).length > 0 || listOfLotsHasError}
}

export default validate;