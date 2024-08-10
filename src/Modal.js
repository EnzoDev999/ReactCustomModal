import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import "./Modal.css";

const Modal = ({
  style = {},
  isOpen,
  onClose,
  children,
  clickOutsideClose = true,
  closeExisting = true,
  disableEscClose = false,
  closeTriggers = [],
  content = {
    title: "Default Title",
    message: "Default message content.",
    buttonText: "Close",
  },
  customClass = "",
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const overlayRef = useRef(null); // Create a ref for the overlay element
  const triggerRefs = useRef(new Map()); // Define triggerRefs to manage trigger elements

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
    } else {
      setIsMounted(false);
    }
  }, [isOpen, closeExisting]);

  // Separate useEffect for adding/removing "open" class
  useEffect(() => {
    if (isMounted) {
      const overlay = overlayRef.current; // Access the current DOM node

      if (overlay) {
        overlay.classList.add("open");
      }
    } else {
      const overlay = overlayRef.current;

      if (overlay) {
        overlay.classList.remove("open");
      }
    }
  }, [isMounted]); // Add/remove class based on isMounted

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
      ref={overlayRef} // Attach the ref to the overlay element
      className={`modal-overlay ${customClass}`}
      onClick={clickOutsideClose ? onClose : null}
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={style}
      >
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        {content.title && <h2>{content.title}</h2>}
        {content.message && <p>{content.message}</p>}
        {content.buttonText && (
          <button onClick={onClose}>{content.buttonText}</button>
        )}
        {children}
      </div>
    </div>
  );
};

// Définir les types de prop et indiquer les props obligatoires
Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired, // Obligatoire pour déterminer si la modale est visible
  onClose: PropTypes.func.isRequired, // Obligatoire pour gérer la fermeture de la modale
  clickOutsideClose: PropTypes.bool,
  closeExisting: PropTypes.bool,
  disableEscClose: PropTypes.bool,
  closeTriggers: PropTypes.arrayOf(PropTypes.string),
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
