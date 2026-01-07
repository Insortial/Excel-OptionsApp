import React from 'react'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'

type PDTableCell = {
    jobKey: string,
    item: {[key:string]:string|number|boolean|null},
    editingRow: boolean,
    registerTableValues: UseFormRegister<FieldValues>,
    errors: FieldErrors<FieldValues>,
    index: number,
    columnTypeMap: {[key: string]: string}
}

const PDTableCell:React.FC<PDTableCell> = ({ jobKey, item, editingRow, registerTableValues, index, columnTypeMap }) => {
    const determineInputType = (type: string) => {
        switch(type) {
            case 'nvarchar':
            case 'varchar':
                return 'text'
            case 'int':
            case 'float':
                return 'number'
            case 'bit':
                return 'select'
            case 'date':
                return 'date'
        }
        return 'text'
    }

    const objTypeMap = {
        'text': {},
        'select': {setValueAs: (v: string) => v === 'true'},
        'number': {valueAsNumber: true},
        'date': {valueAsDate: true}
    }

    const validateValue = (value: string | number | boolean, valueType: string) => {
        console.log(Number.isFinite(Number(value)))
        switch(valueType) {
            case 'number':
                return Number.isFinite(Number(value))
            case 'string':
                return true
        }
    }

    const sqlType = columnTypeMap[jobKey] || 'nvarchar'
    const inputType = determineInputType(sqlType)

    const isIdentity = jobKey === 'ID'
    const isDate = inputType === 'date'
    const isBoolean = inputType === 'select'
    
    return (
        !isBoolean ? 
            <input 
                readOnly={isIdentity} 
                disabled={!editingRow} 
                key={index} 
                type={inputType} 
                style={{fontWeight: isIdentity ? 'bold' : 'normal'}} 
                {...registerTableValues(`${item.ID}.${jobKey}`, 
                    {value: isDate && item[jobKey] && typeof item[jobKey] === 'string' ? item[jobKey].split('T')[0] : item[jobKey],
                    validate: (value) => validateValue(value, inputType),
                    ...objTypeMap[inputType]}
                )}
            /> : 
            <select disabled={!editingRow} key={index} {...registerTableValues(`${item.ID}.${jobKey}`, {value: item[jobKey], ...objTypeMap[inputType]})}>
                <option value={'true'}>True</option>
                <option value={'false'}>False</option>
            </select>
    )
}

export default PDTableCell