import React from 'react'
import useFetch from '../hooks/useFetch'
import FilterField from './FilterField'
import { FieldValues, UseFormRegister } from 'react-hook-form'

type PDFilters = {
    currentLevel: "project" | "customer" | "job" | "lot",
    filterArray: string[],
    registerFilters:  UseFormRegister<FieldValues>,
    retrieveDropDown: (key: string) => string[],
    resetTableFilters: () => void,
    updateFilters: () => void,
    filterIsDirty: boolean,
}

const PDFilters:React.FC<PDFilters> = ({currentLevel, filterArray, registerFilters, retrieveDropDown, resetTableFilters, updateFilters, filterIsDirty}) => {
    const fetchHook = useFetch()

    const selectFields = [
        { label: 'Customer', name: 'customer', levels: ['customer', 'job', 'project', 'lot'], dropdownKey: 'builder' },
        { label: 'Project', name: 'project', levels: ['job', 'project', 'lot'], dropdownKey: 'project' },
        { label: 'Job', name: 'job', levels: ['job', 'lot'], dropdownKey: 'job' },
    ]

    const inputFields = [
        { label: 'Customer ID', name: 'customerID', levels: ['customer', 'job', 'project', 'lot'] },
        { label: 'Project ID', name: 'projectID', levels: ['job', 'project', 'lot'] },
        { label: 'Job ID', name: 'jobID', levels: ['job', 'lot'] },
    ]

    const downloadCSV = async () => {
        // Fetch all data with a high limit
        const response = await fetchHook(`/excelInfo/${currentLevel}?&page=1&limit=10000${currentLevel === "project" ? '&includeBuilder=true' : ''}&${filterArray.join("&")}`, "GET", undefined, import.meta.env.VITE_EXCELINFO)
        const responseData = await response.json()
        
        if (!response.ok || !responseData.items || responseData.items.length === 0) {
        console.warn("No data to download")
        return
        }

        const data = responseData.items

        // Get headers from first object
        const headers = Object.keys(data[0])
        
        // Create CSV header row
        const csvHeader = headers.join(",")
        
        // Create CSV data rows
        const csvRows = data.map((item: {[key:string]:string}) =>
        headers.map(header => {
            const value = item[header]
            // Escape quotes and wrap in quotes if contains comma or newline
            const escaped = String(value).replace(/"/g, '""')
            return escaped.includes(",") || escaped.includes("\n") ? `"${escaped}"` : escaped
        }).join(",")
        )
        
        // Combine header and rows
        const csvContent = [csvHeader, ...csvRows].join("\n")
        
        // Create blob and download
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
        const link = document.createElement("a")
        const url = URL.createObjectURL(blob)
        const now = new Date()
        const date = now.toISOString().split('T')[0]
        const time = now.toTimeString().split(' ')[0].slice(0, 5).replace(':', '')
        link.setAttribute("href", url)
        link.setAttribute("download", `${currentLevel}-data-${date}-${time}.csv`)
        link.style.visibility = "hidden"
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    return (
        <section id="pdFilters">
            <div className='filterSection'>
                {selectFields.map(field => (
                    <FilterField
                        key={field.name}
                        label={field.label}
                        name={field.name}
                        type="select"
                        options={retrieveDropDown(field.dropdownKey)}
                        levels={field.levels}
                        currentLevel={currentLevel}
                        register={registerFilters}
                    />
                ))}
                <button onClick={() => resetTableFilters()}>Reset Filters</button>
            </div>
            <div className='filterSection'>
                {inputFields.map(field => (
                    <FilterField
                        key={field.name}
                        label={field.label}
                        name={field.name}
                        type="input"
                        levels={field.levels}
                        currentLevel={currentLevel}
                        register={registerFilters}
                    />
                ))}
                <button onClick={() => updateFilters()}>{filterIsDirty ? "Set Filters": "Filters Set"}</button>
                <button id="downloadCSV" onClick={() => downloadCSV()}>Download CSV</button>
            </div>
        </section>
    )
}

export default PDFilters