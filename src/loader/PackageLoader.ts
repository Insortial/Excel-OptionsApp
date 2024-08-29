import { LotTableInterface, PartOfLot } from "../../../types/LotTableInterface";

export const packageLoader = async (packageID:string|undefined, accessToken:string) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${accessToken}`)

    const config:RequestInit = {
        headers: myHeaders,
        credentials: "include"
    }

    console.log(accessToken)
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/getPackage/${packageID}`, config);
    const packages = await response.json();

    packages.listOfLots.map((lot:LotTableInterface) => {
        const throughoutLotIdx = lot.partsOfLot.findIndex((partOfLot:PartOfLot) => partOfLot.roomID === "Throughout")
        const throughoutLot = lot.partsOfLot.splice(throughoutLotIdx, 1)
        lot.partsOfLot.unshift(throughoutLot[0])
    })

    return {
        state: packages
    };
}

export type PackageLoaderResponse = Awaited<ReturnType<typeof packageLoader>>;