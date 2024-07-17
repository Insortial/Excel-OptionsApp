export interface ErrorObject {
    [index: string]: string | ErrorObject
}

export interface PartOfLot {
    roomID: string, //ex. Throughout, Balance of the House, etc.
    material: string, //[string, number]
    handleType: string,
    color: string, //[string, number]
    doors: string,
    fingerpull: string,
    drawerFronts: string, //[string, number]
    knobs: string,
    drawerBoxes: string, //[string, number]
    drawerGuides: string, //[string, number]
    doorHinges: string, //[string, number]
    pulls: string, 
    details?: string,
    appliances?: string
}

export interface JobDetails {
    builder: string,
    project: string,
    foreman: string,
    phase: string,
    date: string,
    jobID: number,
    superintendent: string,
    phone: string,
    lotFooter: string,
    kitchen: string,
    master: string,
    bath2: string,
    bath3: string,
    bath4: string,
    powder: string,
    laundry: string,
    footerNotes: string
}

export interface LotTableInterface {
    boxStyle: string, //[string, number]
    interiors: string, //[string, number]
    upperHeight: string,
    lotOptionsValue: number,
    islands: string,
    crown: string,
    lightRail: string,
    baseShoe: string,
    recyclingBins: string,
    jobNotes: string,
    hasError: boolean,
    lot: string,
    plan: string,
    partsOfLot: PartOfLot[],
}

export interface JobDetailsSQL {
    jobID: number,
    doorBuyOut: boolean,
    drawerBoxBuyOut: boolean,
    hardwareComments: string,
    lots: LotTableSQL[]
}

export interface LotTableSQL {
    lot: string,
    boxStyle: number,
    interiors: number,
    lotOptionsValue: number,
    jobNotes: string,
    partsOfLot: PartOfLotSQL[]
}

export interface PartOfLotSQL {
    roomID: string,
    material: number, 
    glassDoors: string,
    glassShelves: string,
    cabinetQty: number,
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
    knobs: number, 
    drawerBoxes: number, 
    drawerGuides: number, 
    doorHinges: number, 
    pulls: string 
    knobs2: string,
    knobs2Qty: number,
    pulls2: string,
    pulls2Qty: number
}