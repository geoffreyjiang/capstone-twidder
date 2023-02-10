import React, { useContext, useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./Modal.css";

const ModalContext = React.createContext();

export function ModalProvider({ children }) {
    const modalRef = useRef();
    const [value, setValue] = useState();

    useEffect(() => {
        setValue(modalRef.current);
    }, []);

    return (
        <>
            <ModalContext.Provider value={value}>
                {children}
            </ModalContext.Provider>
            <div ref={modalRef} />
        </>
    );
}

export function Modal({ onClose, children }) {
    const modalNode = useContext(ModalContext);
    // console.log(modalNode, "LINE 27");
    if (!modalNode) return null;
    // console.log("YOOOOOOOOOOOOOOOOOoo");
    return ReactDOM.createPortal(
        <div id="modal">
            <div id="modal-background" onClick={onClose} />
            <div id="modal-content">
                <i className="modal-icon fa-brands fa-twitter fa-3x"></i>
                {children}
            </div>
        </div>,
        modalNode
    );
}

export function SignUpMod({ onClose, children }) {
    const modalNode = useContext(ModalContext);
    // console.log(modalNode, "LINE 27");
    if (!modalNode) return null;
    // console.log("YOOOOOOOOOOOOOOOOOoo");
    return ReactDOM.createPortal(
        <div id="modal">
            <div id="smodal-background" onClick={onClose} />
            <div id="smodal-content">
                <i className="smodal-icon fa-brands fa-twitter fa-3x"></i>
                {children}
            </div>
        </div>,
        modalNode
    );
}
