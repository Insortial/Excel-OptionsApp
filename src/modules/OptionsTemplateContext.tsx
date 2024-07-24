import React, { useState, useEffect } from 'react'
import { FormOptionsInterface, FormOptionsContextType} from '../../../types/FormOptions';
import { ErrorObject } from '../../../types/LotTableInterface';

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
    })
    
    const [errors, setErrors] = useState<ErrorObject>({})
    const [isCheckingError, setIsCheckingError] = useState<boolean>(false);

    useEffect(() => {
        fetch(import.meta.env.VITE_BACKEND_URL + "/dropDownInfo")
                .then((response) => response.text())
                .then((result) => {
                    console.log(JSON.parse(result))
                    let formListObject = JSON.parse(result)
                    let formList = formListObject.formList
                    let formOptions:FormOptionsInterface = {
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
                        color: formList.color,
                        doors: formList.doors, 
                        pulls: formList.pulls,
                    }
                    setFormOptions(formOptions)
                })
                .catch((error) => console.error(error));
      }, [])

    const saveFormOptions = (formOptions: FormOptionsInterface) => {
        setFormOptions(formOptions)
    }

    const getFormIDs = (value:string, propertyName:string):number => {
        if(value !== "" && propertyName in formOptions) {
            let matchingTuple = formOptions[propertyName as keyof FormOptionsInterface]
                                 .find((tuple: string | [number, string]) => tuple[1] == value)
            return (typeof matchingTuple == "string") ? 1 : matchingTuple?.[0] ?? 1
        }
        return 1
    }

    const retrieveDropDown = (propertyName: string) => {
        let listOfOptions:string[] = []

        if(propertyName in formOptions) {
            let optionArray = formOptions[propertyName as keyof FormOptionsInterface]
            if(optionArray && Array.isArray(optionArray[0])) {
                for (let tuple of optionArray) {
                   listOfOptions.push(tuple[1])
                }
            } else {
                listOfOptions = optionArray as string[] ?? []
            }
        } else if (["kitchen", "master", "bath2", "bath3", "bath4", "powder", "laundry"].includes(propertyName)) {
            listOfOptions = ['N/A', '5/8" Rough Top', 'Build Up', 'Pedestal']
        }
        return listOfOptions
    }

    return (
        <FormOptionsContext.Provider value={{ getFormIDs, errors, setErrors, isCheckingError, setIsCheckingError, formOptions, saveFormOptions, retrieveDropDown }}>
            {children}
        </FormOptionsContext.Provider>
    )
}

export default FormOptionsProvider