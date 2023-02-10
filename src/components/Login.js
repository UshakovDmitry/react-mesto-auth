
import useForm from './hooks/useForm';


const Login = (props) => {

const {isValues, isErrors, handleChange} = useForm({});


const handleSubmit = (e) => {
  e.preventDefault();
  if (!isValues.email || !isValues.password) {
    return;
  }
  props.onLogin(isValues);
};

  return (
    <div className="auth">
      <h2 className="auth__title">Вход</h2>
      <form className="form auth__form"
       onClick={handleSubmit} 
       noValidate>
        <input
          type="email"
          placeholder="Email"
          name="email"
          id="email"
          autoComplete="email"
          value={isValues.email || ""}
          onChange={handleChange}
          required
        />
        <span className="auth__error">{isErrors.email}</span>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Пароль"
          autoComplete="password"
          value={isValues.password || ""}
          onChange={handleChange}
          required
        />
        <span className="auth__error">{isErrors.password}</span>
        <button type="submit">Войти</button>
      </form>
    </div>
  );
};

export default Login;
