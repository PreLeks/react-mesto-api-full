import {useState, useEffect} from "react";

const useFormValidation = (upperInput, lowerInput) => {

  const [isUpperInputValid, setIsUpperInputValid] = useState(false);
  const [isLowerInputValid, setIsLowerInputValid] = useState(false);
  const [isButtonValid, setIsButtonValid] = useState(false);

  const handleUpperInputChange = () => setIsUpperInputValid(upperInput.current.validity.valid);
  const handleLowerInputChange = () => setIsLowerInputValid(lowerInput.current.validity.valid);
  
  const onValid = () => {
    setIsUpperInputValid(true);
    setIsLowerInputValid(true);
  }
  
  const resetValid = () => {
    setIsUpperInputValid(false);
    setIsLowerInputValid(false);
  }

  useEffect(() => {
    setIsButtonValid(isUpperInputValid && isLowerInputValid);
  }, [isUpperInputValid, isLowerInputValid])
  
  return {handleUpperInputChange, handleLowerInputChange, onValid, resetValid, isButtonValid};
}

export default useFormValidation;