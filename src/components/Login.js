const Login = () => {
  return (
    <div className="auth">
      <h2 className="auth__title">Вход</h2>
      <form className="form auth__form" noValidate>
        <input
          type="email"
          placeholder="Email"
          name="email"
          id="email"
          autoComplete="email"
          required
        />
        <span className="auth__error"></span>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Пароль"
          autoComplete="password"
       
          required
        />
        <span className="auth__error"></span>
        <button type="submit">Войти</button>
        {/* <span className="auth__login-hint"></span> */}
      </form>
    </div>
  );
};

export default Login;
