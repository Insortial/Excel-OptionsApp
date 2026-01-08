import React from 'react'
import capitalizeString from '../../hooks/capitalizeString'
import { ColumnDetail } from '@excelcabinets/excel-types/ExcelObjectTypes'
import { useForm } from 'react-hook-form'
import { determineInputType } from '../../hooks/determineInputType'
import useFetch from '../../hooks/useFetch'
import { objTypeMap } from '../../constants/objTypeMap'

interface EditAndCreatePD {
    currentLevel: "job"|"customer"|"project"|"lot",
    columnDetails: ColumnDetail[],
    levelMap: { customer: string, project: string, job: string, lot: string }
}

const EditAndCreatePD:React.FC<EditAndCreatePD> = ({ currentLevel, columnDetails, levelMap }) => {
    const { register, getValues } = useForm()
    const fetchHook = useFetch()
    
    const insertRow = async (e) => {
        e.preventDefault()
        console.log(getValues())
        const body = JSON.stringify(getValues())

        const response = await fetchHook(`/excelInfo/pd/${levelMap[currentLevel]}`, 'POST', body, import.meta.env.VITE_EXCELINFO)

        if(!response.ok) {
            console.log("Insertion failed")
            return
        }
    }

    return (
        <>
            <h2>Create {capitalizeString(currentLevel)}</h2>
            <form id="createForm" onSubmit={insertRow}>
                <div id="columnGrid">
                    {columnDetails.map((column, index) => {
                        const inputType = determineInputType(column.sqlType)
                        const isIdentity = column.columnName === 'ID'
                        const isDate = inputType === 'date'
                        const isBoolean = inputType === 'select'

                        if(column.IsEditable) {
                            return (
                                <div key={index} className='formInput'>
                                    <h4 key={index + column.columnName}>{column.columnName}</h4>
                                    {!isBoolean ? <input key={index + column.columnName + 'input'} type={inputType} {...register(`${column.columnName}`, objTypeMap[inputType])}/> : 
                                    <select key={index + column.columnName + 'select'} {...register(`${column.columnName}`, objTypeMap[inputType])}>
                                        <option value={'true'}>True</option>
                                        <option value={'false'}>False</option>
                                    </select>}
                                </div>
                            )
                        }
                    })}
                </div>
                <button id="formSubmit">Submit</button>
            </form> 
        </>
    )
}

export default EditAndCreatePD