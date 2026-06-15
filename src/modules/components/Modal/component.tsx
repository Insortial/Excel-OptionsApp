import React, { ReactNode, } from 'react'
import { createPortal } from 'react-dom'
import './style.css'

type Modal = {
    modalType: string,
    turnOffModal: () => void,
    children: ReactNode
}

const Modal: React.FC<Modal> = ({modalType, turnOffModal, children}) => {
    return createPortal(
        <div className='modalScreen' style={{display: modalType !== "none" ? "flex": "none"}}>
            <div className='modal'>
                {children}
                <span className="exitButton" onClick={() => turnOffModal()}></span>
            </div>
        </div>, document.body)
}

export default Modal