import { React, useState } from "react";
import { Modal } from "../../../context/modal";
import LoginForm from "./LoginForm";

import "./index.css";
const LoginModal = () => {
    const [open, setOpen] = useState(false);
    return (
        <>
            <button onClick={() => setOpen(true)}>Login</button>
            {open && (
                <>
                    <Modal onClose={() => setOpen(false)}>
                        {/* <i className="fa-brands fa-twitter fa-3x"></i> */}
                        <div className="login-header">
                            <h1>Login to Twitter</h1>
                        </div>
                        <LoginForm />
                    </Modal>
                </>
                // <>
                //     <div id="modal">
                //         <div
                //             id="modal-background"
                //             onClick={() => setOpen(false)}
                //         />
                //         <div id="modal-content">
                //             <LoginForm setOpen={setOpen} />
                //         </div>
                //     </div>
                // </>
            )}
        </>
    );
};

export default LoginModal;
