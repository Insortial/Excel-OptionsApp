import React, { useEffect, useState } from 'react'
import InputSearch from "./InputSearch"
import { LotTableInterface, JobInterface } from './LotTableInterface';

type BoxStyleType = [string, number];
type DrawerFrontsType = [string, number];
type DrawerBoxesType = [string, number];
type DrawerGuidesType = [string, number];
type DoorHingesType = [string, number];
type InteriorsType = [string, number];
type MaterialStainType = [string, number];

type LotTable = {
    lotTableDetails: LotTableInterface
}

const LotTable: React.FC<LotTable> = ({lotTableDetails}) => {
    const [builderState, setBuilderState] = useState<string>('');
    const [projectState, setProjectState] = useState<string>('');
    const [phaseState, setPhaseState] = useState<string>('');
    const [superintendentState, setSuperintendentState] = useState<string | undefined>(undefined);
    const [phoneState, setPhoneState] = useState<string | undefined>(undefined);
    const [foremanState, setForemanState] = useState<string>('');
    const [jobIDState, setJobIDState] = useState<number>(0);
    const [boxStyleState, setBoxStyleState] = useState<BoxStyleType | undefined>(undefined);
    const [drawerFrontsState, setDrawerFrontsState] = useState<DrawerFrontsType | undefined>(undefined);
    const [drawerBoxesState, setDrawerBoxesState] = useState<DrawerBoxesType | undefined>(undefined);
    const [drawerGuidesState, setDrawerGuidesState] = useState<DrawerGuidesType | undefined>(undefined);
    const [doorHingesState, setDoorHingesState] = useState<DoorHingesType | undefined>(undefined);
    const [interiorsState, setInteriorsState] = useState<InteriorsType | undefined>(undefined);
    const [upperHeightState, setUpperHeightState] = useState<string | undefined>(undefined);
    const [islandsState, setIslandsState] = useState<string | undefined>(undefined);
    const [crownState, setCrownState] = useState<string | undefined>(undefined);
    const [lightRailState, setLightRailState] = useState<string | undefined>(undefined);
    const [baseShoeState, setBaseShoeState] = useState<string | undefined>(undefined);
    const [recyclingBinsState, setRecyclingBinsState] = useState<string | undefined>(undefined);
    const [jobNotesState, setJobNotesState] = useState<string | undefined>(undefined);
    const [lotState, setLotState] = useState<string | undefined>(undefined);
    const [planState, setPlanState] = useState<string | undefined>(undefined);
    const [materialStainState, setMaterialStainState] = useState<MaterialStainType | undefined>(undefined);
    
    const builderOptions : string[] = ["DR Horton", "Tri Pointe", "Richmond American", "Melia", "Dale", "Stella Pointe", "Lark"]
    const projectOptions : string[] = ["DR Horton", "Tri Pointe", "Richmond American", "Melia"]
    const foremanOptions : string[] = ["Adrian Gonzalez", "Eduardo Jimenez", "Rogelio", "Keith Kelley", "Leonard Schmidt"]
    const jobIDOptions : string[] = ["10167", "10152", "10102", "10023"]
    const boxStyleOptions : string[] = ["Euro", "FaceFrame"]
    const frontOptions : string[] = ["Solid", "Routed MDF", "Flat/MDF", "Routed Thermofoil", "Flat/Thermofoil", "Five Piece"]
    const boxOptions : string[] = ["Standard", "Dovetail", "Meta box", "APA Dovetail"]
    const guideOptions : string[] = ["Standard", "Full Extension", "Soft Closing", "Meta box", "Undermount", "APA Soft Closing Salice"]
    const hingeOptions : string[] = ["Standard", "Soft Closing", "APA Soft Closing", "1-3/8"]
    const interiorOptions : string[] = ["White Melamine", "Maple Melamine"]

    const noOptions : string[] = []

    useEffect(() => {
        setBuilderState(lotTableDetails.builder)
        setProjectState(lotTableDetails.project)
        setPhaseState(lotTableDetails.phase)
        setSuperintendentState(lotTableDetails.superintendent)
        setPhoneState(lotTableDetails.phone)
        setForemanState(lotTableDetails.foreman)
        setJobIDState(lotTableDetails.jobID)
        setLotState(lotTableDetails.lot)

        setBoxStyleState(lotTableDetails.boxStyle ?? ["", -1]) 
        /* setDrawerFrontsState(lotTableDetails.drawerFronts ?? ["", -1])
        setDrawerBoxesState(lotTableDetails.drawerBoxes ?? ["", -1])
        setDrawerGuidesState(lotTableDetails.drawerGuides ?? ["", -1])
        setDoorHingesState(lotTableDetails.doorHinges ?? ["", -1])
        setInteriorsState(lotTableDetails.interiors ?? ["", -1])
        setUpperHeightState(lotTableDetails.upperHeight ?? "")
        setIslandsState(lotTableDetails.islands ?? "")
        setCrownState(lotTableDetails.crown ?? "")
        setLightRailState(lotTableDetails.lightRail ?? "")
        setBaseShoeState(lotTableDetails.baseShoe ?? "")
        setRecyclingBinsState(lotTableDetails.recyclingBins ?? "")
        setJobNotesState(lotTableDetails.jobNotes ?? "")
        setPlanState(lotTableDetails.plan ?? "") */
    }, [lotTableDetails])
    

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
                        <td><InputSearch inputValue={builderState} onInputChange={setBuilderState} listOptions={builderOptions}></InputSearch></td>
                        <td><InputSearch inputValue={projectState} onInputChange={setProjectState} listOptions={projectOptions}></InputSearch></td>
                        <td><InputSearch inputValue={phaseState} onInputChange={setPhaseState} listOptions={noOptions}></InputSearch></td>
                        <td><InputSearch inputValue={superintendentState} onInputChange={setSuperintendentState} listOptions={noOptions}></InputSearch></td>
                        <td><InputSearch inputValue={phoneState} onInputChange={setPhoneState} listOptions={noOptions}></InputSearch></td>
                        <td><InputSearch inputValue={foremanState} onInputChange={setForemanState} listOptions={foremanOptions}></InputSearch></td>
                    </tr>
                </tbody>
            </table>
            <table className='lotInfo'>
                <tbody>
                    <tr>
                        <th>Job ID</th>
                        <td><InputSearch inputValue={jobIDState} onInputChange={setJobIDState} listOptions={jobIDOptions}></InputSearch></td>
                    </tr>
                    <tr>
                        <th>Box Style</th>
                        <td><InputSearch inputValue={boxStyleState} onInputChange={setBoxStyleState} listOptions={boxStyleOptions}></InputSearch></td>
                    </tr>
                    <tr>
                        <th>Drawer Fronts</th>
                        <td><InputSearch inputValue={drawerFrontsState} onInputChange={setDrawerFrontsState} listOptions={frontOptions}></InputSearch></td>
                    </tr>
                    <tr>
                        <th>Drawer Boxes</th>
                        <td><InputSearch inputValue={drawerBoxesState} onInputChange={setDrawerBoxesState} listOptions={boxOptions}></InputSearch></td>
                    </tr>
                    <tr>
                        <th>Drawer Guides</th>
                        <td><InputSearch inputValue={drawerGuidesState} onInputChange={setDrawerGuidesState} listOptions={guideOptions}></InputSearch></td>
                    </tr>
                    <tr>
                        <th>Drawer Hinges</th>
                        <td><InputSearch inputValue={doorHingesState} onInputChange={setDoorHingesState} listOptions={hingeOptions}></InputSearch></td>
                    </tr>
                    <tr>
                        <th>Interiors</th>
                        <td><InputSearch inputValue={interiorsState} onInputChange={setInteriorsState} listOptions={interiorOptions}></InputSearch></td>
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
                        <td><InputSearch inputValue={lotState} onInputChange={setLotState} listOptions={noOptions}></InputSearch></td>
                        <td><textarea></textarea></td>
                        <td><textarea></textarea></td>
                        <td className="optionCell"><textarea></textarea></td>
                        <td><textarea></textarea></td>
                        <td><textarea></textarea></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default LotTable