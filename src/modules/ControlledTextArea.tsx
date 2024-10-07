import React from 'react'
import { JobDetails, LotTableInterface, PartOfLot } from '../types/LotTableInterface'

type inputOptions = {
    formState: LotTableInterface | PartOfLot | JobDetails;
    optionSectionNum?: number;
    onFormChange: (value: string, key: string, optSectionNum?: number) => void;
    inputName: string;
}

const ControlledTextArea: React.FC<inputOptions> = ({formState, onFormChange, inputName, optionSectionNum}) => {
    
    function readInput(input: React.ChangeEvent<HTMLTextAreaElement>): void {
        onFormChange?.(input.target.value, inputName, optionSectionNum)
    }


    return (
        (optionSectionNum !== undefined) && ("partsOfLot" in formState) ? <textarea
            value={(formState.partsOfLot[optionSectionNum][inputName as keyof (LotTableInterface | PartOfLot)] as string) ?? ""}
            onChange={readInput}>
        </textarea> :
        <textarea 
            value={(formState[inputName as keyof (LotTableInterface | PartOfLot | JobDetails)] as string) ?? ""}
            onChange={readInput}>
        </textarea>
    )
}

export default ControlledTextArea