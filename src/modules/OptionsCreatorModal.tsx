import React, { ReactNode, } from 'react'
import { createPortal } from 'react-dom'

type OptionsCreatorModal = {
    modalType: string, 
    setModalType?: React.Dispatch<React.SetStateAction<string>>,
    turnOffModal: () => void,
    children: ReactNode
}

const OptionsCreatorModal: React.FC<OptionsCreatorModal> = ({modalType, turnOffModal, children}) => {
    return createPortal(
        <div className='modalScreen' style={{display: modalType !== "none" ? "flex": "none"}}>
            <div className='modal'>
                {children}
                <span className="exitButton" onClick={() => turnOffModal()}></span>
            </div>
        </div>, document.body)
}

export default OptionsCreatorModal