import React, { useContext, useState, useEffect } from 'react'
import { FormOptionsInterface, FormOptionsContextType} from '../types/FormOptions';

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
        stain: [],
        doors: [], 
        pulls: [],
    })
    const [isCheckingError, setIsCheckingError] = useState<boolean>(false);

    useEffect(() => {
        fetch("http://localhost:3000/dropDownInfo")
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
                        stain: formList.stain,
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
        <FormOptionsContext.Provider value={{ isCheckingError, setIsCheckingError, formOptions, saveFormOptions, retrieveDropDown }}>
            {children}
        </FormOptionsContext.Provider>
    )
}

export default FormOptionsProvider