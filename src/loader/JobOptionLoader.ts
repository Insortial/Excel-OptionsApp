import {LotTableInterface, PartOfLot } from "../../../types/LotTableInterface";

export const jobOptionLoader = async (optionID:string|undefined, fetchHook:(url: string, requestType: string, body?: BodyInit) => Promise<Response>) => {
    if(optionID == null)
        optionID = ""

    const response = await fetchHook(`/getJobOption/${optionID}`, "GET")
    if (!response.ok) {
        throw new Error(response.statusText);
    }

    console.log(response)

    const data = await response.json()

    data.listOfLots.map((lot:LotTableInterface) => {
        const throughoutLotIdx = lot.partsOfLot.findIndex((partOfLot:PartOfLot) => partOfLot.roomID === "Throughout" || partOfLot.roomID === "Balance of House")
        const throughoutLot = lot.partsOfLot.splice(throughoutLotIdx, 1)
        lot.partsOfLot.unshift(throughoutLot[0])
    })

    return {state: {
            jobDetails: data.jobDetails,
            listOfLots: data.listOfLots
        }}
    
}

export type JobOptionLoaderResponse = Awaited<ReturnType<typeof jobOptionLoader>>;