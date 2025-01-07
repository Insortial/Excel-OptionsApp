import React, { useState, useEffect } from 'react'
import { FormOptionsInterface, FormOptionsContextType} from '../types/FormOptions';
import { ErrorObject } from '../types/LotTableInterface';
import { AuthInfo } from '../context/AuthContext';

export const FormOptionsContext = React.createContext<FormOptionsContextType | null>(null);

const FormOptionsProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [formOptions, setFormOptions] = useState<FormOptionsInterface>({
        builder: [],
        project: [], 
        foreman: [],
        jobID: [], 
        boxStyle: [],
        drawerBoxes: [], 
        interiors: [],
        drawerFronts: [],
        drawerGuides: [],
        doorHinges: [], 
        material: [], 
        color: [],
        doors: [], 
        pulls: [],
        knobs: []
    })
    
    const [errors, setErrors] = useState<ErrorObject>({})
    const [isCheckingError, setIsCheckingError] = useState<boolean>(false);
    const [loaded, setLoaded] = useState<boolean>(false);
    const { accessToken } = AuthInfo()
    
    useEffect(() => {
        updateDropDowns(accessToken)
    }, [])

    const updateDropDowns = async (accessToken:string)  => {
        const myHeaders = new Headers()
        myHeaders.append("Authorization", `Bearer ${accessToken}`)
        const config:RequestInit = {
            method: "GET",
            headers: myHeaders,
        }

        fetch(import.meta.env.VITE_BACKEND_URL + "/dropDownInfo", config)
            .then((response) => response.text())
            .then((result) => {
                console.log(JSON.parse(result))
                const formListObject = JSON.parse(result)
                const formList = formListObject.formList
                const formOptions:FormOptionsInterface = {
                    builder: formList.builder,
                    project: formList.project, 
                    foreman: formList.foreman,
                    jobID: formList.jobID, 
                    boxStyle: formList.boxStyle,
                    drawerBoxes: formList.drawerBoxes, 
                    interiors: formList.interiors,
                    drawerFronts: formList.drawerFronts,
                    drawerGuides: formList.drawerGuides,
                    doorHinges: formList.doorHinges, 
                    material: formList.material, 
                    knobs: formList.knobs,
                    color: formList.color,
                    doors: formList.doors, 
                    pulls: formList.pulls,
                }
                setFormOptions(formOptions)
                setLoaded(true)
            })
            .catch((error) => {
                console.error(error)
                setLoaded(false)
            });
    }

    const saveFormOptions = (formOptions: FormOptionsInterface) => {
        setFormOptions(formOptions)
    }

    const getFormIDs = (value:string, propertyName:string):number => {
        if(propertyName in formOptions) {
            const matchingTuple = formOptions[propertyName as keyof FormOptionsInterface]
                                 .find((tuple: string | [number, string] | [number, string, string | number]) => tuple[1] === (value === "" ? "N/A" : value))
            return (typeof matchingTuple === "string") ? 0 : matchingTuple?.[0] ?? 0
        }
        return 0
    }

    const filterColors = (materialName:string):string[] => {
        let filterWords:string[] = []
        switch(materialName) {
            case "Soft Maple":
                filterWords = ["Stain 1 Pass", "Stain 2 Pass", "Stain"]
                break;
            case "White Oak Rift":
                return ["Unfinished", "Clear", "Alto", "True Maple"]
            case "MDF":
                filterWords = ["Painted Finish"]
                break;
            case "Thermofoil 1-sided":
            case "Thermofoil 2-sided":
                filterWords = ["Thermofoil"]
                break;
            case "Acrylic":
                filterWords = ["Acrylic"]
                break;
            case "Melamine":
                filterWords = ["Melamine"]
                break
            case "Laminate":
                filterWords = ["Laminate"]
                break
            default:
        }

        
        return formOptions.color.filter((colorTuple:[number, string, string]) => filterWords.includes(colorTuple[2])).map((colorTuple:[number, string, string]) => colorTuple[1])
    }

    const filterProjects = (builderName:string):string[] => {
        const builderID = getFormIDs(builderName, "builder")
        return formOptions.project.filter((projectTuple:[number, string, number]) => projectTuple[2] === builderID).map((projectTuple:[number, string, number]) => projectTuple[1])
    }

    const retrieveDropDown = (propertyName: string) => {
        let listOfOptions:string[] = []

        if(propertyName in formOptions) {
            const optionArray = formOptions[propertyName as keyof FormOptionsInterface]
            if(optionArray && Array.isArray(optionArray[0])) {
                for (const tuple of optionArray) {
                   listOfOptions.push(tuple[1])
                }
            } else {
                listOfOptions = optionArray as string[] ?? []
            }
        } else if (["kitchen", "master", "bath2", "bath3", "bath4", "powder", "laundry"].includes(propertyName)) {
            listOfOptions = ['N/A', '5/8" Rough Top', 'Build Up', 'Pedestal']
            if(propertyName === "kitchen")
                listOfOptions.push('1” rough top = 1 – 3/8 plywood & 1 – 5/8 plywood')
        } else if (propertyName === "islands") {
            listOfOptions = ["Drywall Backs", "Finished Backs", "Wrapped Island Panels"]
        } else if (propertyName === "supports") {
            listOfOptions = ["No Supports", "Metal Brackets", "Brackets w/ Others", "Posts", "Corbels"]
        } else if (propertyName === "lightRail") {
            listOfOptions = ["None", "Behind Door"]
        } else if (propertyName === "crown") {
            listOfOptions = [`2" Shadow`, `3" Shadow`, "CR238", "CR375", "CR45", "CR45 w/ Build Up to Ceiling", "CR45 w/ build up to ceiling kitchen only", "CR238 STD Sub Crown Balance of House", `3.5" Shadow Crown on Back Burner`]
        } else if (propertyName === "baseShoe") {
            listOfOptions = ["None Supplied Only", "Island Only"]
        } else if (propertyName === "recyclingBins") {
            listOfOptions = ["None", "Standard", "Optional"]
        }

        return listOfOptions
    }

    return (
        <FormOptionsContext.Provider value={{ filterProjects, loaded, getFormIDs, errors, setErrors, isCheckingError, setIsCheckingError, formOptions, saveFormOptions, retrieveDropDown, filterColors, updateDropDowns }}>
            {children}
        </FormOptionsContext.Provider>
    )
}

export default FormOptionsProvider