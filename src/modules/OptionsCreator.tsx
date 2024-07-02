import LotTable from "./LotTable"
import Navigation from './Navigation.tsx';

type Props = {}

function OptionsCreator({}: Props) {
    return (
        <>
            <Navigation></Navigation>
            <div id="rootDiv">
                <h2>Options Creator</h2>
                <LotTable />
            </div>
        </>
    )
}

export default OptionsCreator