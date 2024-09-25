import { JobDetailsSQL, LotTableInterface, PartOfLot } from "../../../types/LotTableInterface";

export const jobOptionLoader = async (jobDetails:JobDetailsSQL, listOfLots:LotTableInterface[]) => {
    listOfLots.map((lot:LotTableInterface) => {
        const throughoutLotIdx = lot.partsOfLot.findIndex((partOfLot:PartOfLot) => partOfLot.roomID === "Throughout" || partOfLot.roomID === "Balance of House")
        const throughoutLot = lot.partsOfLot.splice(throughoutLotIdx, 1)
        lot.partsOfLot.unshift(throughoutLot[0])
    })

    return {
        state: {
            jobDetails: jobDetails,
            listOfLots: listOfLots
        }
    };
}

export type JobOptionLoaderResponse = Awaited<ReturnType<typeof jobOptionLoader>>;