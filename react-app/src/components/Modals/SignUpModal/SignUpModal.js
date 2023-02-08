import { React, useState } from "react";
import { Modal } from "../../../context/modal";
import SignUpForm from "./SignUpForm";

const SignUpModal = () => {
    const [open, setOpen] = useState(false);
    return (
        <>
            <button onClick={() => setOpen(true)}>Sign Up</button>
            {open && (
                <Modal onClose={() => setOpen(false)}>
                    <SignUpForm />
                </Modal>
            )}
        </>
    );
};

export default SignUpModal;
