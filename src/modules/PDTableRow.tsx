import React, { useEffect } from 'react'
import PDTableCell from './PDTableCell'
import { ColumnDetail } from '@excelcabinets/excel-types/ExcelObjectTypes'
import { useForm } from 'react-hook-form'
import useFetch from '../hooks/useFetch'

type CellValue = boolean | number | string | null

type ItemRow = {
  ID: number
} & Record<string, CellValue>

type PDTableRow = {
    editingRow: boolean,
    item: ItemRow,
    itemIndex: number,
    columnDetails: ColumnDetail[],
    level: "project" | "job" | "customer" | "lot"
    levelMap: {customer: string; project: string; job: string; lot: string;}
    setSelectedItem: React.Dispatch<React.SetStateAction<number>>,
    setModalType: React.Dispatch<React.SetStateAction<string>>,
    retrieveData: (selectedPage: number, selectedColumnPage: number, updatedFilters: boolean, selectedLevel?: "project" | "job" | "customer" | "lot", lotDate?: boolean) => Promise<void>,
    pagination: {pageNum: number, columnPageNum: number}
}

const PDTableRow:React.FC<PDTableRow> = ({columnDetails, editingRow, item, level, itemIndex, levelMap, pagination, setSelectedItem, setModalType, retrieveData}) => {
    const fetchHook = useFetch()
    const { getValues, reset, register, handleSubmit, formState: {errors, dirtyFields} } = useForm()

    const buttonTitle = {job: "Edit", project: "Location", customer: "Edit", lot: "Edit"}
    const columnTypeMap = columnDetails.reduce((map: { [key: string]: string }, col) => {
        map[col.columnName] = col.sqlType;
        return map;
    }, {});

    const openLocationModal = (index: number) => {
        setSelectedItem(index)
        setModalType("location")
    }

    const selectRowEdit = (selectedID: number) => {
        setSelectedItem(selectedID)
        reset()
    }

    const cancelEdit = () => {
        setSelectedItem(-1)
        reset()
    }

    const getDirtyRowValues = () => {
        const rowValues = getValues()
        const rowDirty = dirtyFields

        return Object.fromEntries(
            Object.keys(rowDirty).map(key => [key, rowValues[key]])
        )
    }

    const updateSelectedRow = async () => {
        console.log(errors)
        if(errors?.length ?? 0 > 0) {
            console.log("there are errors here")
            return
        }

        const selectedRow = getDirtyRowValues()
        const body = JSON.stringify({data: selectedRow})

        const response = await fetchHook(`/excelInfo/${levelMap[level]}/${getValues("ID")}`, "PATCH", body, import.meta.env.VITE_EXCELINFO)
        
        if (!response.ok) {
            console.error("Error fetching data")
            return
        }

        await retrieveData(pagination.pageNum, pagination.columnPageNum, false)
        setSelectedItem(-1)
    }

    useEffect(() => {
        reset(item)
    }, [item])

    return (
        <div className={`pdRow ${editingRow ? 'selected' : ''}`} key={itemIndex}>
            <div className='pdCellSection'>
                {Object.keys(item).map((key: string, index) => {
                    const columnDetail = columnDetails.find(({columnName}) => columnName === key)
                    return <PDTableCell key={index} errors={errors} jobKey={key} columnTypeMap={columnTypeMap} item={item} editingRow={editingRow} registerTableValues={register} index={index} columnDetail={columnDetail}/>
                })}
            </div>
            <div className='rowButtons'>
                {level === "project" && <button className='rowButton location' onClick={() => openLocationModal(item.ID)}>{buttonTitle[level]}</button>}
                {!editingRow ? <button className={`rowButton ${editingRow ? 'hidden' : ''}`} onClick={() => selectRowEdit(item.ID)}>Edit</button>
                : <button className={`cancel rowButton ${!editingRow ? 'hidden' : ''}`} onClick={() => cancelEdit()}>Cancel</button>}
                <button className={`submit rowButton ${!editingRow ? 'hidden' : ''}`} onClick={handleSubmit(updateSelectedRow)}>Submit</button>
            </div>
        </div>
    )
}

export default PDTableRow