import React, { useState } from 'react'

type LevelRow = {
    levelType: 'customer' | 'project' | 'job' | 'lot',
    id: number,
    name: string,
    selectIDFK: (rowLevel: 'job' | 'project' | 'lot' | 'customer', idfk: number) => void,
    children?: React.ReactNode
}

const LevelRow:React.FC<LevelRow> = ({id, name, levelType, selectIDFK, children}) => {
    const [expanded, setExpanded] = useState(false)

    const selectRow = () => {
        selectIDFK(levelType, id)
        setExpanded(!expanded)
    }

    return (
        <div className='levelContainer child'>
            <h3 
                key={id} 
                onClick={() => selectRow()}
            >
                {children ? (expanded ? '▼' : '▶') : '•'}{id}: {name}
            </h3>
            {expanded && children}
        </div>
    )
}

export default LevelRow