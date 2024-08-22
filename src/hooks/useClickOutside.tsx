import { RefObject, useEffect } from 'react'

export const useClickOutside = (
  inputRef: RefObject<HTMLElement | undefined>,
  dropDownRef: RefObject<HTMLElement | undefined>,
  callback: () => void,
  addEventListener = true,
) => {
  const handleClick = (event: MouseEvent) => {
    if ((dropDownRef.current && !dropDownRef.current.contains(event.target as HTMLElement)) &&
        (inputRef.current && !inputRef.current.contains(event.target as HTMLElement))) {
      callback()
    }
  }

  useEffect(() => {
    if (addEventListener) {
      document.addEventListener('click', handleClick)
    }

    return () => {
      document.removeEventListener('click', handleClick)
    }
  })
}