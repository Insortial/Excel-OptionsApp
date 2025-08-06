import React from 'react'
import InputSearch from './InputSearch'
import { LotTableInterface, PartOfLot } from '@excelcabinets/excel-types/LotTableInterface';
import { Control, UseFormGetValues } from 'react-hook-form';
import OptionsInfoCell from './OptionsInfoCell';

type OptionsInfoTable = {
    onFormChange: (key: string, value: string | boolean) => void;
    onNoneSelect: (currentRow: number) => void;
    getLotListValues: UseFormGetValues<{lots: LotTableInterface[]}>;
    deleteLotSection: (currentRow: number) => void;
    changeLotEditingMode: (editingPartsOfLot: boolean) => void;
    setModalType: React.Dispatch<React.SetStateAction<string>>;
    controlLotList: Control<{lots: LotTableInterface[]}>;
    editingPartsOfLot: boolean;
    currentIDX: number;
    hasThroughoutLot: boolean;
    partsOfLot: PartOfLot[];
    isOptionsMode: boolean;
}

const OptionsInfoTable: React.FC<OptionsInfoTable> = ({onFormChange, onNoneSelect, getLotListValues, deleteLotSection, changeLotEditingMode, setModalType, controlLotList, editingPartsOfLot, currentIDX, hasThroughoutLot, partsOfLot, isOptionsMode}) => {
    return (
        <table className='optionsInfo'>
            <tbody>
                <tr>
                    <th colSpan={2}>Lot Option Contract Value</th>
                    <td colSpan={3}>
                        <section id="optionsValueCell">
                            <span className="valueDiv">$</span>
                            <InputSearch inputName={`lots.${currentIDX}.lotOptionsValue`}  onFormChange={onFormChange} isDropDown={false} getFormValues={getLotListValues}></InputSearch>
                            <span id="centsDiv" className="valueDiv">.00</span>
                        </section>
                    </td>
                </tr>
                <tr>
                    {isOptionsMode ? <th>LOT</th> : <></>}
                    <th>PLAN</th>
                    <th>Material/Color</th>
                    <th>Option</th>
                </tr>
                {partsOfLot.slice(hasThroughoutLot ? 0 : 1).map((lotSection:PartOfLot, index:number) => {
                    return <OptionsInfoCell key={index} index={index} onFormChange={onFormChange} onNoneSelect={onNoneSelect} getLotListValues={getLotListValues} deleteLotSection={deleteLotSection} changeLotEditingMode={changeLotEditingMode} controlLotList={controlLotList}
                            setModalType={setModalType} editingPartsOfLot={editingPartsOfLot} isOptionsMode={isOptionsMode} currentIDX={currentIDX} hasThroughoutLot={hasThroughoutLot} partsOfLot={partsOfLot} lotSection={lotSection}/>
                })}
            </tbody>
        </table>
    )
}

export default OptionsInfoTable