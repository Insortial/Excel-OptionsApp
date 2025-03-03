import React, { useContext, useState } from 'react'
import { JobDetails, LotTableInterface, PartOfLot } from '../types/LotTableInterface'
import { FormOptionsContext } from '../context/OptionsTemplateContext';
import { FormOptionsContextType } from '../types/FormOptions';

type inputOptions = {
    formState: LotTableInterface | PartOfLot | JobDetails;
    optionSectionNum?: number;
    onFormChange: (value: string, key: string, optSectionNum?: number) => void;
    inputName: string;
}

const ControlledTextArea: React.FC<inputOptions> = ({formState, onFormChange, inputName, optionSectionNum}) => {
    const [isTextLimit, setIsTextLimit] = useState<boolean>(false)
    const { retrieveCharMax } = useContext(FormOptionsContext) as FormOptionsContextType
    const charMax = retrieveCharMax(inputName)

    function readInput(input: React.ChangeEvent<HTMLTextAreaElement>): void {
        if(charMax && input.target.value.length === charMax) {
            setIsTextLimit(true)
            setTimeout(() => {
                setIsTextLimit(false)
            }, 2000)
        }

        onFormChange?.(input.target.value, inputName, optionSectionNum)
    }


    return (
        (optionSectionNum !== undefined) && ("partsOfLot" in formState) ? <textarea
            value={(formState.partsOfLot[optionSectionNum][inputName as keyof (LotTableInterface | PartOfLot)] as string) ?? ""}
            className={isTextLimit ? "errorTextArea" : ""}
            onChange={readInput}
            {...(charMax ? {maxLength: charMax ?? 0} : {})}> 
        </textarea> :
        <textarea 
            value={(formState[inputName as keyof (LotTableInterface | PartOfLot | JobDetails)] as string) ?? ""}
            className={isTextLimit ? "errorTextArea" : "cellTextArea"}
            onChange={readInput}
            {...(charMax ? {maxLength: charMax ?? 0} : {})}>
        </textarea>
    )
}

export default ControlledTextArea