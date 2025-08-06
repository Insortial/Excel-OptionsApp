import React from 'react'
import InputSearch from './InputSearch'
import ControlledTextArea from './ControlledTextArea';
import { JobDetails, LotTableInterface } from '@excelcabinets/excel-types/LotTableInterface';
import { UseFormGetValues } from 'react-hook-form';

type OptionsLotInfo = {
    isOptionsMode: boolean;
    currentIDX: number;
    editingPartsOfLot: boolean;
    onFormChange: (value: string, key: string) => void;
    onFormJobChange: (value: string, key: string) => void;
    getJobValues: UseFormGetValues<JobDetails>;
    getLotListValues: UseFormGetValues<{lots: LotTableInterface[]}>;
}

const OptionsLotInfo: React.FC<OptionsLotInfo> = ({isOptionsMode, currentIDX, editingPartsOfLot, onFormChange, onFormJobChange, getJobValues, getLotListValues}) => {
  return (
    <>
        <table className='lotInfo'>
            <tbody>
                {isOptionsMode ? (
                    <tr>
                        <th>Job ID</th>
                        <td><InputSearch inputName={"jobID"} onFormChange={onFormJobChange} isDropDown={false} locked={true} getFormValues={getJobValues}></InputSearch></td>
                    </tr>
                ) : <tr>
                        <th>Builder</th>
                        <td><InputSearch inputName={"builder"} onFormChange={onFormJobChange} isDropDown={true} getFormValues={getJobValues}></InputSearch></td>
                    </tr>}
                <tr>
                    <th>Box Style</th>
                    <td><InputSearch inputName={`lots.${currentIDX}.boxStyle`}  onFormChange={onFormChange} isDropDown={true} locked={editingPartsOfLot} getFormValues={getLotListValues}></InputSearch></td>
                </tr>
                <tr>
                    <th>Drawer Fronts</th>
                    <td>
                        <InputSearch inputName={`lots.${currentIDX}.drawerFronts`}  onFormChange={onFormChange} isDropDown={true} locked={editingPartsOfLot} getFormValues={getLotListValues}></InputSearch>
                    </td>
                </tr>
                <tr>
                    <th>Drawer Boxes</th>
                    {/* Look at changing this Input Search */}
                    <td>
                        <InputSearch inputName={`lots.${currentIDX}.drawerBoxes`}  onFormChange={onFormChange} isDropDown={true} locked={editingPartsOfLot} getFormValues={getLotListValues}></InputSearch>
                    </td>
                </tr>
                <tr>
                    <th>Drawer Guides</th>
                    {/* Look at changing this Input Search */}
                    <td>
                        <InputSearch inputName={`lots.${currentIDX}.drawerGuides`} onFormChange={onFormChange} isDropDown={true} locked={editingPartsOfLot} getFormValues={getLotListValues}></InputSearch>
                    </td>
                </tr>
                <tr>
                    <th>Door Hinges</th>
                    {/* Look at changing this Input Search */}
                    <td>
                        <InputSearch inputName={`lots.${currentIDX}.doorHinges`}  onFormChange={onFormChange} isDropDown={true} locked={editingPartsOfLot} getFormValues={getLotListValues}></InputSearch>
                    </td>
                </tr>
                <tr>
                    <th>Interiors</th>
                    {/* Look at changing this Input Search */}
                    <td><InputSearch inputName={`lots.${currentIDX}.interiors`}  onFormChange={onFormChange} isDropDown={true} locked={editingPartsOfLot} getFormValues={getLotListValues}></InputSearch></td>
                </tr>
                <tr>
                    <th>Upper Height</th>
                    <td><InputSearch inputName={`lots.${currentIDX}.upperHeight`}  onFormChange={onFormChange} isDropDown={false} getFormValues={getLotListValues}></InputSearch></td>
                </tr>
                <tr>
                    <th>Islands</th>
                    <td><InputSearch inputName={`lots.${currentIDX}.islands`}  onFormChange={onFormChange} isDropDown={false} getFormValues={getLotListValues}></InputSearch></td>
                </tr>
                <tr>
                    <th>Supports</th>
                    <td><InputSearch inputName={`lots.${currentIDX}.supports`}  onFormChange={onFormChange} isDropDown={false} getFormValues={getLotListValues}></InputSearch></td>
                </tr>
                <tr>
                    <th>Crown</th>
                    <td><InputSearch inputName={`lots.${currentIDX}.crown`}  onFormChange={onFormChange} isDropDown={false} getFormValues={getLotListValues}></InputSearch></td>
                </tr>
                <tr>
                    <th>Light Rail</th>
                    <td><InputSearch inputName={`lots.${currentIDX}.lightRail`}  onFormChange={onFormChange} isDropDown={false} getFormValues={getLotListValues}></InputSearch></td>
                </tr>
                <tr>
                    <th>Base Shoe</th>
                    <td><InputSearch inputName={`lots.${currentIDX}.baseShoe`}  onFormChange={onFormChange} isDropDown={false} getFormValues={getLotListValues}></InputSearch></td>
                </tr>
                <tr>
                    <th>Recycling Bins</th>
                    <td><InputSearch inputName={`lots.${currentIDX}.recyclingBins`}  onFormChange={onFormChange} isDropDown={false} getFormValues={getLotListValues}></InputSearch></td>
                </tr>
                <tr>
                    <th>Job Specific Notes</th>
                    <td><ControlledTextArea inputName={"jobNotes"} getFormValues={getJobValues} onFormChange={onFormJobChange}></ControlledTextArea></td>
                </tr>
            </tbody>
        </table>
        <table className='additionalLotInfo'>
            <tbody>
                <tr>
                    <th className='noteColumn'>Lot Notes:</th>
                    <th className='applianceColumn'>Appliances:</th>
                </tr>
                <tr>
                    <td className='noteColumn'>
                        <ControlledTextArea inputName={`lots.${currentIDX}.lotNotes`} getFormValues={getLotListValues} onFormChange={onFormChange}></ControlledTextArea>
                    </td>
                    <td className='applianceColumn'>
                        <ControlledTextArea inputName={`lots.${currentIDX}.appliances`} getFormValues={getLotListValues} onFormChange={onFormChange}></ControlledTextArea>
                    </td>
                </tr>
            </tbody>
        </table>
    </>
    
  )
}

export default OptionsLotInfo