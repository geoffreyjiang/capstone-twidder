import { React, useState } from "react";
import { Modal } from "../../../context/modal";
import LoginForm from "./LoginForm";

import "./index.css";
const LoginModal = () => {
    const [open, setOpen] = useState(false);
    console.log(open);
    return (
        <>
            <button onClick={() => setOpen(true)}>Login</button>
            {open && (
                // <Modal onClose={() => setOpen(false)}>
                //     <LoginForm />
                // </Modal>
                <>
                    <div id="modal">
                        <div
                            id="modal-background"
                            onClick={() => setOpen(false)}
                        />
                        <div id="modal-content">
                            <LoginForm setOpen={setOpen} />
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default LoginModal;
