import React, { useEffect, useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import useFetch from '../../hooks/useFetch'

interface LocationValues {
  longitude: number, 
  latitude: number, 
  address: string, 
  city: string, 
  zipCode: number,
  ID: string,
  projectName: string
}

interface ProjectLocationScreen {
  selectedItem: number,
  turnOffModal: () => void
}

const ProjectLocationScreen:React.FC<ProjectLocationScreen> = ({ selectedItem, turnOffModal}) => {
  const [locationMode, setLocationMode] = useState<"coords"|"address">("coords")
  const [projectName, setProjectName] = useState('')
  const { register: registerCoords, getValues: getCoords, handleSubmit: handleCoordSubmit, setError: setCoordError, reset: resetCoords, formState: {errors: coordErrors} } = useForm({ mode: "onSubmit", shouldUnregister: true, values: {latitude: 0, longitude: 0} })
  const { register: registerAddress, getValues: getAddress, handleSubmit: handleAddressSubmit, reset: resetAddress, formState: {errors: addressErrors} } = useForm({ mode: "onSubmit", shouldUnregister: true, values: {address: '', city: '', zipCode: 0} })
  const fetchHook = useFetch()
  
  const retrieveAddressData = async () => {
    const response = await fetchHook(`/excelInfo/project/?projectID=${selectedItem}&columnLimit=100`, "GET", undefined, import.meta.env.VITE_EXCELINFO)
    
    if(!response.ok) {
      return
    }

    const itemInfo = (await response.json()).items[0] as LocationValues
    const { latitude, longitude, address, city, zipCode, projectName } = itemInfo

    resetCoords({ latitude, longitude })
    resetAddress({ address, city, zipCode })
    setProjectName(projectName)
    setLocationMode("coords")
  }

  const locationOptions = {
    latitude: {required: "Latitude is required", pattern: {value: /^-?\d+(\.\d+)?$/, message: "Latitude must be a number"}},
    longitude: {required: "Longitude is required", pattern: {value: /^-?\d+(\.\d+)?$/, message: "Longitude must be a number"}},
    address: {required: "Address is required"},
    city: {required: "City is required"},
    zipCode: {required: "Zip Code is required"}
  }

  const setCoordinates = async () => {
    const body = JSON.stringify({
      latitude: getCoords('latitude') || null,
      longitude: getCoords('longitude') || null
    })

    const response = await fetchHook(`/excelInfo/project/${selectedItem}/coordinates`, "PATCH", body, import.meta.env.VITE_EXCELINFO)
  
    if(response.ok) {
      turnOffModal()
    } else {
      setCoordError("latitude", {type: "manual", message: "Invalid coordinates"})
    }
  }

  const changeAddress = async () => {
    const body = JSON.stringify({
      address: getAddress(`address`) || null,
      city: getAddress(`city`) || null,
      zipCode: getAddress(`zipCode`) || null,
    })

    const response = await fetchHook(`/excelInfo/project/${selectedItem}/address`, "PATCH", body, import.meta.env.VITE_EXCELINFO)
  
    if(response.ok) {
      turnOffModal()
    }
  }

  const onError = (e: FieldValues) => {
    console.log(e)
  }

  useEffect(() => {
    retrieveAddressData()
  }, [selectedItem])

  return (
    <>
      <h2>Update Location: {projectName}</h2>
      <div id="locationButtons">
        <button onClick={() => setLocationMode("coords")} className={locationMode === "coords" ? "selectedButton" : ""}>Coordinates</button>
        <button onClick={() => setLocationMode("address")} className={locationMode !== "coords" ? "selectedButton" : ""}>Address</button>
      </div>
      <form id="locationForm" style={{ display: locationMode === "coords" ? "grid" : "none" }} onSubmit={handleCoordSubmit(setCoordinates, onError)}>
        <div id="coordDiv">
          <label>Latitude</label>
          <label>Longitude</label>
          <input {...registerCoords("latitude", locationOptions.latitude)}></input>
          <input {...registerCoords("longitude", locationOptions.longitude)}></input>
          <p>{coordErrors.latitude?.message}</p>
          <p>{coordErrors.longitude?.message}</p>
        </div> 
        <button id="locationSubmit">Submit</button>
      </form> 
      <form id="locationForm" style={{ display: locationMode === "address" ? "grid" : "none" }} onSubmit={handleAddressSubmit(changeAddress, onError)}>
        <div id="addressDiv">
          <label>Address</label>
          <input {...registerAddress("address", locationOptions.address)}></input>
          <p className='addressError'>{addressErrors.address?.message}</p>
          <label>City</label>
          <input {...registerAddress("city", locationOptions.city)}></input>
          <p className='addressError'>{addressErrors.city?.message}</p>
          <label>Zip Code</label>
          <input {...registerAddress("zipCode", locationOptions.zipCode)}></input>
          <p className='addressError'>{addressErrors.zipCode?.message}</p>
        </div>
        <button id="locationSubmit">Submit</button>
      </form>
    </>
  )
}

export default ProjectLocationScreen