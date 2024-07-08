import { useState, useEffect, useRef, useCallback } from "react"
import React from 'react'
import { JobInterface, LotTableInterface } from "./LotTableInterface";

type inputOptions = {
    listOptions: string[];
    formState: LotTableInterface | JobInterface;
    onFormChange?: (value: string, key: string) => void;
    inputName: string;
}

const InputSearch: React.FC<inputOptions> = ({listOptions, formState, onFormChange, inputName}) => {
    const [suggestion, setSuggestion] = useState<string[] | string[]>([]);
    const [inFocus, setInFocus] = useState<boolean | boolean>(false);
    const [focusedIndex, setFocusedIndex] = useState(-1);

    useEffect(() => {
      setSuggestion(listOptions);
    }, [])

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
        console.log(selectedIndex)
        const selectedItem = suggestion[selectedIndex];
        if (!selectedItem) return resetSearchComplete();
        resetSearchComplete();

        console.log(selectedItem)
        onFormChange?.(selectedItem, inputName)
    }
    
    function readInput(input: React.ChangeEvent<HTMLInputElement>): void {
        onFormChange?.(input.target.value, inputName)
        if(suggestion != undefined) {
            setSuggestion(listOptions?.filter((x: string) => x.toLowerCase().includes(input.target.value.toLowerCase())));
        }
    }


    return (
        <div className="optionSearchContainer" tabIndex={1} onKeyDown={handleKeyDown}>
            <input 
                type="text" 
                className="optionSearch" 
                value={(formState[inputName as keyof (LotTableInterface | JobInterface)] as string) ?? ""} 
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