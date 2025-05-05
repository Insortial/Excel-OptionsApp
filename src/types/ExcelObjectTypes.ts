export type ExcelDropDowns = {
    builder: planBuilderObj[],
    project: planProjectObj[],
    jobInfo: jobInfoObj[],
    eoInfo: eoObj[]
}

export type planBuilderObj = {
    planBuilderID: number,
    builderName: string
}

export type projectObj = {
    projectID: number,
    projectName: string,
    AKA: string,
    Division: string,
    City: string,
    County: string,
    zipCode: number,
    customerIDFK: number,
    tractNumber: string,
    areaForeman: string,
    Detailer: string,
    projectType: string,
    inProduction: boolean
}

export type planProjectObj = {
    planProjectID: number, 
    projectName: string,
    customerIDFK: number
}

export type eoObj = {
    eoID: number,
    eoPhase: string,
    planProjectIDFK: number
}

export type jobInfoObj = {
    jobInfoID: number, 
    jobName: string, 
    jobNumber: string, 
    planNumber: string,
    date: Date
    
}

export type jobObj = {
    jobID: number,
    jobCode: string,
    jobName: string,
    Phase: string,
    projectIDFK: number
}

export type planObj = {
    uniqueID: number,
    jobID: number,
    projectName: string,
    planType: string,
    phase: string,
    lotNum: string
}

export type BidInfo = {
    builder: string,
    project: string,
    planNumber: string,
    eoPhase: string,
    roomBreakdown: RoomInfo[],
    pulls?: Hardware,
    knobs?: Hardware,
    cost?: number
}

export type RoomInfo = {
    roomID: number,
    roomNumber: number,
    roomName: string,
    wallCount: number,
    cabinets?: CabinetInfo[],
    cost?: number,
    visible: boolean,
    pulls?: Hardware,
    knobs?: Hardware,
}

export type CabinetInfo = {
    roomIDFK: number,
    cabinetNumber: number,
    cabinetID: number,
    width: number,
    height: number,
    depth: number,
    cabinetName: string,
    description: string,
    elevation: number,
    parts?: PartInfo[],
    cost?: number,
    visible: boolean
}

export type PartAndMaterialInfo = {
    cabinetIDFK: number,
    partID: number,
    quantity: number,
    partWidth: number,
    partLength: number,
    matName: string,
    description: string,
    matCost: number,
    matLength: number,
    matWidth: number,
    matThickness: number,
    matUnit: string
}

export type PartInfo = {
    cabinetIDFK: number,
    partID: number,
    quantity: number,
    partWidth: number,
    partLength: number,
    matName: string,
    description: string,
    cost: number,
    visible: boolean
}

export type SageMaterialInfo = {
    sageMaterialID: number,
    sageID: string,
    sageMaterialName: string,
    width: number,
    height: number,
    colors?: SageMaterialColors[]
}

export type SageMaterialColors = {
    sageColorID: number,
    sageMaterialIDFK?: number,
    colorDescription: string,
    comments: string,
    notes: string,
    backs?: SageMaterialBack[]
}

export type SageMaterialBack = {
    sageMaterialBackID: number,
    sageColorIDFK?: number,
    width: number,
    height: number,
    backType: string,
    trimUpper: number,
    trimRight: number,
    trimBottom: number,
    trimLeft: number
}

export type Hardware = {
    itemID: string,
    name: string,
    sageItemNo: string,
    price: number
}