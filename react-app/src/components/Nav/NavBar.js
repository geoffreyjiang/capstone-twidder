import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import "./nav.css";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../store/session";

const NavBar = () => {
    const sessionUser = useSelector((state) => state.session.user);
    const history = useHistory();
    const dispatch = useDispatch();
    console.log(sessionUser);
    let session;
    if (sessionUser) {
        session = (
            <ul>
                <li className="list-item">
                    <NavLink to="/" exact={true}>
                        Home
                    </NavLink>
                    {/* <button
                        className="icon-btn"
                        onClick={() => history.push("/")}
                    >
                        <h3>Home</h3>
                    </button> */}
                </li>
                <li className="list-item">Explore </li>
                <li className="list-item">Profile </li>
                <li className="list-item">
                    <LogoutButton />
                </li>
            </ul>
        );
    } else {
        session = (
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
                            console.log(credential);
                            const data = await dispatch(
                                login(credential, password)
                            );
                            if (data) history.push("/");
                        }}
                    >
                        Demo Login
                    </button>
                </li>
            </ul>
        );
    }
    return (
        <nav>
            <i class="fa-brands fa-twitter"></i>
            <h2>Twidder</h2>
            {session}
        </nav>
    );
};

export default NavBar;
