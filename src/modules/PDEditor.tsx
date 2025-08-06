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

        setFilterArray(filterStringArr)
        setCurrentPage(pageNum)
        setNumOfPages(totalPages)
        resetTableValues()
        setItemList(items)
    }

    const updateFilters = () => {
      resetFilters(getFilterValues())
      retrieveData(1, true)
    }

    const changeLevel = (levelType: "job"|"customer"|"project"|"lot") => {
      setCurrentLevel(levelType)
      retrieveData(1, false, levelType)
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
      retrieveData(currentPage, false)
    }

    const openLocationModal = (index: number) => {
      setSelectedItem(index)
      setModalType("location")
    }

    const resetTableFilters = () => {
      resetFilters({customer: "", project: "", job: "", customerID: "", projectID: "", jobID: ""})
      retrieveData(1, true)
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
                  </div>
                </section>
              </header>
              <div id="pdTable">
                <section id="pageNavigation">
                  {/* <button onClick={() => switchLotDateMode()}>Date Mode</button> */}
                  <button className='outerButton' onClick={() => retrieveData(1, false)}>&lt;&lt;</button>
                  <button className='innerButton' onClick={() => retrieveData(currentPage - 1, false)}>Previous</button>
                  <h3>Page {currentPage} of {numOfPages}</h3>
                  <button className='innerButton' onClick={() => retrieveData(currentPage + 1, false)}>Next</button>
                  <button className='outerButton' onClick={() => retrieveData(numOfPages, false)}>&gt;&gt;</button>
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