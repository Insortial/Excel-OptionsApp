import React, { useEffect, useState } from 'react'
import capitalizeString from '../../hooks/capitalizeString'
import { ColumnDetail, CustomerLevel } from '@excelcabinets/excel-types/ExcelObjectTypes'
import { useForm } from 'react-hook-form'
import { determineInputType } from '../../hooks/determineInputType'
import useFetch from '../../hooks/useFetch'
import { objTypeMap } from '../../constants/objTypeMap'
import LevelRow from '../LevelRow'

interface EditAndCreatePD {
    currentLevel: "job"|"customer"|"project"|"lot",
    columnDetails: ColumnDetail[],
    levelMap: { customer: string, project: string, job: string, lot: string },
    navigateToInsertedRow: (id: number) => Promise<void>,
    setModalType: React.Dispatch<React.SetStateAction<string>>
}

const EditAndCreatePD:React.FC<EditAndCreatePD> = ({ currentLevel, columnDetails, levelMap, navigateToInsertedRow, setModalType }) => {
    const { register, getValues, setValue, formState: {errors}, handleSubmit } = useForm()
    const { register: registerSearch, watch: watchSearch } = useForm({defaultValues: {customerSearch: ''}})
    const [PDLevels, setPDLevels] = useState<null|CustomerLevel[]>(null)
    const [createError, setCreateError] = useState(false)
    const [IDFKSearch, setIDFKSearch] = useState(false)
    const fetchHook = useFetch()

    const foreignKeyMap : {[key: string]: string} = {
        'project': 'Customer',
        'job': 'Project',
        'lot': 'Job'
    }
    
    const timedTurnOnError = async () => {
        setCreateError(true)
        setTimeout(() => {
            setCreateError(false)
        }, 10000)
    }

    const selectIDFK = (rowLevel: 'job' | 'project' | 'lot' | 'customer', idfk: number) => {
        const idfkReference: {[key: string]: string} = {
            'project': 'customer',
            'job': 'project',
            'lot': 'job'
        }
        console.log(`CurrentLevel: ${currentLevel}, RowLevel: ${rowLevel}, Referenced Level: ${idfkReference[currentLevel]}`)
        if(rowLevel !== idfkReference[currentLevel]) return
        
        const idfkMap : {[key: string]: string} = {
            'project': 'customerIDFK',
            'job': 'projectIDFK',
            'lot': 'jobIDFK'
        }
        
        switch(currentLevel) {
            case 'project':
                setValue(idfkMap['project'], idfk)
                break
            case 'job':
                setValue(idfkMap['job'], idfk)
                break
            case 'lot':
                setValue(idfkMap['lot'], idfk)
                break
            case 'customer':
            default:
                break
        }
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

    const updatePDLevels = async () => {
        const response = await fetchHook('/excelInfo/pd', 'GET', undefined, import.meta.env.VITE_EXCELINFO)
        
        if(!response.ok) {
            console.log('Failed to retrieve PD Levels')
            return 
        }

        const { levels } = await response.json() as {levels: CustomerLevel[]}
        setPDLevels(levels)
    }

    const filterCustomers = (customers: CustomerLevel[]) => {
        const searchValue = watchSearch('customerSearch').toLowerCase()
        return customers.filter((customer) => {
            return customer.customerName.toLowerCase().includes(searchValue) || customer.customerID.toString().includes(searchValue)
        })
    }

    useEffect(() => {
        updatePDLevels()
    }, [])

    return (
        <>
            <h2>Create {capitalizeString(currentLevel)}</h2>
            <section id="createSection">
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
                                            <div className="idfkInputWrapper">
                                                <input 
                                                    style={{border: error ? '1px solid red' : '1px solid black', width: '100%', paddingRight: column.columnName.includes('IDFK') ? '45px' : '5px', boxSizing: 'border-box'}}
                                                    key={index + column.columnName + 'input'} 
                                                    type={inputType}
                                                    className={column.columnName.includes('IDFK') ? 'idfkInput' : ''}
                                                    {...register(`${column.columnName}`, 
                                                        {
                                                            required: column.IsRequired ? 'Field is required' : false,
                                                            ...objTypeMap[inputType]
                                                        })
                                                    }
                                                />
                                                {column.columnName.includes('IDFK') && (
                                                    <button type="button" className='inputSearch' onClick={() => setIDFKSearch(!IDFKSearch)}>Search</button>
                                                )}
                                            </div> : 
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
                {(PDLevels && currentLevel !== 'customer' && IDFKSearch) &&
                    <section id="pdLevelsSection">
                        <div id='customerSearch'>
                            <h3>Search: </h3>
                            <input placeholder='Enter Customer Name or ID' {...registerSearch('customerSearch')}></input>
                        </div>
                        <div id="pdLevelsWrapper">
                            <div id='pdLevels'>
                                <h2>Select {foreignKeyMap[currentLevel]}</h2>
                                <div className='levelContainer'>
                                    {filterCustomers(PDLevels).map((customerLevel) => {
                                        const { customerID, customerName } = customerLevel
                                        return <>
                                            <LevelRow levelType='customer' id={customerID} name={customerName} selectIDFK={selectIDFK}>
                                                {['job', 'lot'].includes(currentLevel) && customerLevel.projects.map((projectLevel) => {
                                                    const { projectID, projectName } = projectLevel
                                                    return <>
                                                        <LevelRow levelType='project' id={projectID} name={projectName} selectIDFK={selectIDFK}>
                                                            {['lot'].includes(currentLevel) && projectLevel.jobs.map((jobLevel) => {
                                                                const { jobID, jobName } = jobLevel
                                                                return <LevelRow key={jobID} levelType='job' id={jobID} name={jobName} selectIDFK={selectIDFK}/>
                                                            })}
                                                        </LevelRow>
                                                    </>
                                                })}
                                            </LevelRow>
                                        </>
                                    })}
                                </div>
                            </div>
                        </div>
                    </section>
                }
            </section>
        </>
    )
}

export default EditAndCreatePD