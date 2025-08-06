import { useState, useEffect, useCallback, useContext, useRef } from "react"
import React from 'react'
import { ErrorObject } from "@excelcabinets/excel-types/LotTableInterface";
import { FormOptionsContext } from "../context/OptionsTemplateContext";
import { FormOptionsContextType } from "@excelcabinets/excel-types/FormOptions"
import { useClickOutside } from "../hooks/useClickOutside";
import { FieldValues, Path, UseFormGetValues } from "react-hook-form";

type inputOptions<T extends FieldValues> = {
    isDropDown: boolean;
    onFormChange?: ((key: string, value: string) => void);
    inputName: Path<T>;
    filterValue?: string | number;
    locked?: boolean;
    optionSectionNum?: number;
    getFormValues: UseFormGetValues<T>;
}

const InputSearch = <T extends FieldValues>({isDropDown, onFormChange, inputName, filterValue, locked, optionSectionNum, getFormValues}: inputOptions<T>) => {
    const [suggestion, setSuggestion] = useState<string[]>([])
    const [dropDownOptions, setDropDownOptions] = useState<string[]>([])
    const [inFocus, setInFocus] = useState<boolean | boolean>(false)
    const [isTextLimit, setIsTextLimit] = useState<boolean>(false)
    const [focusedIndex, setFocusedIndex] = useState(0)
    const [value, setValue] = useState<string>("")
    const [hasError, setError] = useState(false)
    const { loaded, errors, retrieveDropDown, isCheckingError, filterColors, filterProjects, retrieveCharMax } = useContext(FormOptionsContext) as FormOptionsContextType
    const inputRef = useRef<HTMLInputElement>(null)
    const dropDownRef = useRef<HTMLDivElement>(null)

    const keyParts = inputName.split(".")
    /* const optionSectionNum = keyParts.length > 3 ? parseInt(keyParts[3]) : undefined */
    const inputType = keyParts.pop() || ""
    const charMax = retrieveCharMax(inputType ?? "")

    const handleClickOutside = () => {
        if(isDropDown)
            setValue("")
        setInFocus(false)
    }

    useClickOutside(inputRef, dropDownRef, handleClickOutside)

    const updateDropDowns = async () => {
        let updatedInput = inputType || ""
        if(updatedInput.includes("pulls") || updatedInput.includes("knobs"))
            updatedInput = updatedInput.replace(/\d+$/, "")
        const retrievedOptions = retrieveDropDown(updatedInput ?? "")
        setDropDownOptions(retrievedOptions)
        setSuggestion(retrievedOptions.slice(0, 50))
    }

    useEffect(() => {
        updateDropDowns()
    }, [loaded])

    useEffect(() => {
        setError(errors[(`${inputType}${(typeof optionSectionNum === 'undefined' || optionSectionNum === 0) ? "" : optionSectionNum}`) as keyof ErrorObject] != null)
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
        const currentLot = `lots.${keyParts[1] ?? 0}` as Path<T>
        if(locked)
            return

        if(suggestion.length === 0)
            updateDropDowns()
        
        if((inputType === "color") && ("partsOfLot" in getFormValues(currentLot))) {
            const materialSelection = getFormValues(`${currentLot}.partsOfLot` as Path<T>)[optionSectionNum ?? 0].material
            const filteredColors = filterColors(materialSelection)
            setDropDownOptions(filteredColors)
            setSuggestion(filteredColors)
        } else if (Array.isArray(getFormValues("projects" as Path<T>)) && typeof filterValue === "string") {
            const filteredProjects = filterProjects(filterValue)
            setDropDownOptions(filteredProjects)
            setSuggestion(filteredProjects)
        } else {
            setSuggestion(dropDownOptions.slice(0, 50))
        }
        setInFocus(true)
    }

    function handleOptionClick(selectedIndex: number):void {
        const selectedItem = suggestion[selectedIndex];
        if (!selectedItem) return resetSearchComplete();
        resetSearchComplete();

        onFormChange?.(inputName, selectedItem)

        if(isDropDown)
            setValue("")
    }
    
    function readInput(input: React.ChangeEvent<HTMLInputElement>): void {
        setValue(input.target.value)

        if(charMax && input.target.value.length === charMax) {
            setIsTextLimit(true)
            setTimeout(() => {
                setIsTextLimit(false)
            }, 2000)
        }

        if(!isDropDown)
            onFormChange?.(inputName, input.target.value)

        if(suggestion != undefined) {
            const prefix = input.target.value.toLowerCase()
            const stringArray:string[] = dropDownOptions
            setSuggestion(stringArray.filter((x: string) => x?.toLowerCase().includes(prefix)).slice(0, 50));
        }
    }

    return (
        <div className="optionSearchContainer" tabIndex={1} onKeyDown={handleKeyDown}>
            <input 
                type={inputType === "date" ? "date" : "text"} 
                className="optionSearch" 
                style={{border: (hasError && isCheckingError) || isTextLimit ? "1px solid red" : inFocus ? "1px solid #ffb74a" :"black"}}
                {...(charMax ? {maxLength: charMax ?? 0} : {})}
                value={!isDropDown && !locked ? getFormValues(inputName) ?? "" : value}
                placeholder={getFormValues(inputName)} 
                ref={inputRef}
                id={inputType + `${(typeof optionSectionNum === 'undefined' || optionSectionNum === 0) ? "" : optionSectionNum}`}
                onChange={readInput}
                onFocus={handleOnFocus}
                readOnly={inputType === "roomID" && getFormValues(inputName) === "Throughout" || getFormValues(inputName) === "Balance of House" || locked}
            />
            <div className="optionResults" ref={dropDownRef} style={{display: inFocus ? "block" : "none", border: suggestion.length === 0 ? "none" : "1px solid black"}}>
                {suggestion.map((x: string, index: number) => {
                    return <div key={index} onMouseDown={() => handleOptionClick(index)}
                    style={{
                        backgroundColor:
                        index === focusedIndex ? "#c4c4c4" : "",
                    }}
                    >{x}</div>
                })}
            </div>
        </div>
    )
}

export default InputSearch;
