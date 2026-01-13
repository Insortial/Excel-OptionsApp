import React, { useState } from 'react'
import capitalizeString from '../../hooks/capitalizeString'
import { ColumnDetail } from '@excelcabinets/excel-types/ExcelObjectTypes'
import { useForm } from 'react-hook-form'
import { determineInputType } from '../../hooks/determineInputType'
import useFetch from '../../hooks/useFetch'
import { objTypeMap } from '../../constants/objTypeMap'

interface EditAndCreatePD {
    currentLevel: "job"|"customer"|"project"|"lot",
    columnDetails: ColumnDetail[],
    levelMap: { customer: string, project: string, job: string, lot: string },
    navigateToInsertedRow: (id: number) => Promise<void>,
    setModalType: React.Dispatch<React.SetStateAction<string>>
}

const EditAndCreatePD:React.FC<EditAndCreatePD> = ({ currentLevel, columnDetails, levelMap, navigateToInsertedRow, setModalType }) => {
    const { register, getValues, formState: {errors}, handleSubmit } = useForm()
    const [createError, setCreateError] = useState(false)
    const fetchHook = useFetch()
    
    const timedTurnOnError = async () => {
        setCreateError(true)
        setTimeout(() => {
            setCreateError(false)
        }, 10000)
    }

    const insertRow = async () => {
        const body = JSON.stringify(getValues())

        const response = await fetchHook(`/excelInfo/pd/${levelMap[currentLevel]}`, 'POST', body, import.meta.env.VITE_EXCELINFO)

        if(!response.ok) {
            timedTurnOnError()
            console.log("Insertion failed")
            return
        }

        const id = (await response.json()).id as number
        navigateToInsertedRow(id)
        setModalType("none")
    }

    return (
        <>
            <h2>Create {capitalizeString(currentLevel)}</h2>
            <form id="createForm" onSubmit={handleSubmit(insertRow)}>
                <div id="columnGrid">
                    {columnDetails.map((column, index) => {
                        const inputType = determineInputType(column.sqlType)
                        /* const isIdentity = column.columnName === 'ID'
                        const isDate = inputType === 'date' */
                        const isBoolean = inputType === 'select'
                        const error = errors[column.columnName]

                        if(column.IsEditable) {
                            return (
                                <div key={index} className='formInput'>
                                    <h4 key={index + column.columnName}>{column.columnName}</h4>
                                    {!isBoolean ? 
                                        <input 
                                            style={{border: error ? '1px solid red' : '1px solid black'}}
                                            key={index + column.columnName + 'input'} 
                                            type={inputType} 
                                            {...register(`${column.columnName}`, 
                                                {
                                                    required: column.IsRequired ? 'Field is required' : false,
                                                    ...objTypeMap[inputType]
                                                })
                                            }
                                        /> : 
                                        <select 
                                            key={index + column.columnName + 'select'} 
                                            {...register(`${column.columnName}`, {value: false, ...objTypeMap[inputType]})} 
                                            required={!column.IsNullable}
                                        >
                                            <option value={'true'}>True</option>
                                            <option value={'false'}>False</option>
                                        </select>}
                                    {error?.message && <h6>{String(error.message)}</h6>}
                                </div>
                            )
                        }
                    })}
                </div>
                <button id="formSubmit">Submit</button>
                {createError && <h4 className='error'>Unable to insert row</h4>}
            </form> 
        </>
    )
}

export default EditAndCreatePD