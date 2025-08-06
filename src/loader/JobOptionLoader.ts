import {LotTableInterface, PartOfLot } from "@excelcabinets/excel-types/LotTableInterface";

const getPackageDetails = async (jobID:number, fetchHook:(url: string, requestType: string, body?: BodyInit) => Promise<Response>) => {
    const response = await fetchHook(`/getPackageForJobID/${jobID}`, "GET")
    if (!response.ok) {
      return null
    }

    const packages = await response.json()
    return packages
}

export const jobOptionLoader = async (optionID:string|undefined, fetchHook:(url: string, requestType: string, body?: BodyInit) => Promise<Response>) => {
    if(optionID == null)
        optionID = ""

    const response = await fetchHook(`/getJobOption/${optionID}`, "GET")
    if (!response.ok) {
        return null
    }
    console.log(response)

    const data = await response.json()
    const packageInfo = await getPackageDetails(data.jobDetails.jobID, fetchHook)

    data.listOfLots.map((lot:LotTableInterface) => {
        const throughoutLotIdx = lot.partsOfLot.findIndex((partOfLot:PartOfLot) => partOfLot.roomID === "Throughout" || partOfLot.roomID === "Balance of House")
        const throughoutLot = lot.partsOfLot.splice(throughoutLotIdx, 1)
        lot.partsOfLot.unshift(throughoutLot[0])
    })

    return {state: {
            jobDetails: data.jobDetails,
            listOfLots: data.listOfLots,
            packageDetails: packageInfo,
            hasPackage: packageInfo !== null
        }}
    
}

export type JobOptionLoaderResponse = Awaited<ReturnType<typeof jobOptionLoader>>;