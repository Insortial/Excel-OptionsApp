/* eslint-disable react/react-in-jsx-scope */
import { useContext, useState } from 'react'
import { Link, useLoaderData, useNavigate } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import { useForm } from 'react-hook-form'
import OptionsCreatorModal from './OptionsCreatorModal'
import ProjectLocationScreen from './ModalScreens/ProjectLocationScreen'
import { FormOptionsContext } from '../context/OptionsTemplateContext'
import { FormOptionsContextType } from '../types/FormOptions'
import { AuthInfo, LoggedInUpdate } from '../context/AuthContext'
import { DecodedToken } from '../types/AuthContextTypes'
import { jwtDecode } from 'jwt-decode'

const PDEditor = () => {
    const fetchHook = useFetch()
    const navigate = useNavigate()
    const { accessToken } = AuthInfo()
    const { saveLogInState } = LoggedInUpdate()
    const { items, pageNum, totalPages, limit } = useLoaderData() as {items: {[key:string]:string}[], pageNum: number, totalPages: number, limit: number}
    const { retrieveDropDown } = useContext(FormOptionsContext) as FormOptionsContextType
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
    const { register: registerModal, reset: resetModal, getValues: getModalValues, setValue: setModalValue } = useForm()
    const buttonTitle = {job: "Edit", project: "Location", customer: "Edit", lot: "Edit"}
    const decodedToken:DecodedToken|undefined = accessToken !== "token" ? jwtDecode(accessToken) : undefined
    const isMeasure = decodedToken !== undefined && decodedToken.roles.find(role => role === "MEASURE")


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
      resetModal()
    }

    const openLocationModal = (index: number) => {
      setSelectedItem(index)
      setModalType("location")
      setModalValue("latitude", getTableValues(`${index}.latitude`))
      setModalValue("longitude", getTableValues(`${index}.longitude`))
      setModalValue("address", getTableValues(`${index}.Address`))
      setModalValue("city", getTableValues(`${index}.City`))
      setModalValue("zipCode", getTableValues(`${index}.zipCode`))

      console.log(getTableValues(`${index}`))
    }

    const resetTableFilters = () => {
      resetFilters({customer: "", project: "", job: "", customerID: "", projectID: "", jobID: ""})
      retrieveData(1, true)
    }

    const logOut = async () => {
      const config:RequestInit = {
          method: 'DELETE',
          credentials: "include"
      }
      await fetch(`${import.meta.env.VITE_AUTH_URL}/logout`, config)
      saveLogInState(false)
      navigate("/login", { replace: true })
    }


    return (
      <>
        <OptionsCreatorModal modalType={modalType} turnOffModal={turnOffModal}>
          <ProjectLocationScreen getTableValues={getTableValues} selectedItem={selectedItem} setModalType={setModalType} getModalValues={getModalValues} registerModal={registerModal} turnOffModal={turnOffModal}/>
        </OptionsCreatorModal>
        <div id="jobMenuScreen" style={{backgroundColor: "#f0f0f0"}}>
            <header id="jobMenuHeader" style={{justifyContent: "flex-end", minHeight: "80px"}}>
                <h4 id="logOutButtonHeader" onClick={() => logOut()}>Logout</h4>
                {!isMeasure && <nav>
                    <Link to="/creatingJob" className='jobMenuButtons'>Create Job Document</Link>
                    <Link to="/creatingJobPackage" className='jobMenuButtons'>Edit/Create Job Package</Link>
                    <Link to="/jobMenu" className='jobMenuButtons'>View Job Menu</Link>
                </nav>}
            </header>
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