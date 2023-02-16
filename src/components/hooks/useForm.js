import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";


const useForm = (inputs, submitHandler) => {
  const [disabled, setDisabled] = useState(true);

  const formik = useFormik({
    initialValues: inputs,
    validationSchema: Yup.object().shape({

      name: Yup.string()
        .min(2, "Должно быть 2 символа или больше")
        .max(30, "Должно быть 30 символов или меньше")
        .required("Заполните это поле"),

      about: Yup.string()
        .min(2, "Должно быть 2 символа или больше")
        .max(30, "Должно быть 30 символов или меньше")
        .required("Заполните это поле"),

      avatar: Yup.string()
        .url("Введите корректный URL-адрес")
        .required("Заполните это поле"),

      link: Yup.string()
        .url("Введите корректный URL-адрес")
        .required("Заполните это поле"),

      email: Yup.string()
        .email("Введите корректный email")
        .required("Заполните это поле"),
        
      password: Yup.string()
    //   .max(30, "Должно быть 30 символов или меньше")
        .min(4, "Должно быть 4 символа или больше")
        .required("Заполните это поле"),
    }),

    onSubmit: (values) => {
      setDisabled(true);
      return submitHandler(values);
    },
  });

  useEffect(() => {
    formik.isValid && formik.dirty ? setDisabled(false) : setDisabled(true);
  }, [formik.dirty, formik.isValid, formik.isValidating]);

  return { formik, disabled };
};

export default useForm;
