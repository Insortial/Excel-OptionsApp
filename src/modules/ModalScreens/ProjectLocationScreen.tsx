import React, { useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import useFetch from '../../hooks/useFetch'
interface ProjectLocationScreen {
  getTableValues: (key: string) => string,
  selectedItem: number,
  locationValues: {longitude: string, latitude: string, Address: string, City: string, zipCode: string},
  turnOffModal: () => void
}

const ProjectLocationScreen:React.FC<ProjectLocationScreen> = ({getTableValues, selectedItem, locationValues, turnOffModal}) => {
  const {latitude, longitude, Address, City, zipCode} = locationValues
  const [locationMode, setLocationMode] = useState<"coords"|"address">("coords")
  const { register: registerCoords, getValues: getCoords, handleSubmit: handleCoordSubmit, setError: setCoordError, formState: {errors: coordErrors} } = useForm({ mode: "onSubmit", shouldUnregister: true, values: {latitude, longitude} })
  const { register: registerAddress, getValues: getAddress, handleSubmit: handleAddressSubmit, formState: {errors: addressErrors} } = useForm({ mode: "onSubmit", shouldUnregister: true, values: {Address, City, zipCode} })
  const fetchHook = useFetch()

  const locationOptions = {
    latitude: {required: "Latitude is required", pattern: {value: /^-?\d+(\.\d+)?$/, message: "Latitude must be a number"}},
    longitude: {required: "Longitude is required", pattern: {value: /^-?\d+(\.\d+)?$/, message: "Longitude must be a number"}},
    address: {required: "Address is required"},
    city: {required: "City is required"},
    zipCode: {required: "Zip Code is required"}
  }

  const setCoordinates = async () => {
    const projectID = getTableValues(`${selectedItem}.projectID`)

    const body = JSON.stringify({
      latitude: getCoords('latitude') || null,
      longitude: getCoords('longitude') || null
    })

    const response = await fetchHook(`/excelInfo/project/${projectID}/coordinates`, "PATCH", body, import.meta.env.VITE_EXCELINFO)
  
    if(response.ok) {
      turnOffModal()
    } else {
      setCoordError("latitude", {type: "manual", message: "Invalid coordinates"})
    }
  }

  const changeAddress = async (e: FieldValues) => {
    e.preventDefault()
    const projectID = getTableValues(`${selectedItem}.projectID`)

    const body = JSON.stringify({
      address: getAddress(`Address`) || null,
      city: getAddress(`City`) || null,
      zipCode: getAddress(`zipCode`) || null,
    })

    const response = await fetchHook(`/excelInfo/project/${projectID}/address`, "PATCH", body, import.meta.env.VITE_EXCELINFO)
  
    if(response.ok) {
      turnOffModal()
    }
  }

  const onError = (e: FieldValues) => {
    console.log(e)
  }

  return (
    <>
      <h2>Update Location: {getTableValues(`${selectedItem}~projectName`)}</h2>
      <div id="locationButtons">
        <button onClick={() => setLocationMode("coords")}>Coordinates</button>
        <button onClick={() => setLocationMode("address")}>Address</button>
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
          <input {...registerAddress("Address", locationOptions.address)}></input>
          <label>City</label>
          <input {...registerAddress("City", locationOptions.city)}></input>
          <label>Zip Code</label>
          <input {...registerAddress("zipCode", locationOptions.zipCode)}></input>
        </div>
        <button id="locationSubmit">Submit</button>
      </form>
    </>
  )
}

export default ProjectLocationScreen