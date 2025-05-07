import React from 'react'
import { OptionsCreatorObject } from '../types/ModalTypes'

interface AddingLotModal {
    optionsCreatorObject: OptionsCreatorObject,
    modalInputValue: string,
    handleInputChange: (event: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) => void
}

const AddingLotModal:React.FC<AddingLotModal> = ({ optionsCreatorObject, modalInputValue, handleInputChange }) => {
    const { handlePackageDetailsChange, addLotTable, listOfLots, isOptionsMode, hasPackage, 
            packageDetails: {packageName, planName, packages, plans}, 
            jobDetails: {lotNums} } = optionsCreatorObject

    return (
        <>
            <h2>Enter {isOptionsMode ? "Lot Number" : "Plan Name"}:</h2>
            <div className="modalRow">
                {isOptionsMode ? (
                <select value={modalInputValue} onChange={handleInputChange}>
                    {lotNums.map((lotInfo, index) => {
                        if(!listOfLots?.find((lot) => lot.lot === lotInfo.lotNum)) {
                            return <option key={index} value={lotInfo.lotNum}>{lotInfo.lotNum}</option>
                        }
                    })}
                </select> ) : (
                    <input value={modalInputValue} onChange={handleInputChange}></input>
                )}
                <button onClick={addLotTable}>Submit</button>
            </div>
            {hasPackage && <>
                <div className="modalPlanRow">
                    <label>Package:</label>
                    <select value={packageName} onChange={e => handlePackageDetailsChange(e.target.value, "packageName")}>
                        <option value="None">None</option>
                        {packages.map((packageName, index) => {
                            return <option key={index} value={packageName}>{packageName}</option>
                        })}
                    </select>
                </div>
                {!["", "None"].includes(packageName) &&
                <div className="modalPlanRow">
                    <label>Plan Type:</label>
                    <select value={planName} onChange={e => handlePackageDetailsChange(e.target.value, "planName")}>
                        <option value="None">None</option>
                        {plans.filter(plan => plan.packageName === packageName).map((lotTable, index) => {
                            return <option key={index} value={lotTable.plan}>{lotTable.plan}</option>
                        })}
                    </select>
                </div>}
            </>}
        </>
    )
}

export default AddingLotModal