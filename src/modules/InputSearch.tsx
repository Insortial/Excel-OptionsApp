import { useState, useEffect, useCallback, useContext, useRef } from "react"
import React from 'react'
import { LotTableInterface, PartOfLot, JobDetails, ErrorObject } from "../types/LotTableInterface";
import { FormOptionsContext } from "../context/OptionsTemplateContext";
import { FormOptionsContextType } from "../types/FormOptions"
import { useClickOutside } from "../hooks/useClickOutside";

type inputOptions = {
    isDropDown: boolean;
    formState: LotTableInterface | JobDetails | string[];
    postfix?: string,
    optionSectionNum?: number;
    onFormChange?: (value: string, key: string, optSectionNum?: number) => void;
    inputName: string;
    filterValue?: string | number
}

const InputSearch: React.FC<inputOptions> = ({postfix, isDropDown, formState, onFormChange, inputName, optionSectionNum, filterValue}) => {
    const [suggestion, setSuggestion] = useState<string[]>([]);
    const [dropDownOptions, setDropDownOptions] = useState<string[]>([]);
    const [inFocus, setInFocus] = useState<boolean | boolean>(false);
    const [focusedIndex, setFocusedIndex] = useState(0);
    const [value, setValue] = useState<string>("");
    const [hasError, setError] = useState(false)
    const { loaded, errors, retrieveDropDown, isCheckingError, filterColors, filterProjects } = useContext(FormOptionsContext) as FormOptionsContextType
    const inputRef = useRef<HTMLInputElement>(null)
    const dropDownRef = useRef<HTMLDivElement>(null)

    const handleClickOutside = () => {
        if(isDropDown)
            setValue("")
        setInFocus(false)
    }

    useClickOutside(inputRef, dropDownRef, handleClickOutside)

    const getPartOfLotValue = () => {
        if((optionSectionNum !== undefined) && ("partsOfLot" in formState)) {
            //Represents a PartOfLot Value
            return formState.partsOfLot[optionSectionNum][inputName as keyof (LotTableInterface | JobDetails | PartOfLot)] ?? ""
        } else if ((optionSectionNum !== undefined) && Array.isArray(formState)) {
            return formState[optionSectionNum] ?? ""
        } else {
            //Represents all other interfaces values
            return formState[inputName as keyof (LotTableInterface | JobDetails | PartOfLot)] ?? ""
        }
    }

    const updateDropDowns = async () => {
        const retrievedOptions = retrieveDropDown(inputName)
        setDropDownOptions(retrievedOptions)
        setSuggestion(retrievedOptions.slice(0, 50))
    }

    useEffect(() => {
        updateDropDowns()
    }, [loaded])

    useEffect(() => {
        setError(errors[(`${inputName}${(typeof optionSectionNum === 'undefined' || optionSectionNum === 0) ? "" : optionSectionNum}`) as keyof ErrorObject] != null)
    }, [isCheckingError, errors])

    const resetSearchComplete = useCallback(() => {
        setFocusedIndex(0);
        setInFocus(false);
    }, []);

    const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
        const { key } = e;
        let nextIndexCount = 0;
    
        if (key === "ArrowDown")
            nextIndexCount = (focusedIndex + 1) % suggestion.length;
    
        if (key === "ArrowUp")
            nextIndexCount = (focusedIndex + suggestion.length - 1) % suggestion.length;

        if (key === "Escape") {
            resetSearchComplete();
        }

        if (key === "Tab") {
            setInFocus(false);
        }
    
        if (key === "Enter") {
          e.preventDefault();
          handleOptionClick(focusedIndex);
        }
    
        setFocusedIndex(nextIndexCount);
      };

    function handleOnFocus():void {
        if(suggestion.length === 0)
            updateDropDowns()

        if((inputName === "color") && ("partsOfLot" in formState && optionSectionNum !== undefined)) {
            const materialSelection = formState.partsOfLot[optionSectionNum].material
            const filteredColors = filterColors(materialSelection)
            console.log(filteredColors)
            setDropDownOptions(filteredColors)
            setSuggestion(filteredColors)
        } else if (Array.isArray(formState) && typeof filterValue === "string" && inputName === "project") {
            const filteredProjects = filterProjects(filterValue)
            console.log(filteredProjects)
            setDropDownOptions(filteredProjects)
            setSuggestion(filteredProjects)
        } else {
            setSuggestion(dropDownOptions.slice(0, 50));
            
        }
        setInFocus(true)
    }

    function handleOptionClick(selectedIndex: number):void {
        const selectedItem = suggestion[selectedIndex];
        if (!selectedItem) return resetSearchComplete();
        resetSearchComplete();
        onFormChange?.(selectedItem, inputName, optionSectionNum)

        if(isDropDown)
            setValue("")
    }
    
    function readInput(input: React.ChangeEvent<HTMLInputElement>): void {
        setValue(input.target.value)

        if(!isDropDown)
            onFormChange?.(input.target.value, inputName, optionSectionNum)

        if(suggestion != undefined) {
            const prefix = input.target.value.toLowerCase()
            const stringArray:string[] = dropDownOptions
            setSuggestion(stringArray?.filter((x: string) => x.toLowerCase().includes(prefix)).slice(0, 50));
        }
    }

    return (
        <div className="optionSearchContainer" tabIndex={1} onKeyDown={handleKeyDown}>
            <input 
                    type={inputName === "date" ? "date" : "text"} 
                    className="optionSearch" 
                    style={{border: hasError && isCheckingError ? "1px solid red" : "black"}}
                    value={!isDropDown ? getPartOfLotValue() : value}
                    placeholder={postfix ? getPartOfLotValue() + " - " + postfix :  getPartOfLotValue()} 
                    ref={inputRef}
                    id={inputName + `${(typeof optionSectionNum === 'undefined' || optionSectionNum === 0) ? "" : optionSectionNum}`}
                    onChange={readInput}
                    onFocus={handleOnFocus}
                    readOnly={inputName === "roomID" && getPartOfLotValue() === "Throughout" || getPartOfLotValue() === "Balance of House"}
                />
            <div className="optionResults" ref={dropDownRef} style={{display: inFocus ? "block" : "none", border: suggestion.length === 0 ? "none" : "1px solid black"}}>
                {suggestion.map((x: string, index: number) => {
                    return <div key={index} onMouseDown={() => handleOptionClick(index)}
                    style={{
                        backgroundColor:
                        index === focusedIndex ? "#f2eeed" : "",
                    }}
                    >{x}</div>
                })}
            </div>
        </div>
    )
}

export default InputSearch;
