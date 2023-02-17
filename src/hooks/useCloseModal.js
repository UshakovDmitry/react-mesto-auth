import React from "react";

const useCloseModal = (isOpen, handleClose) => {
  React.useEffect(() => {
    if (!isOpen) return;

    const handleClickESC = (e) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleClickESC);

    return () => document.removeEventListener("keydown", handleClickESC);
  }, [isOpen, handleClose]);
};

export default useCloseModal;
