import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import { useHistory } from "react-router-dom";
const LogoutButton = ({ setOpen }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const onLogout = async (e) => {
        history.push("/");
        dispatch(logout());
    };

    return (
        <>
            <button onClick={onLogout}>Logout</button>
            <button onClick={() => setOpen(false)}>Cancel</button>
        </>
    );
};

export default LogoutButton;
