export interface PartOfLot {
    roomID: string, //ex. Throughout, Balance of the House, etc.
    materialStain: [string, number],
    doors: string,
    fingerpull: string,
    drawerFronts?: [string, number],
    drawerBoxes?: [string, number],
    drawerGuides?: [string, number],
    doorHinges?: [string, number]
}

export interface LotTableInterface {
    builder: string,
    project: string,
    phase: string,
    superintendent?: string,
    phone?: string,
    foreman: string,
    jobID: number,
    boxStyle?: [string, number],
    interiors?: [string, number],
    upperHeight?: string,
    islands?: string,
    crown?: string,
    lightRail?: string,
    baseShoe?: string,
    recyclingBins?: string,
    jobNotes?: string,
    lot?: string,
    plan?: string,
    partsOfLot?: PartOfLot[],
}

export interface JobInterface {
    builder: string,
    project: string,
    phase: string,
    superintendent?: string,
    phone?: string,
    foreman: string,
    jobID: number,
}