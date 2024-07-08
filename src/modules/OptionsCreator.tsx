import LotTable from "./LotTable";
import Navigation from './Navigation.tsx';
import { useLocation, Link } from "react-router-dom";
import { LotTableInterface, JobInterface } from './LotTableInterface';
import React, { useEffect, useRef, useState } from "react";

type Props = {}

function OptionsCreator({}: Props) {
    const lotNumRef = React.useRef<HTMLInputElement>(null);
    const [listOfLots, setListOfLots] = useState<LotTableInterface[]>([])
    const [currentLotNum, setCurrentLotNum] = useState<string>("")
    const [currentLot, setCurrentLot] = useState<LotTableInterface>()
    const [needLotID, setNeedLotID] = useState<boolean>(false)
    const location = useLocation();
    const jobDetails = location.state;

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
        }

        return lotDetails;
    }

    const saveLotTable = (lotTableData: LotTableInterface) => {
        let filteredTableList = listOfLots.filter((lotDetails:LotTableInterface) => lotDetails.lot !== lotTableData.lot)
        setListOfLots([...filteredTableList, lotTableData])
        console.log(filteredTableList)
    }

    const changeLotTable = (lotNum: string) => {
        setCurrentLotNum(lotNum)
        let foundLot = listOfLots.find((lotDetails:LotTableInterface) => {return lotDetails.lot === lotNum})
        setCurrentLot(foundLot)
    }

    const addLotTable = () => {
        let table:LotTableInterface;
        if(lotNumRef.current) {
            table = createLotTable(jobDetails, lotNumRef.current.value)
            setListOfLots([...listOfLots, table])
            changeLotTable(lotNumRef.current.value)

            setCurrentLotNum(lotNumRef.current.value)
            setCurrentLot(table)
            setNeedLotID(false)
        }
    }

    const promptLotNum = () => {
        setNeedLotID(true)
    }

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
                </div>
            </div>
            <div id="optionsNav">
                <h1>Options Creator</h1>
                <h2>Current Lot: {currentLotNum}</h2>
                <section id="lotList">
                    <h3>List of Lots</h3>
                    {listOfLots.map((lotDetails:LotTableInterface, index:number) => {
                        return <button key={index} onClick={() => changeLotTable(lotDetails.lot ?? "-1")}>LOT {lotDetails.lot}</button>
                    })}
                </section>
                <section id="newTableButtons">
                    <button onClick={() => promptLotNum()}>New Lot Table</button>
                    <button>Copy Details</button>
                </section>
                <Link to="/" style={{marginTop: "auto"}}>Back to Job Creation</Link>
            </div>
            <div id="optionsEditor">
                {!currentLot ? (<div>Placeholder</div>): (<LotTable saveLotTable={saveLotTable} lotTableDetails={currentLot} />)}
            </div>
        </>
    )
}

export default OptionsCreator