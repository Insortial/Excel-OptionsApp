import React from 'react'
import InputSearch from "./InputSearch"
import { LotTableInterface } from './LotTableInterface'

type Props = {}

const LotTable = (lotTableDetails: LotTableInterface) => {
    const builderOptions : string[] = ["DR Horton", "Tri Pointe", "Richmond American", "Melia", "Dale", "Stella Pointe", "Lark"]
    const projectOptions : string[] = ["DR Horton", "Tri Pointe", "Richmond American", "Melia"]
    const foremanOptions : string[] = ["Adrian Gonzalez", "Eduardo Jimenez", "Rogelio", "Keith Kelley", "Leonard Schmidt"]
    const jobIDOptions : string[] = ["10167", "10152", "10102", "10023"]
    const boxOptions : string[] = ["Euro", "FaceFrame"]
    const noOptions : string[] = []

    return (
        <div className='exampleSection'>
            <table className='projectInfo'>
                <tbody>
                    <tr>
                        <th>Builder</th>
                        <th>Project</th>
                        <th>Phase</th>
                        <th>Superintendent</th>
                        <th>Phone</th>
                        <th>Area Foreman</th>
                    </tr>
                    <tr>
                        <td><InputSearch listOptions={builderOptions}></InputSearch></td>
                        <td><InputSearch listOptions={projectOptions}></InputSearch></td>
                        <td><InputSearch listOptions={noOptions}></InputSearch></td>
                        <td><InputSearch listOptions={noOptions}></InputSearch></td>
                        <td><InputSearch listOptions={noOptions}></InputSearch></td>
                        <td><InputSearch listOptions={foremanOptions}></InputSearch></td>
                    </tr>
                </tbody>
            </table>
            <table className='lotInfo'>
                <tbody>
                    <tr>
                        <th>Job ID</th>
                        <td><InputSearch listOptions={jobIDOptions}></InputSearch></td>
                    </tr>
                    <tr>
                        <th>Box Style</th>
                        <td><InputSearch listOptions={boxOptions}></InputSearch></td>
                    </tr>
                    <tr>
                        <th>Drawer Fronts</th>
                        <td><InputSearch listOptions={noOptions}></InputSearch></td>
                    </tr>
                    <tr>
                        <th>Drawer Boxes</th>
                        <td><InputSearch listOptions={noOptions}></InputSearch></td>
                    </tr>
                    <tr>
                        <th>Drawer Guides</th>
                        <td><InputSearch listOptions={noOptions}></InputSearch></td>
                    </tr>
                    <tr>
                        <th>Drawer Hinges</th>
                        <td><InputSearch listOptions={noOptions}></InputSearch></td>
                    </tr>
                    <tr>
                        <th>Interiors</th>
                        <td><InputSearch listOptions={noOptions}></InputSearch></td>
                    </tr>
                    <tr>
                        <th>Upper Height</th>
                        <td><InputSearch listOptions={noOptions}></InputSearch></td>
                    </tr>
                    <tr>
                        <th>Islands</th>
                        <td><InputSearch listOptions={noOptions}></InputSearch></td>
                    </tr>
                    <tr>
                        <th>Crown</th>
                        <td><InputSearch listOptions={noOptions}></InputSearch></td>
                    </tr>
                    <tr>
                        <th>Light Rail</th>
                        <td><InputSearch listOptions={noOptions}></InputSearch></td>
                    </tr>
                    <tr>
                        <th>Base Shoe</th>
                        <td><InputSearch listOptions={noOptions}></InputSearch></td>
                    </tr>
                    <tr>
                        <th>Recycling Bins</th>
                        <td><InputSearch listOptions={noOptions}></InputSearch></td>
                    </tr>
                    <tr>
                        <th>Job Specific Notes</th>
                        <td><textarea></textarea></td>
                    </tr>
                </tbody>
            </table>
            <table className='optionsInfo'>
                <tbody>
                    <tr>
                        <th>LOT</th>
                        <th>PLAN</th>
                        <th>Material/Stain</th>
                        <th>Option</th>
                        <th>Option PO</th>
                        <th>Notes:</th>
                    </tr>
                    <tr>
                        <td><input></input></td>
                        <td><input></input></td>
                        <td><input></input></td>
                        <td className="optionCell"><textarea></textarea></td>
                        <td><input></input></td>
                        <td><input></input></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default LotTable