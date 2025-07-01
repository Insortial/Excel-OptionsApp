import { UseFormSetValue } from 'react-hook-form';
import { JobDetails, JobDocumentInterface, LotTableInterface, PackageDetails, PackageInfo } from './LotTableInterface.ts'


export interface OptionsCreatorObject {
    isOptionsMode: boolean, 
    currentLot: LotTableInterface | undefined,
    listOfLots: LotTableInterface[], 
    jobDetails: JobDetails, 
    packageDetails: PackageDetails, 
    hasPackage: boolean, 
    packageProjects: string[],
    addLotTable: () => void, 
    saveLotTable: (lotTableDetails: LotTableInterface, lotNumber: string) => void;
    handlePackageDetailsChange: (value:string, propName:string) => void,  
    setJobValue: UseFormSetValue<JobDetails>,
    setPackageProjects: React.Dispatch<React.SetStateAction<string[]>>, 
    saveLotTablesSQL: (prodReady:boolean) => void,
    onProjectsChange?: (value: string, key: string, optSectionNum?:number) => void,
    addOptionRow: (lotName:string) => void
}

export interface PackageObject {
    packageDetails: PackageInfo |null, 
    refreshPackages: () => void
}

export interface JobMenuObject {
    jobDocument: JobDocumentInterface | null,
    refreshJobMenu: () => void,
    setDeleteMode: React.Dispatch<React.SetStateAction<boolean>>
}

export interface FormOptionsObject {
    submitDeleteRow: () => void
}