import React from 'react'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'
import { determineInputType } from '../hooks/determineInputType'
import { objTypeMap } from '../constants/objTypeMap'
import { ColumnDetail } from '@excelcabinets/excel-types/ExcelObjectTypes'

type PDTableCell = {
    jobKey: string,
    item: {[key:string]:string|number|boolean|null},
    columnDetail?: ColumnDetail,
    editingRow: boolean,
    registerTableValues: UseFormRegister<FieldValues>,
    errors: FieldErrors<FieldValues>,
    index: number,
    columnTypeMap: {[key: string]: string}
}

const PDTableCell:React.FC<PDTableCell> = ({ jobKey, item, editingRow, registerTableValues, index, columnTypeMap, errors, columnDetail }) => {
    const { IsRequired, IsEditable } = columnDetail || {}
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

    const hasError = errors[jobKey]
    const isIdentity = jobKey === 'ID'
    const isDate = inputType === 'date'
    const isBoolean = inputType === 'select'
    
    return (
        !isBoolean ? 
            <input 
                readOnly={isIdentity} 
                disabled={!editingRow || !IsEditable} 
                key={index} 
                type={inputType} 
                style={{fontWeight: isIdentity ? 'bold' : 'normal', border: hasError ? '2px solid red' : '1px solid black'}} 
                {...registerTableValues(`${jobKey}`, 
                    {value: isDate && item[jobKey] && typeof item[jobKey] === 'string' ? item[jobKey].split('T')[0] : item[jobKey],
                    validate: (value) => validateValue(value, inputType),
                    required: IsRequired ? 'Field is required' : false,
                    ...objTypeMap[inputType]}
                )}
            /> : 
            <select disabled={!editingRow} key={index} {...registerTableValues(`${jobKey}`, {value: item[jobKey], ...objTypeMap[inputType]})}>
                <option value={'true'}>True</option>
                <option value={'false'}>False</option>
            </select>
    )
}

export default PDTableCell