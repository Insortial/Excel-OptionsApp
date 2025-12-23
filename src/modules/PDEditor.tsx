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
import PDFilters from './PDFilters'
import EditAndCreatePD from './ModalScreens/EditAndCreatePD'
import capitalizeString from '../hooks/capitalizeString'

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
  const [dateMode, setDateMode] = useState(false)
  const [levelMenu, setLevelMenu] = useState(false)
  const [selectedItem, setSelectedItem] = useState(-1)
  const { register: registerFilters, reset: resetFilters, getValues: getFilterValues, formState: {isDirty: filterIsDirty} } = useForm()
  const { register: registerTableValues, reset: resetTableValues, getValues: getTableValues } = useForm()
  const buttonTitle = {job: "Edit", project: "Location", customer: "Edit", lot: "Edit"}
  const isMeasure = roles.find(role => role === "MEASURE")


/*   const identityArray = ['customerID', 'projectID', 'jobID'] */

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
    cancelEdit()
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

  //Lot Date Feature
  const switchLotDateMode = () => {
    retrieveData(currentPage, false, "lot", !dateMode)
    setDateMode(!dateMode)
  }

  const turnOffModal = () => {
    setModalType("none")
    handleDataUpdate(currentPage, false)
  }

  const openLocationModal = (index: number) => {
    setSelectedItem(index)
    setModalType("location")
  }

  const updateSelectedRow = async (selectedIndex: number) => {
    const selectedRow = getTableValues(`${selectedIndex}`)
    const id = selectedRow.ID
    
    const body = JSON.stringify(selectedRow)
    console.log(body)

    const response = await fetchHook(`/excelInfo/${currentLevel}/${id}`, "PATCH", body, import.meta.env.VITE_EXCELINFO)
    
    if (!response.ok) {
      console.error("Error fetching data")
      return
    }

    handleDataUpdate(currentPage, false)
    setSelectedItem(-1)
  }

  const selectRowEdit = (selectedIndex: number) => {
    setSelectedItem(selectedIndex)
    resetTableValues()
  }

  const cancelEdit = () => {
    setSelectedItem(-1)
    resetTableValues()
  }

  const resetTableFilters = () => {
    resetFilters({customer: "", project: "", job: "", customerID: "", projectID: "", jobID: ""})
    handleDataUpdate(1, true)
  }

  return (
    <>
      <OptionsCreatorModal modalType={modalType} turnOffModal={turnOffModal}>
        {(() => {
          switch(modalType) {
            case "location":
              return <ProjectLocationScreen getTableValues={getTableValues} selectedItem={selectedItem} turnOffModal={turnOffModal}/>
            case "edit":
              return <EditAndCreatePD currentLevel={currentLevel} selectedItem={selectedItem} getTableValues={getTableValues}/>
            default:
              return null
          }
        })()}
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
              <PDFilters currentLevel={currentLevel} filterArray={filterArray} registerFilters={registerFilters} retrieveDropDown={retrieveDropDown} resetTableFilters={resetTableFilters} updateFilters={updateFilters} filterIsDirty={filterIsDirty}/>
            </header>
            <div id="pdTable">
              <section id="pageNavigation">
                <button onClick={() => switchLotDateMode()}>Date Mode</button>
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
                  const editingRow = itemIndex === selectedItem

                  return (
                    <div className={`pdRow ${editingRow ? 'selected' : ''}`} key={itemIndex}>
                      <div className='pdCellSection'>
                        {Object.keys(job).map((key: string, index) => {
                          const isDate = key.toLowerCase().includes("date") || key.includes("ETA")
                          return (
                            <input readOnly={['ID'].includes(key)} disabled={!editingRow} key={index} type={isDate ? "date" : "text"} {...registerTableValues(`${itemIndex}.${key}`, {value: isDate && job[key] ? job[key].split('T')[0] : job[key]})}/>
                          )
                        })}
                      </div>
                      <div className='rowButtons'>
                        {currentLevel === "project" && <button className='rowButton location' onClick={() => openLocationModal(itemIndex)}>{buttonTitle[currentLevel]}</button>}
                        {!editingRow ? <button className={`rowButton ${editingRow ? 'hidden' : ''}`} onClick={() => selectRowEdit(itemIndex)}>Edit</button>
                        : <button className={`cancel rowButton ${!editingRow ? 'hidden' : ''}`} onClick={() => cancelEdit()}>Cancel</button>}
                        <button className={`submit rowButton ${!editingRow ? 'hidden' : ''}`} onClick={() => updateSelectedRow(itemIndex)}>Submit</button>
                      </div>
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