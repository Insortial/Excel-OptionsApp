import React from 'react'
import { LotTableInterface, PartOfLot, ProductionSchedule } from '../types/LotTableInterface'

type inputOptions = {
    formState: LotTableInterface | ProductionSchedule;
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
            value={(formState[inputName as keyof (LotTableInterface | PartOfLot)] as string) ?? ""}
            onChange={readInput}>
        </textarea>
    )
}

export default ControlledTextArea