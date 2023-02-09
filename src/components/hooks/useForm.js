

import { useState, useCallback } from "react";

const useForm = () => {

  const [isValues, setIsValues] = useState({});
  const [isErrors, setIsErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setIsValues({
      ...isValues,
      [name]: value,
    });

    setIsErrors({
      ...isErrors,
      [name]: e.target.validationMessage,
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