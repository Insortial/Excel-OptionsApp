export interface PartOfLot {
    roomID: string, //ex. Throughout, Balance of the House, etc.
    material?: string, //[string, number]
    isPull?: boolean,
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

export interface LotTableInterface {
    builder: string,
    project: string,
    phase: string,
    superintendent?: string,
    phone?: string,
    foreman: string,
    jobID: number,
    boxStyle?: string, //[string, number]
    interiors?: string, //[string, number]
    upperHeight?: string,
    islands?: string,
    crown?: string,
    lightRail?: string,
    baseShoe?: string,
    recyclingBins?: string,
    jobNotes?: string,
    lotFooter?: string,
    lot?: string,
    plan?: string,
    kitchen?: string,
    master?: string,
    bath2?: string,
    bath3?: string,
    bath4?: string,
    powder?: string,
    laundry?: string,
    footerNotes?: string,
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
}