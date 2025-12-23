import React from 'react'
import capitalizeString from '../../hooks/capitalizeString'
import { FieldValues, UseFormGetValues } from 'react-hook-form'

interface EditAndCreatePD {
    currentLevel: "job"|"customer"|"project"|"lot",
    selectedItem: number,
    getTableValues: UseFormGetValues<FieldValues>,
}

const EditAndCreatePD:React.FC<EditAndCreatePD> = ({currentLevel, selectedItem, getTableValues}) => {
    const object = getTableValues(`${selectedItem}`)

    console.log(object)
    
    return (
        <>
            <h2>Edit {capitalizeString(currentLevel)}</h2>
            <form>
                {Object.keys(object).map((key, index) => {
                    const isDate = key.toLowerCase().includes("date") || key.includes("ETA")
                    return (
                        <>
                            <h4 key={index}>{key.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/^[a-z]/, letter => letter.toUpperCase())}</h4>
                            <input key={index} type={isDate ? "date" : "text"} /* {...registerTableValues(`${itemIndex}.${key}`, {value: isDate && job[key] ? job[key].split('T')[0] : job[key]})} *//>
                        </>
                    )
                  })
                }
            </form> 
        </>
    )
}

export default EditAndCreatePD