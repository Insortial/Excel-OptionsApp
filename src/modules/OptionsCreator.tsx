import LotTable from "./LotTable";
import Navigation from './Navigation.tsx';
import { useLocation, Link } from "react-router-dom";
import { LotTableInterface, JobInterface } from './LotTableInterface';
import { useEffect, useState } from "react";

type Props = {}

function OptionsCreator({}: Props) {
    const [listOfLots, setListOfLots] = useState<LotTableInterface[]>([])
    const [needLotID, setNeedLotID] = useState<boolean>(false)
    const location = useLocation();
    const jobDetails = location.state;

    const createLotTable = (jobInfo: JobInterface): LotTableInterface => {
        let lotDetails:LotTableInterface = {
            builder: jobInfo.builder,
            project: jobInfo.project,
            phase: jobInfo.phase,
            superintendent: jobInfo.superintendent,
            phone: jobInfo.phone,
            foreman: jobInfo.foreman,
            jobID: jobInfo.jobID
        }

        return lotDetails;
    }

    const turnOffModal = () => {
        setNeedLotID(false)
    }

    const addLotTable = () => {

    }

    useEffect(() => {
      console.log(location.state)
      setNeedLotID(true)
      let firstTable = createLotTable(jobDetails)
      setListOfLots([firstTable])
    }, [])
    

    return (
        <>
            <div className='modalScreen' style={{display: needLotID ? "flex": "none"}}>
                <div className='modal'>
                </div>
                <span className="exitButton" onClick={() => turnOffModal()}></span>
            </div>
            <div id="rootDiv">
                <div id="optionsNav">
                    <h1>Options Creator</h1>
                    <h2>Current Lot: 21</h2>
                    <section id="lotList">
                        <h3>List of Lots</h3>
                        <button>Lot 21</button>
                        <button>Lot 5</button>
                        <button>Lot 10</button>
                    </section>
                    <section id="newTableButtons">
                        <button>New Lot Table</button>
                        <button>Copy Details</button>
                    </section>
                    <Link to="/" style={{marginTop: "auto"}}>Back to Job Creation</Link>
                </div>
                <div id="optionsEditor">
                    {listOfLots.map((lotDetails:LotTableInterface, index:number) => {
                        return <LotTable key={index} lotTableDetails={lotDetails}/>
                    })}
                </div>
            </div>
        </>
    )
}

export default OptionsCreator