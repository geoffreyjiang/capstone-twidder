import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import "./nav.css";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../store/session";
import LoginModal from "../Modals/Login/LoginModal";
import LogOutModal from "../Modals/Logout/LogoutModal";

const NavBar = () => {
    const sessionUser = useSelector((state) => state.session.user);
    const history = useHistory();
    const dispatch = useDispatch();
    let session;
    if (sessionUser) {
        session = (
            <>
                <ul>
                    <li className="list-item">
                        <NavLink to="/" exact={true}>
                            <i class="fa-solid fa-house"> Home</i>
                        </NavLink>
                        {/* <button
                        className="icon-btn"
                        onClick={() => history.push("/")}
                    >
                        <h3>Home</h3>
                    </button> */}
                    </li>
                    <li className="list-item">Explore </li>
                    <li className="list-item">
                        <i class="fa-solid fa-user"> Profile</i>
                    </li>
                </ul>
                <div className="list-end">
                    {/* <img
                        src={sessionUser.profile_pic}
                        onClick={<LogOutModal />}
                    ></img> */}
                    <LogOutModal />
                    {/* <LogoutButton /> */}
                </div>
            </>
        );
    } else {
        session = (
            <>
                <ul>
                    <li className="list-item">
                        <NavLink to="/" exact={true}>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <button
                            className="demo-btn"
                            onClick={(e) => history.push("/login")}
                        >
                            Login
                        </button>
                    </li>
                    <li>
                        <button
                            className="demo-btn"
                            onClick={(e) => history.push("/sign-up")}
                        >
                            Sign Up
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={async (e) => {
                                const credential = "demo@aa.io";
                                const password = "password";
                                // history.push("/");
                                const data = await dispatch(
                                    login(credential, password)
                                );
                                if (data) history.push("/");
                            }}
                        >
                            Demo Login
                        </button>
                    </li>
                    {/* <li className="list-item">
                    <LogoutButton />
                </li> */}
                    <LoginModal />
                </ul>
            </>
        );
    }
    return (
        <nav className="left-nav">
            <i className="fa-brands fa-twitter"></i>
            <h2>Twidder</h2>
            {session}
        </nav>
    );
};

export default NavBar;
