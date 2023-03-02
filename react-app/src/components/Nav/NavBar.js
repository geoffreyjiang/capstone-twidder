import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import "./nav.css";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../store/session";
import LoginModal from "../Modals/Login/LoginModal";
import LogOutModal from "../Modals/Logout/LogoutModal";
import AboutModal from "../Modals/AboutModal/AboutModal";

const NavBar = () => {
    const sessionUser = useSelector((state) => state.session.user);
    const history = useHistory();
    const dispatch = useDispatch();

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
                            <NavLink to="/" exact={true}>
                                <i className="fa-solid fa-house">
                                    <span className="list-item-label">
                                        Home
                                    </span>
                                </i>
                            </NavLink>
                        </li>
                        <li className="list-item">
                            <i className="fa-solid fa-hashtag">
                                <span className="list-item-label">Explore</span>
                            </i>
                        </li>
                        <li className="list-item">
                            <NavLink
                                to={`/user/${sessionUser.id}`}
                                exact={true}
                            >
                                <i className="fa-solid fa-user">
                                    <span className="list-item-label">
                                        Profile
                                    </span>
                                </i>
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
