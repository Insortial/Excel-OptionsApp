/* eslint-disable react/react-in-jsx-scope */
import { useContext, useState } from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom'
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
import { ColumnDetail } from '@excelcabinets/excel-types/ExcelObjectTypes'
import PDTableRow from './PDTableRow'

type CellValue = boolean | number | string | null

type ItemRow = {
  ID: number
} & Record<string, CellValue>

const PDEditor = () => {
  const navigate = useNavigate()
  const { level, items, pageNum, columnPageNum, totalColumnPages, totalPages, limit, columnLimit, columnDetails } = useLoaderData() as { level: "job"|"customer"|"project"|"lot",items: ItemRow[], pageNum: number, columnPageNum: number, totalColumnPages: number, totalPages: number, limit: number, columnLimit: number, columnDetails: ColumnDetail[] }
  const { retrieveDropDown } = useContext(FormOptionsContext) as FormOptionsContextType
  const { authState } = AuthInfo()
  const { roles } = authState
  const [modalType, setModalType] = useState("none")
  const [levelMenu, setLevelMenu] = useState(false)
  const [selectedItem, setSelectedItem] = useState(-1)
  const { register: registerFilters, reset: resetFilters, getValues: getFilterValues, formState: {isDirty: filterIsDirty} } = useForm()
  const levelMap = {'customer': 'Customers', 'project': 'Projects', 'job': 'Jobs', 'lot': 'Lots'}
  const isMeasure = roles.find(role => role === "MEASURE")

  const filterStringArr:string[] = []

  const retrieveData = async (selectedPage: number, selectedColumnPage: number, updatedFilters: boolean, selectedLevel=level, lotDate=false) => {
    if (selectedPage < 1 || (selectedPage > totalPages && totalPages != 0)) 
      return

    if(updatedFilters) {
      const filters = getFilterValues()
      Object.keys(filters).map((filterKey: string) => {
        const filterValue = filters[filterKey]
        if(/^(?!\s*$).+/.test(filterValue))
          filterStringArr.push(`${filterKey}=${filterValue}`)
      })
    }

    navigate(`/pdEditor/${selectedLevel}?page=${selectedPage}&limit=${limit}&columnPage=${selectedColumnPage}&columnLimit=${columnLimit}&${lotDate ? "date=true&" : ""}${filterStringArr.join("&")}`)
  }

  const navigateToInsertedRow = async (id: number) => {
    resetFilters({[`${level}ID`]: id})
    handleDataUpdate(1, 1, true)
  }

  const handleDataUpdate = async (selectedPage: number, selectedColumnPage: number, updatedFilters: boolean, selectedLevel=level, lotDate=false) => {
    await retrieveData(selectedPage, selectedColumnPage, updatedFilters, selectedLevel, lotDate)

    setSelectedItem(-1)
  }

  const updateFilters = () => {
    resetFilters(getFilterValues())
    handleDataUpdate(1, 1, true)
  }

  const changeLevel = (levelType: "job"|"customer"|"project"|"lot") => {
    handleDataUpdate(1, 1, false, levelType)
    setLevelMenu(false)
  }

  //Lot Date Feature
/*   const switchLotDateMode = () => {
    retrieveData(currentPage, currentColumnPage, false, "lot", !dateMode)
    setDateMode(!dateMode)
  } */

  const turnOffModal = () => {
    setModalType("none")
    handleDataUpdate(pageNum, columnPageNum, false)
  }

  const resetTableFilters = () => {
    resetFilters({customer: "", project: "", job: "", customerID: "", projectID: "", jobID: "", lotID: ""})
    handleDataUpdate(1, 1, true)
  }

  return (
    <>
      <OptionsCreatorModal modalType={modalType} turnOffModal={turnOffModal}>
        {(() => {
          switch(modalType) {
            case "location":
              return <ProjectLocationScreen selectedItem={selectedItem} turnOffModal={turnOffModal}/>
            case "edit":
              return <EditAndCreatePD currentLevel={level} columnDetails={columnDetails} levelMap={levelMap} navigateToInsertedRow={navigateToInsertedRow} setModalType={setModalType}/>
            default:
              return null
          }
        })()}
      </OptionsCreatorModal>
      {/* <Notification /> */}
      <div id="jobMenuScreen" style={{backgroundColor: "#f0f0f0"}}>
          <Header currentPage="pdEditor"/>
          <div id="pdBody">
            <header id="pdHeader">
              <h1>Excel Production & Delivery <span onClick={() => setLevelMenu(!levelMenu)}>{capitalizeString(level)}<span id="lastLetter">▼</span></span></h1>
              {!isMeasure && <div id="headerDropDown" style={{top: levelMenu ? "96%" : "80%"}}>
                <h4 onClick={() => changeLevel("customer")}>Customer</h4>
                <h4 onClick={() => changeLevel("project")}>Project</h4>
                <h4 onClick={() => changeLevel("job")}>Job</h4>
                <h4 onClick={() => changeLevel("lot")}>Lot</h4>
              </div>}
              <PDFilters currentLevel={level} filterArray={filterStringArr} registerFilters={registerFilters} retrieveDropDown={retrieveDropDown} resetTableFilters={resetTableFilters} updateFilters={updateFilters} filterIsDirty={filterIsDirty}/>
            </header>
            <div id="pdTable">
              <section id="pageNavigation">
                <button id="createButton" onClick={() => setModalType('edit')}>New {capitalizeString(level)}</button>
                <div id="columnNavigation">
                  <h5>Column Pages: </h5>
                  {Array.from({ length: totalColumnPages }, (_, i) => ++i).map((colPageNum) => {
                    return (
                      <button style={{backgroundColor: colPageNum === columnPageNum ? "#572e38ff" : "#aa596d"}} key={colPageNum} onClick={() => handleDataUpdate(pageNum, colPageNum, false)}>{colPageNum}</button>
                    )
                  })}
                </div>
                {/* <button onClick={() => switchLotDateMode()}>Date Mode</button> */}
                <div id="itemNavigation">
                  <button className='outerButton' onClick={() => handleDataUpdate(1, columnPageNum, false)}>&lt;&lt;</button>
                  <button className='innerButton' onClick={() => handleDataUpdate(pageNum - 1, columnPageNum, false)}>Previous</button>
                  <h3>Page {pageNum} of {totalPages}</h3>
                  <button className='innerButton' onClick={() => handleDataUpdate(pageNum + 1, columnPageNum, false)}>Next</button>
                  <button className='outerButton' onClick={() => handleDataUpdate(totalPages, columnPageNum, false)}>&gt;&gt;</button>  
                </div>
              </section>
              <section className='pdRow'>
                <div className='pdCellSection'>
                {items.length > 0 && Object.keys(items[0]).map((key, index) => {
                    return (
                      <h4 key={index}>{key.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/^[a-z]/, letter => letter.toUpperCase())}</h4>
                    )
                  })
                }
                </div>
              </section>
              {items.length > 0 && items.map((item, itemIndex) => {
                  const editingRow = item.ID === selectedItem

                  return <PDTableRow key={itemIndex} itemIndex={itemIndex} editingRow={editingRow} item={item} columnDetails={columnDetails}
                            level={level} levelMap={levelMap} setSelectedItem={setSelectedItem} setModalType={setModalType} retrieveData={retrieveData}
                            pagination={{pageNum, columnPageNum}}/>
                })
              }
            </div>
          </div>
      </div>
    </>
  )
}

export default PDEditor