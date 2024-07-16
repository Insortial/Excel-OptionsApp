export interface PartOfLot {
    roomID: string, //ex. Throughout, Balance of the House, etc.
    material?: string, //[string, number]
    handleType?: string,
    stain?: string, //[string, number]
    doors?: string,
    fingerpull?: string,
    drawerFronts?: string, //[string, number]
    knobs?: string,
    drawerBoxes?: string, //[string, number]
    drawerGuides?: string, //[string, number]
    doorHinges?: string, //[string, number]
    pulls?: string, 
    details?: string,
    appliances?: string
}

export interface ProductionSchedule {
    builder: string,
    project: string,
    foreman: string,
    phase: string,
    date: string,
    jobID: number,
    superintendent?: string,
    phone?: string,
    lotFooter?: string,
    kitchen?: string,
    master?: string,
    bath2?: string,
    bath3?: string,
    bath4?: string,
    powder?: string,
    laundry?: string,
    footerNotes?: string
}

export interface LotTableInterface {
    boxStyle?: string, //[string, number]
    interiors?: string, //[string, number]
    upperHeight?: string,
    lotOptionsValue?: number,
    islands?: string,
    crown?: string,
    lightRail?: string,
    baseShoe?: string,
    recyclingBins?: string,
    jobNotes?: string,
    lotFooter?: string,
    lot?: string,
    plan?: string,
    partsOfLot: PartOfLot[],
}

export interface JobInterface {
    builder: string,
    project: string,
    phase: string,
    superintendent?: string,
    phone?: string,
    foreman: string,
    jobID: string,
    date: string
}