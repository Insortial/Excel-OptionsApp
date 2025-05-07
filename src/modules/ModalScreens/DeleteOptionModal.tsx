import React from 'react'
import { JobMenuObject, PackageObject } from '../../types/ModalTypes'
import useFetch from '../../hooks/useFetch'

interface DeleteOptionModal {
  jobMenuObject?: JobMenuObject,
  packageObject?: PackageObject,
  turnOffModal: () => void
}

const DeleteOptionModal:React.FC<DeleteOptionModal> = ({jobMenuObject, packageObject, turnOffModal}) => {
  const fetchHook = useFetch()
  if(jobMenuObject && jobMenuObject.jobDocument) {
    const {jobDocument: {jobOptionID, customerName, projectName, jobID}, refreshJobMenu, setDeleteMode } = jobMenuObject
  
    const deleteJobOption = () => {
        fetchHook(`/deleteJobOption/${jobOptionID}`, "DELETE")
        .then((response) =>{
            if(response.status === 200) {
                refreshJobMenu()
                setDeleteMode(false)
                turnOffModal()
            } else {
                turnOffModal()
            }
            
        })
        .catch((error) => console.error(error));
    }

    return <>
      <h2>Are You Sure You Want To Delete Options?</h2>
      <h3>{customerName} - {projectName} Job ID: {jobID}</h3>
      <div className="modalButtonRow">
          <button onClick={() => deleteJobOption()}>YES</button>
          <button onClick={() => turnOffModal()}>NO</button>
      </div>
    </>

  } else if (packageObject && packageObject.packageDetails) {
    const { packageDetails: {packageID, packageName, projectName}, refreshPackages } = packageObject

    const deletePackage = () => {
      fetchHook(`/deletePackage/${packageID}`, "DELETE")
      .then((response) =>{
          if(response.status === 200) {
              refreshPackages()
              turnOffModal()
          } else {
              turnOffModal()
          }  
      })
      .catch((error) => console.error(error));
    }  

    return <>
      <h2>Are You Sure You Want To Delete Package?</h2>
      <h3>{packageName} - {projectName}</h3>
      <div className="modalButtonRow">
          <button onClick={() => deletePackage()}>YES</button>
          <button onClick={() => turnOffModal()}>NO</button>
      </div>
    </>
  }
}

export default DeleteOptionModal