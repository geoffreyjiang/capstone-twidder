import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import { useHistory } from "react-router-dom";
import "./logout.css";
const LogoutButton = ({ setOpen }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    return (
        <>
            <div className="logout-header">
                <h1>Log Out?</h1>
            </div>
            <div className="logout-btn-container">
                <button
                    className="logout-btn"
                    onClick={() => {
                        dispatch(logout());
                        setOpen(false);
                        history.push("/");
                    }}
                >
                    Logout
                </button>
                <button
                    className="logout-btn"
                    onClick={() => {
                        setOpen(false);
                    }}
                >
                    Cancel
                </button>
            </div>
        </>
    );
};

export default LogoutButton;
