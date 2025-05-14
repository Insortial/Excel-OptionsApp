import React, { useState } from 'react'
import {  FieldValues, UseFormRegister } from 'react-hook-form'
import useFetch from '../../hooks/useFetch'
interface ProjectLocationScreen {
  getTableValues: (key: string) => string,
  selectedItem: number,
  setModalType: React.Dispatch<React.SetStateAction<string>>,
  getModalValues: (key: string) => string,
  registerModal: UseFormRegister<FieldValues>,
  turnOffModal: () => void
}

const ProjectLocationScreen:React.FC<ProjectLocationScreen> = ({getTableValues, selectedItem, registerModal, getModalValues, turnOffModal}) => {
  const [locationMode, setLocationMode] = useState<"coords"|"address">("coords")
  const fetchHook = useFetch()

  const setCoordinates = async () => {
    const projectID = getTableValues(`${selectedItem}.projectID`)

    const body = JSON.stringify({
      latitude: getModalValues(`latitude`) || null,
      longitude: getModalValues(`longitude`) || null
    })

    const response = await fetchHook(`/excelInfo/project/${projectID}/coordinates`, "PATCH", body, import.meta.env.VITE_EXCELINFO)
  
    if(response.ok) {
      turnOffModal()
    }
  }

  const setAddress = async () => {
    const projectID = getTableValues(`${selectedItem}.projectID`)

    const body = JSON.stringify({
      address: getModalValues(`address`) || null,
      city: getModalValues(`city`) || null,
      zipCode: getModalValues(`zipCode`) || null,
    })

    const response = await fetchHook(`/excelInfo/project/${projectID}/address`, "PATCH", body, import.meta.env.VITE_EXCELINFO)
  
    if(response.ok) {
      turnOffModal()
    }
  }

  return (
    <>
      <h2>Update Location: {getTableValues(`${selectedItem}~projectName`)}</h2>
      <div id="locationButtons">
        <button onClick={() => setLocationMode("coords")}>Coordinates</button>
        <button onClick={() => setLocationMode("address")}>Address</button>
      </div>
        <div id="coordDiv" style={{ display: locationMode === "coords" ? "grid" : "none" }}>
          <label>Latitude</label>
          <label>Longitude</label>
          <input {...registerModal("latitude")}></input>
          <input {...registerModal("longitude")}></input>
        </div> 
        <div id="addressDiv" style={{ display: locationMode === "address" ? "grid" : "none" }}>
          <label>Address</label>
          <input {...registerModal("address")}></input>
          <label>City</label>
          <input {...registerModal("city")}></input>
          <label>Zip Code</label>
          <input {...registerModal("zipCode")}></input>
        </div>
      <button onClick={() => locationMode === "coords" ? setCoordinates() : setAddress()} id="locationSubmit">Submit</button>
    </>
  )
}

export default ProjectLocationScreen