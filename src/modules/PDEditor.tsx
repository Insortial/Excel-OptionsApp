import React, { useState } from 'react'
import { Link, useLoaderData } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import { jobInfoObj } from '../types/ExcelObjectTypes'
import { useForm } from 'react-hook-form'
import OptionsCreatorModal from './OptionsCreatorModal'

const PDEditor = () => {
    const fetchHook = useFetch()
    const { items, pageNum, totalPages, limit } = useLoaderData() as {items: jobInfoObj[], pageNum: number, totalPages: number, limit: number}
    const [itemList, setItemList] = useState(items)
    const [modalType, setModalType] = useState("none")
    const [modalInputValue, setModalInputValue] = useState("")
    const [currentLevel, setCurrentLevel] = useState<"job"|"customer"|"project"|"lot">("job")
    const [currentPage, setCurrentPage] = useState<number>(pageNum)
    const [numOfPages, setNumOfPages] = useState<number>(totalPages)
    const [filterArray, setFilterArray] = useState<string[]>([])
    const [levelMenu, setLevelMenu] = useState(false)
    const { register: registerFilters, reset: resetFilters, getValues: getFilterValues, formState: {isDirty: filterIsDirty} } = useForm()
    const { register: registerTableValues, reset: resetTableValues, getValues: getTableValues, formState: {isDirty: tableIsDirty} } = useForm()
    const tableHeaders = {job: ["jobID", "jobCode", "jobName", "Phase"], customer: [], project: ["projectID", "projectName","Division", "City", "County","projectType"], lot: []}

    const retrieveData = async (selectedPage: number, limitNum: number, updatedFilters: boolean, selectedLevel=currentLevel) => {
        if (selectedPage < 1 || (selectedPage > numOfPages && numOfPages != 0)) 
            return

        let filterStringArr:string[] = []
        if(updatedFilters) {
          const filters = getFilterValues()
          Object.keys(filters).map((filterKey: string) => {
            const filterValue = filters[filterKey]
            if(/^(?!\s*$).+/.test(filterValue))
              filterStringArr.push(`${filterKey}=${filterValue}`)
          })
        } else {
          filterStringArr = filterArray
        }

        const response = await fetchHook(`/excelInfo/${selectedLevel}?page=${selectedPage}&limit=${limitNum}&${filterStringArr.join("&")}`, "GET", undefined, import.meta.env.VITE_EXCELINFO)
        const {pageNum, totalPages, items} = await response.json()
        if (!response.ok) {
            console.error("Error fetching data")
            return
        }

        setFilterArray(filterStringArr)
        setCurrentPage(pageNum)
        setNumOfPages(totalPages)
        resetTableValues()
        setItemList(items)
    }

    const updateFilters = () => {
      resetFilters(getFilterValues())
      retrieveData(1, limit, true)
    }

    const changeLevel = (levelType: "job"|"customer"|"project"|"lot") => {
      setCurrentLevel(levelType)
      retrieveData(1, limit, false, levelType)
      setLevelMenu(false)
    }

    const capitalizeString = (val:string) => {
      return val.charAt(0).toUpperCase() + val.slice(1);
    }

    return (
      <>
        <OptionsCreatorModal modalType={modalType} setModalType={setModalType} modalInputValue={modalInputValue} setModalInputValue={setModalInputValue}/>
        <div id="jobMenuScreen" style={{backgroundColor: "#f0f0f0"}}>
            <header id="jobMenuHeader" style={{justifyContent: "flex-end", minHeight: "80px"}}>
                <h4 id="logOutButtonHeader" onClick={() => console.log()}>Logout</h4>
                <nav>
                    <Link to="/creatingJob" className='jobMenuButtons'>Create Job Document</Link>
                    <Link to="/creatingJobPackage" className='jobMenuButtons'>Edit/Create Job Package</Link>
                    <Link to="/jobMenu" className='jobMenuButtons'>View Job Menu</Link>
                </nav>
            </header>
            <div id="pdBody">
              <header id="pdHeader">
                <h1>Excel Production & Delivery <span onClick={() => setLevelMenu(!levelMenu)}>{capitalizeString(currentLevel)}<span id="lastLetter">▼</span></span></h1>
                {levelMenu && 
                    <div id="headerDropDown">
                      <h4 onClick={() => changeLevel("customer")}>Customer</h4>
                      <h4 onClick={() => changeLevel("project")}>Project</h4>
                      <h4 onClick={() => changeLevel("job")}>Job</h4>
                      <h4 onClick={() => changeLevel("lot")}>Lot</h4>
                    </div>
                }
                <section id="pdFilters">
                  <div className='filterSection'>
                    {["customer", "job", "project", "lot"].includes(currentLevel) && 
                    <>
                      <label>Customer:</label>
                      <input type="text" {...registerFilters("customer")}/>
                    </>}
                    {["job", "project", "lot"].includes(currentLevel) && 
                    <>
                      <label>Project:</label>
                      <input type="text" {...registerFilters("project")}/>
                    </>}
                    {["job", "lot"].includes(currentLevel) && 
                    <>
                      <label>Job:</label>
                      <input type="text" {...registerFilters("job")}/>
                    </>}
                    <button onClick={() => console.log(getTableValues())}>Reset Filters</button>
                  </div>
                  <div className='filterSection'>
                    {["customer", "job", "project", "lot"].includes(currentLevel) && 
                    <>
                      <label>Customer ID:</label>
                      <input inputMode="numeric" {...registerFilters("customerID")}/>
                    </>}
                    {["job", "project", "lot"].includes(currentLevel) && 
                    <>
                      <label>Project ID:</label>
                      <input inputMode="numeric" {...registerFilters("projectID")}/>
                    </>}
                    {["job", "lot"].includes(currentLevel) && 
                    <>
                      <label>Job ID:</label>
                      <input inputMode="numeric" {...registerFilters("jobID")}/>
                    </>}
                    <button onClick={() => updateFilters()}>{filterIsDirty ? "Set Filters": "Filters Set"}</button>
                  </div>
                </section>
              </header>
              <div id="pdTable">
                <section id="pageNavigation">
                  <button onClick={() => retrieveData(currentPage - 1, limit, false)}>Previous</button>
                  <h3>Page {currentPage} of {numOfPages}</h3>
                  <button onClick={() => retrieveData(currentPage + 1, limit, false)}>Next</button>
                </section>
                <section className='pdRow'>
                  <div className='pdCellSection'>
                  {itemList && tableHeaders[currentLevel].map((key, index) => {
                      return (
                        <h4 key={index}>{key.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/^[a-z]/, letter => letter.toUpperCase())}</h4>
                      )
                    })
                  }
                  </div>
                </section>
                {itemList && itemList.map((job, itemIndex) => {
                    return (
                      <div className='pdRow' key={itemIndex}>
                        <div className='pdCellSection'>
                          {tableHeaders[currentLevel].map((key: string, index) => {
                            return (
                              <input key={index} {...registerTableValues(`${itemIndex}~${key}`, {value: job[key]})} readOnly/>
                            )
                          })}
                        </div>
                        <button onClick={() => setModalType("inputValue")}>Edit</button>
                      </div>
                    )
                  })
                }
              </div>
            </div>
        </div>
      </>
    )
}

export default PDEditor