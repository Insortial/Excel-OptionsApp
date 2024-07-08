import { useState, useEffect, useRef, useCallback } from "react"
import React from 'react'
import { JobInterface, LotTableInterface, PartOfLot } from "./LotTableInterface";

type inputOptions = {
    listOptions: string[];
    formState: LotTableInterface | JobInterface;
    optionSectionNum?: number;
    onFormChange?: (value: string, key: string, optSectionNum?: number) => void;
    inputName: string;
}

const InputSearch: React.FC<inputOptions> = ({listOptions, formState, onFormChange, inputName, optionSectionNum}) => {
    const [suggestion, setSuggestion] = useState<string[] | string[]>([]);
    const [inFocus, setInFocus] = useState<boolean | boolean>(false);
    const [focusedIndex, setFocusedIndex] = useState(-1);

    useEffect(() => {
        setSuggestion(listOptions);
    }, [])

    const checkTypeOfForm = () => {
        let accessedObject:LotTableInterface | PartOfLot | JobInterface = formState;

        if(optionSectionNum !== undefined && "partsOfLot" in formState) {
            accessedObject = formState.partsOfLot[optionSectionNum]
        }

        return (accessedObject[inputName as keyof (LotTableInterface | JobInterface | PartOfLot)] as string) ?? ""
    }

    const resetSearchComplete = useCallback(() => {
        setFocusedIndex(-1);
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
        setInFocus(true)
    }

    function handleOnBlur():void {
        setInFocus(false)
    }

    function handleOptionClick(selectedIndex: number):void {
        const selectedItem = suggestion[selectedIndex];
        if (!selectedItem) return resetSearchComplete();
        resetSearchComplete();
        onFormChange?.(selectedItem, inputName, optionSectionNum)
    }
    
    function readInput(input: React.ChangeEvent<HTMLInputElement>): void {
        onFormChange?.(input.target.value, inputName, optionSectionNum)
        if(suggestion != undefined) {
            setSuggestion(listOptions?.filter((x: string) => x.toLowerCase().includes(input.target.value.toLowerCase())));
        }
    }

    return (
        <div className="optionSearchContainer" tabIndex={1} onKeyDown={handleKeyDown}>
            {(optionSectionNum !== undefined) && ("partsOfLot" in formState) ? 
                (<input 
                    type="text" 
                    className="optionSearch" 
                    value={(formState.partsOfLot[optionSectionNum][inputName as keyof (LotTableInterface | JobInterface | PartOfLot)] as string) ?? ""} 
                    onChange={readInput}
                    onFocus={handleOnFocus}
                    onBlur={handleOnBlur}
                />) : 
                (<input 
                    type="text" 
                    className="optionSearch" 
                    value={(formState[inputName as keyof (LotTableInterface | JobInterface | PartOfLot)] as string) ?? ""} 
                    onChange={readInput}
                    onFocus={handleOnFocus}
                    onBlur={handleOnBlur}
                />)}
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