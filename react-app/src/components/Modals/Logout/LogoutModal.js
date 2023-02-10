import { React, useState } from "react";
import { Modal } from "../../../context/modal";
import LogoutButton from "../../auth/LogoutButton";
import { useSelector } from "react-redux";
const LogOutModal = () => {
    const [open, setOpen] = useState(false);
    const sessionUser = useSelector((state) => state.session.user);

    return (
        <>
            <img
                src={sessionUser.profile_pic}
                onClick={() => setOpen(true)}
            ></img>
            {open && (
                <Modal onClose={() => setOpen(false)}>
                    <LogoutButton setOpen={setOpen} />
                </Modal>
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

export default LogOutModal;
