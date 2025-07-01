import React, { useContext, useState } from 'react'
import { FormOptionsContext } from '../context/OptionsTemplateContext';
import { FormOptionsContextType } from '../types/FormOptions';
import { FieldValues, Path, UseFormGetValues } from 'react-hook-form';

type inputOptions<T extends FieldValues> = {
    onFormChange: (key: string, value: string) => void;
    inputName: Path<T>;
    getFormValues: UseFormGetValues<T>;
}

const ControlledTextArea = <T extends FieldValues>({onFormChange, inputName, getFormValues}: inputOptions<T>) => {
    const [isTextLimit, setIsTextLimit] = useState<boolean>(false)
    const { retrieveCharMax } = useContext(FormOptionsContext) as FormOptionsContextType
    const keyParts = inputName.split(".")
    /* const optionSectionNum = keyParts.length > 1 ? parseInt(keyParts[1]) : undefined */
    const inputType = keyParts.pop() || ""
    const charMax = retrieveCharMax(inputType)

    function readInput(input: React.ChangeEvent<HTMLTextAreaElement>): void {
        if(charMax && input.target.value.length === charMax) {
            setIsTextLimit(true)
            setTimeout(() => {
                setIsTextLimit(false)
            }, 2000)
        }

        onFormChange?.(inputName, input.target.value)
    }

    return (
        <textarea 
            value={getFormValues(inputName) ?? ""}
            className={isTextLimit ? "errorTextArea" : ""}
            onChange={readInput}
            {...(charMax ? {maxLength: charMax ?? 0} : {})}>
        </textarea>
    )
}

export default ControlledTextArea