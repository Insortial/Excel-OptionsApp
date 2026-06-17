import React from 'react'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'
import { determineInputType } from '../../../hooks/determineInputType'
import { objTypeMap } from '../../../constants/objTypeMap'
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
    const { IsRequired, IsEditable, dropdownValues } = columnDetail || {}
    const validateValue = (value: string | number | boolean, valueType: string) => {
        switch(valueType) {
            case 'number':
                return Number.isFinite(Number(value))
            case 'string':
                return true
        }
    }

    if(jobKey === 'areaForeman')
        console.log(item[jobKey])

    const sqlType = columnTypeMap[jobKey] || 'nvarchar'
    const inputType = determineInputType(sqlType)

    const hasError = errors[jobKey]
    const isIdentity = jobKey === 'ID'
    const cellType = inputType === 'select' ? 'boolean' : dropdownValues ? 'dropdown' : 'text'
    //const isDate = inputType === 'date'

    return (
        <>
            {(() => {
                switch(cellType) {
                    case 'boolean':
                        return <select disabled={!editingRow} key={index} {...registerTableValues(`${jobKey}`, {value: item[jobKey], ...objTypeMap[inputType]})}>
                                    <option value={'true'}>True</option>
                                    <option value={'false'}>False</option>
                                </select>
                    case 'dropdown':
                        return <select disabled={!editingRow} key={index} {...registerTableValues(`${jobKey}`, {value: item[jobKey], ...objTypeMap[inputType]})}>
                                    {dropdownValues?.map((value) => {
                                        return <option key={`${jobKey}${value.ID}`} value={value.ID}>{value.name}</option>
                                    })}
                                </select>
                    case 'text':
                    default:
                        return <input 
                                    readOnly={isIdentity} 
                                    disabled={!editingRow || !IsEditable} 
                                    key={index} 
                                    type={inputType} 
                                    style={{fontWeight: isIdentity ? 'bold' : 'normal', border: hasError ? '2px solid red' : '1px solid black'}} 
                                    {...registerTableValues(`${jobKey}`, 
                                        {value: item[jobKey],
                                        validate: (value) => validateValue(value, inputType),
                                        required: IsRequired ? 'Field is required' : false,
                                        ...objTypeMap[inputType]}
                                    )}
                                />
                }
            })()}
        </>
    )
}

export default PDTableCell