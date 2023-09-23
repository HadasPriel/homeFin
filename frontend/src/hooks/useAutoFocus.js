import { useCallback } from "react"

export const useAutoFocus = () => {

  const inputRef = useCallback((inputElement) => {
    if (inputElement) {
      inputElement.focus()
    }
  }, [])

  return inputRef
}
