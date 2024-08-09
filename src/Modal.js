import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import "./Modal.css";

const Modal = ({
  style = {},
  isOpen,
  onClose,
  children,
  fadeDuration = 300,
  clickOutsideClose = true,
  closeExisting = true,
  disableEscClose = false,
  closeTriggers = [],
  animationConfig = {
    open: { easing: "ease-in-out", transform: "translateY(0)" },
    close: { easing: "ease-out", transform: "translateY(-20px)" },
  },
  content = {
    title: "Default Title",
    message: "Default message content.",
    buttonText: "Close",
  },
  customClass = "",
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const triggerRefs = useRef(new Map());

  const closeAllModals = () => {
    document.querySelectorAll(".modal-overlay.open").forEach((el) => {
      el.classList.remove("open");
    });
  };

  useEffect(() => {
    if (isOpen) {
      if (closeExisting) {
        closeAllModals();
      }
      setIsMounted(true);
      setTimeout(() => {
        const overlay = document.querySelector(".modal-overlay");
        if (overlay) {
          overlay.classList.add("open");
        }
      }, 1);
    } else {
      const overlay = document.querySelector(".modal-overlay");
      if (overlay) {
        overlay.classList.remove("open");
      }
      setTimeout(() => setIsMounted(false), fadeDuration);
    }
  }, [isOpen, fadeDuration, closeExisting]);

  useEffect(() => {
    const handleTriggerClick = (event) => {
      event.preventDefault();
      onClose();
    };

    if (isMounted) {
      closeTriggers.forEach((triggerId) => {
        const element = document.querySelector(triggerId);
        if (element) {
          element.addEventListener("click", handleTriggerClick);
          triggerRefs.current.set(triggerId, element);
        }
      });
    }

    const cleanupRefs = new Map(triggerRefs.current);

    return () => {
      cleanupRefs.forEach((element) => {
        if (element) {
          element.removeEventListener("click", handleTriggerClick);
        }
      });
    };
  }, [isMounted, closeTriggers, onClose]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && isOpen && !disableEscClose) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, disableEscClose]);

  if (!isMounted) return null;

  return (
    <div
      className={`modal-overlay ${customClass}`}
      onClick={clickOutsideClose ? onClose : null}
      style={{
        transition: `opacity ${fadeDuration}ms ${
          isOpen ? animationConfig.open.easing : animationConfig.close.easing
        }`,
      }}
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          ...style,
          transition: `transform ${fadeDuration}ms ${
            isOpen ? animationConfig.close.easing : animationConfig.open.easing
          }, opacity ${fadeDuration}ms ${
            isOpen ? animationConfig.close.easing : animationConfig.open.easing
          }`,
          transform: isOpen
            ? animationConfig.close.transform
            : animationConfig.open.transform,
          opacity: isOpen ? 1 : 0,
        }}
      >
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        {content.title && <h2>{content.title}</h2>}{" "}
        {/* Affiche le titre seulement si défini */}
        {content.message && <p>{content.message}</p>}{" "}
        {/* Affiche le message seulement si défini */}
        {content.buttonText && (
          <button onClick={onClose}>{content.buttonText}</button>
        )}{" "}
        {/* Affiche le bouton seulement si défini */}
        {children} {/* Enfants supplémentaires fournis par l'utilisateur */}
      </div>
    </div>
  );
};

// Définir les types de prop et indiquer les props obligatoires
Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired, // Obligatoire pour déterminer si la modale est visible
  onClose: PropTypes.func.isRequired, // Obligatoire pour gérer la fermeture de la modale
  fadeDuration: PropTypes.number,
  clickOutsideClose: PropTypes.bool,
  closeExisting: PropTypes.bool,
  disableEscClose: PropTypes.bool,
  closeTriggers: PropTypes.arrayOf(PropTypes.string),
  animationConfig: PropTypes.shape({
    open: PropTypes.shape({
      easing: PropTypes.string,
      transform: PropTypes.string,
    }),
    close: PropTypes.shape({
      easing: PropTypes.string,
      transform: PropTypes.string,
    }),
  }),
  content: PropTypes.shape({
    title: PropTypes.string,
    message: PropTypes.string,
    buttonText: PropTypes.string,
  }),
  customClass: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node,
};

export default Modal;
