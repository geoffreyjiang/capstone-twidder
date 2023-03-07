import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import "./nav.css";
import { useSelector, useDispatch } from "react-redux";

import LogOutModal from "../Modals/Logout/LogoutModal";
import AboutModal from "../Modals/AboutModal/AboutModal";

const NavBar = () => {
    const sessionUser = useSelector((state) => state.session.user);
    const history = useHistory();
    // const dispatch = useDispatch();

    return (
        <>
            <nav className="left-nav">
                <div className="nav-items">
                    <div className="nav-icon">
                        <i className="fa-brands fa-twitter fa-3x"></i>
                        <h1>Twidder</h1>
                    </div>
                    <ul>
                        <li className="list-item">
                            <NavLink
                                to={`/users/${sessionUser.id}/following`}
                                style={{ textDecoration: "none" }}
                                exact={true}
                            >
                                <i className="fa-solid fa-house"></i>
                                <span className="list-item-label">Home</span>
                            </NavLink>
                        </li>
                        <li className="list-item">
                            <NavLink
                                to="/tweets"
                                style={{ textDecoration: "none" }}
                                exact={true}
                            >
                                <i className="fa-solid fa-hashtag"></i>
                                <span className="list-item-label">Explore</span>
                            </NavLink>
                        </li>
                        <li className="list-item">
                            <NavLink
                                to={`/user/${sessionUser?.id}`}
                                exact={true}
                                style={{ textDecoration: "none" }}
                            >
                                <i className="fa-solid fa-user"></i>
                                <span className="list-item-label">Profile</span>
                            </NavLink>
                        </li>
                        <li className="list-item">
                            <AboutModal />
                        </li>
                        <LogOutModal user={sessionUser} />
                    </ul>
                </div>
            </nav>
        </>
    );
};

export default NavBar;
