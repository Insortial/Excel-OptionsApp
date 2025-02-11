import React, { useState } from 'react'
import { Link, useLoaderData } from 'react-router-dom'
import useFetch from '../hooks/useFetch'

const FormOptions = () => {
    const { state } = useLoaderData() as {state: {[key:number]:string}}
    const [currentTable, setCurrentTable] = useState<{headers: string[], rows: {[key:string]:string|number|boolean}[]}>({headers: [], rows: []})
    const fetchHook = useFetch()

    const getFormOptionDetails = async (tableID: string) => {
        const data = await fetchHook(`/formOptions/${tableID}`, 'GET')
        const tableData = await data.json()
        
        setCurrentTable(tableData)

        console.log(tableData)
    }

    return (
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
                        {Object.keys(state).map((key, idx) => {
                            return <div key={idx} className='choiceButton' onClick={() => getFormOptionDetails(key)}>{state[Number(key)]}</div>
                        })}
                    </div>
                </div>
                <div id="formOptions">
                    <h2>Drawer Boxes</h2>
                    <div className='formOptionHeader formOptionRow'>
                        {currentTable.headers.map((title, idx) => {
                            if(title === "inUse")
                                return <h3 key={idx} className='lastColumn'>{title}</h3>
                            else 
                                return <h3 key={idx} className='tableWidth'>{title}</h3>
                        })}
                    </div>
                    <div className='formOptionRowsBody'>
                        {currentTable.rows.map((row, idx) => {
                            return <div key={idx} className='formOptionRow'>
                                    {Object.keys(row).map((item, idx2) => {
                                        if(item === "inUse")
                                            return <input key={idx2} className='lastColumn' type="checkbox" checked={row[item] as boolean}></input>
                                        else
                                            return <input key={idx2} className='tableWidth' value={row[item] as string}></input>
                                    })}
                                </div>
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FormOptions