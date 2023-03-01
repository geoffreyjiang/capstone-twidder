import { React, useState } from "react";
import { LogoutMod } from "../../../context/modal";
import LogoutButton from "../../auth/LogoutButton";
import { useSelector } from "react-redux";
import "./index.css";
const LogOutModal = () => {
    const [open, setOpen] = useState(false);
    const sessionUser = useSelector((state) => state.session.user);

    let img;
    if (!sessionUser.profile_pic)
        img =
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
    else img = sessionUser.profile_pic;

    return (
        <>
            <>
                <div className="modal-info" onClick={() => setOpen(true)}>
                    <img src={img} className="user-logout"></img>
                    <h3>{sessionUser.firstName}</h3>@ {sessionUser.username}
                    <div className="threeDots" onClick={() => setOpen(true)}>
                        <i className="fa-solid fa-ellipsis"></i>
                    </div>
                </div>
            </>
            {open && (
                <LogoutMod onClose={() => setOpen(false)}>
                    <LogoutButton setOpen={setOpen} />
                </LogoutMod>
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
