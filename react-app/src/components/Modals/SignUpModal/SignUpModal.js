import { React, useState } from "react";
import { SignUpMod } from "../../../context/modal";
import SignUpForm from "./SignUpForm";

const SignUpModal = () => {
    const [open, setOpen] = useState(false);
    return (
        <>
            <button onClick={() => setOpen(true)}>Sign Up</button>
            {open && (
                <SignUpMod onClose={() => setOpen(false)}>
                    <div className="login-header">
                        <h2>Sign up for Twidder</h2>
                    </div>
                    <SignUpForm />
                </SignUpMod>
            )}
        </>
    );
};

export default SignUpModal;
