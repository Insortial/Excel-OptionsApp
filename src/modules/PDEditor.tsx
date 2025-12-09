/* eslint-disable react/react-in-jsx-scope */
import { useContext, useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import { useForm } from 'react-hook-form'
import OptionsCreatorModal from './OptionsCreatorModal'
import ProjectLocationScreen from './ModalScreens/ProjectLocationScreen'
import { FormOptionsContext } from '../context/OptionsTemplateContext'
import { FormOptionsContextType } from '@excelcabinets/excel-types/FormOptions'
import Header from './Header'
import { AuthInfo } from '../context/AuthContext'

const PDEditor = () => {
    const fetchHook = useFetch()
    const { items, pageNum, totalPages, limit } = useLoaderData() as {items: {[key:string]:string}[], pageNum: number, totalPages: number, limit: number}
    const { retrieveDropDown } = useContext(FormOptionsContext) as FormOptionsContextType
    const { authState } = AuthInfo()
    const { roles } = authState
    const [itemList, setItemList] = useState(items)
    const [modalType, setModalType] = useState("none")
    const [currentLevel, setCurrentLevel] = useState<"job"|"customer"|"project"|"lot">("project")
    const [currentPage, setCurrentPage] = useState<number>(pageNum)
    const [numOfPages, setNumOfPages] = useState<number>(totalPages)
    const [filterArray, setFilterArray] = useState<string[]>([])
    /* const [dateMode, setDateMode] = useState(false) */
    const [levelMenu, setLevelMenu] = useState(false)
    const [selectedItem, setSelectedItem] = useState(-1)
    const { register: registerFilters, reset: resetFilters, getValues: getFilterValues, formState: {isDirty: filterIsDirty} } = useForm()
    const { register: registerTableValues, reset: resetTableValues, getValues: getTableValues } = useForm()
    const buttonTitle = {job: "Edit", project: "Location", customer: "Edit", lot: "Edit"}
    const isMeasure = roles.find(role => role === "MEASURE")

    const retrieveData = async (selectedPage: number, updatedFilters: boolean, selectedLevel=currentLevel, lotDate=false) => {
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

        const response = await fetchHook(`/excelInfo/${selectedLevel}?page=${selectedPage}&limit=${limit}&${lotDate ? "date=true&" : ""}${filterStringArr.join("&")}`, "GET", undefined, import.meta.env.VITE_EXCELINFO)
        const {pageNum, totalPages, items} = await response.json()
        if (!response.ok) {
            console.error("Error fetching data")
            return
        }

        return { filterStringArr, pageNum, totalPages, items }
    }

    const handleDataUpdate = async (selectedPage: number, updatedFilters: boolean, selectedLevel=currentLevel, lotDate=false) => {
        const result = await retrieveData(selectedPage, updatedFilters, selectedLevel, lotDate)
        if (!result) return

        const { filterStringArr, pageNum, totalPages, items } = result
        setFilterArray(filterStringArr)
        setCurrentPage(pageNum)
        setNumOfPages(totalPages)
        resetTableValues()
        setItemList(items)
    }

    const updateFilters = () => {
      resetFilters(getFilterValues())
      handleDataUpdate(1, true)
    }

    const changeLevel = (levelType: "job"|"customer"|"project"|"lot") => {
      setCurrentLevel(levelType)
      handleDataUpdate(1, false, levelType)
      setLevelMenu(false)
    }

    /* Lot Date Feature
    const switchLotDateMode = () => {
      retrieveData(currentPage, limit, false, "lot", !dateMode)
      setDateMode(!dateMode)
    } */

    const capitalizeString = (val:string) => {
      return val.charAt(0).toUpperCase() + val.slice(1);
    }

    const turnOffModal = () => {
      setModalType("none")
      handleDataUpdate(currentPage, false)
    }

    const openLocationModal = (index: number) => {
      setSelectedItem(index)
      setModalType("location")
    }

    const resetTableFilters = () => {
      resetFilters({customer: "", project: "", job: "", customerID: "", projectID: "", jobID: ""})
      handleDataUpdate(1, true)
    }

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
      <>
        <OptionsCreatorModal modalType={modalType} turnOffModal={turnOffModal}>
          {selectedItem !== -1 && <ProjectLocationScreen getTableValues={getTableValues} selectedItem={selectedItem} turnOffModal={turnOffModal}/>}
        </OptionsCreatorModal>
        <div id="jobMenuScreen" style={{backgroundColor: "#f0f0f0"}}>
            <Header currentPage="pdEditor"/>
            <div id="pdBody">
              <header id="pdHeader">
                <h1>Excel Production & Delivery <span onClick={() => setLevelMenu(!levelMenu)}>{capitalizeString(currentLevel)}<span id="lastLetter">▼</span></span></h1>
                {!isMeasure && <div id="headerDropDown" style={{top: levelMenu ? "96%" : "80%"}}>
                  <h4 onClick={() => changeLevel("customer")}>Customer</h4>
                  <h4 onClick={() => changeLevel("project")}>Project</h4>
                  <h4 onClick={() => changeLevel("job")}>Job</h4>
                  <h4 onClick={() => changeLevel("lot")}>Lot</h4>
                </div>}
                <section id="pdFilters">
                  <div className='filterSection'>
                    {["customer", "job", "project", "lot"].includes(currentLevel) && 
                    <>
                      <label>Customer:</label>
                      <select {...registerFilters("customer")}>
                        <option value="">None</option>
                        {retrieveDropDown("builder").map((builder, idx) => {
                          return <option key={idx} value={builder}>{builder}</option>
                        })}
                      </select>
                    </>}
                    {["job", "project", "lot"].includes(currentLevel) && 
                    <>
                      <label>Project:</label>
                      <select {...registerFilters("project")}>
                        <option value="">None</option>
                        {retrieveDropDown("project").map((project, idx) => {
                          return <option key={idx} value={project}>{project}</option>
                        })}
                      </select>
                    </>}
                    {["job", "lot"].includes(currentLevel) && 
                    <>
                      <label>Job:</label>
                      <select {...registerFilters("job")}>
                        <option value="">None</option>
                        {retrieveDropDown("job").map((builder, idx) => {
                          return <option key={idx} value={builder}>{builder}</option>
                        })}
                      </select>
                    </>}
                    <button onClick={() => resetTableFilters()}>Reset Filters</button>
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
                    <button id="downloadCSV" onClick={() => downloadCSV()}>Download CSV</button>
                  </div>
                </section>
              </header>
              <div id="pdTable">
                <section id="pageNavigation">
                  {/* <button onClick={() => switchLotDateMode()}>Date Mode</button> */}
                  <button className='outerButton' onClick={() => handleDataUpdate(1, false)}>&lt;&lt;</button>
                  <button className='innerButton' onClick={() => handleDataUpdate(currentPage - 1, false)}>Previous</button>
                  <h3>Page {currentPage} of {numOfPages}</h3>
                  <button className='innerButton' onClick={() => handleDataUpdate(currentPage + 1, false)}>Next</button>
                  <button className='outerButton' onClick={() => handleDataUpdate(numOfPages, false)}>&gt;&gt;</button>
                </section>
                <section className='pdRow'>
                  <div className='pdCellSection'>
                  {itemList.length > 0 && Object.keys(itemList[0]).map((key, index) => {
                      return (
                        <h4 key={index}>{key.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/^[a-z]/, letter => letter.toUpperCase())}</h4>
                      )
                    })
                  }
                  </div>
                </section>
                {itemList.length > 0 && itemList.map((job, itemIndex) => {
                    return (
                      <div className='pdRow' key={itemIndex}>
                        <div className='pdCellSection'>
                          {Object.keys(job).map((key: string, index) => {
                            const isDate = key.toLowerCase().includes("date") || key.includes("ETA")
                            return (
                              <input key={index} type={isDate ? "date" : "text"} {...registerTableValues(`${itemIndex}.${key}`, {value: isDate && job[key] ? job[key].split('T')[0] : job[key]})}/>
                            )
                          })}
                        </div>
                        <button className='rowButton' onClick={() => openLocationModal(itemIndex)}>{buttonTitle[currentLevel]}</button>
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