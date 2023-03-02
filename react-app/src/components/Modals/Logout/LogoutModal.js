import { React, useState } from "react";
import { LogoutMod } from "../../../context/modal";
import LogoutButton from "../../auth/LogoutButton";
import { useSelector } from "react-redux";
import "./index.css";
const LogOutModal = () => {
    const [open, setOpen] = useState(false);
    const sessionUser = useSelector((state) => state.session.user);

    let img;
    if (!sessionUser?.profile_pic)
        img =
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
    else img = sessionUser?.profile_pic;

    return (
        <>
            <>
                <div className="modal-info" onClick={() => setOpen(true)}>
                    <img src={img} className="user-logout"></img>
                    <div className="threeDots" onClick={() => setOpen(true)}>
                        <h3 id="user-text">{sessionUser?.firstName}</h3>
                    </div>
                    <h3 id="nav-username">@{sessionUser?.username}</h3>
                    <div className="threeDots">
                        <i className="fa-solid fa-ellipsis"></i>
                    </div>
                </div>
            </>
            {open && (
                <LogoutMod onClose={() => setOpen(false)}>
                    <LogoutButton setOpen={setOpen} />
                </LogoutMod>
            )}
        </>
    );
};

export default LogOutModal;
