import { React, useState } from "react";
import { Modal } from "../../context/modal";
import LoginForm from "./LoginForm";

import "./index.css";
const LoginModal = () => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <button onClick={() => setOpen(true)}>Login</button>
            {open && (
                <Modal onClose={() => setOpen(false)}>
                    <LoginForm />
                </Modal>
            )}
        </>
    );
};

export default LoginModal;
