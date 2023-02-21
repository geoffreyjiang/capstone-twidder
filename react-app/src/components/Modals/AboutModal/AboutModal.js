import { Modal } from "../../../context/modal";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./about.css";
const AboutModal = () => {
    const [open, setOpen] = useState(false);
    return (
        <>
            {/* <button onClick={() => setOpen(true)}>Edit</button> */}
            <i
                className="fa-solid fa-address-card about-icon"
                onClick={() => setOpen(true)}
            >
                About
            </i>

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
