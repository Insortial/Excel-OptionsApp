import { useState, useEffect, useCallback, useContext } from "react"
import React from 'react'
import { LotTableInterface, PartOfLot, JobDetails, ErrorObject } from "../../../types/LotTableInterface";
import { FormOptionsContext } from "./OptionsTemplateContext";
import { FormOptionsContextType } from "../../../types/FormOptions"

type inputOptions = {
    isDropDown: boolean;
    formState: LotTableInterface | JobDetails;
    optionSectionNum?: number;
    onFormChange?: (value: string, key: string, optSectionNum?: number) => void;
    inputName: string;
}

const InputSearch: React.FC<inputOptions> = ({isDropDown, formState, onFormChange, inputName, optionSectionNum}) => {
    const [suggestion, setSuggestion] = useState<string[]>([]);
    const [inFocus, setInFocus] = useState<boolean | boolean>(false);
    const [focusedIndex, setFocusedIndex] = useState(0);
    const [value, setValue] = useState<string>("");
    const [hasError, setError] = useState(false)
    const { errors, retrieveDropDown, isCheckingError } = useContext(FormOptionsContext) as FormOptionsContextType
    const suggestedChoices = retrieveDropDown(inputName)

    const getPartOfLotValue = () => {
        if((optionSectionNum !== undefined) && ("partsOfLot" in formState)) {
            //Represents a PartOfLot Value
            return formState.partsOfLot[optionSectionNum][inputName as keyof (LotTableInterface | JobDetails | PartOfLot)] ?? ""
        } else {
            //Represents all other interfaces values
            return formState[inputName as keyof (LotTableInterface | JobDetails | PartOfLot)] ?? ""
        }
    }

    useEffect(() => {
        setSuggestion(suggestedChoices.slice(0, 50));
    }, [])

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
    
        if (key === "Enter") {
          e.preventDefault();
          handleOptionClick(focusedIndex);
        }
    
        setFocusedIndex(nextIndexCount);
      };

    function handleOnFocus():void {
        setSuggestion(suggestedChoices.slice(0, 50));
        setInFocus(true)
    }

    function handleOnBlur():void {
        if(isDropDown)
            setValue("")
        setInFocus(false)
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
        //onFormChange?.(input.target.value, inputName, optionSectionNum)
        setValue(input.target.value)

        if(!isDropDown)
            onFormChange?.(input.target.value, inputName, optionSectionNum)

        if(suggestion != undefined) {
            let prefix = input.target.value.toLowerCase()
            let stringArray:string[] = suggestedChoices
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
                    placeholder={getPartOfLotValue()} 
                    id={inputName + `${(typeof optionSectionNum === 'undefined' || optionSectionNum === 0) ? "" : optionSectionNum}`}
                    onChange={readInput}
                    onFocus={handleOnFocus}
                    onBlur={handleOnBlur}
                />
            <div className="optionResults" style={{display: inFocus ? "block" : "none", border: suggestion.length === 0 ? "none" : "1px solid black"}}>
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