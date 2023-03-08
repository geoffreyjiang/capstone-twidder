import { Modal } from "../../../context/modal";
import { useState } from "react";
import "./about.css";
const AboutModal = () => {
    const [open, setOpen] = useState(false);
    return (
        <>
            {/* <button onClick={() => setOpen(true)}>Edit</button> */}
            <i
                className="fa-solid fa-address-card about-icon"
                onClick={() => setOpen(true)}
            ></i>
            <span className="list-item-label" onClick={() => setOpen(true)}>
                About
            </span>

            {open && (
                <Modal onClose={() => setOpen(false)}>
                    <>
                        <div className="about-text">
                            <h2>Developed by Geoffrey Jiang</h2>
                            <a href="https://github.com/geoffreyjiang">
                                <i className="fa-brands fa-github fa-3x"></i>
                            </a>
                        </div>
                    </>
                </Modal>
            )}
        </>
    );
};

export default AboutModal;
