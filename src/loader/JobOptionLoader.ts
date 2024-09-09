import { LotTableInterface, PartOfLot } from "../../../types/LotTableInterface";

export const jobOptionLoader = async (jobOptionID:string|undefined, accessToken:string) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${accessToken}`)

    const config:RequestInit = {
        headers: myHeaders,
        credentials: "include"
    }

    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/getJobOption/${jobOptionID}`, config);
    const jobDocumentDetails = await response.json();

    jobDocumentDetails.listOfLots.map((lot:LotTableInterface) => {
        const throughoutLotIdx = lot.partsOfLot.findIndex((partOfLot:PartOfLot) => partOfLot.roomID === "Throughout" || partOfLot.roomID === "Balance of House")
        const throughoutLot = lot.partsOfLot.splice(throughoutLotIdx, 1)
        lot.partsOfLot.unshift(throughoutLot[0])
    })

    return {
        state: jobDocumentDetails
    };
}

export type JobOptionLoaderResponse = Awaited<ReturnType<typeof jobOptionLoader>>;