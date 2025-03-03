import { ErrorObject } from "./LotTableInterface";

export interface FormOptionsInterface {
    builder: [number, string][],
    project: [number, string, number][], 
    foreman: string[],
    jobID: [number, string][], 
    boxStyle: [number, string][], 
    drawerBoxes: [number, string][], 
    interiors: [number, string][],
    drawerFronts: [number, string][],
    drawerGuides: [number, string][],
    doorHinges: [number, string][], 
    material: [number, string][], 
    color: [number, string, string][],
    knobs: string[],
    doors: string[], 
    pulls: string[],
}

export type FormOptionsContextType = {
    isCheckingError: boolean;
    loaded: boolean;
    formOptions: FormOptionsInterface;
    setIsCheckingError: (bool: boolean) => void;
    saveFormOptions: (formOptions: FormOptionsInterface) => void;
    retrieveDropDown: (propertyName: string) => string[];
    errors: ErrorObject;
    setErrors: (errors: ErrorObject) => void;
    getFormIDs: (value:string, propertyName:string) => number;
    filterColors: (materialName:string) => string[];
    filterProjects: (builderName:string) => string[];
    updateDropDowns: (accessToken:string) => void;
    retrieveCharMax: (propName:string) => null|number;
}

export type AdminDashboardInfoContextType = {
    accessToken: string,
    loggedIn: boolean
}

export type AdminDashboardUpdateContextType = {
    saveAccessToken: (token: string) => void;
}

export type LoggedInUpdateContextType = {
    saveLogInState: (loggedIn: boolean) => void;
}