import LotTable from "./LotTable";
import Navigation from './Navigation.tsx';
import { useLocation, Link } from "react-router-dom";
import { LotTableInterface, JobInterface, PartOfLot } from './LotTableInterface';
import React, { useEffect, useRef, useState } from "react";
import docxConverter from "../hooks/docxConverter.tsx";

type Props = {}

function OptionsCreator({}: Props) {
    const lotNumRef = React.useRef<HTMLInputElement>(null);
    const [listOfLots, setListOfLots] = useState<LotTableInterface[]>([])
    const [currentLotNum, setCurrentLotNum] = useState<string>("")
    const [currentLot, setCurrentLot] = useState<LotTableInterface>()
    const [needLotID, setNeedLotID] = useState<boolean>(false)
    const [isLotCopy, setIsLotCopy] = useState<boolean>(false)
    const location = useLocation();
    const jobDetails = location.state;
    const throughoutLot:PartOfLot = {
        roomID: "Throughout",
        material: "",
        stain: "",
        doors: "",
        fingerpull: "",
        drawerFronts: "",
        knob: "",
        drawerBoxes: "",
        drawerGuides: "",
        doorHinges: "",
        pulls: "",
    }

    const createLotTable = (jobInfo: JobInterface, lotNum: string): LotTableInterface => {
        let lotDetails:LotTableInterface = {
            builder: jobInfo.builder,
            project: jobInfo.project,
            phase: jobInfo.phase,
            superintendent: jobInfo.superintendent,
            phone: jobInfo.phone,
            foreman: jobInfo.foreman,
            jobID: parseInt(jobInfo.jobID),
            lot: lotNum,
            partsOfLot: [throughoutLot]
        }

        return lotDetails;
    }

    const saveLotTable = (lotTableData: LotTableInterface) => {
        let filteredTableList = listOfLots.filter((lotDetails:LotTableInterface) => lotDetails.lot !== lotTableData.lot)
        setListOfLots([...filteredTableList, lotTableData])
    }

    const deleteLotTable = (lotNum: string) => {
        let filteredTableList = listOfLots.filter((lotDetails:LotTableInterface) => lotDetails.lot !== lotNum)
        setListOfLots(filteredTableList)
        setCurrentLot(filteredTableList[0])
        setCurrentLotNum(filteredTableList[0].lot ?? "")
    }

    const changeLotTable = (lotNum: string) => {
        setCurrentLotNum(lotNum)
        let foundLot = listOfLots.find((lotDetails:LotTableInterface) => {return lotDetails.lot === lotNum})
        setCurrentLot(foundLot)
    }

    const addLotTable = () => {
        let table:LotTableInterface;
        if(lotNumRef.current) {
            if(!isLotCopy) 
                table = createLotTable(jobDetails, lotNumRef.current.value)
            else {
                table = Object.assign({},  listOfLots.find((lotDetails:LotTableInterface) => {return lotDetails.lot === currentLotNum}))
                table.partsOfLot = table.partsOfLot?.filter((partOfLot:PartOfLot) => partOfLot.roomID === "Throughout")
                table.lot = lotNumRef.current.value
                setIsLotCopy(false)
            }
            setListOfLots([...listOfLots, table])
            changeLotTable(lotNumRef.current.value)

            setCurrentLotNum(lotNumRef.current.value)
            setCurrentLot(table)
            setNeedLotID(false)
        }
    }

    const createNewLot = () => {
        setNeedLotID(true)
    }

    const createLotCopy = () => {
        setNeedLotID(true)
        setIsLotCopy(true)
    }

    const testCreateDocument = () => {
        docxConverter(listOfLots)
    }

    const turnOffModal = () => {
        setNeedLotID(false)
    }

    useEffect(() => {
        lotNumRef.current?.focus()
    }, [lotNumRef])


    useEffect(() => {
      if(listOfLots.length == 0)
        setNeedLotID(true)
    }, [])

    return (
        <>
            <div className='modalScreen' style={{display: needLotID ? "flex": "none"}}>
                <div className='modal'>
                    <h2>Enter Lot Number:</h2>
                    <div className="modalRow">
                        <input ref={lotNumRef}></input>
                        <button onClick={addLotTable}>Submit</button>
                    </div>
                    <span className="exitButton" onClick={() => turnOffModal()}></span>
                </div>
            </div>
            <div id="optionsNav">
                <h1>Options Creator</h1>
                <h2>Current Lot: {currentLotNum}</h2>
                <section id="lotList">
                    <h3>List of Lots</h3>
                    {listOfLots.map((lotDetails:LotTableInterface, index:number) => {
                        return (
                        <section className="listOfLotsRow" key={index}>
                            <button className="lotDelete" onClick={() => deleteLotTable(lotDetails.lot ?? "")}>X</button>
                            <button className="lotButton" style={{backgroundColor: lotDetails.lot === currentLotNum ? "#d9d9d9" : "#f0f0f0"}} onClick={() => changeLotTable(lotDetails.lot ?? "-1")}>LOT {lotDetails.lot}</button>
                        </section>
                        )
                    })}
                </section>
                <section id="newTableButtons">
                    <button onClick={() => createNewLot()}>New Lot Table</button>
                    <button onClick={() => createLotCopy()}>Copy Details</button>
                    <button onClick={() => testCreateDocument()}>Test Create Document</button>
                </section>
                <Link to="/" style={{marginTop: "auto"}}>Back to Job Creation</Link>
            </div>
            <div id="optionsEditor">
                {!currentLot ? (<div style={{height: "100vh"}}></div>): (<LotTable saveLotTable={saveLotTable} lotTableDetails={currentLot} />)}
            </div>
        </>
    )
}

export default OptionsCreator