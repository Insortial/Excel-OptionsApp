/* eslint-disable react/react-in-jsx-scope */
import { useState } from 'react'
import { Link, useLoaderData } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import { useForm } from 'react-hook-form'

const FormOptions = () => {
    const { tables, identity, nonIdentity } = useLoaderData() as {tables: {[key:number]:string}, identity: {[key:number]:string}, nonIdentity: number[]}
    const [editableRow, setEditableRow] = useState<number>(-1)
    const [currentTable, setCurrentTable] = useState<{headers: string[], rows: {[key:string]:string|number|boolean}[]}>({headers: [], rows: []})
    const [tableID, setTableID] = useState<number>(-1)
    const [addingRow, setAddingRow] = useState<boolean>(false)
    const { register, reset, getValues } = useForm()
    const fetchHook = useFetch()

    /* const getDefaultValues = (obj: {headers: string[], rows: {[key:string]:string|number|boolean}[]}) => {
        return obj.rows.reduce((acc, row, rowIdx) => {
            Object.keys(row).forEach((item) => {
              acc[`${tableID} ~ ${rowIdx} ~ ${item}`] = row[item];
            });
            return acc;
          }, {})
    } */

    const getFormOptionDetails = async (tableID: number) => {
        setTableID(tableID)

        const data = await fetchHook(`/formOptions/table/${tableID}`, 'GET')
        const tableData = await data.json()
        
        setEditableRow(-1)
        reset()
        setCurrentTable(tableData)
    }

    const decodeFormHookValues = (idx:number) => {
        const updatedObj:{[key:string]:string|number|boolean} = {}
        let rowID;

        for (const header of currentTable.headers) {
            if(header === identity[tableID])
                rowID = getValues(`${tableID} ~ ${idx} ~ ${header}`)
            else {
                updatedObj[header] = getValues(`${tableID} ~ ${idx} ~ ${header}`)
            }
        }   

        console.log(getValues())
        const body = JSON.stringify({propertyRow: updatedObj})

        return {body, rowID}
    }

    const submitUpdate = async (idx:number) => {
        const { body, rowID } = decodeFormHookValues(idx)
        const response = await fetchHook(`/formOptions/table/${tableID}/row/${rowID}`, "PUT", body)

        if(response.ok) 
            getFormOptionDetails(tableID)
        else 
            reset()
    }

    const submitNewRow = async () => {
        const { body } = decodeFormHookValues(0)
        const response = await fetchHook(`/formOptions/table/${tableID}`, "POST", body)

        console.log(response.ok)
        if(response.ok) {
            setAddingRow(false)
            getFormOptionDetails(tableID)
        } else 
            reset()
    }

    const switchAddMode = () => {
        setAddingRow(!addingRow)
        reset()
    }

    const rowButton = async (sameIDX:boolean, idx:number) => {
        if(sameIDX) {
            setEditableRow(-1)
            submitUpdate(idx)
        } else {
            setEditableRow(idx)
            reset()
        }
    }

    return (
        <>
            <div id="jobMenuScreen">
                <header id="jobMenuHeader">
                    <h1>Form Options</h1>
                    <h4 id="logOutButton" onClick={() => console.log()}>Logout</h4>
                    <nav>
                        <Link to="/creatingJob" className='jobMenuButtons'>Create Job Document</Link>
                        <Link to="/creatingJobPackage" className='jobMenuButtons'>Edit/Create Job Package</Link>
                        <Link to="/formOptions" className='jobMenuButtons'>Edit Form Options</Link>
                    </nav>
                </header>
                <div id="formOptionsBody">
                    <div id="formChoiceSelector">
                        <h2>Form Choices</h2>
                        <div id="formMenuGrid">
                            {Object.keys(tables).map((key, idx) => {
                                return <div key={idx} className={`${+key === tableID ? "selectedChoice" : ""} choiceButton`} onClick={() => getFormOptionDetails(Number(key))}>{tables[Number(key)]}</div>
                            })}
                        </div>
                        <div className='addRow'>
                            <button style={{backgroundColor: !addingRow ? "#b4d386" : "#daab6d"}}onClick={() => switchAddMode()}>{addingRow ? `View ${tables[tableID]} List` : "Add Item"}</button>
                        </div>
                    </div>
                    <div id="formOptions" style={{height: addingRow ? "auto" : "100%"}}>
                        <h2>{(addingRow ? "Adding " : " ") + tables[tableID]}</h2>
                        <div className='formOptionRow formOptionHeader'>
                            {currentTable.headers.map((title, idx) => {
                                if((title !== identity[tableID] || nonIdentity.includes(tableID)) || !addingRow) {
                                    if(title === "inUse")
                                        return <h3 key={idx} className='lastColumn'>{title}</h3>
                                    else 
                                        return <h3 key={idx} className='tableWidth'>{title}</h3>
                                }
                            })}
                        </div>
                        <div className='formOptionRowsBody'>
                            {!addingRow ? 
                                currentTable.rows.map((row, idx) => {
                                    const sameIDX = editableRow === idx
                                    return (
                                        <div key={idx} className={`${editableRow === idx ? "selectedRow" : ""} formOptionRow`}>
                                            {Object.keys(row).map((item) => {
                                                if(item === "inUse")
                                                    return <input key={`${tableID} ~ ${idx} ~ ${item}`} disabled={idx !== editableRow} className='lastColumn' type="checkbox" {...register(`${tableID} ~ ${idx} ~ ${item}`, {value: row[item]})}></input>
                                                else
                                                    return <input key={`${tableID} ~ ${idx} ~ ${item}`} readOnly={identity[tableID] === item} disabled={idx !== editableRow} className='tableWidth' {...register(`${tableID} ~ ${idx} ~ ${item}`, {value: row[item]})}></input>
                                            })}
                                            <button /* style={{display: isDirty && sameIDX ? "none" : "block"}} */ className={sameIDX ? "submitButton": "editButton"} onClick={() => rowButton(sameIDX, idx)}>{sameIDX ? "Submit" : "Edit"}</button>
                                        </div>
                                    )
                                }) :
                                <>
                                    <div className='formOptionRow'>
                                        {Object.keys(currentTable.rows[0]).map((columnName) => {
                                            if(columnName !== identity[tableID] || nonIdentity.includes(tableID)) {
                                                if(columnName === "inUse")
                                                    return <input key={`${tableID} ~ ${0} ~ ${columnName}`} type="checkbox" className='lastColumn' {...register(`${tableID} ~ ${0} ~ ${columnName}`)}></input>
                                                else
                                                    return <input key={`${tableID} ~ ${0} ~ ${columnName}`} className='tableWidth' {...register(`${tableID} ~ ${0} ~ ${columnName}`)}></input>
                                            }
                                            
                                        })}

                                    </div>
                                    <button id="addButton" onClick={() => submitNewRow()}>Add Row</button>
                                </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FormOptions