export interface ErrorObject {
    [index: string]: string 
}

export interface PartOfLot {
    roomID: string, //ex. Throughout, Balance of the House, etc.
    material: string, 
    handleType: string,
    numOfPulls: number,
    numOfKnobs: number,
    color: string, 
    doors: string,
    fingerpull: string,
    drawerFronts: string, 
    knobs: string,
    knobs2: string,
    glassDoors: boolean,
    glassShelves: boolean,
    drawerBoxes: string, 
    drawerGuides: string, 
    doorHinges: string, 
    pulls: string, 
    pulls2: string,
    details: string,
    appliances: string, //remove in the future
}

export interface JobDetails {
    builder: string,
    project: string | string[],
    optionCoordinator: string,
    foreman: string,
    jobNotes: string,
    phase: string,
    date: string,
    jobID: string,
    superintendent: string,
    phone: string,
    lotNums: LotInfo[],
    prodReady: boolean
}

export interface LotInfo {
    lotNum: string,
    plan: string
}

export interface LotTableInterface {
    jobID: number,
    boxStyle: string, 
    packageName: string,
    interiors: string, 
    upperHeight: string,
    lotOptionsValue: string,
    hasThroughoutLot: boolean,
    islands: string,
    supports: string,
    crown: string,
    lightRail: string,
    baseShoe: string,
    recyclingBins: string,
    hasError: boolean,
    lot: string,
    plan: string,
    kitchen: string,
    master: string,
    bath2: string,
    bath3: string,
    bath4: string,
    powder: string,
    laundry: string,
    appliances: string,
    footerNotes: string,
    lotNotes: string,
    partsOfLot: PartOfLot[],
}

export interface FilterObject {
    jobID: string;
    builder: string;
    project: string;
}

export interface JobDetailsSQL {
    jobID: number,
    doorBuyOut: boolean,
    drawerBoxBuyOut: boolean,
    optionCoordinator: string,
    jobNotes: string,
    superintendent: string,
    prodReady: boolean,
    phone: string,
    lots: LotTableSQL[],
    date: string,
}

export type PackageInfo = {
    packageID: number,
    packageName: string,
    projectName: string[]
}

export interface PackageDetails {
    builder: string,
    packages: string[],
    projects: string[],
    plans: LotTableInterface[],
    packageName: string,
    planName: string,
}

export interface PackageDetailsSQL {
    builder: number,
    projects: number[], 
    packageName: string,
    plans: LotTableSQL[]
}

export interface LotTableSQL {
    lot: string,
    boxStyle: number,
    interiors: number,
    lotOptionsValue: number,
    plan: string,
    upperHeight: string,
    islands: string,
    supports: string,
    hasThroughoutLot: boolean,
    crown: string,
    lightRail: string,
    baseShoe: string,
    recyclingBins: string,
    kitchen: string,
    masterBath: string,
    bath2: string,
    bath3: string,
    bath4: string,
    powder: string,
    laundry: string,
    lotNotes: string,
    footerNotes: string,
    appliances: string,
    partsOfLot: PartOfLotSQL[]
}

export interface PartOfLotSQL {
    roomID: string,
    material: number, 
    glassDoors: string,
    glassShelves: string,
    cabinetQty: number,
    handleType: string,
    doorQty: number,
    hingeQty: number,
    knobQty: number,
    drawerBoxQty: number,
    drawerGuideQty: number,
    pullQty: number,
    color: number, 
    doors: string,
    fingerpull: string,
    drawerFronts: number, 
    knobs: string, 
    drawerBoxes: number, 
    drawerGuides: number, 
    doorHinges: number, 
    pulls: string 
    knobs2: string,
    knobs2Qty: number,
    pulls2: string,
    pulls2Qty: number,
    details: string,
}

export interface JobDocumentInterface {
    customerName: string,
    jobOptionID: number,
    jobID: number,
    prodReady: boolean,
    optionCoordinator: string,
    phase: string,
    projectName: string
}