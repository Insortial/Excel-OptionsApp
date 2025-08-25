import { UseFormGetValues, UseFormRegister, UseFormReset, UseFormSetValue } from 'react-hook-form';
import { JobDetails, JobDocumentInterface, LotTableInterface, PackageDetails, PackageInfo } from './LotTableInterface.ts'


export interface OptionsCreatorObject {
    isOptionsMode: boolean, 
    isLotCopy: boolean,
    currentLot: LotTableInterface | undefined,
    listOfLots: LotTableInterface[], 
    jobDetails: JobDetails, 
    packageDetails: PackageDetails, 
    hasPackage: boolean, 
    lotsUpdated: {[key: string]: boolean},
    registerJobValues: UseFormRegister<JobDetails>,
    getPackageProjects: UseFormGetValues<{projects: string[]}>,
    addLotTable: () => void, 
    saveLotTable: (lotTableDetails: LotTableInterface, lotNumber: string) => void;
    handlePackageDetailsChange: (value:string, propName:string) => void,  
    setJobValue: UseFormSetValue<JobDetails>,
    resetPackageProjects: UseFormReset<{projects: string[]}>
    saveLotTablesSQL: (prodReady:boolean, updatedLots: {[key:string]: boolean}) => void,
    onProjectsChange: (key: "projects" | `projects.${number}`, value: string) => void,
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