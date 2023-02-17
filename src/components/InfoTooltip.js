import successIcon from '../images//successful-registration-icon.svg';
import unsuccessIcon from '../images/registration-error-icon.svg';
import useCloseModal from "./hooks/useCloseModal";

const InfoTooltip = (props) => {
  useCloseModal(props.isOpen, props.onClose);


    return (
      <div className={`popup ${props.isOpen ? 'popup_opened' : ''}`}>
        <div className="popup__container">
          <button type="button" className="popup__close" onClick={props.onClose} />
          <img
            className="popup__signup-icon"
            src={props.isSuccess ? successIcon : unsuccessIcon}
            alt={
              props.isSuccess ? 'Все прошло успешно' : 'Что-то пошло не так'
            }
          />
          <h3 className="popup__signup-title">
            {props.isSuccess
              ? 'Вы успешно зарегистрировались!'
              : 'Что-то пошло не так! Попробуйте ещё раз.'}
          </h3>
        </div>
      </div>
    );
  };
  
  export default InfoTooltip;