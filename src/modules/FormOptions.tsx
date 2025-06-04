/* eslint-disable react/react-in-jsx-scope */
import { useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import { useForm } from 'react-hook-form'
import OptionsCreatorModal from './OptionsCreatorModal'
import Header from './Header'

const FormOptions = () => {
    const { tables, identity, nonIdentity } = useLoaderData() as {tables: {[key:number]:string}, identity: {[key:number]:string}, nonIdentity: number[]}
    const { register, reset, getValues } = useForm()
    const fetchHook = useFetch()

    const [editableRow, setEditableRow] = useState<number>(-1)
    const [rowToDelete, setRowToDelete] = useState<number>(-1)
    const [modalType, setModalType] = useState<string>("none")
    const [modalInputValue, setModalInputValue] = useState<string>("")
    const [currentTable, setCurrentTable] = useState<{headers: string[], rows: {[key:string]:string|number|boolean}[]}>({headers: [], rows: []})
    const [tableID, setTableID] = useState<number>(-1)
    const [addingRow, setAddingRow] = useState<boolean>(false)
    const [isDeleteMode, setDeleteMode] = useState<boolean>(false)
    

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

            if(header !== identity[tableID] || nonIdentity.includes(tableID)) 
                updatedObj[header] = getValues(`${tableID} ~ ${idx} ~ ${header}`)
        }   

        return {rows: updatedObj, rowID}
    }

    const submitUpdate = async (idx:number) => {
        const { rows, rowID } = decodeFormHookValues(idx)
        const body = JSON.stringify({propertyRow: rows})

        const response = await fetchHook(`/formOptions/table/${tableID}/row/${rowID}`, "PUT", body)

        if(response.ok) 
            getFormOptionDetails(tableID)
        else 
            reset()
    }

    const submitNewRow = async () => {
        const { rows } = decodeFormHookValues(0)
        const body = JSON.stringify({propertyRow: rows})

        const response = await fetchHook(`/formOptions/table/${tableID}`, "POST", body)

        if(response.ok) {
            setAddingRow(false)
            getFormOptionDetails(tableID)
        } else 
            reset()
    }

    const submitDeleteRow = async () => {
        const { rowID } = decodeFormHookValues(rowToDelete)

        const response = await fetchHook(`/formOptions/table/${tableID}/row/${rowID}`, "DELETE")

        if(response.ok) {
            setModalType("none")
            getFormOptionDetails(tableID)
            setRowToDelete(-1)
        } else {
            setModalInputValue("Cannot delete, there are child records associated")
        }
    }

    const openDeleteModal = async (idx:number) => {
        setRowToDelete(idx)
        const { rows, rowID } = decodeFormHookValues(idx)
        const objArray = []

        if(nonIdentity.includes(tableID)) {
            console.log("Not Identity")
            objArray.push(`ID: ${rowID}`)
        } else {
            for (const key of Object.keys(rows)) {
                if(key !== 'inUse')
                    objArray.push(`${key}: ${rows[key]}`)
            }  
        }
            
        setModalInputValue(objArray.join(', '))
        setModalType("deleteFormOption")
    }

    const switchAddMode = () => {
        setAddingRow(!addingRow)
        reset()
    }

    const rowButton = async (sameIDX:boolean, idx:number) => {
        setDeleteMode(false)
        if(sameIDX) {
            setEditableRow(-1)
        } else {
            setEditableRow(idx)
        }
        reset()
    }

    const secondaryRowButton = async (sameIDX:boolean, idx:number) => {
        if(sameIDX) {
            setEditableRow(-1)
            submitUpdate(idx)
        } else {
            openDeleteModal(idx)
            reset()
        }
    }   

    const turnOffModal = () => {
        setModalType("none")
    }

    return (
        <>
            <OptionsCreatorModal modalType={modalType} turnOffModal={turnOffModal}>
                <h2>Are You Sure You Want To Delete Form Option?</h2>
                <h3>{modalInputValue}</h3>
                <div className="modalButtonRow">
                    <button onClick={() => submitDeleteRow()}>YES</button>
                    <button onClick={() => turnOffModal()}>NO</button>
                </div>
            </OptionsCreatorModal>
            <div id="jobMenuScreen">
                <Header currentPage='formOptions'/>
                <div id="formOptionsBody">
                    <div id="formChoiceSelector">
                        <h2>Form Choices</h2>
                        <div id="formMenuGrid">
                            {Object.keys(tables).map((key, idx) => {
                                return <div key={idx} className={`${+key === tableID ? "selectedChoice" : ""} choiceButton`} onClick={() => getFormOptionDetails(Number(key))}>{tables[Number(key)]}</div>
                            })}
                        </div>
                        <div className='addRow buttonRow'>
                            <button style={{display: tableID !== -1 ? "block" : "none", backgroundColor: !addingRow ? "#b4d386" : "#daab6d"}}onClick={() => switchAddMode()}>{addingRow ? `View ${tables[tableID]} List` : "Add Item"}</button>
                        </div>
                        <div className='deleteRow buttonRow'>
                            <button style={{display: tableID !== -1 && editableRow === -1 ? "block" : "none"}} onClick={() => setDeleteMode(!isDeleteMode)}>Delete Row</button>
                        </div>
                    </div>
                    <div id="formOptions" style={{width: tableID !== -1 ? "auto" : "40%", height: addingRow ? "auto" : "100%"}}>
                        <h2>{tableID !== -1 ? (addingRow ? "Adding " : " ") + tables[tableID] : "Select a Form Option"}</h2>
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
                                            <button className={sameIDX ? "cancelButton" : "editButton"} onClick={() => rowButton(sameIDX, idx)}>{sameIDX ? "Cancel" : "Edit"}</button>
                                            <button style={{display: isDeleteMode || sameIDX ? "block" : "none"}} className={sameIDX ? "submitButton" : 'deleteRowButton'} onClick={() => secondaryRowButton(sameIDX, idx)}>{sameIDX ? "Submit" : "X"}</button>
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