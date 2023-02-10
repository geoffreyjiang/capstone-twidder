import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import { useHistory } from "react-router-dom";
import "./logout.css";
const LogoutButton = ({ setOpen }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const onLogout = async (e) => {
        history.push("/");
        dispatch(logout());
    };

    return (
        <>
            <h1>Log Out?</h1>
            <button className="logout-btn" onClick={onLogout}>
                Logout
            </button>
            <button className="logout-btn" onClick={() => setOpen(false)}>
                Cancel
            </button>
        </>
    );
};

export default LogoutButton;
