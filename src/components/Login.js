// import Field from "./Field";
import useForm from "./hooks/useForm";

const Login = (props) => {
  const { enteredValues, errors, handleChange } = useForm();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!enteredValues.email || !enteredValues.password) {
      return;
    }
    props.onSubmit(enteredValues);
  };

  return (
    <div className="auth">
      <h2 className="auth__title">Вход</h2>

      <form className="form auth__form" onSubmit={handleSubmit} noValidate>

        <input
          className="auth__input"
          type="email"
          placeholder="Email"
          name="email"
          id="email"
          autoComplete="email"
          onChange={handleChange}
          value={enteredValues.email || ""}
          // formik={formik}
          required
        />

        <span className="auth__error">{errors.email}</span>

        <input
          className="auth__form auth__input"
          type="password"
          name="password"
          id="password"
          placeholder="Пароль"
          autoComplete="password"
          onChange={handleChange}
          value={enteredValues.password || ""}
          // formik={formik}
          required
        />
        
        <span className="auth__error">{errors.password}</span>

        <button type="submit">Войти</button>
      </form>
    </div>
  );
};

export default Login;
