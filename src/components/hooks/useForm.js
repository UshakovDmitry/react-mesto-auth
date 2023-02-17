import { useState, useCallback } from "react";

const useForm = () => {
  const [enteredValues, setEnteredValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setEnteredValues({
      ...enteredValues,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: event.target.validationMessage,
    });

    setIsFormValid(event.target.closest(".form").checkValidity());
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsFormValid = false) => {
      setEnteredValues(newValues);
      setErrors(newErrors);
      setIsFormValid(newIsFormValid);
    },
    [setEnteredValues, setErrors, setIsFormValid]
  );

  return {
    enteredValues,
    errors,
    handleChange,
    isFormValid,
    resetForm,
  };
};

export default useForm;











// // import { useEffect, useState } from "react";
// import { useFormik } from "formik";
// import * as Yup from "yup";


// const useForm = (inputs, submitHandler) => {
//   const [disabled, setDisabled] = useState(true);
//   console.log('cfkfv')
//   const formik = useFormik({
//     initialValues: inputs,
//     validationSchema: Yup.object().shape({

//       name: Yup.string()
//         .min(2, "Должно быть 2 символа или больше")
//         .max(30, "Должно быть 30 символов или меньше")
//         .required("Заполните это поле"),

//       about: Yup.string()
//         .min(2, "Должно быть 2 символа или больше")
//         .max(30, "Должно быть 30 символов или меньше")
//         .required("Заполните это поле"),

//       avatar: Yup.string()
//         .url("Введите корректный URL-адрес")
//         .required("Заполните это поле"),

//       link: Yup.string()
//         .url("Введите корректный URL-адрес")
//         .required("Заполните это поле"),

//       email: Yup.string()
//         .email("Введите корректный email")
//         .required("Заполните это поле"),
        
//       password: Yup.string()
//       .max(30, "Должно быть 30 символов или меньше")
//         .min(4, "Должно быть 4 символа или больше")
//         .required("Заполните это поле"),
//     }),

//    onSubmit:(values) => {
//       console.log(values);
//       console.log('cfkfv');
//       setDisabled(true);
//       return submitHandler(values);
    
//     }
//   });

//   useEffect(() => {
//     formik.isValid && formik.dirty ? setDisabled(false) : setDisabled(true);
//   }, [formik.dirty, formik.isValid, formik.isValidating]);

//   return {formik};
// };

// export default useForm;
