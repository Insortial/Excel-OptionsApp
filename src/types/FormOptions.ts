import { ErrorObject } from "./LotTableInterface";

export interface FormOptionsInterface {
    builder: string[],
    project: string[], 
    foreman: string[],
    jobID: [number, string][], 
    boxStyle: [number, string][], 
    drawerBoxes: [number, string][], 
    interiors: [number, string][],
    drawerFronts: [number, string][],
    drawerGuides: [number, string][],
    doorHinges: [number, string][], 
    material: [number, string][], 
    color: [number, string][],
    doors: string[], 
    pulls: string[],
}

export type FormOptionsContextType = {
    isCheckingError: boolean;
    formOptions: FormOptionsInterface;
    setIsCheckingError: (bool: boolean) => void;
    saveFormOptions: (formOptions: FormOptionsInterface) => void;
    retrieveDropDown: (propertyName: string) => string[];
    errors: ErrorObject;
    setErrors: (errors: ErrorObject) => void;
    getFormIDs: (value:string, propertyName:string) => number;
}