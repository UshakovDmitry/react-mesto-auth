

import { useState, useCallback } from "react";

const useForm = () => {

  const [isValues, setIsValues] = useState({});
  const [isErrors, setIsErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);



  const handleChange = (e) => {
    setIsValues({
      ...isValues,
      [e.target.name]: e.target.value,
    });


    setIsErrors({
      ...isErrors,
      [e.target.name]: e.target.validationMessage,
    });
    setIsFormValid(e.target.closest(".form").checkValidity());
  };



  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsFormValid = false) => {
      setIsValues(newValues);
      setIsErrors(newErrors);
      setIsFormValid(newIsFormValid);
    },
    [setIsValues, setIsErrors, setIsFormValid]
  );


  
  return {
    isValues,
    isErrors,
    handleChange,
    isFormValid,
    resetForm,
  };
};

export default useForm;