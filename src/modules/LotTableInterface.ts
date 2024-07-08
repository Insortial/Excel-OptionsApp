export interface PartOfLot {
    roomID: string, //ex. Throughout, Balance of the House, etc.
    material?: string, //[string, number]
    stain?: string, //[string, number]
    doors?: string,
    fingerpull?: string,
    drawerFronts?: string, //[string, number]
    knob?: string,
    drawerBoxes?: string, //[string, number]
    drawerGuides?: string, //[string, number]
    doorHinges?: string, //[string, number]
    pulls?: string, 
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
}