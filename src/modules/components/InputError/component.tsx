import React from 'react'
import { ErrorObject } from '@excelcabinets/excel-types/LotTableInterface'

type InputErrorOptions = {
    errorState: ErrorObject;
    errorKey: string;
}

const InputError: React.FC<InputErrorOptions> = ({errorState, errorKey}) => {
  return (
    <>
        {errorState[errorKey] && <p className='errorMsg'>{errorState[errorKey as keyof ErrorObject] ?? ""}</p>}
    </>
  )
}

export default InputError